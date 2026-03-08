import { motion } from "framer-motion";
import { AlertTriangle, Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const todayFoods = [
  { name: "ผัดไทย", meal: "มื้อเช้า", sodium: 500, color: "bg-amber-200" },
  { name: "ผัดผักบุ้ง", meal: "มื้อเช้า", sodium: 1000, color: "bg-amber-200" },
  { name: "แกงเขียวหวาน", meal: "มื้อเช้า", sodium: 1000, color: "bg-amber-200" },
  { name: "ผัดไทย", meal: "มื้อกลางวัน", sodium: 500, color: "bg-sky-200" },
  { name: "ผัดผักบุ้ง", meal: "มื้อกลางวัน", sodium: 1000, color: "bg-sky-200" },
  { name: "แกงเขียวหวาน", meal: "มื้อกลางวัน", sodium: 1000, color: "bg-sky-200" },
  { name: "ผัดไทย", meal: "มื้อเย็น", sodium: 500, color: "bg-purple-200" },
  { name: "ผัดผักบุ้ง", meal: "มื้อเย็น", sodium: 1000, color: "bg-purple-200" },
  { name: "แกงเขียวหวาน", meal: "มื้อเย็น", sodium: 1000, color: "bg-purple-200" },
];

const DailyTracking = () => {
  const totalSodium = todayFoods.reduce((sum, f) => sum + f.sodium, 0);
  const limit = 2000;
  const isOver = totalSodium > limit;

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
              key={`${food.name}-${food.meal}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card flex items-center gap-4 rounded-2xl p-4 shadow-sm"
            >
              <div className={`h-10 w-10 rounded-lg ${food.color}`} />
              <div className="flex-1">
                <p className="font-heading font-semibold text-foreground">{food.name}</p>
                <p className="text-xs text-muted-foreground">{food.meal}</p>
              </div>
              <p className="font-heading font-bold text-foreground">
                {food.sodium.toLocaleString()} mg
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default DailyTracking;
