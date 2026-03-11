<?php
require_once './config/config.php';
require_once 'vendor/autoload.php';

try {
    $db = new Connect(); // ใช้ class Connect เหมือนใน login.php
    $client = new Google_Client();
    $client->setClientId(GOOGLE_CLIENT_ID);
    $client->setClientSecret(GOOGLE_CLIENT_SECRET);
    $client->setRedirectUri(GOOGLE_REDIRECT_URI);
    $client->addScope("email");
    $client->addScope("profile");

    if(!isset($_GET['code'])) {
        // หากยังไม่มี code ให้ Redirect ไปหน้า Login ของ Google
        header("Location: " . filter_var($client->createAuthUrl(), FILTER_SANITIZE_URL));
        exit;
    } else {
        $client->authenticate($_GET['code']);
        $token = $client->getAccessToken();
        $client->setAccessToken($token);

        $oauth = new Google_Service_Oauth2($client);
        $userInfo = $oauth->userinfo->get();

        // 1. ตรวจสอบว่ามี User นี้หรือยัง (อิงตาม sodium_tracking.sql)
        $stmt = $db->prepare("SELECT * FROM users WHERE google_id = :google_id OR email = :email");
        $stmt->execute([':google_id' => $userInfo->id, ':email' => $userInfo->email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$user) {
            // 2. ถ้ายังไม่มี ให้บันทึกใหม่ (ตัด picture ออกตาม sql ที่ให้มา)
            $stmt = $db->prepare("INSERT INTO users (google_id, full_name, email, user_role) VALUES (:google_id, :name, :email, 'บุคคลทั่วไป')");
            $stmt->execute([
                ':google_id' => $userInfo->id,
                ':name' => $userInfo->name,
                ':email' => $userInfo->email
            ]);
            $userId = $db->lastInsertId();
        } else {
            $userId = $user['user_id'];
        }

        // 3. ตั้งค่า Session
        $_SESSION['user_id'] = $userId;
        $_SESSION['full_name'] = $userInfo->name;

        $userData = urlencode(json_encode([
            "user_id" => $userId,
            "full_name" => $userInfo->name,
            "email" => $userInfo->email
        ]));

        header("Location: http://localhost:5174/splash?user=" . $userData);
        exit;
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>