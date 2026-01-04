
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

const ContactMap = () => {
  return (
    <Card className="h-full py-0">
      <CardHeader className="pt-4">
        <CardTitle className="text-xl md:text-2xl text-secondary">
          Find Us
        </CardTitle>
        <p className="text-secondary text-sm">
          Visit our office for in-person consultations and course information.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3654!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUxLjAiTiA5MMKwMjEnNTUuNCJF!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
            className="w-full h-full border-0 grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
            allowFullScreen
          />

          {/* Custom Marker Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
            <div className="bg-secondary rounded-full p-2 shadow-lg">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="flex items-start gap-3 px-3 bg-muted rounded-xl">
          <div className="bg-secondary rounded-full p-2 shrink-0">
            <MapPin className="w-4 h-4 text-white" />
          </div>

          <div>
            <h3 className="font-semibold text-secondary text-sm mb-1">
              E-Learning & Earning Ltd.
            </h3>
            <p className="text-muted-secondary text-xs leading-relaxed">
              Khaja IT Park, 2nd to 7th Floor,<br />
              Kallyanpur Bus Stop, Mirpur Road,<br />
              Dhaka-1207
            </p>
          </div>
        </div>
      </CardContent>

    </Card>
  );
};

export default ContactMap;
