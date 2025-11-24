import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Youtube } from "lucide-react";

export const SocialMediaSection = () => {
  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Connect With Us</h2>
        <p className="text-center text-muted-foreground mb-6">
          Follow us on social media for updates, tips, and design inspiration
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Facebook className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Linkedin className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Youtube className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
