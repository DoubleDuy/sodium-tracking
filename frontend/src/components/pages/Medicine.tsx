import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Pill, Leaf, ChevronRight, X, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import infoNsaids from "@/assets/info-nsaids.jpg";
import infoCorticosteroid from "@/assets/info-corticosteroid.jpg";
import infoHerbs from "@/assets/info-herbs.jpg";

type DetailItem = {
  name: string;
  detail: string;
  warning?: string;
};

type Category = {
  title: string;
  description: string;
  icon: typeof Pill;
  color: string;
  infographic: string;
  items: DetailItem[];
};

const categories: Category[] = [
  {
    title: "NSAIDs",
    description: "ยาแก้ปวดลดอักเสบที่อาจส่งผลต่อไต",
    icon: Pill,
    color: "from-[hsl(255,60%,65%)] to-[hsl(280,60%,60%)]",
    infographic: infoNsaids,
    items: [
      { name: "Aspirin", detail: "ยาแก้ปวด ลดไข้ ต้านการอักเสบ อาจทำให้ไตเสียหายหากใช้ต่อเนื่อง", warning: "หลีกเลี่ยงการใช้ในระยะยาว" },
      { name: "Ibuprofen", detail: "ยาแก้ปวดที่ใช้บ่อย ลดการไหลเวียนเลือดไปที่ไต อาจทำให้ไตวายเฉียบพลัน", warning: "ไม่ควรใช้ติดต่อกันเกิน 10 วัน" },
      { name: "Naproxen", detail: "ยาแก้ปวดลดอักเสบ มีผลต่อไตคล้าย Ibuprofen", warning: "ระวังในผู้ป่วยโรคไต" },
      { name: "Celecoxib", detail: "ยาต้านอักเสบกลุ่ม COX-2 inhibitor อาจส่งผลต่อการทำงานของไต", warning: "ปรึกษาแพทย์ก่อนใช้" },
    ],
  },
  {
    title: "Corticosteroid",
    description: "ยาสเตียรอยด์ที่อาจทำให้ร่างกายกักเก็บโซเดียม",
    icon: Pill,
    color: "from-[hsl(200,60%,55%)] to-[hsl(220,70%,65%)]",
    infographic: infoCorticosteroid,
    items: [
      { name: "Dexamethasone", detail: "ทำให้เกิดภาวะ Hyperfiltration ไตกรองมากเกินไป ส่งผลเสียในระยะยาว", warning: "ใช้ตามแพทย์สั่งเท่านั้น" },
      { name: "Prednisolone", detail: "ยาสเตียรอยด์ที่ทำให้ร่างกายกักเก็บโซเดียมและน้ำ เพิ่มภาระไต", warning: "ห้ามหยุดยาเองโดยไม่ปรึกษาแพทย์" },
    ],
  },
  {
    title: "สมุนไพรที่มีพิษต่อไต",
    description: "สมุนไพรที่ควรระวังเพราะอาจส่งผลเสียต่อไต",
    icon: Leaf,
    color: "from-[hsl(30,70%,55%)] to-[hsl(15,70%,55%)]",
    infographic: infoHerbs,
    items: [
      { name: "หญ้าหนวดแมว", detail: "มีโพแทสเซียมสูง 5,000 มก./100 ก. ทำให้ไตทำงานหนักขึ้น", warning: "ไม่ควรรับประทานต่อเนื่องเกิน 2-4 สัปดาห์" },
      { name: "ลูกยอ", detail: "มีโพแทสเซียมสูง ทำให้ไตทำงานหนักขึ้น", warning: "ห้ามรับประทานเกิน 120 มก./วัน" },
      { name: "ชะเอมเทศ", detail: "มีสาร Glycyrrhizin ทำให้คอร์ติซอลเพิ่ม ไตดูดโซเดียมมาก อาจทำให้ไตวายเฉียบพลัน", warning: "ไม่ควรใช้ต่อเนื่องเกิน 4-6 สัปดาห์" },
      { name: "ไคร้เครือ", detail: "ทำให้เกิดการอักเสบที่เนื้อเยื่อรอบไต เป็นพังผืด ทำให้เป็นโรคไตเรื้อรัง", warning: "ใช้ไม่เกิน 2-3 เดือน" },
      { name: "มะเฟือง", detail: "มีสาร Caramboxin และ Oxalate อาจเป็นพิษต่อระบบประสาทและไตวายเฉียบพลัน", warning: "ไม่ควรรับประทานมากกว่า 2 ผล/วัน" },
      { name: "มะขามแขก", detail: "มีสาร Sennoside ถูกขับออกทางไต ทำให้เกิดการสะสม", warning: "ไม่ควรรับประทานติดต่อกันเกิน 1 สัปดาห์" },
      { name: "ลูกเนียง", detail: "มีสาร Jengkolic Acid ส่งผลให้อุดตันในท่อไต เกิดไตวายเฉียบพลัน", warning: "ไม่ควรรับประทานเกิน 1 ฝักใหญ่" },
      { name: "ถังเช่า", detail: "บางผลิตภัณฑ์มีโลหะหนัก Arsenic สูง มีผลเสียต่อไตในระยะยาว", warning: "ควรรับประทาน 3-9 กรัม/วัน" },
      { name: "เห็ดหลินจือ", detail: "ยังไม่มีข้อมูลทางการแพทย์เพียงพอเรื่องสรรพคุณต้านการอักเสบของไต", warning: "ไม่ควรรับประทานติดต่อกันเกิน 1 ปี" },
      { name: "ใบยอ / มะตูม", detail: "มีโพแทสเซียมสูง ใบยอควรรับประทานแบบปรุงสุก", warning: "สัปดาห์ละ 2-3 ครั้งก็เพียงพอ" },
    ],
  },
];

