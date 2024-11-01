import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Map from "../components/Map";

const ContactSection = () => {
  const [coordinates, setCoordinates] = useState({
    pickup: [0, 0],
    dropoff: [0, 0]
  });
  const [formType, setFormType] = useState("");
  const [packageType, setPackageType] = useState("");

  const contactInfo = {
    address: "123, Sunshine Apartments, Hill Road, Bandra West, Mumbai - 400050, Maharashtra, India",
    hours: "Open 24 hours",
    phone: "80109 55252",
    email: "carrental@gmail.com"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Link href="/" className="fixed top-4 left-4 z-50">
        <button className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </Link>

      <div className="h-[40vh] relative">
        <Map
          pickupCoordinates={coordinates.pickup}
          dropoffCoordinates={coordinates.dropoff}
          Package={packageType}
          formType={formType}
        />
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 p-8">
        <div className="bg-gray-900 text-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-8">Visit Us</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-300">{contactInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-gray-600">{contactInfo.hours}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">{contactInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;