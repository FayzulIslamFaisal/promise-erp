import JobCircularCard from "./JobCircularCard";

export interface JobCircularsProps {
  id: number;
  title: string;
  description: string;
  salary: string;
  location: string;
  deadline: string;
  badges: { label: string; variant: "filled" | "outline" }[];
  slug: string;
}
const jobListings: JobCircularsProps[] = [
  {
    id: 1,
    title: "Content Writer & Digital Content Strategist",
    slug: "content-writer-digital-content-strategist",
    description:
      "Create compelling content strategies and manage digital presence across platforms.",
    salary: "Negotiable",
    location: "Dhaka, Bangladesh",
    deadline: "15 January, 2026",
    badges: [
      { label: "Full-time", variant: "filled" as const },
      { label: "Marketing", variant: "outline" as const },
    ],
  },
  {
    id: 2,
    title: "Sales Executive - IT Training & Education",
    slug: "sales-executive-it-training-education",
    description:
      "Drive sales growth for our IT training programs and educational services.",
    salary: "25000 - 40000",
    location: "Dhaka, Bangladesh",
    deadline: "15 January, 2026",
    badges: [
      { label: "Full-time", variant: "filled" as const },
      { label: "Business development", variant: "outline" as const },
    ],
  },
  {
    id: 3,
    title: "Trainer – Graphics Design",
    slug: "trainer-graphics-design",
    description:
      "Lead graphics design training sessions and develop comprehensive curriculum.",
    salary: "25000 - 40000",
    location: "Dhaka, Bangladesh",
    deadline: "15 January, 2026",
    badges: [
      { label: "Full-time", variant: "filled" as const },
      { label: "Training", variant: "outline" as const },
    ],
  },
  {
    id: 4,
    title: "Trainer / Instructor – Digital Marketing",
    slug: "trainer-instructor-digital-marketing",
    description:
      "Teach digital marketing strategies and guide students to success.",
    salary: "25000 - 40000",
    location: "Dhaka, Bangladesh",
    deadline: "15 January, 2026",
    badges: [
      { label: "Full-time", variant: "filled" as const },
      { label: "Training", variant: "outline" as const },
    ],
  },
];
const JobCircularsData = () => {
  return (
    <section className="py-8 md:py-12 ">
      <div className="container mx-auto px-4">
        <div className="pb-8 text-center">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-5xl text-secondary capitalize mb-3">
            Open Positions
          </h2>
          <p className="lg:text-xl text-base text-primary text-center">
            4 Opportunities Available
          </p>
        </div>
        <div className="">
          {jobListings.map((job) => (
            <JobCircularCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCircularsData;
