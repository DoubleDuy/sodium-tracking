import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useFoodLog } from "@/contexts/FoodLogContexts";

const mealColors: Record<string, string> = {
  breakfast: "bg-amber-200",
  lunch: "bg-sky-200",
  dinner: "bg-purple-200",
};

const DailyTracking = () => {
  const navigate = useNavigate();
  const { getTodayEntries, getTodayTotal } = useFoodLog();

  const todayFoods = getTodayEntries();
  const totalSodium = getTodayTotal();
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
          <button
            onClick={() => navigate("/food-log")}
            className="flex items-center gap-1 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-foreground"
          >
            <Plus className="h-4 w-4" />
            เพิ่มรายการอาหาร
          </button>
        </div>

        {/* Status banner */}
        {todayFoods.length > 0 && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={`flex items-center justify-between rounded-2xl p-4 ${
              isOver ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {isOver ? (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
              <div>
                <p className={`font-heading font-bold ${isOver ? "text-destructive" : "text-green-700"}`}>
                  {isOver ? "เกินกว่ากำหนด !" : "อยู่ในเกณฑ์ดี"}
                </p>
                <p className={`text-xs ${isOver ? "text-destructive/70" : "text-green-600/70"}`}>
                  เป้าหมายของคุณคือ {limit.toLocaleString()} mg/วัน
                </p>
              </div>
            </div>
            <p className={`font-heading text-2xl font-bold ${isOver ? "text-destructive" : "text-green-700"}`}>
              {totalSodium.toLocaleString()} mg
            </p>
          </motion.div>
        )}

        {/* Empty state */}
        {todayFoods.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl bg-secondary/50 py-12"
          >
            <p className="text-muted-foreground text-sm">ยังไม่มีรายการอาหารวันนี้</p>
            <button
              onClick={() => navigate("/food-log")}
              className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              เพิ่มรายการอาหาร
            </button>
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
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${mealColors[food.meal] || "bg-muted"} text-xl`}>
                {food.emoji}
              </div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-foreground">{food.name}</p>
                <p className="text-xs text-muted-foreground">{food.mealLabel}</p>
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