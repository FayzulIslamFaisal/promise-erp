import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FreeClasseSession = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-primary text-base font-semibold">Online Seminar</h2>
        <CardTitle className="text-2xl text-secondary font-bold border-b border-secondary/50 pb-2">
          About This Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-secondary text-base leading-relaxed">
          This free seminar will guide you through the fundamentals of starting
          a freelancing career. You{ "'"}ll learn how to choose the right skills, set
          up your professional profiles, find your first clients, and build a
          sustainable freelance journey.
        </p>

        <div>
          <h3 className="mb-4 text-2xl text-secondary font-bold border-b border-secondary/50 pb-2">
            Topics We Will Cover
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span className="text-sm text-secondary">
                  Understanding the freelancing marketplace
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span className="text-sm text-secondary">
                  Essential skills to get started
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span className="text-sm text-secondary">
                  Profile building tips
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span className="text-sm text-secondary">
                  Securing your first client
                </span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span className="text-sm text-secondary">
                  Pricing, communication & professionalism
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span className="text-sm text-secondary">
                  Roadmap for long-term growth
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeClasseSession;
