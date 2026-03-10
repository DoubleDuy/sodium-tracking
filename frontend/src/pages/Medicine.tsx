import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Pill, Leaf, ChevronRight, X, AlertTriangle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import infoNsaids from "@/assets/info-nsaids.jpg";
import infoCorticosteroid from "@/assets/info-corticosteroid.jpg";
import infoHerbs from "@/assets/info-herbs.jpg";
import drugAspirin from "@/assets/drug-aspirin.png";
import drugIbuprofen from "@/assets/drug-ibuprofen.png";
import drugNaproxen from "@/assets/drug-naproxen.png";
import drugCelecoxib from "@/assets/drug-celecoxib.png";
import drugDiclofenac from "@/assets/drug-diclofenac.png";
import drugEtoricoxib from "@/assets/drug-etoricoxib.png";
import drugPiroxicam from "@/assets/drug-piroxicam.png";
import drugMeloxicam from "@/assets/drug-meloxicam.png";
import drugMefenamic from "@/assets/drug-mefenamic.png";
import drugIndomethacin from "@/assets/drug-indomethacin.png";
import herbCatWhiskers from "@/assets/herb-cat-whiskers.jpg";
import herbNoni from "@/assets/herb-noni.jpg";
import herbLicorice from "@/assets/herb-licorice.jpg";
import herbAristolochia from "@/assets/herb-aristolochia.jpg";
import herbStarfruit from "@/assets/herb-starfruit.jpg";
import herbSenna from "@/assets/herb-senna.jpg";
import herbJengkol from "@/assets/herb-jengkol.jpg";
import herbCordyceps from "@/assets/herb-cordyceps.jpg";
import herbReishi from "@/assets/herb-reishi.jpg";
import herbMorindaBael from "@/assets/herb-morinda-bael.jpg";

