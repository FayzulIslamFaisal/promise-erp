"use client";
import SupportContact from "@/components/root/enrollment/SupportContact";
import dynamic from 'next/dynamic'
const EnrollmentClientLoader = dynamic(() => import('@/components/root/enrollment/EnrollmentClientLoader'), { ssr: false })

interface Props {
  params: { slug: string };
}

const EnrollmentPage = ({ params }: Props) => {
  const { slug } = params;

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
