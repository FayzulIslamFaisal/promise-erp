"use client";

import dynamic from 'next/dynamic'
const ContactMap = dynamic(() => import("./ContactMap"), {
  ssr: false,
})
const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
})

const ContactFormWrapper = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 lg:gap-8">
          <ContactForm />
          <ContactMap />
        </div>
      </div>
    </section>
  );
};

export default ContactFormWrapper;
