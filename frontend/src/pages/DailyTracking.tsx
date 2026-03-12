import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import api from "@/lib/axios";

const DailyTracking = () => {
  
  const [todayFoods, setTodayFoods] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchDaily = async () => {
      const res = await api.get("/index.php?page=food-log&action=daily");
      if (res.data.status === "success") setTodayFoods(res.data.data);
    };
    fetchDaily();
  }, []);

  const totalSodium = todayFoods.reduce((sum, f) => sum + f.sodium_mg, 0);
  const limit = 2000;
  const isOver = totalSodium > limit;

  const idToWord: Record<number, string> = { 
  0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 
  7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 
  13: "thirteen", 14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen"
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    if (currentSrc.endsWith('.png')) target.src = currentSrc.replace('.png', '.jpg');
    else if (currentSrc.endsWith('.jpg')) target.src = currentSrc.replace('.jpg', '.jpeg');
    else if (currentSrc.endsWith('.jpeg')) target.src = currentSrc.replace('.jpeg', '.webp');
    else if (currentSrc.endsWith('.webp')) target.src = currentSrc.replace('.webp', '.HEIC');
    else target.src = "/foods/default-food.png";
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-foreground">
            อาหารที่คุณรับประทานไปวันนี้
          </h2>
          <button className="flex items-center gap-1 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-foreground">
            <Plus className="h-4 w-4" />
            เพิ่มรายการอาหาร
          </button>
        </div>

        {/* Status banner */}
        {isOver && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-between rounded-2xl bg-red-100 p-4"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="font-heading font-bold text-destructive">เกินกว่ากำหนด !</p>
                <p className="text-xs text-destructive/70">เป้าหมายของคุณคือ {limit.toLocaleString()} mg/วัน</p>
              </div>
            </div>
            <p className="font-heading text-2xl font-bold text-destructive">
              {totalSodium.toLocaleString()} mg
            </p>
          </motion.div>
        )}

        {/* Food list */}
        <div className="space-y-3">
          {todayFoods.map((food, i) => (
            <motion.div
              key={i}
              className="glass-card flex items-center gap-4 rounded-2xl p-4 shadow-sm"
            >
              {/* ✅ แก้ไขจาก <div className={food.color} /> เป็น <img> */}
              <div className="h-12 w-12 rounded-xl bg-muted overflow-hidden shrink-0">
                <img 
                  src={`/foods/location_${idToWord[food.location_id]}/restaurant_${idToWord[food.restaurant_id]}/${food.food_image}`} 
                  alt={food.food_name}
                  className="h-full w-full object-cover"
                  onError={handleImageError}
                />
              </div>
              
              <div className="flex-1">
                <p className="font-heading font-semibold text-foreground">{food.food_name}</p>
                {/* ✅ แสดงมื้ออาหารจากข้อมูลจริง */}
                <p className="text-xs text-muted-foreground">
                  {food.meal_type === 'breakfast' ? '🌅 มื้อเช้า' : 
                  food.meal_type === 'lunch' ? '☀️ มื้อกลางวัน' : '🌙 มื้อเย็น'}
                </p>
              </div>
              
              <p className="font-heading font-bold text-foreground">
                {Number(food.sodium_mg).toLocaleString()} mg
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default DailyTracking;
