import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
interface ImageCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title?: string;
}

const EarningImagModal = ({
  isOpen,
  onClose,
  images,
  title = "Image Gallery",
}: ImageCarouselModalProps) => {
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 bg-card border-border overflow-hidden">
        <DialogTitle className="px-4 pt-4">{title}</DialogTitle>
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center justify-center p-2">
                    <Image
                      width={500}
                      height={300}
                      src={image}
                      alt={`Image ${index + 1} `}
                      className="max-h-[70vh] w-auto object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EarningImagModal;
