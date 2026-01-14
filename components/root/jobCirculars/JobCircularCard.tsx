import { Briefcase, MapPin, Calendar, ChevronRight, Link } from "lucide-react";

import { Button } from "@/components/ui/button";
import { JobCircularsProps } from "./JobCircularsData";

export interface JobCardProps {
  job: JobCircularsProps;
}

const JobCircularCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-200 mb-4 last:mb-0">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 bg-primary/20 border border-white shadow rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div className="">
              <div className="flex flex-wrap gap-2 mb-4">
                {job.badges.map((badge, index) => (
                  <span
                    className="border border-secondary text-secondary bg-secondary/10 px-3 py-1 rounded-full"
                    key={index}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-1">
                {job.title}
              </h3>
              <p className="text-secondary/80 mb-3">{job.description}</p>

              <p className="text-primary font-semibold mb-2">
                Salary: {job.salary}
              </p>

              {/* Location & Deadline */}
              <div className="flex flex-wrap items-center gap-4 text-secondary">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="shrink-0 self-end">
          <Button asChild className="w-full">
            <Link
              href={`/job-circulars/${job.slug}`}
              className="w-full flex items-center text-white"
            >
              Apply Now <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCircularCard;
