import { motion } from "framer-motion";
import { ArrowLeft, Star, Gift, Trophy, Check, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import infographicRewards from "@/assets/infographic-rewards.jpg";

const rewards = [
  { name: "เข็มกลัด", points: 500, emoji: "📌" },
  { name: "สติกเกอร์เซ็ต", points: 800, emoji: "🏷️" },
  { name: "ปากกา", points: 1000, emoji: "🖊️" },
  { name: "สบู่กระดาษ", points: 1200, emoji: "🧼" },
  { name: "กระเป๋าผ้า", points: 1500, emoji: "👜" },
];

// Mock: จำนวนวันที่บันทึกติดต่อกัน (จำลอง 8 วัน = 2 แต้ม + เหลืออีก 1 วันจะได้แต้มที่ 3)
const totalConsecutiveDays = 8;

const Points = () => {
  const navigate = useNavigate();
  const currentPoints = 750;

  const earnedPoints = Math.floor(totalConsecutiveDays / 3);
  const daysInCurrentCycle = totalConsecutiveDays % 3;

  // สร้างตาราง 30 วัน (10 รอบ x 3 วัน)
  const totalCycles = 10;

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            คะแนนสะสม
          </h1>
        </div>

        {/* Points display */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="rounded-2xl p-6 text-center shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(45 90% 55%), hsl(25 90% 55%))" }}
        >
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <p className="text-sm text-white/80">คะแนนสะสมของคุณ</p>
          <p className="font-heading text-4xl font-bold text-white">
            {currentPoints.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-white/60">คะแนน</p>
        </motion.div>

        {/* Streak tracking table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5 shadow-lg"
        >
          <h2 className="font-heading text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            ตารางสะสมแต้ม
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            บันทึกครบ 3 วัน = ได้ 1 แต้ม | บันทึกแล้ว <span className="font-semibold text-foreground">{totalConsecutiveDays}</span> วัน = <span className="font-semibold text-primary">{earnedPoints}</span> แต้ม
          </p>

          <div className="space-y-2">
            {Array.from({ length: totalCycles }).map((_, cycleIdx) => {
              const cycleStartDay = cycleIdx * 3;
              const isCycleComplete = cycleStartDay + 3 <= totalConsecutiveDays;
              const isCurrentCycle = cycleStartDay < totalConsecutiveDays && !isCycleComplete;

              return (
                <motion.div
                  key={cycleIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * cycleIdx }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all ${
                    isCycleComplete
                      ? "bg-primary/10"
                      : isCurrentCycle
                      ? "bg-accent/50 ring-1 ring-primary/30"
                      : "bg-secondary/50"
                  }`}
                >
                  {/* Cycle label */}
                  <span className="w-16 text-xs font-semibold text-muted-foreground shrink-0">
                    รอบ {cycleIdx + 1}
                  </span>

                  {/* 3 day circles */}
                  <div className="flex items-center gap-1.5 flex-1">
                    {[0, 1, 2].map((dayInCycle) => {
                      const globalDay = cycleStartDay + dayInCycle + 1;
                      const isDayDone = globalDay <= totalConsecutiveDays;

                      return (
                        <div
                          key={dayInCycle}
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                            isDayDone
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isDayDone ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span>{globalDay}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Point earned indicator */}
                  <div
                    className={`flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-bold transition-all ${
                      isCycleComplete
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Star className="h-3.5 w-3.5" />
                    <span>+1</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Rewards */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            ของรางวัล
          </h2>

          {/* Infographic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl overflow-hidden shadow-lg mb-4"
          >
            <img
              src={infographicRewards}
              alt="เงื่อนไขการรับของรางวัล"
              className="w-full h-auto object-contain"
            />
          </motion.div>
          <div className="space-y-3">
            {rewards.map((reward, i) => {
              const canRedeem = currentPoints >= reward.points;
              return (
                <motion.div
                  key={reward.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card flex items-center gap-4 rounded-2xl p-4 shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                    {reward.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-heading text-sm font-semibold text-foreground">{reward.name}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">{reward.points.toLocaleString()} คะแนน</span>
                    </div>
                  </div>
                  <button
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      canRedeem
                        ? "gradient-btn text-primary-foreground shadow-md"
                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                    }`}
                    disabled={!canRedeem}
                  >
                    {canRedeem ? "แลก" : "ยังไม่พอ"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Points;
