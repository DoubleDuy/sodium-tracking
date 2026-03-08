import { motion } from "framer-motion";
import { UtensilsCrossed, BookOpen, Pill, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const chartData = [
  { day: "จ.", sodium: 2100 },
  { day: "อ.", sodium: 3200 },
  { day: "พ.", sodium: 1800 },
  { day: "พฤ.", sodium: 2900 },
  { day: "ศ.", sodium: 800 },
  { day: "ส.", sodium: 3600 },
  { day: "อา.", sodium: 1900 },
];

const features = [
  { icon: UtensilsCrossed, label: "กรอกข้อมูลอาหาร", path: "/food-log", bg: "bg-[hsl(30,90%,55%)]" },
  { icon: BookOpen, label: "แนะนำรายการอาหาร", path: "/food-recommend", bg: "bg-[hsl(255,60%,65%)]" },
  { icon: Pill, label: "ความรู้เกี่ยวกับยา", path: "/medicine", bg: "bg-[hsl(170,60%,55%)]" },
  { icon: Star, label: "คะแนนสะสม", path: "/points", bg: "bg-[hsl(40,80%,60%)]" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <p className="text-sm text-muted-foreground">ยินดีต้อนรับ คุณ <span className="font-semibold text-foreground">Habibi Wasabi</span> 👋</p>

        {/* Chart Card */}
        <div className="glass-card rounded-2xl p-5 shadow-lg">
          <h2 className="font-heading text-lg font-semibold text-foreground">ปริมาณโซเดียม</h2>
          <p className="mb-4 text-xs text-muted-foreground">รายสัปดาห์(mg)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  formatter={(value: number) => [`${value.toLocaleString()} mg`, "โซเดียม"]}
                />
                <Bar dataKey="sodium" radius={[4, 4, 0, 0]} fill="hsl(30, 90%, 55%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.button
                key={feature.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(feature.path)}
                className="glass-card flex flex-col items-center gap-3 rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} shadow-md`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span className="font-heading text-sm font-semibold text-foreground">
                  {feature.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Dashboard;
