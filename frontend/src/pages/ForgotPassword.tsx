import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Droplets, Send, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "กรุณากรอกอีเมล",
        description: "กรุณากรอกอีเมลที่ใช้สมัครสมาชิก",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/index.php?page=forgot-password", {
        email: email,
      });

      if (response.data.status === "success") {
        setIsSent(true);
        toast({
          title: "ส่งอีเมลสำเร็จ",
          description: "กรุณาตรวจสอบอีเมลของคุณ",
        });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
      toast({
        title: "เกิดข้อผิดพลาด",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card/50 py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับไปหน้าเข้าสู่ระบบ
        </button>

        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-btn shadow-lg"
          >
            <Droplets className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            ลืมรหัสผ่าน
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            กรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้คุณ
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1.5">
                <Mail className="h-3.5 w-3.5" />
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl gradient-btn py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  ส่งลิงก์รีเซ็ตรหัสผ่าน
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-heading text-lg font-semibold text-foreground">
                ส่งอีเมลเรียบร้อยแล้ว!
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่
              </p>
              <p className="mt-1 text-sm font-semibold text-primary">{email}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                กรุณาตรวจสอบอีเมลของคุณ รวมถึงโฟลเดอร์สแปม
              </p>
            </div>

            <button
              onClick={() => {
                setIsSent(false);
                setEmail("");
              }}
              className="text-sm text-primary hover:underline"
            >
              ส่งอีเมลอีกครั้ง
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Sodium Tracking © {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
