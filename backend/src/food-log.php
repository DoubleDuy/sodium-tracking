<?php
require_once './config/config.php';
$db = new Connect();

$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "กรุณาเข้าสู่ระบบ"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {

    $action = $_GET['action'] ?? 'list';

    // 1. ดึงรายการอาหารทั้งหมด (ของเดิม)
    if ($action === 'list') {

        $sql = "SELECT f.*, l.location_name, r.restaurant_name 
        FROM foods f
        JOIN locations l ON f.location_id = l.location_id
        LEFT JOIN restaurants r ON f.restaurant_id = r.restaurant_id 
        ORDER BY l.location_id ASC, r.restaurant_id ASC";
    
        $stmt = $db->query($sql);
        $all_foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $structured_data = [];

        foreach ($all_foods as $food) {
            $loc_id = $food['location_id'];
            $res_id = $food['restaurant_id'];

            // สร้างกลุ่ม Location (เช็คตาม ID เพื่อความชัวร์)
            if (!isset($structured_data[$loc_id])) {
                $structured_data[$loc_id] = [
                    "location_id" => $loc_id,
                    "location_name" => $food['location_name'],
                    "restaurants" => []
                ];
            }

            // สร้างกลุ่ม Restaurant ภายใน Location
            if (!isset($structured_data[$loc_id]['restaurants'][$res_id])) {
                $structured_data[$loc_id]['restaurants'][$res_id] = [
                    "restaurant_id" => $res_id,
                    "restaurant_name" => $food['restaurant_name'],
                    "foods" => []
                ];
            }

            // เพิ่มรายการอาหาร
            $structured_data[$loc_id]['restaurants'][$res_id]['foods'][] = $food;
        }
        // ส่งกลับเฉพาะค่าที่เป็น Array (ลบ Key ที่เป็น ID ออก)
        echo json_encode(["status" => "success", "data" => array_values($structured_data)]);
        exit;
    } 
    
    // 2. ดึงข้อมูลรายวัน (Daily)
    elseif ($action === 'daily') {
        $today = date('Y-m-d');
        $sql = "SELECT li.*, f.food_name, f.sodium_mg, f.food_image, f.location_id, f.restaurant_id 
                FROM log_items li
                JOIN daily_logs dl ON li.log_id = dl.log_id
                JOIN foods f ON li.food_id = f.food_id
                WHERE dl.user_id = :uid AND dl.log_date = :today";
        $stmt = $db->prepare($sql);
        $stmt->execute([':uid' => $user_id, ':today' => $today]);
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        exit;
    }

    // 3. ดึงข้อมูลรายสัปดาห์ (Weekly)
    elseif ($action === 'weekly') {
        $sql = "SELECT log_date, total_sodium_daily 
                FROM daily_logs 
                WHERE user_id = :uid 
                ORDER BY log_date DESC LIMIT 7";
        $stmt = $db->prepare($sql);
        $stmt->execute([':uid' => $user_id]);
        echo json_encode(["status" => "success", "data" => array_reverse($stmt->fetchAll(PDO::FETCH_ASSOC))]);
        exit;
    }

    // 4. ดึงสถิติรายเดือน (Stats)
    elseif ($action === 'stats') {
        $sql = "SELECT DATE_FORMAT(log_date, '%M') as month, SUM(total_sodium_daily) as sodium 
            FROM daily_logs 
            WHERE user_id = :uid 
            GROUP BY month, DATE_FORMAT(log_date, '%Y-%m')
            ORDER BY DATE_FORMAT(log_date, '%Y-%m') ASC";
        $stmt = $db->prepare($sql);
        $stmt->execute([':uid' => $user_id]);
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        exit;
    }

}

elseif ($method === 'POST') {
    // บันทึกการกินอาหารลงใน daily_logs และ log_items
    $data = json_decode(file_get_contents("php://input"), true);
    $selected_foods = $data['foods']; // Array ของ food_id
    $meal_type = $data['meal_type'] ?? 'breakfast';
    $log_date = date('Y-m-d');

    try {
        $db->beginTransaction();

        // 1. ตรวจสอบหรือสร้าง daily_log สำหรับวันนี้
        $stmt = $db->prepare("INSERT INTO daily_logs (user_id, log_date) 
                             VALUES (:uid, :date) 
                             ON DUPLICATE KEY UPDATE log_id=LAST_INSERT_ID(log_id)");
        $stmt->execute([':uid' => $user_id, ':date' => $log_date]);
        $log_id = $db->lastInsertId();

        // 2. บันทึกรายการอาหารลงใน log_items
        $total_added_sodium = 0;
        foreach ($selected_foods as $food) {
        $stmt = $db->prepare("INSERT INTO log_items (log_id, food_id, quantity, meal_type) VALUES (:lid, :fid, 1, :mtype)");
        $stmt->execute([':lid' => $log_id, ':fid' => $food['food_id'], ':mtype' => $meal_type]);
            $total_added_sodium += $food['sodium_mg'];
        }

        // 3. อัปเดตยอดรวมโซเดียมใน daily_logs
        $stmt = $db->prepare("UPDATE daily_logs SET total_sodium_daily = total_sodium_daily + :sodium WHERE log_id = :lid");
        $stmt->execute([':sodium' => $total_added_sodium, ':lid' => $log_id]);

        $db->commit();
        echo json_encode(["status" => "success", "message" => "บันทึกข้อมูลเรียบร้อยแล้ว"]);
    } catch (Exception $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}