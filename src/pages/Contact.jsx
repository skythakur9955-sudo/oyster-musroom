import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ChevronRight,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      action: "Call us",
      link: "tel:+919876543210",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["hello@mushroomhub.com", "support@mushroomhub.com"],
      action: "Email us",
      link: "mailto:hello@mushroomhub.com",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: [
        "Organic Farm Estate",
        "Barkagaon, Hazaribag, Jharkhand 825311",
      ],
      action: "Get directions",
      link: "https://maps.google.com",
      color: "from-amber-500 to-orange-600",
    },
  ];

  const faqs = [
    {
      question: "What are your delivery timings?",
      answer:
        "We deliver fresh mushrooms within 24 hours of harvest. Orders placed before 2 PM are delivered the next day.",
    },
    {
      question: "Do you ship across India?",
      answer:
        "Yes, we currently ship to all major cities across India. Shipping costs vary by location.",
    },
    {
      question: "How should I store the mushrooms?",
      answer:
        "Store mushrooms in the refrigerator at 2-4°C. Consume within 7 days for best quality.",
    },
    {
      question: "What is your return policy?",
      answer:
        "If you are not satisfied with the quality, contact us within 24 hours of delivery for a replacement or refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Have questions about our mushrooms? Want to place a bulk order?
                We're here to help!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 -mt-24 relative z-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 text-white`}
                >
                  {info.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-2 mb-6">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <a
                  href={info.link}
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
                >
                  {info.action}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">SEND US A MESSAGE</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                We'd Love to Hear From You
              </h2>

              <p className="text-gray-600 mb-8">
                Whether you have a question about our products, need help with
                an order, or just want to say hello, we're here to help!
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-semibold">
                    ✅ Thank you for contacting us! We'll get back to you within
                    24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="What is this about?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-200 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Map & Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5496.291101838851!2d85.23148996114209!3d23.84981750351358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4bdbe9f22f74d%3A0xac7dd90a814929d!2sNTPC%20Colony%20Dhenga!5e0!3m2!1sen!2sin!4v1772176734496!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Business Hours
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">
                      9:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-900">
                      9:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-600">Customer Support</span>
                    <span className="font-semibold text-green-600">
                      24/7 Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Quick Help
                  </h3>
                </div>

                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}

                  <div className="pt-4">
                    <Link
                      to="/faqs"
                      className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
                    >
                      View all FAQs
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
