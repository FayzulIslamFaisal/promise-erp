"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/dist/client/components/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Forgot Password?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Mobile Number / (User Id)
            </label>
            <Input
              placeholder="Please enter register mobile number"
              className="h-11"
            />
          </div>

          <Button className="w-full h-11 bg-orange-500 hover:bg-orange-600">
            GET CODE
          </Button>

          <div className="flex justify-start">
            <Button
              onClick={() => router.back()}
              variant="secondary"
              className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
            >
              BACK
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ForgotPasswordPage;
