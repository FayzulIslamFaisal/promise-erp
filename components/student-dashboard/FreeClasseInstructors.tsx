import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FreeClasseInstructors = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-2xl text-secondary font-bold border-b border-secondary/50 pb-2">
          Instructors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instructor 1 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/professional-woman-wearing-hijab.jpg" />
            <AvatarFallback>NT</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold text-lg text-secondary">
                Nahdia Tabasum
              </h4>
              <p className="text-muted-foreground text-sm">Graphics Designer</p>
              <p className="text-primary text-sm">Certified Trainer 🎯</p>
              <p className="text-muted-foreground text-sm">
                3+ Years of Experience
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sm">Expert in:</p>
            <div className="flex gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <span className="font-bold text-white text-xs">Fi</span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14A800]">
                <span className="font-bold text-white text-xs">Up</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          {/* Instructor 2 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/professional-man-suit.png" />
              <AvatarFallback>MH</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-semibold text-lg text-secondary">
                  Md. Munjurul Hasan
                </h4>
                <p className="text-muted-foreground text-sm">
                  Graphics Designer
                </p>
                <p className="text-primary text-sm">Certified Trainer 🎯</p>
                <p className="text-muted-foreground text-sm">
                  3+ Years of Experience
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Expert in:</p>
              <div className="flex gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                  <span className="font-bold text-white text-xs">Fi</span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14A800]">
                  <span className="font-bold text-white text-xs">Up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeClasseInstructors;
