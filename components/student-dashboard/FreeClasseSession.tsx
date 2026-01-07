import { FreeSeminar } from "@/apiServices/studentDashboardService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface FreeClasseSessionProps {
  seminarData: FreeSeminar;
}

const FreeClasseSession = ({ seminarData }: FreeClasseSessionProps) => {
  return (
    <Card>
      <CardHeader>
        <span className="bg-primary text-white inline max-w-fit px-3 py-1 text-base font-bold rounded-md">
          {seminarData?.seminar_type_text ?? "---"}
        </span>
        <CardTitle className="text-xl lg:text-2xl text-secondary font-bold border-b border-secondary/50 pb-2">
          About This Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-secondary text-base leading-relaxed">
          {seminarData?.about ?? "---"}
        </p>

        <div>
          <h3 className="mb-4 text-xl lg:text-2xl text-secondary font-bold border-b border-secondary/50 pb-2">
            Topics We Will Cover
          </h3>
          <div className="">
            <ul className="space-y-1 grid gap-2 md:grid-cols-2">
              {(seminarData?.class_topic || "")
                .split(",")
                .filter(Boolean)
                .map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span className="text-sm text-secondary">
                      {topic.trim()}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeClasseSession;
