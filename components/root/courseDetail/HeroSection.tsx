import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, PlayCircle, Clock, Users, HeadphonesIcon } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Course Info */}
      <div>
        <Badge className="bg-primary text-primary-foreground mb-4">
          Course by Wscube Tech
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Professional Graphics Design
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(451,444 Rating)</span>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <Badge variant="secondary" className="py-2 px-6">
            <PlayCircle className="w-4 h-4 mr-1" />
            10 Days to go
          </Badge>
          <Badge variant="secondary" className="py-2 px-6">
            <HeadphonesIcon className="w-4 h-4 mr-1" />
            50 seats available
          </Badge>
          <Badge variant="secondary" className="py-2 px-6">
            <Users className="w-4 h-4 mr-1" />
            14th Batch Open
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-0">
            <CardContent className="p-4 flex items-start gap-3">
              <PlayCircle className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">54 Live Classes</div>
                <div className="text-sm text-muted-foreground">Lifetime Access</div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardContent className="p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">3 Months of</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardContent className="p-4 flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">24 Hours</div>
                <div className="text-sm text-muted-foreground">Access</div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardContent className="p-4 flex items-start gap-3">
              <HeadphonesIcon className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">24 Hours</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Badge className="mb-3">
            25 % OFF
          </Badge>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-foreground">$98.00</span>
            <span className="text-xl text-muted-foreground line-through">$3000</span>
          </div>
        </div>

        <Button variant="primary" className="w-full">
          Enroll Now
        </Button>
      </div>

      {/* Right Column - About Course */}
      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About this Course</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unlock your creative potential with Graphic Design courses! Learn to bring concepts to life in Dynamic Design Workshop sessions. Get the skills to master creative concepts and build a well-rounded portfolio as you advance on this innovative course. Whether you're new to the world of design or ready to leap into more advanced strategies, this course will guide your progress step by step to master the field. Expect hands-on learning as well as 1-on-1 expert reviews and feedback.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By the end of the course, learners will be able to execute professional designs, translating thoughts and ideas into stunning visual content. Build confidence in using industry-standard apps like Adobe products and illustrate your ideas, craft logos, shape brands, create type...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
