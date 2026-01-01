import { getCourses } from "@/apiServices/courseService";
import CouponFilter from "./CouponFilter";

export default async function CouponFilterData() {
  const coursesRes = await getCourses();

  return <CouponFilter courses={coursesRes?.data?.courses || []} />;
}
