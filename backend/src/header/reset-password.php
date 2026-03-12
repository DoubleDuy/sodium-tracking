<?php

require_once './config/config.php';

try {
    $db = new Connect();
    $data = json_decode(file_get_contents("php://input"), true);
    
    // รับค่าจาก Frontend
    $user_id = $_SESSION['user_id'];
    $current_password = $data['current_password'] ?? ''; 
    $new_password = $data['new_password'] ?? '';

    if (empty($current_password) || empty($new_password)) {
        throw new Exception("ข้อมูลไม่ครบถ้วน");
    }

    // 1. ดึงรหัสผ่านเดิมจากฐานข้อมูลมาตรวจสอบ
    $stmt = $db->prepare("SELECT password_hash FROM users WHERE user_id = :id");
    $stmt->execute([':id' => $user_id]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($current_password, $user['password_hash'])) {
        throw new Exception("รหัสผ่านปัจจุบันไม่ถูกต้อง");
    }

    // 2. ถ้าถูกต้อง ให้ทำการ Hash รหัสใหม่และ Update
    $new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);
    $update_stmt = $db->prepare("UPDATE users SET password_hash = :pass WHERE user_id = :id");
    $result = $update_stmt->execute([
        ':pass' => $new_password_hash,
        ':id' => $user_id
    ]);

    if ($result) {
        echo json_encode(["status" => "success", "message" => "อัปเดตรหัสผ่านแล้ว"]);
    } else {
        throw new Exception("ไม่สามารถอัปเดตรหัสผ่านได้");
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}