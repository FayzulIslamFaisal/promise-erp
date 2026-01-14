import TrainerItemInfos from "./TrainerItemInfos";

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  isCertified: boolean;
  image?: string;
  about: string;
  type: "junior" | "senior";
  email?: string;
}
export const seniorTrainers: Trainer[] = [
  {
    id: "st-1",
    name: "Iqbal Hossain",
    role: "Senior Trainer",
    specialty: "Digital Marketing",
    experience: "5+ Years of Experience",
    isCertified: true,
    image: "/images/placeholder_img.jpg",
    about:
      "Expert in digital marketing strategies with over 5 years of experience in SEO, SEM, and social media marketing. Passionate about helping students build successful online careers.",
    type: "senior",
    email: "iqbal.hossain@gmail.com",
  },
  {
    id: "st-2",
    name: "Rahul Ahmed",
    role: "Senior Trainer",
    specialty: "Web Development",
    experience: "7+ Years of Experience",
    isCertified: true,
    image: "/images/placeholder_img.jpg",
    about:
      "Full-stack web developer specializing in React, Node.js, and cloud technologies. Has trained over 2000 students in modern web development practices.",
    type: "senior",
    email: "rahul.ahmed@gmail.com",
  },
  {
    id: "st-3",
    name: "Fatima Khan",
    role: "Senior Trainer",
    specialty: "UI/UX Design",
    experience: "6+ Years of Experience",
    isCertified: true,
    image: "/images/placeholder_img.jpg",
    about:
      "Award-winning UI/UX designer with expertise in user research, wireframing, and prototyping. Focuses on creating intuitive and accessible designs.",
    type: "senior",
    email: "fatima.khan@gmail.com",
  },
  {
    id: "st-4",
    name: "Fatima Khan",
    role: "Senior Trainer",
    specialty: "UI/UX Design",
    experience: "6+ Years of Experience",
    isCertified: true,
    image: "/images/placeholder_img.jpg",
    about:
      "Award-winning UI/UX designer with expertise in user research, wireframing, and prototyping. Focuses on creating intuitive and accessible designs.",
    type: "senior",
    email: "fatima.khan@gmail.com",
  },
];
const TrainerItemWrapper = () => {
  return (
    <section className="py-8 md:py-12">
      <h2 className="text-center text-2xl font-semibold mb-8 max-w-fit mx-auto border-b-2 border-primary pb-2">
        Senior Trainers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {seniorTrainers.map((trainer) => (
          <TrainerItemInfos key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </section>
  );
};

export default TrainerItemWrapper;
