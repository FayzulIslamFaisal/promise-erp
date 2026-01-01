import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AffiliatesClientsTab from "./AffiliatesClientsTab";
import SectionTitle from "@/components/common/SectionTitle";
import {
  fetchHomeAffiliatePartners,
  PartnersApiResponse,
} from "@/apiServices/homePageService";

export default async function AffiliatesClientsPage() {
  const affiliatesData: PartnersApiResponse =
    await fetchHomeAffiliatePartners();
  const affiliates = affiliatesData?.data?.partners?.affiliate || [];
  const clients = affiliatesData?.data?.partners?.client || [];
  const concerns = affiliatesData?.data?.partners?.concern || [];

  return (
    <section className="py-8 md:py-14 bg-secondary/5">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={affiliatesData?.data?.section_title}
          subtitle={affiliatesData?.data?.section_subtitle}
        />

        <Tabs defaultValue="affiliates" className="mt-10">
          <TabsList className="flex justify-center mb-8 bg-transparent gap-6 pb-1 mx-auto text-secondary-foreground">
            <TabsTrigger
              value="affiliates"
              className="cursor-pointer rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:shadow-none px-8 py-3 text-xl"
            >
              Affiliates
            </TabsTrigger>

            <TabsTrigger
              value="clients"
              className="cursor-pointer rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:shadow-none px-8 py-3 text-xl"
            >
              Clients
            </TabsTrigger>

            <TabsTrigger
              value="concerns"
              className="cursor-pointer rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:shadow-none px-8 py-3 text-xl"
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
    </section>
  );
}
