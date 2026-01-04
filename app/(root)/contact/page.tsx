
import ContactFAQ from "@/components/root/contact/ContactFAQ";
import ContactFormWrapper from "@/components/root/contact/ContactFormWrapper";
import ContactInfoCards from "@/components/root/contact/ContactInfoCards";
import WrapperHeroBanner from "@/components/root/contact/WrapperHeroBanner";

const ContactPage = () => {
  return (
    <>
      <WrapperHeroBanner />
      <ContactInfoCards />
      <ContactFormWrapper />
      <ContactFAQ />
    </>
  );
};

export default ContactPage;
