import { Button } from "@/components/ui/button";

const AdmissionGoing = () => {
  return (
    
      <section className="py-10 lg:py-14 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto">
          <h1 className="text-2xl text-center sm:text-4xl font-bold white-color md:mb-6 mb-4">
            Admission Going On
          </h1>
          <p className="text-base sm:text-xl white-color text-center mb-6 md:mb-10 max-w-full md:max-w-2xl mx-auto">
            Join any online or offline course today and move one step closer to a stronger, future-ready career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" className="primary border-primary primary-border-hover">Browse Courses</Button>
            <Button variant="primary" className="primary border-primary primary-border-hover">Join Free Seminar</Button>
          </div>
        </div>
      </section>
  );
};

export default AdmissionGoing;