const Medicine = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            ความรู้เกี่ยวกับยา
          </h1>
        </div>

        <div className="space-y-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCategory(cat)}
                className="glass-card rounded-2xl overflow-hidden shadow-md cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className={`bg-gradient-to-r ${cat.color} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-white" />
                      <h2 className="font-heading text-lg font-bold text-white">{cat.title}</h2>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/70" />
                  </div>
                  <p className="mt-1 text-xs text-white/80">{cat.description}</p>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.slice(0, 4).map((item) => (
                      <span key={item.name} className="text-xs bg-secondary/60 text-foreground rounded-full px-2.5 py-1">
                        {item.name}
                      </span>
                    ))}
                    {cat.items.length > 4 && (
                      <span className="text-xs bg-secondary/60 text-muted-foreground rounded-full px-2.5 py-1">
                        +{cat.items.length - 4} รายการ
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${selectedCategory.color} p-5 rounded-t-3xl`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <selectedCategory.icon className="h-6 w-6 text-white" />
                    <h2 className="font-heading text-xl font-bold text-white">{selectedCategory.title}</h2>
                  </div>
                  <button onClick={() => setSelectedCategory(null)} className="text-white/70 hover:text-white bg-white/20 rounded-full p-1.5">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-white/80">{selectedCategory.description}</p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Infographic */}
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedCategory.infographic}
                    alt={`Infographic ${selectedCategory.title}`}
                    className="w-full h-auto"
                  />
                </div>

                {/* Items List */}
                <h3 className="font-heading text-base font-bold text-foreground">รายละเอียด</h3>
                <div className="space-y-3">
                  {selectedCategory.items.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-secondary/40 rounded-xl p-3.5 space-y-1.5"
                    >
                      <h4 className="font-heading text-sm font-bold text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                      {item.warning && (
                        <div className="flex items-start gap-1.5 bg-destructive/10 rounded-lg p-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                          <span className="text-xs text-destructive font-medium">{item.warning}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Medicine;
