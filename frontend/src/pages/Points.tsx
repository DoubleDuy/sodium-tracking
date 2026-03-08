import { motion } from "framer-motion";
import { ArrowLeft, Star, Gift, Trophy } from "lucide-react";
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

const Points = () => {
  const navigate = useNavigate();
  const currentPoints = 750;

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
