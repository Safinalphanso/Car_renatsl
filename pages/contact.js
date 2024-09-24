import Link from "next/link";
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
const Contact = () => {
  const [Package, setPackage] = useState("");
  const [pickupCoordinates, setpickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setdropoffCoordinates] = useState([0, 0]);
  const [formType, setFormType] = useState("");
  return (
    <div className=" flex flex-col h-screen w-full ">
      <Buttoncon>
        <Link href="/">
          <Back src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </Buttoncon>
      <div className="flex-1 h-full w-full flex justify-center items-center">
        <Map
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          Package={Package}
          formType={formType}
        />
      </div>
      <div className="flex-[2_2_0%] flex flex-col md:flex-row md:flex-1 h-full">
        <div className="flex-1 h-full bg-[#232323] text-white ">
          <h2 className="text-4xl md:text-6xl w-full h-2/6 text-center p-2 font-bold">
            Meet Us
          </h2>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h2 className="text-xl md:text-2xl font-bold">Address:</h2>
            <h2 className="text-xl md:text-2xl font-medium text-center w-5/6">
              123, Sunshine Apartments, Hill Road, Bandra West, Mumbai - 400050,
              Maharashtra, India
            </h2>
          </div>
        </div>
        <div className="flex-1 h-full">
          <h2 className="text-4xl md:text-6xl w-full h-2/6 text-center p-2 font-bold">
            Call Us
          </h2>
          <div className="flex gap-4 justify-center items-center">
            <h2 className="text-xl md:text-2xl font-bold">Hours:</h2>
            <h2 className="text-xl md:text-2xl font-medium text-center">
              Open 24 hours
            </h2>
          </div>
          <div className="flex gap-4 justify-center items-center mt-4">
            <h2 className="text-xl md:text-2xl font-bold">Phone:</h2>
            <h2 className="text-xl md:text-2xl font-medium text-center">
              80109 55252            </h2>
          </div>
          <div className="flex gap-4 justify-center items-center mt-4">
            <h2 className="text-xl md:text-2xl font-bold">Email:</h2>
            <h2 className="text-xl md:text-2xl font-medium text-center">
              carrental@gamil.com
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

const Back = tw.img`
h-8 cursor-pointer 
`;
const Buttoncon = tw.div`
flex w-8 rounded-full bg-white fixed z-10 m-2 shadow-md cursor-pointer
`;
