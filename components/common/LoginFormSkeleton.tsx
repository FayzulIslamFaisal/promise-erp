import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoginFormSkeleton = () => {
    return (
        <div className="h-full max-w-[500px] h-[444px] flex items-start justify-center bg-secondary/5 p-6">
            <Card className="w-full">
                <CardContent className="p-6">
                    {/* Title */}
                    <div className="flex flex-col items-center gap-3">
                        <Skeleton className="h-8 bg-secondary/15 w-28" />
                        <Skeleton className="h-3 bg-secondary/15 w-56" />
                    </div>


                    <div className="mt-6 space-y-4">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-5 bg-secondary/15 w-20" />
                            <Skeleton className="h-8 bg-secondary/150 w-full" />
                        </div>


                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-5 bg-secondary/15 w-24" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 bg-secondary/15 flex-1" />
                                <Skeleton className="h-8 bg-secondary/15 w-8 rounded-full" />
                            </div>
                        </div>


                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Skeleton className="h-4 bg-secondary/15 w-28" />
                        </div>


                        {/* Login Button */}
                        <div className="flex justify-center">
                            <Skeleton className="h-5 bg-secondary/15 w-28 rounded-md" />
                        </div>


                        {/* Register */}
                        <div className="flex justify-center">
                            <Skeleton className="h-4 bg-secondary/15 w-36" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginFormSkeleton