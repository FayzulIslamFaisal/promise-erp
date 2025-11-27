import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
//   title: string;
}

export const VideoPlayer = ({ isOpen, onClose, videoUrl }: VideoPlayerProps) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      import('react-player').then((module) => {
        playerRef.current = module.default;
      });
    }
  }, [isOpen]);

  const ReactPlayer = playerRef.current;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 border-0 bg-black">
        {/* <DialogTitle className="sr-only">{title}</DialogTitle> */}
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          {isOpen && ReactPlayer && (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing
              controls
            />
          )}
          {isOpen && !ReactPlayer && (
            <div className="text-white">Loading player...</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
