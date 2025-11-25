import { 
  Code, 
  Laptop, 
  Shield, 
  ShoppingCart, 
  Sparkles, 
  LineChart, 
  Server, 
  Palette 
} from "lucide-react";
import { Card } from "@/components/ui/card";


const leftServices = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern web solutions built to enhance user experience.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Cyber Security Solutions",
    description: "Protect your digital assets with our security solutions.",
    color: "secondary",
  },
  {
    icon: Sparkles,
    title: "Digital Transformation",
    description: "Adopt modern upgrades that enhance efficiency and growth.",
    color: "primary",
  },
  {
    icon: Server,
    title: "IT Infrastructure Solutions",
    description: "Scalable, reliable infrastructures ensuring smooth operations.",
    color: "secondary",
  },
];

const rightServices = [
  {
    icon: Laptop,
    title: "Software Development",
    description: "Integrated software solutions for your business.",
    color: "primary",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solution",
    description: "Complete online shopping platform development.",
    color: "secondary",
  },
  {
    icon: LineChart,
    title: "Digital Marketing",
    description: "Data-driven performance-focused marketing services.",
    color: "primary",
  },
  {
    icon: Palette,
    title: "Graphics design and Branding Services",
    description: "Creative, brand-focused design services.",
    color: "secondary",
  },
];

 const HomeServiceList = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 pb-4 border-b-2 border-dashed border-border inline-block px-8">
            Services We Provide
          </h2>
          <p className="text-base text-muted-foreground mt-6">
            Comprehensive support from idea to execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {leftServices.map((service, index) => (
              <Card
                key={index}
                className={`group p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in ${
                  service.color === 'primary'
                    ? 'bg-primary hover:bg-primary-light'
                    : 'bg-secondary hover:bg-secondary-light'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${
                    service.color === 'primary'
                      ? 'bg-primary-foreground/20'
                      : 'bg-secondary-foreground/20'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      service.color === 'primary'
                        ? 'text-primary-foreground'
                        : 'text-secondary-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-2 ${
                      service.color === 'primary'
                        ? 'text-primary-foreground'
                        : 'text-secondary-foreground'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm ${
                      service.color === 'primary'
                        ? 'text-primary-foreground/80'
                        : 'text-secondary-foreground/80'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Center Illustration */}
          <div className="flex justify-center items-center py-8 lg:py-0">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float" />
              <img 
                src="#"
                alt="Services Illustration" 
                className="relative z-10 w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightServices.map((service, index) => (
              <Card
                key={index}
                className={`group p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in ${
                  service.color === 'primary'
                    ? 'bg-primary hover:bg-primary-light'
                    : 'bg-secondary hover:bg-secondary-light'
                }`}
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${
                    service.color === 'primary'
                      ? 'bg-primary-foreground/20'
                      : 'bg-secondary-foreground/20'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      service.color === 'primary'
                        ? 'text-primary-foreground'
                        : 'text-secondary-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-2 ${
                      service.color === 'primary'
                        ? 'text-primary-foreground'
                        : 'text-secondary-foreground'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm ${
                      service.color === 'primary'
                        ? 'text-primary-foreground/80'
                        : 'text-secondary-foreground/80'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeServiceList;

