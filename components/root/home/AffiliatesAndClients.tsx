import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AffiliatesClientsTab from "./AffiliatesClientsTab";
import SectionTitle from "@/components/common/SectionTitle";

export default function AffiliatesClientsPage() {
    const affiliates = [
        { name: "Linux", logo: "/images/home/client-logo.png" },
        { name: "Java", logo: "/images/home/client-logo.png" },
        { name: "VMware", logo: "/images/home/client-logo.png" },
        { name: "MikroTik", logo: "/images/home/client-logo.png" },
        { name: "Project Management Institute", logo: "/images/home/client-logo.png" },
        { name: "CompTIA", logo: "/images/home/client-logo.png" },
        { name: "National Skill Development Authority", logo: "/images/home/client-logo.png" },
        { name: "Department of Youth Development", logo: "/images/home/client-logo.png" }
    ];

    const clients = [
        { name: "Android", logo: "/images/home/client-logo.png" },
        { name: "CISA", logo: "/images/home/client-logo.png" },
        { name: "Pearson VUE", logo: "/images/home/client-logo.png" },
        { name: "BACCO", logo: "/images/home/client-logo.png" }
    ];

    const concerns = [
        { name: "Microsoft", logo: "/images/home/client-logo.png" },
        { name: "Oracle", logo: "/images/home/client-logo.png" },
        { name: "Adobe", logo: "/images/home/client-logo.png" },
        { name: "Axelos", logo: "/images/home/client-logo.png" },
        { name: "BASIS", logo: "/images/home/client-logo.png" },
        { name: "Bangladesh Computer Samity", logo: "/images/home/client-logo.png" },
        { name: "Shomvob", logo: "/images/home/client-logo.png" }
    ];

    return (
        <div className="container mx-auto py-16 px-4">
            <SectionTitle title="Our Affiliates, Clients & Concerns" subtitle="We're proud to collaborate with leading government and private organizations." />

            <Tabs defaultValue="affiliates" className="mt-10">
                <TabsList className="flex justify-center mb-8 bg-transparent gap-6 pb-1 mx-auto text-secondary-foreground">
                    <TabsTrigger
                        value="affiliates"
                        className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:shadow-none px-8 py-3 text-xl"
                    >
                        Affiliates
                    </TabsTrigger>

                    <TabsTrigger
                        value="clients"
                        className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:shadow-none px-8 py-3 text-xl"
                    >
                        Clients
                    </TabsTrigger>

                    <TabsTrigger
                        value="concerns"
                        className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:shadow-none px-8 py-3 text-xl"
                    >
                        Concerns
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="affiliates">
                    <AffiliatesClientsTab items={affiliates} />
                </TabsContent>

                <TabsContent value="clients">
                    <AffiliatesClientsTab items={clients} />
                </TabsContent>

                <TabsContent value="concerns">
                    <AffiliatesClientsTab items={concerns} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
