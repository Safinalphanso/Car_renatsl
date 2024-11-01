import React, { useState } from 'react';

const CarFleet = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const carList = [  
    {
      imgUrl: 'innova',
      service: 'Toyota Crysta',
      seaters: '6',
      index: 5,
      "8|80": 2500,
      extraHr: 250,
      extraKm: 25,
      airport: 1800,
      category: 'business'
    },
    {
      imgUrl: 'innova1',
      service: 'Toyota Innova',
      seaters: '6',
      index: 4,
      "8|80": 2200,
      extraHr: 200,
      extraKm: 20,
      airport: 1800,
      category: 'business'
    },
    {
      imgUrl: 'ertiga',
      service: 'Maruti Ertiga',
      seaters: '6',
      index: 3,
      "8|80": 2000,
      extraHr: 180,
      extraKm: 18,
      airport: 1800,
      category: 'business'
    },
    {
      imgUrl: 'dzire',
      service: 'Maruti Dzire',
      seaters: '4',
      index: 2,
      "8|80": 1600,
      extraHr: 140,
      extraKm: 14,
      airport: 1400,
      category: 'business'
    },
    {
      imgUrl: 'dzire',
      service: 'Hyundai Xcent',
      seaters: '4',
      index: 1,
      "8|80": 1600,
      extraHr: 140,
      extraKm: 14,
      airport: 1400,
      category: 'business'
    },
    // Adding luxury cars
    {
      imgUrl: 'fortuner',
      service: 'toyota fortuner',
      seaters: '7',
      index: 6,
      "8|80": 8000,
      extraHr: 800,
      extraKm: 80,
      airport: 5000,
      category: 'luxury'
    },
    {
      imgUrl: 'hycorss',
      service: 'innova hycross',
      seaters: '7',
      index: 6,
      "8|80": 8000,
      extraHr: 800,
      extraKm: 80,
      airport: 5000,
      category: 'luxury'
    }
  ];

  const filteredCars = activeFilter === 'all' 
    ? carList 
    : carList.filter(car => car.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-4xl font-bold text-gray-900">Our Fleet</h2>
        <p className="text-gray-600 max-w-md">
          We offer an extensive fleet of vehicles including luxury cars and comfortable business vehicles
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200
            ${activeFilter === 'all' 
              ? 'bg-green-100 text-green-800' 
              : 'hover:bg-gray-100 text-gray-600'}`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveFilter('luxury')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200
            ${activeFilter === 'luxury' 
              ? 'bg-green-100 text-green-800' 
              : 'hover:bg-gray-100 text-gray-600'}`}
        >
          Luxury
        </button>
        <button 
          onClick={() => setActiveFilter('business')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200
            ${activeFilter === 'business' 
              ? 'bg-green-100 text-green-800' 
              : 'hover:bg-gray-100 text-gray-600'}`}
        >
          Business
        </button>
      </div>

      {/* Horizontal Scrolling Car List */}
      <div className="relative">
        <div className="overflow-x-auto flex gap-6 pb-4 snap-x snap-mandatory">
          {filteredCars.map((car, index) => (
            <div 
              key={index} 
              className="flex-none w-72 snap-center bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Car Image */}
              <div className={`${car.imgUrl} h-48 w-full mb-4 rounded-lg bg-white`} />
              
              {/* Car Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{car.service}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {car.seaters} Seater
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    ₹{car['8|80']}/8hrs
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {car.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="w-2 h-2 rounded-full bg-gray-900" />
        <button className="w-2 h-2 rounded-full bg-gray-300" />
        <button className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default CarFleet;