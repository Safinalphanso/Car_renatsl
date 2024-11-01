import React, { useState } from 'react';

const CarFleet = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const carList = [
    { imgUrl: 'innova', service: 'Toyota Crysta', seaters: '6', index: 5, price: 2500, extraHr: 250, extraKm: 25, airport: 1800, category: 'business' },
    { imgUrl: 'innova1', service: 'Toyota Innova', seaters: '6', index: 4, price: 2200, extraHr: 200, extraKm: 20, airport: 1800, category: 'business' },
    { imgUrl: 'ertiga', service: 'Maruti Ertiga', seaters: '6', index: 3, price: 2000, extraHr: 180, extraKm: 18, airport: 1800, category: 'business' },
    { imgUrl: 'dzire', service: 'Maruti Dzire', seaters: '4', index: 2, price: 1600, extraHr: 140, extraKm: 14, airport: 1400, category: 'business' },
    { imgUrl: 'xcent', service: 'Hyundai Xcent', seaters: '4', index: 1, price: 1600, extraHr: 140, extraKm: 14, airport: 1400, category: 'business' },
    { imgUrl: 'fortuner', service: 'Toyota Fortuner', seaters: '7', index: 6, price: 8000, extraHr: 800, extraKm: 80, airport: 5000, category: 'luxury' },
    { imgUrl: 'hycorss', service: 'Innova Hycross', seaters: '7', index: 6, price: 8000, extraHr: 800, extraKm: 80, airport: 5000, category: 'luxury' }
  ];

  const filteredCars = activeFilter === 'all' ? carList : carList.filter(car => car.category === activeFilter);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Responsive Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 w-full md:w-auto">
            Our Fleet
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:max-w-md">
            We offer an extensive fleet of vehicles including luxury cars and comfortable business vehicles
          </p>
        </div>

        {/* Filter Buttons - Responsive Scroll */}
        <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
          {['all', 'luxury', 'business'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(prev => prev === filter ? 'all' : filter)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200
                ${activeFilter === filter 
                  ? 'bg-green-100 text-green-800' 
                  : 'hover:bg-gray-100 text-gray-600'}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Cars Grid - Responsive Flex Scroll */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 w-full"
                >
                   <div className={`${car.imgUrl} h-48 w-full mb-4 rounded-lg bg-white bg-cover`} />
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {car.service}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {car.seaters} Seater
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        ₹{car.price}/8hrs
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {car.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">No cars available</p>
            )}
          </div>
        </div>

        {/* Pagination Dots - Smaller on Mobile */}
        <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
          {filteredCars.slice(0, 3).map((_, index) => (
            <button 
              key={index} 
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full 
                ${index === 0 ? 'bg-gray-900' : 'bg-gray-300'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarFleet;