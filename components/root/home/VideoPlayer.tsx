import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoPlayer = ({
  isOpen,
  onClose,
  videoUrl,
}: VideoPlayerProps) => {
  const [ReactPlayer, setReactPlayer] = useState<any>(null);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      import("react-player").then((module) => {
        setReactPlayer(() => module.default);
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 border-0 bg-black">
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          {isOpen && ReactPlayer ? (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing
              controls
            />
          ) : (
            <div className="text-white">Loading player...</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
