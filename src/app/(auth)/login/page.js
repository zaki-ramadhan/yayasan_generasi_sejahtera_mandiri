import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Masuk ke Akun",
  description: "Masuk ke akun donatur Yayasan Generasi Sejahtera Mandiri untuk mengelola infaq rutin dan e-Kwitansi.",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout mode="login">
      <LoginForm />
    </AuthSplitLayout>
  );
}
