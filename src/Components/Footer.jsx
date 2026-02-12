import React from "react";
import logoS from "./images/sakshamLogo.jpeg";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  const links = {
    Shop: [
      "All Products",
      "Fresh Mushrooms",
      "Dried Mushrooms",
      "Gourmet Packs",
      "Gift Boxes",
    ],
    Learn: [
      "About Mushrooms",
      "Health Benefits",
      "Cooking Guide",
      "Recipes",
      "Growing Tips",
    ],
    Company: ["About Us", "Our Farm", "Sustainability", "Careers", "Press"],
    Support: [
      "Contact Us",
      "FAQs",
      "Shipping Info",
      "Returns",
      "Privacy Policy",
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logoS} alt="Saksham Logo"
                          className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h2 className="text-2xl font-bold"> PAKRI MUSHROOM </h2>
                <p className="text-green-300">Premium Oyster Mushrooms</p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              Bringing the finest organic oyster mushrooms directly from our
              sustainable farms to your kitchen. Quality, freshness, and flavor
              guaranteed.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>hello@mushroomhub.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1" />
                <span>
                  Saksham livelihood mission displaced woman development
                  cooperative society limited Barkagaon Hazaribagh 825311
                </span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6">{category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-300 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} PakriMushroom. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                Cookie Policy
              </a>
              <div className="flex items-center">
                <span>Made with</span>
                <Heart
                  className="w-4 h-4 text-red-500 mx-1"
                  fill="currentColor"
                />
                <span>in India</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-400">Certified Organic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-400">Sustainable Farming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-600 rounded-full"></div>
              <span className="text-sm text-gray-400">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
