import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare } from "lucide-react";

const AdminQuickSendAlert = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xs font-bold uppercase text-muted-foreground">
          Quick Send Alert
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Input className="text-xs" placeholder="Select District" />
          <Input className="text-xs" placeholder="Select Branch" />
        </div>

        <Textarea className="text-xs" placeholder="Type alert message..." />

        <div className="flex gap-2">
          <Button className="flex-1 text-xs">
            <Mail className="mr-1 h-4 w-4" /> Email
          </Button>
          <Button variant="secondary" className="flex-1 text-xs">
            <MessageSquare className="mr-1 h-4 w-4" /> SMS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminQuickSendAlert;
