import { X, GraduationCap, Megaphone, Info, Wallet, Bell, Award, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationData {
  id: string;
  icon: "course" | "webinar" | "info" | "payment" | "update" | "certificate";
  title: string;
  highlight?: string;
  message: string;
  time: string;
  isUnread?: boolean;
}

interface NotificationItemProps {
  notification: NotificationData;
  onDismiss: (id: string) => void;
  index?: number;
}

const iconMap: Record<NotificationData["icon"], LucideIcon> = {
  course: GraduationCap,
  webinar: Megaphone,
  info: Info,
  payment: Wallet,
  update: Bell,
  certificate: Award,
};

const NotificationItem = ({ notification, onDismiss, index = 0 }: NotificationItemProps) => {
  const Icon = iconMap[notification.icon];

  const renderTitle = () => {
    if (!notification.highlight) {
      return <span>{notification.title}</span>;
    }

    const parts = notification.title.split(notification.highlight);
    return (
      <>
        {parts[0]}
        <span className="font-semibold">{notification.highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-4 rounded-lg bg-white p-4 transition-all duration-200 shadow hover:shadow-md",
        notification.isUnread && "border-l-4 border-primary shadow-xl",
        !notification.isUnread && "border-l border-secondary/50"
      )}
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Icon */}
      <div className="shrink-0 rounded-full bg-primary p-2.5">
        <Icon className="h-8 w-8 text-white" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-base leading-relaxed text-black">
          {renderTitle()} {notification.message}
        </p>
        <p className="flex items-center gap-1.5 text-base text-black">
          <span className="inline-block h-1 w-1 rounded-full bg-secondary/50" />
          {notification.time}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(notification.id)}
        className="shrink-0 rounded-md p-1.5 cursor-pointer text-black opacity-0 transition-all duration-200 group-hover:bg-secondary group-hover:text-white group-hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NotificationItem;
