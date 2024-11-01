import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, MapPin, Star, Car, ArrowLeft } from "lucide-react";

const stats = [
  { id: 1, label: "Customers", value: "100+", icon: Users },
  { id: 2, label: "Locations", value: "3", icon: MapPin },
  { id: 3, label: "Rating", value: "5.0", icon: Star },
  { id: 4, label: "Cars", value: "4", icon: Car }
];

const AboutSection = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-[60vh] bg-black">
        <div className="fixed top-6 left-6 z-50">
          <Link href="/" className="inline-block">
            <button className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
              <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors"/>
            </button>
          </Link>
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1552224/pexels-photo-1552224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            opacity: 0.7
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
      </div>

      <div className="relative -mt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative -mt-16 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                <img
                  src="/api/placeholder/128/128"
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <div className="px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <stat.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Car Rental</h2>
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-8">
                  <MapPin className="w-5 h-5" />
                  <span>Borivali West</span>
                </div>

                <div className="max-w-3xl mx-auto">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Welcome to RCR - Your Car Rental Solution</span>
                    <br /><br />
                    Since 2015, we have been your go-to platform for finding the best rates for car rentals. Our seamless booking process ensures instant confirmation, making your travel planning a breeze. Client satisfaction is our top priority, with dedicated support to assist you.
                    <br /><br />
                    Embracing innovation, we set new standards for excellence in the industry. Join our community of satisfied travelers and experience the RCR difference. Let us be your reliable travel companion on your next adventure. Contact us today and embark on a journey tailored to you. At RCR, it's more than just renting a car; it's creating unforgettable memories.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;