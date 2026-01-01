import { Suspense } from "react";
import AuthLeftImage from "@/components/auth/AuthLeftImage";
import LoginForm from "@/components/auth/LoginForm";
import LoginFormSkeleton from "@/components/common/LoginFormSkeleton";

const LoginPage = () => {
  return (
    <section className="min-h-screen flex items-center bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between items-center">
          {/* Illustration Side */}
          <AuthLeftImage />
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
export default LoginPage;