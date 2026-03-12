import React, { createContext, useContext, useState, useCallback } from "react";

export interface FoodEntry {
  id: number;
  name: string;
  sodium: number;
  emoji: string;
  meal: string;
  mealLabel: string;
  date: string; // YYYY-MM-DD
}

interface DaySummary {
  date: string;
  dateLabel: string;
  monthLabel: string;
  sodium: number;
}

interface MonthSummary {
  month: string;
  monthLabel: string;
  sodium: number;
}

interface FoodLogContextType {
  entries: FoodEntry[];
  addEntries: (foods: { id: number; name: string; sodium: number; emoji: string }[], mealId: string, mealLabel: string) => void;
  getTodayEntries: () => FoodEntry[];
  getTodayTotal: () => number;
  getWeekSummary: () => DaySummary[];
  getMonthSummary: () => MonthSummary[];
}

const FoodLogContext = createContext<FoodLogContextType | undefined>(undefined);

const getToday = () => new Date().toISOString().slice(0, 10);

const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const thaiMonthsFull = ["มกรา", "กุมภา", "มีนา", "เมษา", "พฤษภา", "มิถุนา", "กรกฎา", "สิงหา", "กันยา", "ตุลา", "พฤศจิกา", "ธันวา"];

export const FoodLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  const addEntries = useCallback(
    (foods: { id: number; name: string; sodium: number; emoji: string }[], mealId: string, mealLabel: string) => {
      const date = getToday();
      const newEntries: FoodEntry[] = foods.map((f) => ({
        ...f,
        meal: mealId,
        mealLabel,
        date,
      }));
      setEntries((prev) => [...prev, ...newEntries]);
    },
    []
  );

  const getTodayEntries = useCallback(() => {
    const today = getToday();
    return entries.filter((e) => e.date === today);
  }, [entries]);

  const getTodayTotal = useCallback(() => {
    return getTodayEntries().reduce((sum, e) => sum + e.sodium, 0);
  }, [getTodayEntries]);

  const getWeekSummary = useCallback((): DaySummary[] => {
    const today = new Date();
    const days: DaySummary[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayEntries = entries.filter((e) => e.date === dateStr);
      const sodium = dayEntries.reduce((sum, e) => sum + e.sodium, 0);

      days.push({
        date: dateStr,
        dateLabel: String(d.getDate()).padStart(2, "0"),
        monthLabel: thaiMonthsFull[d.getMonth()],
        sodium,
      });
    }

    return days;
  }, [entries]);

  const getMonthSummary = useCallback((): MonthSummary[] => {
    const today = new Date();
    const months: MonthSummary[] = [];

    for (let i = 2; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const monthEntries = entries.filter((e) => e.date.startsWith(yearMonth));
      const sodium = monthEntries.reduce((sum, e) => sum + e.sodium, 0);

      months.push({
        month: yearMonth,
        monthLabel: thaiMonths[d.getMonth()],
        sodium,
      });
    }

    return months;
  }, [entries]);

  return (
    <FoodLogContext.Provider value={{ entries, addEntries, getTodayEntries, getTodayTotal, getWeekSummary, getMonthSummary }}>
      {children}
    </FoodLogContext.Provider>
  );
};

export const useFoodLog = () => {
  const ctx = useContext(FoodLogContext);
  if (!ctx) throw new Error("useFoodLog must be used within FoodLogProvider");
  return ctx;
};