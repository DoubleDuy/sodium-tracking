import { motion } from "framer-motion";
import { ArrowLeft, Star, Trophy, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import StreakCalendar from "@/components/StreakCalendar";
import infographicRewards from "@/assets/infographic-rewards.jpg";
// Mock: tracked days this month (1-based day numbers)
const trackedDays = [1, 2, 3, 4, 5, 6, 7, 8];

const Points = () => {
  const navigate = useNavigate();
  const currentPoints = 750;
  const earnedPoints = Math.floor(trackedDays.length / 3);

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
          <h2 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Flame className="h-5 w-5 text-destructive" />
            ตารางสะสมแต้ม
          </h2>
          <StreakCalendar trackedDays={trackedDays} currentMonth={new Date()} />
        </motion.div>

        {/* Rewards */}
        <div className="space-y-3">
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

        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Points;
