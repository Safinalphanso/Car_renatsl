import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import { Star, ArrowLeft } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Smooth booking process, friendly staff, and a well-maintained car made my trip unforgettable! Highly recommended!👍",
    author: "Rahul S.",
    image: "https://images.pexels.com/photos/1451162/pexels-photo-1451162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    text: "Professional and accommodating team, quick rental process, and a safe, top-notch car for my India visit. Thank you!",
    author: "Emily G.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    text: "Memorable family vacation! Excellent customer service, spacious car, and transparent pricing. Highly recommend!",
    author: "Rajesh K.",
    image: "https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    text: "Reliable and top-notch service for my frequent business trips to India. Always a pleasure renting from them!",
    author: "Samantha L.",
    image: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const TestimonialsSection = () => {
  return (
    <>
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="inline-block">
          <button className="group flex items-center justify-center bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
            <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
        </Link>
      </div>
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-2xl font-bold text-gray-900">5.0</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <svg
                    className="w-8 h-8 text-gray-300 mb-4 group-hover:text-blue-500 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                  
                  <p className="leading-relaxed mb-6 text-gray-600">{testimonial.text}</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 relative">
                      <Image
                        alt={`${testimonial.author}&apos;s testimonial`}
                        src={testimonial.image}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/100/100"; // Fallback image
                          e.target.onerror = null; // Prevent infinite loop
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
