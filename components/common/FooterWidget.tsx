import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Linkedin,
  Phone,
  Twitter,
  Youtube,
  MailCheck,
  MapPinned,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FooterWidget = () => {
  const importantLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Blogs", href: "#" },
    { name: "Branch", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
  ];

  const courses = [
    "Web & Software Development",
    "Graphics & Multimedia",
    "Digital Marketing",
    "Networking",
    "CPA & Affiliate Marketing",
    "Language & Communications",
    "Others",
  ];
  return (
    <section className="py-8 md:py-12 px-4 bg-secondary text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
          {/* Company Info */}
          <div>
            <div className="pb-4">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={213}
                  height={36}
                />
              </Link>
            </div>
            <p className="text-sm text-white mb-6">
              E-Learning and Earning Ltd. has been the finest information
              technology service provider since 2013.
            </p>
            <div>
              <h3 className="font-semibold text-white  mb-3">
                Subscribe to Our Newsletter
              </h3>
              <div className="flex gap-1">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className=" border-primary-foreground/20 h-10 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button size="lg" className=" hover:border-primary">
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-white mb-2">Follow us on:</p>
              <div className="flex gap-3">
                <Link href="#" className=" text-white">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className=" text-white">
                  <Linkedin size={20} />
                </Link>
                <Link href="#" className=" text-white">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className=" text-white">
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="ps-0 sm:ps-4">
            <h3 className="font-semibold text-lg mb-4 text-white">
              Important Links
            </h3>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Our Courses
            </h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course}>
                  <a
                    href="#"
                    className="text-sm text-white"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-white">
              <p className="flex items-center gap-2">
                {" "}
                <Phone size={20} /> 01550-666800
              </p>
              <p className="flex items-center gap-2">
                <Phone size={20} />
                01550-666900
              </p>
              <p className="flex items-center gap-2">
                {" "}
                <MailCheck size={20} /> info@e-leland.com
              </p>
              <p className="flex items-center gap-2">
                <MapPinned /> Head Office:
              </p>
              <p className="ml-6">
                Khaja IT Park, 2nd to 7th Floor,
                <br />
                Kalyanpur Bus Stop, Mirpur Road,
                <br />
                Dhaka-1207
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-base text-white pt-4 border-t border-primary-foreground/20">
            <p>2025 E-Learning and Earning Ltd. All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

export default FooterWidget;
