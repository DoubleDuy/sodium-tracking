import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Lock, Mail, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const genderOptions = ["ชาย", "หญิง", "ไม่ระบุเพศ"];
  const roleOptions = [
    { value: "general", label: "บุคคลทั่วไป" },
    { value: "teacher", label: "อาจารย์" },
    { value: "student", label: "นักศึกษา" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/splash");
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card/50 py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับ
        </button>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
          กรอกรายละเอียด
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ชื่อ - นามสกุล"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`${inputClass} pl-11`}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} pl-11`}
            />
          </div>

          {/* Gender, Age, Weight/Height row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-card/50 py-3 pl-3 pr-8 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              >
                <option value="">เพศ</option>
                {genderOptions.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            <input
              type="number"
              placeholder="อายุ"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-xl border border-border bg-card/50 py-3 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
            <input
              type="text"
              placeholder="น้ำหนัก/ส่วนสูง"
              value={weight && height ? `${weight}/${height}` : ""}
              onChange={(e) => {
                const parts = e.target.value.split("/");
                setWeight(parts[0] || "");
                setHeight(parts[1] || "");
              }}
              className="w-full rounded-xl border border-border bg-card/50 py-3 px-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pl-11`}
            />
          </div>

          {/* Role selection - checkbox style */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">ประเภทผู้ใช้</p>
            <div className="flex gap-3">
              {roleOptions.map((r) => (
                <label
                  key={r.value}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 text-sm text-foreground"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                      role === r.value
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {role === r.value && (
                      <svg className="h-3 w-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    checked={role === r.value}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full rounded-xl gradient-btn py-3.5 font-heading text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
          >
            สมัครสมาชิก
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
