import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useFoodLog } from "@/contexts/FoodLogContexts";

const limit = 2000;

const WeeklyTracking = () => {
  const { getWeekSummary } = useFoodLog();
  const weeklyData = getWeekSummary();
  const totalWeekly = weeklyData.reduce((sum, d) => sum + d.sodium, 0);

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="font-heading text-lg font-bold text-foreground text-center">
          สรุปการบริโภคโซเดียมรายสัปดาห์
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {weeklyData.map((day, i) => {
            const isOver = day.sodium > limit;
            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card flex items-center gap-3 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-secondary">
                  <span className="text-[10px] font-bold text-muted-foreground">{day.monthLabel}</span>
                  <span className="font-heading text-lg font-bold text-foreground">{day.dateLabel}</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">
                    {day.sodium > 0 ? `${day.sodium.toLocaleString()} mg` : "— mg"}
                  </p>
                  <p className={`text-xs font-semibold ${
                    day.sodium === 0 ? "text-muted-foreground" : isOver ? "text-destructive" : "text-accent"
                  }`}>
                    {day.sodium === 0 ? "ยังไม่มีข้อมูล" : isOver ? "เกินเป้าหมาย" : "อยู่ในเกณฑ์"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center justify-between rounded-2xl p-5 shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(45 90% 55%), hsl(25 85% 55%))" }}
        >
          <p className="font-heading text-lg font-bold text-white">รวมทั้งสัปดาห์</p>
          <p className="font-heading text-xl font-bold text-white">
            {totalWeekly.toLocaleString()} mg
          </p>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default WeeklyTracking;