import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";



const WavePattern = async() => (
  <svg
    className="absolute right-0 top-0 h-full w-1/2 opacity-60"
    viewBox="0 0 400 100"
    preserveAspectRatio="none"
  >
    {[...Array(12)].map((_, i) => (
      <path
        key={i}
        d={`M0,${50 + i * 4} Q100,${30 + i * 4} 200,${50 + i * 4} T400,${
          50 + i * 4
        }`}
        fill="url(#wave-pattern)"
        stroke="#292464"
        strokeWidth="1.5"
        strokeOpacity={0.3 + i * 0.05}
        className="animate-wave-flow"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </svg>
);

const WelcomeBanner = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <div>Unauthorized</div>;
  }
  return (
    <section className="py-4 lg:py-6 px-4">
      <div className="relative overflow-hidden border rounded-xl bg-primary/5 p-4 shadow-lg animate-fade-in">
        <div className="relative z-10 flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-card">
            <AvatarImage src={session?.user?.image || "/images/profile_avatar.png"} alt={session?.user?.name ?? "User"} />
            <AvatarFallback className="bg-primary font-semibold">
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold text-primary">
            Welcome to Your Learning Dashboard,{" "}
            <span className="text-primary">{session?.user?.name}</span>!
          </h2>
        </div>
        <WavePattern />
      </div>
    </section>
  );
};

export default WelcomeBanner;
