"use client";
import SupportContact from "@/components/root/enrollment/SupportContact";
import dynamic from 'next/dynamic'
import { useParams } from "next/navigation";
const EnrollmentClientLoader = dynamic(() => import('@/components/root/enrollment/EnrollmentClientLoader'))


const EnrollmentPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  console.log("enrollment slug", slug);

  return (
    <section className="bg-secondary/5 py-8 md:py-14">
      <div className="container mx-auto px-4">
        <EnrollmentClientLoader slug={slug} />
        <SupportContact />
      </div>
    </section>
  );
};

export default EnrollmentPage;
