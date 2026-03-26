import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";

export default function Auth() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoadingAuth,
    authSettings,
    callbackNotice,
    needsPasswordReset,
    loginUser,
    signupUser,
    sendPasswordRecoveryEmail,
    resetPassword,
    authError,
  } = useAuth();

  const [mode, setMode] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && !needsPasswordReset) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, needsPasswordReset, navigate]);

  useEffect(() => {
    if (callbackNotice) toast.success(callbackNotice);
  }, [callbackNotice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await loginUser(email, password);
        toast.success("Успешен вход.");
        navigate("/", { replace: true });
      } else {
        const newUser = await signupUser(email, password, fullName);
        if (newUser?.confirmedAt) {
          toast.success("Акаунтът е създаден и е активен.");
          navigate("/", { replace: true });
        } else {
          toast.success("Изпратен е имейл за потвърждение. Потвърдете и след това влезте.");
          setMode("login");
        }
      }
    } catch (error) {
      toast.error(error?.message || "Неуспешна автентикация.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await sendPasswordRecoveryEmail(email);
      toast.success("Изпратен е имейл с линк за възстановяване на паролата.");
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(error?.message || "Неуспешно изпращане на линк за възстановяване.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Новата парола трябва да е минимум 6 символа.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Паролите не съвпадат.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(newPassword);
      toast.success("Паролата е променена успешно.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error?.message || "Неуспешна промяна на паролата.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-36 px-6">
        <div className="container mx-auto max-w-xl text-center text-gray-500">Зареждане на профила...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-36 pb-24 px-6">
      <div className="container mx-auto max-w-xl">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-100">
          <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">Профил</h1>
          <p className="text-center text-gray-500 mb-6">
            {needsPasswordReset
              ? "Задайте нова парола за профила си"
              : mode === "login"
                ? showForgotPassword
                  ? "Възстановяване на парола"
                  : "Влезте в профила си"
                : "Създайте нов акаунт"}
          </p>

          {!needsPasswordReset && (
            <div className="grid grid-cols-2 gap-2 bg-rose-50 rounded-full p-1 mb-6">
              <Button
                type="button"
                variant={mode === "login" ? "default" : "ghost"}
                className={mode === "login" ? "rounded-full bg-rose-500 hover:bg-rose-600 text-white" : "rounded-full"}
                onClick={() => {
                  setMode("login");
                  setShowForgotPassword(false);
                }}
              >
                Вход
              </Button>
              <Button
                type="button"
                variant={mode === "signup" ? "default" : "ghost"}
                className={mode === "signup" ? "rounded-full bg-rose-500 hover:bg-rose-600 text-white" : "rounded-full"}
                onClick={() => {
                  setMode("signup");
                  setShowForgotPassword(false);
                }}
              >
                Регистрация
              </Button>
            </div>
          )}

          {authSettings?.autoconfirm && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
              В момента Netlify Identity е с автопотвърждение. За задължителен имейл verify изключете Autoconfirm в Netlify Identity settings.
            </p>
          )}

          {authError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">{authError}</p>
          )}

          {needsPasswordReset ? (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Нова парола</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Минимум 6 символа"
                  minLength={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Потвърдете новата парола</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Повторете новата парола"
                  minLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-6"
              >
                {isSubmitting ? "Изпращане..." : "Запази новата парола"}
              </Button>
            </form>
          ) : showForgotPassword && mode === "login" ? (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Имейл</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-6"
              >
                {isSubmitting ? "Изпращане..." : "Изпрати линк за възстановяване"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full rounded-full"
                onClick={() => setShowForgotPassword(false)}
              >
                Назад към вход
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Име</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Име и фамилия"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Имейл</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Парола</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 6 символа"
                  minLength={6}
                  required
                />
              </div>

              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-rose-600 hover:text-rose-700 hover:underline"
                >
                  Забравена парола?
                </button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-6"
              >
                {isSubmitting ? "Изпращане..." : mode === "login" ? "Вход" : "Създай акаунт"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
