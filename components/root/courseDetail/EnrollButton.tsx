"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface EnrollButtonProps {
    slug: string;
}
const EnrollButton = ({ slug }: EnrollButtonProps) => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleEnroll = () => {
        if (!session?.accessToken) {
            router.push(`/login?redirect=/enrollment/${slug}`);
        } else {
            router.push(`/enrollment/${slug}`);
        }
    };

    return (
        <Button onClick={handleEnroll} className=" max-w-full w-full sm:w-[350px]">
            Enroll Now
        </Button>
    );
}

export default EnrollButton