type DetailItem = {
  name: string;
  detail: string;
  warning?: string;
  image?: string;
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
      { name: "Ibuprofen", detail: "ข้อบ่งใช้: ยาระงับปวด ลดไข้ และลดการอักเสบระดับเริ่มต้น ใช้แก้ปวดหัว ปวดฟัน ปวดประจำเดือน\n\nข้อดี: ออกฤทธิ์ไว หาซื้อง่าย มีความปลอดภัยค่อนข้างสูงหากใช้ในระยะสั้น มีรูปแบบยาน้ำสำหรับเด็ก", warning: "ยับยั้งทั้ง COX-1 และ COX-2 จึงระคายเคืองกระเพาะอาหาร ต้องทานหลังอาหารทันที ทานตอนท้องว่างไม่ได้", image: drugIbuprofen },
      { name: "Naproxen", detail: "ข้อบ่งใช้: ใช้ลดการอักเสบของกล้ามเนื้อ เส้นเอ็น ปวดข้อ โรคเก๊าท์ และปวดไมเกรน\n\nข้อดี: ออกฤทธิ์ได้ยาวนาน (ทานแค่วันละ 2 ครั้ง) และมีความปลอดภัยต่อระบบหลอดเลือดและหัวใจมากที่สุดในกลุ่ม NSAIDs", warning: "ระคายเคืองกระเพาะอาหารค่อนข้างสูง และอาจทำให้เกิดแผลในทางเดินอาหารได้หากใช้ต่อเนื่อง", image: drugNaproxen },
      { name: "Diclofenac", detail: "ข้อบ่งใช้: ใช้บรรเทาอาการปวดอักเสบระดับปานกลางถึงรุนแรง เช่น ปวดข้อเข่าเสื่อม ปวดหลัง อาการอักเสบเฉียบพลัน\n\nข้อดี: เป็นยาที่กดอาการอักเสบได้ดีและแรง มีรูปแบบยาที่หลากหลาย (ยาทา ยาฉีด ยาเม็ด ยาเหน็บ)", warning: "หากใช้ในขนาดยาที่สูงและต่อเนื่องเป็นเวลานาน จะเพิ่มความเสี่ยงต่อโรคหลอดเลือดหัวใจและตับอักเสบ", image: drugDiclofenac },
      { name: "Indomethacin", detail: "ข้อบ่งใช้: ยาแก้อักเสบที่มีความแรงสูง มักใช้ในโรคข้ออักเสบรุนแรง และโรคเก๊าท์กำเริบเฉียบพลัน\n\nข้อดี: มีประสิทธิภาพสูงและออกฤทธิ์เร็วมากในการหยุดกระบวนการอักเสบที่รุนแรง", warning: "ผลข้างเคียงเยอะ กัดกระเพาะรุนแรง และมักทำให้เกิดผลข้างเคียงทางระบบประสาท เช่น ปวดศีรษะรุนแรง เวียนศีรษะ มึนงง", image: drugIndomethacin },
      { name: "Mefenamic acid", detail: "ข้อบ่งใช้: บรรเทาอาการปวดประจำเดือน รวมถึงใช้ลดอาการปวดระดับเล็กน้อยถึงปานกลาง เช่น ปวดฟัน ปวดกล้ามเนื้อ\n\nข้อดี: ดูดซึมเร็ว ออกฤทธิ์ไว และมีความเฉพาะเจาะจงในการระงับอาการปวดเกร็งของกล้ามเนื้อมดลูกช่วงมีประจำเดือนได้ดีมาก", warning: "ไม่ควรรับประทานติดต่อกันเกิน 7 วัน เพราะจะเพิ่มความเสี่ยงต่อการเกิดแผลในกระเพาะและเป็นพิษต่อไต ต้องรับประทานหลังอาหารทันที ห้ามทานตอนท้องว่าง", image: drugMefenamic },
      { name: "Aspirin", detail: "ข้อบ่งใช้: เป็นยาต้านเกล็ดเลือดเพื่อป้องกันโรคหลอดเลือดหัวใจและสมองอุดตัน ส่วนขนาดสูงสำหรับแก้ปวดลดไข้ไม่ค่อยนิยมใช้แล้ว\n\nข้อดี: เป็นยาตัวเดียวในกลุ่มที่มีฤทธิ์ปกป้องหลอดเลือดหัวใจได้อย่างชัดเจน (ในขนาดต่ำ)", warning: "กัดกระเพาะรุนแรง ทำให้เลือดออกหยุดยาก ห้ามใช้เด็ดขาดในเด็กที่มีไข้จากการติดเชื้อไวรัส เพราะอาจทำให้เกิด Reye's syndrome", image: drugAspirin },
      { name: "Meloxicam", detail: "ข้อบ่งใช้: ยาแก้ปวดอักเสบที่ออกฤทธิ์ค่อนไปทางยับยั้ง COX-2 มากกว่า นิยมใช้ในโรคข้อเสื่อมและข้ออักเสบรูมาตอยด์\n\nข้อดี: ทานเพียงวันละ 1 ครั้ง และระคายเคืองกระเพาะอาหารน้อยกว่ากลุ่มดั้งเดิม", warning: "ออกฤทธิ์ค่อนข้างช้า ไม่เหมาะกับการใช้แก้ปวดแบบฉับพลันทันทีทันใด", image: drugMeloxicam },
      { name: "Piroxicam", detail: "ข้อบ่งใช้: ยาแก้อักเสบกลุ่มเก่าที่ใช้รักษาโรคข้ออักเสบเรื้อรัง\n\nข้อดี: ตัวยาอยู่ในร่างกายได้นานมาก ทานเพียงวันละ 1 ครั้ง", warning: "มีความเสี่ยงสูงที่จะทำให้เกิดแผลและเลือดออกในทางเดินอาหาร รวมถึงความเสี่ยงในการแพ้ยารุนแรงทางผิวหนัง", image: drugPiroxicam },
      { name: "Celecoxib", detail: "ข้อบ่งใช้: ยากลุ่ม Selective COX-2 Inhibitor ใช้แก้ปวดข้อ ปวดหลัง หรือปวดหลังผ่าตัด\n\nข้อดี: ระคายเคืองกระเพาะอาหารน้อยมาก ไม่มีผลต่อการเกาะกลุ่มของเกล็ดเลือด ปลอดภัยในคนที่มีความเสี่ยงเลือดออกง่าย", warning: "ห้ามใช้ในผู้ที่มีประวัติแพ้ยากลุ่มซัลฟา (Sulfa allergy) และอาจเพิ่มความเสี่ยงทางหลอดเลือดหัวใจหากใช้ผิดวิธี", image: drugCelecoxib },
      { name: "Etoricoxib", detail: "ข้อบ่งใช้: ยา Selective COX-2 Inhibitor ที่มีความแรงสูง ใช้รักษาเก๊าท์เฉียบพลัน ปวดฟันรุนแรง หรือข้ออักเสบ\n\nข้อดี: ออกฤทธิ์ได้เร็วและแรงมาก ทานวันละ 1 ครั้ง และปลอดภัยต่อกระเพาะอาหาร", warning: "ห้ามใช้ในผู้ที่มีความดันโลหิตสูงที่ควบคุมไม่ได้ หรือผู้ที่เป็นโรคหัวใจขาดเลือด เพราะยาทำให้ความดันขึ้นและเสี่ยงต่อโรคหัวใจ", image: drugEtoricoxib },
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
      { name: "หญ้าหนวดแมว", detail: "มีโพแทสเซียมสูง 5,000 มก./100 ก. ทำให้ไตทำงานหนักขึ้น", warning: "ไม่ควรรับประทานต่อเนื่องเกิน 2-4 สัปดาห์", image: herbCatWhiskers },
      { name: "ลูกยอ", detail: "มีโพแทสเซียมสูง ทำให้ไตทำงานหนักขึ้น", warning: "ห้ามรับประทานเกิน 120 มก./วัน", image: herbNoni },
      { name: "ชะเอมเทศ", detail: "มีสาร Glycyrrhizin ทำให้คอร์ติซอลเพิ่ม ไตดูดโซเดียมมาก อาจทำให้ไตวายเฉียบพลัน", warning: "ไม่ควรใช้ต่อเนื่องเกิน 4-6 สัปดาห์", image: herbLicorice },
      { name: "ไคร้เครือ", detail: "ทำให้เกิดการอักเสบที่เนื้อเยื่อรอบไต เป็นพังผืด ทำให้เป็นโรคไตเรื้อรัง", warning: "ใช้ไม่เกิน 2-3 เดือน", image: herbAristolochia },
      { name: "มะเฟือง", detail: "มีสาร Caramboxin และ Oxalate อาจเป็นพิษต่อระบบประสาทและไตวายเฉียบพลัน", warning: "ไม่ควรรับประทานมากกว่า 2 ผล/วัน", image: herbStarfruit },
      { name: "มะขามแขก", detail: "มีสาร Sennoside ถูกขับออกทางไต ทำให้เกิดการสะสม", warning: "ไม่ควรรับประทานติดต่อกันเกิน 1 สัปดาห์", image: herbSenna },
      { name: "ลูกเนียง", detail: "มีสาร Jengkolic Acid ส่งผลให้อุดตันในท่อไต เกิดไตวายเฉียบพลัน", warning: "ไม่ควรรับประทานเกิน 1 ฝักใหญ่", image: herbJengkol },
      { name: "ถังเช่า", detail: "บางผลิตภัณฑ์มีโลหะหนัก Arsenic สูง มีผลเสียต่อไตในระยะยาว", warning: "ควรรับประทาน 3-9 กรัม/วัน", image: herbCordyceps },
      { name: "เห็ดหลินจือ", detail: "ยังไม่มีข้อมูลทางการแพทย์เพียงพอเรื่องสรรพคุณต้านการอักเสบของไต", warning: "ไม่ควรรับประทานติดต่อกันเกิน 1 ปี", image: herbReishi },
      { name: "ใบยอ / มะตูม", detail: "มีโพแทสเซียมสูง ใบยอควรรับประทานแบบปรุงสุก", warning: "สัปดาห์ละ 2-3 ครั้งก็เพียงพอ", image: herbMorindaBael },
    ],
  },
];

