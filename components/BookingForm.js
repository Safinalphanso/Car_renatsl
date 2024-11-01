import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const UnifiedBookingForm = ({ 
  handleconfirm,
  setFormType,
  setPickup,
  setDropoff,
  setTripType,
  setPickupDate,
  setPickupTime,
  setPackage,
  setDays
}) => {
  const [activeTab, setActiveTab] = useState('OutStation');
  const [pickupInput, setPickupInput] = useState('');
  const [dropoffInput, setDropoffInput] = useState('');
  const [selectedTripType, setSelectedTripType] = useState('One Way');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const fetchLocationSuggestions = async (query, setSuggestions) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.features.map(feature => feature.place_name));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    if (pickupInput.length > 2) {
      fetchLocationSuggestions(pickupInput, setPickupSuggestions);
    }
  }, [pickupInput]);

  useEffect(() => {
    if (dropoffInput.length > 2) {
      fetchLocationSuggestions(dropoffInput, setDropoffSuggestions);
    }
  }, [dropoffInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormType(activeTab);
    setTripType(selectedTripType);
    setPickup(pickupInput);
    setDropoff(dropoffInput);
    handleconfirm();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og&limit=1`
          );
          const data = await response.json();
          const locationName = data.features[0].place_name;
          setPickupInput(locationName);
          setPickup(locationName);
        } catch (error) {
          console.error('Error getting location name:', error);
        }
      });
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="relative mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pickup Location"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                value={pickupInput}
                onChange={(e) => {
                  setPickupInput(e.target.value);
                  setShowPickupSuggestions(true);
                }}
                required
              />
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {pickupSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setPickupInput(suggestion);
                        setShowPickupSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              <MapPin size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="time"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />
          </div>
        </div>
      </>
    );

    switch (activeTab) {
      case 'OutStation':
        return (
          <>
            {commonFields}
            <div className="relative mb-4">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Drop Location"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                value={dropoffInput}
                onChange={(e) => {
                  setDropoffInput(e.target.value);
                  setShowDropoffSuggestions(true);
                }}
                required
              />
              {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {dropoffSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setDropoffInput(suggestion);
                        setShowDropoffSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="One Way"
                  checked={selectedTripType === "One Way"}
                  onChange={(e) => setSelectedTripType(e.target.value)}
                  className="form-radio"
                  name="tripType"
                />
                <span>One Way</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Round Trip"
                  checked={selectedTripType === "Round Trip"}
                  onChange={(e) => setSelectedTripType(e.target.value)}
                  className="form-radio"
                  name="tripType"
                />
                <span>Round Trip</span>
              </label>
            </div>

            {selectedTripType === 'Round Trip' && (
              <select
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                onChange={(e) => setDays(e.target.value)}
                required
              >
                <option value="">Select Number of Days</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            )}
          </>
        );

      case 'Local Transport':
        return (
          <>
            {commonFields}
            <select
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              onChange={(e) => setPackage(e.target.value)}
              required
            >
              <option value="">Select Package</option>
              <option value="8|80">4 Hr/ 40 Kilometer</option>
              <option value="120|120">8 Hr/ 80 Kilometer</option>
            </select>
          </>
        );

      case 'Airport':
        return (
          <>
            {commonFields}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Drop at Airport"
                  checked={selectedTripType === "Drop at Airport"}
                  onChange={(e) => setSelectedTripType(e.target.value)}
                  className="form-radio"
                  name="airportTripType"
                />
                <span>Drop at Airport</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Pick from Airport"
                  checked={selectedTripType === "Pick from Airport"}
                  onChange={(e) => setSelectedTripType(e.target.value)}
                  className="form-radio"
                  name="airportTripType"
                />
                <span>Pick from Airport</span>
              </label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        {['OutStation', 'Local Transport', 'Airport'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSelectedTripType(tab === 'Airport' ? 'Drop at Airport' : 'One Way');
              setPickupInput('');
              setDropoffInput('');
            }}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormFields()}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Booking
        </button>
      </form>
    </div>
  );
};

export default UnifiedBookingForm;
  
