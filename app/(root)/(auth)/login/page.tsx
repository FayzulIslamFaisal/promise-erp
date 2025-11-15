
import AuthLeftImage from "@/components/auth/AuthLeftImage";
import LoginForm from "@/components/auth/LoginForm";

 const LoginPage=()=> {
  return (
    <section className="min-h-screen flex items-center bg-(--primary-light-color)">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between items-center">
          {/* Illustration Side */}
          <AuthLeftImage />
          <LoginForm/>
        </div>
      </div>
    </section>
  )
}
export default LoginPage;