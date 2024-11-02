import React from 'react';
import Image from 'next/image';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 body-font border-t">
      <div className="container px-5 py-8 mx-auto flex flex-col sm:flex-row items-center justify-between">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <Image
            src="https://shariandabre.github.io/CarRental_Master-V2/logo.png"
            alt="Car Rental Logo"
            className="w-12 h-12"
          />
          <span className="ml-3 text-xl">Car Rental</span>
        </a>
        <p className="text-sm text-gray-400 mt-4 sm:mt-0 sm:ml-4 sm:border-l-2 sm:pl-4 sm:border-gray-600">
          © 2023 Car Rental. All rights reserved.
        </p>
        <div className="flex mt-4 sm:mt-0 justify-center sm:justify-start">
          {/* Social Media Icons */}
          <a href="https://facebook.com" className="text-gray-400 hover:text-white ml-3 transform hover:scale-110 transition-transform duration-200" aria-label="Facebook">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white ml-3 transform hover:scale-110 transition-transform duration-200" aria-label="Twitter">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white ml-3 transform hover:scale-110 transition-transform duration-200" aria-label="Instagram">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white ml-3 transform hover:scale-110 transition-transform duration-200" aria-label="LinkedIn">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
