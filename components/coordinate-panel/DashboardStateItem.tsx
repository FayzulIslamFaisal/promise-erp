import clsx from "clsx";
import { Card } from "@/components/ui/card";

type SubStat = {
  label: string;
  value: string;
};

type DashboardStateItemProps = {
  icon?: any;
  value: string;
  label: string;
  subStats?: Record<string, SubStat>;
};

const DashboardStateItem = ({
  icon,
  value,
  label,
  subStats,
}: DashboardStateItemProps) => {
  const Icon = icon;

  return (
    <Card
      className={
        "p-4 rounded-xl border bg-secondary shadow hover:shadow-lg gap-3"
      }
    >
      <div className="flex items-center justify-between">
        <div className="shrink-0">
          {Icon && (
            <Icon className="w-10 h-10 text-secondary bg-white p-1 rounded-full" />
          )}
        </div>

        <div className="flex flex-col justify-center items-end">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-base font-bold text-white">{label}</p>
        </div>
      </div>

      {subStats && (
        <div className="mt-3 pt-3 border-t border-primary/70 grid grid-cols-2 gap-4">
          {Object.values(subStats).map((stat, index) => (
            <div
              key={index}
              className="flex gap-4 items-center"
            >
              <span className="text-white">{stat.label}</span>
              <span className="font-semibold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DashboardStateItem;
