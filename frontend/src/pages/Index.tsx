// Index.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "@/components/pages/Auth";
import Dashboard from "@/components/pages/Dashboard";
import Settings from "@/components/pages/Settings";
import Profile from "@/components/pages/Profile";
import FoodLog from "@/components/pages/FoodLog";
import FoodRecommend from "@/components/pages/FoodRecommend";
import DailyTracking from "@/components/pages/DailyTracking";
import WeeklyTracking from "@/components/pages/WeeklyTracking";
import Stats from "@/components/pages/Stats";
import Medicine from "@/components/pages/Medicine";
import Splash from "@/components/pages/Splash";
import Points from "@/components/pages/Points";

// 1. แก้ไข: Layout สำหรับจัดหน้า Auth ให้อยู่กึ่งกลางเป๊ะ
const AuthLayout = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
    <Outlet />
  </div>
);

// 2. แก้ไข: ประกาศ ProtectedRoute
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />; 
  return <>{children}</>;
};

const Index = () => {
  return (
    <Routes>
      {/* กลุ่มหน้า Auth: จะถูกจัดให้อยู่กึ่งกลางผ่าน AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Auth />} />
      </Route>

      {/* หน้า Dashboard: แสดงผลในพื้นที่หลัก */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      <Route path="/food-log" element={<FoodLog />} />
      <Route path="/food-recommend" element={<FoodRecommend />} />
      <Route path="/daily" element={<DailyTracking />} />
      <Route path="/weekly" element={<WeeklyTracking />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/medicine" element={<Medicine />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/points" element={<Points />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Index;