const Medicine = () => {
  const navigate = useNavigate();
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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
            const isOpen = expandedCategory === cat.title;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden shadow-md"
              >
                {/* Header - click to view infographic */}
                <div
                  className={`bg-gradient-to-r ${cat.color} p-4 cursor-pointer active:scale-[0.98] transition-transform`}
                  onClick={() => setViewingImage(cat.infographic)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-white" />
                      <h2 className="font-heading text-lg font-bold text-white">{cat.title}</h2>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/70" />
                  </div>
                  <p className="mt-1 text-xs text-white/80">{cat.description}</p>
                </div>

                {/* Tags area - click to expand dropdown */}
                <div
                  className="p-3 cursor-pointer"
                  onClick={() => {
                    setExpandedCategory(isOpen ? null : cat.title);
                    setExpandedItem(null);
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex flex-wrap gap-1.5 flex-1">
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
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Dropdown detail list */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-2">
                        {cat.items.map((item, idx) => {
                          const isItemExpanded = expandedItem === item.name;
                          return (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              className="bg-secondary/40 rounded-xl overflow-hidden cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedItem(isItemExpanded ? null : item.name);
                              }}
                            >
                              {cat.title === "NSAIDs" ? (() => {
                                const indicationMatch = item.detail.match(/ข้อบ่งใช้:\s*(.*?)(?=\n\n|$)/s);
                                const indication = indicationMatch ? indicationMatch[1].trim() : item.detail;
                                const detailWithoutIndication = item.detail.replace(/ข้อบ่งใช้:.*?(?=\n\n|$)/s, '').replace(/^\n+/, '').trim();
                                return (
                                  <>
                                    <div className="p-3 flex items-center gap-3">
                                      {item.image && (
                                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-heading text-sm font-bold text-foreground">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground truncate">ข้อบ่งใช้: {indication}</p>
                                      </div>
                                      <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isItemExpanded ? "rotate-180" : ""}`} />
                                    </div>
                                    <AnimatePresence>
                                      {isItemExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="px-3 pb-3 space-y-2">
                                            {item.image && (
                                              <img src={item.image} alt={item.name} className="w-full max-h-48 object-contain rounded-xl bg-secondary/30" />
                                            )}
                                            {detailWithoutIndication && (
                                              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{detailWithoutIndication}</p>
                                            )}
                                            <div className="flex items-start gap-1.5 bg-amber-500/10 rounded-lg p-2">
                                              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                                              <span className="text-xs text-amber-700 font-medium">หากใช้ยาต่อเนื่องอาจส่งผลกระทบต่อไต</span>
                                            </div>
                                            {item.warning && (
                                              <div className="flex items-start gap-1.5 bg-destructive/10 rounded-lg p-2">
                                                <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                                                <span className="text-xs text-destructive font-medium">{item.warning}</span>
                                              </div>
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                );
                              })() : (
                                <>
                                  <div className="p-3 flex items-center gap-3">
                                    {item.image && (
                                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-heading text-sm font-bold text-foreground">{item.name}</h4>
                                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isItemExpanded ? "rotate-180" : ""}`} />
                                  </div>
                                  <AnimatePresence>
                                    {isItemExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-3 pb-3 space-y-2">
                                          {item.image && (
                                            <img src={item.image} alt={item.name} className="w-full max-h-48 object-contain rounded-xl bg-secondary/30" />
                                          )}
                                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.detail}</p>
                                          {item.warning && (
                                            <div className="flex items-start gap-1.5 bg-destructive/10 rounded-lg p-2">
                                              <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                                              <span className="text-xs text-destructive font-medium">{item.warning}</span>
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setViewingImage(null)}
          >
            <button
              onClick={() => setViewingImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/20 rounded-full p-2 z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={viewingImage}
              alt="Infographic"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Medicine;
