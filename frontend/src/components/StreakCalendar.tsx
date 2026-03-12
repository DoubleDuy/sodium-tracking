import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface StreakCalendarProps {
  trackedDays: number[];
  currentMonth: Date;
}

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const THAI_DAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const StreakCalendar = ({ trackedDays, currentMonth: initialMonth }: StreakCalendarProps) => {
  const [viewDate, setViewDate] = useState(initialMonth);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Calculate streaks
  const sortedDays = [...trackedDays].sort((a, b) => a - b);
  let streakCount = 0;
  let consecutiveDays = 0;
  const pointDays: number[] = [];

  for (let i = 0; i < sortedDays.length; i++) {
    if (i === 0 || sortedDays[i] === sortedDays[i - 1] + 1) {
      consecutiveDays++;
    } else {
      consecutiveDays = 1;
    }
    if (consecutiveDays % 3 === 0) {
      streakCount++;
      pointDays.push(sortedDays[i]);
    }
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="font-heading text-base font-semibold text-foreground">
          {THAI_MONTHS[month]} {year + 543}
        </h3>
        <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {THAI_DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;

          const isTracked = trackedDays.includes(day);
          const isPointDay = pointDays.includes(day);
          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <motion.div
              key={day}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: day * 0.008 }}
              className={`relative flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-all ${
                isTracked
                  ? "bg-primary/20 text-primary"
                  : isToday
                  ? "bg-accent/60 text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {isTracked ? (
                <Check className="h-4 w-4 stroke-[2.5]" />
              ) : (
                <span>{day}</span>
              )}
              {isPointDay && (
                <span className="absolute -top-1.5 -right-0.5 text-sm">⭐</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-border/50 px-4 py-3">
        <span className="text-sm text-muted-foreground">
          บันทึกแล้ว <span className="font-semibold text-foreground">{trackedDays.length}</span> วัน
        </span>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Star className="h-4 w-4" />
          <span>{streakCount} แต้ม</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;