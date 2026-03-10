<?php
    session_start();

    // ตั้งค่า CORS (ต้องอยู่บรรทัดแรกๆ ก่อน logic อื่น)
    header("Access-Control-Allow-Origin: http://localhost:5174");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, ngrok-skip-browser-warning");

    // --- เพิ่มส่วนนี้เข้าไป ---
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $page = isset($_GET['page']) ? $_GET['page'] : '';

    switch ($page) {

        // authentication
        case 'register':
            require_once 'auth/register.php';
            break;
        case 'login':
            require_once 'auth/login.php';
            break;
        case 'google-callback':
            require_once 'auth/google-callback.php';
            break;

        // profile
        case 'edit-profile':
            require_once 'header/edit-profile.php';
            break;
        case 'reset-password':
            require_once 'header/reset-password.php';
            break;

        // food-log
        case 'food-log':
            require_once 'food-log.php';
            break;
        
        default:
            http_response_code(404);
            echo json_encode(["error" => "API endpoint is not found!"]);
            break;
    }

?>