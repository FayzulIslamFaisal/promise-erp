"use client";

import dynamic from "next/dynamic";

const EnrollmentWrapper = dynamic(
  () => import("@/components/root/enrollment/EnrollmentWrapper"),
  { ssr: false }
);

interface Props {
  slug: string;
}

export default function EnrollmentClientLoader({ slug }: Props) {
  return <EnrollmentWrapper slug={slug} />;
}
