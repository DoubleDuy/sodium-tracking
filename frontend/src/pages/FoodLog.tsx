import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const foodDatabase = [
  { id: 1, name: "ผัดไทย", sodium: 1000, emoji: "🍜" },
  { id: 2, name: "ต้มยำกุ้ง", sodium: 1200, emoji: "🍲" },
  { id: 3, name: "แกงเขียวหวาน", sodium: 1400, emoji: "🥘" },
  { id: 4, name: "ส้มตำ", sodium: 800, emoji: "🥗" },
  { id: 5, name: "ไข่เจียว", sodium: 500, emoji: "🍳" },
  { id: 6, name: "ข้าวผัด", sodium: 900, emoji: "🍚" },
  { id: 7, name: "กะเพราหมูสับ", sodium: 1100, emoji: "🌶️" },
  { id: 8, name: "ข้าวมันไก่", sodium: 700, emoji: "🍗" },
];

const mealTypes = [
  { id: "breakfast", label: "มื้อเช้า", emoji: "🌅" },
  { id: "lunch", label: "มื้อกลางวัน", emoji: "☀️" },
  { id: "dinner", label: "มื้อเย็น", emoji: "🌙" },
];

const FoodLog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [showMealModal, setShowMealModal] = useState(false);

  const filteredFoods = foodDatabase.filter((f) =>
    f.name.includes(search)
  );

  const toggleFood = (id: number) => {
    setSelectedFoods((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const totalSodium = selectedFoods.reduce((sum, id) => {
    const food = foodDatabase.find((f) => f.id === id);
    return sum + (food?.sodium ?? 0);
  }, 0);

  const handleSaveClick = () => {
    if (selectedFoods.length > 0) {
      setShowMealModal(true);
    }
  };

  const handleMealSelect = (mealId: string) => {
    setShowMealModal(false);
    navigate("/daily");
  };

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
            กรอกข้อมูลอาหาร
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="ค้นหารายการอาหาร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card/50 py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>

        {/* Food list */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredFoods.map((food, i) => {
              const isSelected = selectedFoods.includes(food.id);
              return (
                <motion.button
                  key={food.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => toggleFood(food.id)}
                  className={`glass-card flex w-full items-center gap-4 rounded-2xl p-4 shadow-md text-left transition-all ${
                    isSelected ? "ring-2 ring-primary border-primary" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                    {food.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-foreground">{food.name}</p>
                    <p className="text-xs text-muted-foreground">{food.sodium.toLocaleString()} mg โซเดียม</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                    >
                      <X className="h-3.5 w-3.5 text-primary-foreground" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Save button */}
        {selectedFoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-0 right-0 mx-auto max-w-md px-8"
          >
            <div className="mb-2 text-center text-sm text-muted-foreground">
              เลือก {selectedFoods.length} รายการ · {totalSodium.toLocaleString()} mg โซเดียม
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveClick}
              className="w-full rounded-xl gradient-btn py-3.5 font-heading text-lg font-semibold text-primary-foreground shadow-lg"
            >
              บันทึก
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Meal type modal */}
      <AnimatePresence>
        {showMealModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMealModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[90%] max-w-sm rounded-3xl bg-card p-6 shadow-2xl"
            >
              <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted" />
              <h2 className="font-heading text-xl font-bold text-foreground text-center mb-2">
                เลือกมื้ออาหาร
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {selectedFoods.length} รายการ · {totalSodium.toLocaleString()} mg โซเดียม
              </p>
              <div className="space-y-3">
                {mealTypes.map((meal) => (
                  <motion.button
                    key={meal.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleMealSelect(meal.id)}
                    className="flex w-full items-center gap-4 rounded-2xl bg-secondary p-4 text-left transition-colors hover:bg-secondary/80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                      {meal.emoji}
                    </div>
                    <span className="font-heading text-lg font-semibold text-foreground">
                      {meal.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default FoodLog;
