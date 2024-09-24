import Link from 'next/link'
import React, { useState } from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationOn} from "react-icons/md";
import {
  AiFillHome,
} from "react-icons/ai";
function Navbar() {

  const [Drop,setDrop]=useState(false)
  const handleDrop = () => {
    setDrop(!Drop);
  };

  return (
    <div className="h-20 justify-between shadow-md border-b border-gray-600 flex items-center py-4 pr-4 pl-2">
    <div className="flex gap-1 justify-center items-center">
      <img src="https://shariandabre.github.io/CarRental_Master-V2/logo.png" className="w-20" />
      <h1 className="hidden md:block text-3xl anton ">
CAR RENTAL
      </h1>
    </div>
    <div className="font-semibold text-sm flex gap-2 items-center flex-row  ">
      <Link href="tel:9920 00 9920">
        <div className="hidden md:flex gap-2 items-center md:pr-2 border-0 md:border-r-2 cursor-pointer text-base text-[#0080FF]  border-gray-300">
          <BsFillTelephoneFill />
          <span>80109 55252</span>
        </div>
      </Link>

      <div className=" hidden md:flex gap-2 items-center md:pr-2 border-0 md:border-r-2  border-gray-300">
        <MdEmail />
        <span>carrental@gamil.com</span>
      </div>
      <div className="hidden md:flex gap-2 items-center ">
        <MdLocationOn />
        <span>Borivali West</span>
      </div>

      <nav className="border-white bg-white">
        <button
        onClick={()=>{handleDrop()}}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-whit font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center hover:bg-white md:hover:bg-gray-100"
          type="button"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.7"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`z-10 ${Drop?"block":"hidden"} bg-white border-b border-gray-600 shadow-md w-full`}
        >
          <ul 
          aria-labelledby="dropdownDefaultButton"
          class="h-12 menu-bar flex font-semibold text-md gap-4 items-center justify-center ">
      <li>
        <Link href="/">
          <div>
            <AiFillHome size="18px" />
          </div>
        </Link>
      </li>
      <li class="line-border border-l-2 pl-2 border-[#999]">
        <Link href="/about">About</Link>
      </li>
      <li class="line-border border-l-2 pl-2 border-[#999]">
        <Link href="/testimonials">Testimonials</Link>
      </li>
      <li class="line-border border-l-2 pl-2 border-[#999] ">
        <Link href="/contact">Contact Us</Link>
      </li>
      
    </ul>
        </div>
      </nav>

      {/* <Link href="/contact">
        <div className="flex py-3 px-3 ml-2 text-base rounded-lg cursor-pointer border border-gray-300 gap-2 text-white items-center bg-[#AF302F] shadow-md">
          <h3>CONTACT US</h3>
        </div>
      </Link> */}
    </div>
  </div>
  )
}

export default Navbar