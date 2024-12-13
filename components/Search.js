import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import geocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { MdDateRange } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

function convertTo24Hour(time12h) {
  if (!time12h) return '';
  
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  // Convert hours to number for calculations
  hours = parseInt(hours, 10);
  
  if (hours === 12) {
    hours = 0;
  }
  
  if (modifier === 'PM') {
    hours = hours + 12;
  }
  
  // Convert back to string and pad
  const hoursStr = String(hours).padStart(2, '0');
  return `${hoursStr}:${minutes}`;
}

function convertTo12Hour(time24h) {
  if (!time24h) return '';
  
  const [hours, minutes] = time24h.split(':');
  const hourNum = parseInt(hours, 10);
  
  if (hourNum === 0) {
    return `12:${minutes} AM`;
  } else if (hourNum < 12) {
    return `${hourNum}:${minutes} AM`;
  } else if (hourNum === 12) {
    return `12:${minutes} PM`;
  } else {
    return `${hourNum - 12}:${minutes} PM`;
  }
}

function Search({
  handleclick,
  handleconfirm,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  tripType,
  setTripType,
  formType,
  setFormType,
  setPickupDate,
  pickupDate,
  setPickupTime,
  setPackage,
  Package,
  setDays,
  getPickupCoordinates,
  getDropoffCoordinates,
  setpickupCoordinates,
  setdropoffCoordinates,
  setDropDate,
  dropDate,
  dropTime,
  setDropTime
}) {
  const geocodingService = new geocoding({
    accessToken:
      "pk.eyJ1IjoiZ29kaGEiLCJhIjoiY2xpZTh3ZWdoMDhkajNlcGRpZ3l0dTllOSJ9.uaD7_LAOgpJTzlhlRf9u9g",
  });

  const [activeTab, setActiveTab] = useState('OutStation');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [pickupInput, setPickupInput] = useState('');
  const [dropoffInput, setDropoffInput] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [pickupTime12h, setPickupTime12h] = useState('');
  const [dropTime12h, setDropTime12h] = useState('');

  const fetchSuggestions = async (input, setter) => {
    try {
      const response = await fetch('https://apisavis.avis.co.in/getDropAddresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eloccode: "2YZFFW",
          prefixtext: input,
          transfertype: "outstation"
        })
      });

      const data = await response.json();
      if (data.resultCode === "200" && data.result) {
        setter(data.result);
      }
    } catch (error) {
      console.log("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (pickupInput) {
      fetchSuggestions(pickupInput, setPickupSuggestions);
    }
  }, [pickupInput]);

  useEffect(() => {
    if (dropoffInput) {
      fetchSuggestions(dropoffInput, setDropoffSuggestions);
    }
  }, [dropoffInput]);

  useEffect(()=>{
    setFormType(activeTab)
  },[])

  useEffect(()=>{      
    setpickupCoordinates([0, 0]);
    setdropoffCoordinates([0, 0]);
    setPickup("");
    setPackage("");
    setDropoff("");
    setTripType("Round Trip");
    setDays("");
  },[activeTab])

  useEffect(() => {
    if (pickupInput !== "" && dropoffInput !== "") {
      getPickupCoordinates(pickupInput);
      getDropoffCoordinates(dropoffInput);
    } else if (pickupInput !== "" && Package !== "") {
      getPickupCoordinates(pickupInput);
    }
  }, [pickupInput, dropoffInput, Package]);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Modify the setPickupTime to convert 12h to 24h when setting
  const handlePickupTimeChange = (time12h) => {
    setPickupTime12h(time12h);
    setPickupTime(convertTo24Hour(time12h));
  };

  // Modify the setDropTime to convert 12h to 24h when setting
  const handleDropTimeChange = (time12h) => {
    setDropTime12h(time12h);
    setDropTime(convertTo24Hour(time12h));
  };

  const getUserCurrentLocation = () => {
    const confirmAccess = window.confirm(
      "This website wants to access your current location. Allow access?"
    );

    if (confirmAccess) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Use the Avis API to get the nearest location
            fetch('https://apisavis.avis.co.in/getDropAddresses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                eloccode: "2YZFFW",
                prefixtext: "current",
                transfertype: "outstation"
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data.resultCode === "200" && data.result && data.result.length > 0) {
                const locationName = data.result[0].split(',')[0];
                setCurrentLocation(locationName);
                setPickupInput(locationName);
                setPickup(locationName);
              }
            })
            .catch(error => {
              console.log("Error fetching location name:", error);
            });
          },
          (error) => {
            console.log("Error getting current location:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      console.log("User denied access to current location.");
    }
  };

  const handleconfirmTrip = (e) => {
    e.preventDefault();
    if (formType === "OutStation") {
      setPickup(pickupInput);
      setDropoff(dropoffInput);
    } else if (formType === "Local Transport") {
      setPickup(pickupInput);
    } else if (formType === "Airport") {
      if (tripType === "Drop at Airport") {
        setPickup(pickupInput);
        setDropoff(dropoffInput);
      } else {
        setPickup(pickupInput);
        setDropoff(dropoffInput);
      }
    }
    handleconfirm();
  };

  return (
    <Wapper>
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        {['OutStation', 'Local Transport', 'Airport'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFormType(tab);
            }}
            className={`flex-1 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <InputContainer onSubmit={handleconfirmTrip} >
      <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
      <hi
                    name="airport_name"
                    id="airport_name"
                    required
                    className="form-control bg-[#f5f5f5] text-black w-full"
                    
                  >
                    Mumbai
                  </hi>
                  </div>
        {formType == "OutStation" && (
          <InputBoxes>
            <div className="flex gap-2">
            <div className="relative w-full">
  <Input
    placeholder="Enter pickup location"
    className="flex-1 w-full"
    value={pickupInput}
    autoComplete="off"
    onChange={(e) => {
      setPickupInput(e.target.value);
      setShowPickupSuggestions(true);
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setShowPickupSuggestions(false);
        setPickup(pickupInput);
      }
    }}
    required
  />
  {showPickupSuggestions && pickupSuggestions.length > 0 && (
    <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {pickupSuggestions.map((suggestion, index) => {
        // Extract the main location name before the comma
        const locationName = suggestion;
        return (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setPickupInput(locationName);
              setPickup(locationName);
              setShowPickupSuggestions(false);
            }}
          >
            {suggestion}
          </div>
        );
      })}
    </div>
  )}
</div>

              <button
                type="button"
                onClick={getUserCurrentLocation}
                className="bg-blue-500 text-lg text-white px-4 py-2 rounded-md border border-gray-400"
              >
                < MdLocationOn />
              </button></div>

              <div className="relative w-full">
  <Input
    placeholder="Where to?"
    value={dropoffInput}
    autoComplete="off"
    className="w-full"
    onChange={(e) => {
      setDropoffInput(e.target.value);
      setShowDropoffSuggestions(true);
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setShowDropoffSuggestions(false);
        setDropoff(dropoffInput);
      }
    }}
    required
  />
  {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
    <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {dropoffSuggestions.map((suggestion, index) => {
        // Extract the main location name before the comma
        const locationName = suggestion.split(',')[0];
        return (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setDropoffInput(locationName);
              setDropoff(locationName);
              setShowDropoffSuggestions(false);
            }}
          >
            {suggestion}
          </div>
        );
      })}
    </div>
  )}
</div>

            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="OneWay"
                  className="text-black flex items-center gap-2"
                >
                  One Way
                  <input
                    type="radio"
                    id="OneWay"
                    name="radio"
                    value="One Way"
                    checked={tripType === "One Way"}
                    onChange={handleTripTypeChange}
                    required
                  />
                </label>
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="RoundTrip"
                  className="text-black flex items-center gap-2"
                >
                  Round Trip
                  <input
                    type="radio"
                    id="RoundTrip"
                    name="radio"
                    value="Round Trip"
                    checked={tripType === "Round Trip"}
                    onChange={handleTripTypeChange}
                    required
                  />
                </label>
              </div>
            </div>

            {tripType === "Round Trip" ? (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="flex btn1 p-2 rounded-md items-center justify-between gap-2">
                      <MdDateRange size="20" />
                      <input
                        className="bg-[#f5f5f5] text-black w-full"
                        placeholder="Start date"
                        name="startDate"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <div className="flex btn1 p-2 rounded-md items-center justify-between gap-2">
                      <BiTimeFive size="20" />
                      <select
                        name="pickup_time"
                        onChange={(e) => handlePickupTimeChange(e.target.value)}
                        className="bg-[#f5f5f5] text-black w-full"
                        required
                      >
                        <option value="">Select Time</option>
                        {[...Array(12)].map((_, hour) => 
                          ['AM', 'PM'].map(modifier => {
                            const displayHour = hour === 0 ? 12 : hour;
                            return (
                              <>
                                <option value={`${displayHour}:00 ${modifier}`}>
                                  {displayHour}:00 {modifier}
                                </option>
                                <option value={`${displayHour}:30 ${modifier}`}>
                                  {displayHour}:30 {modifier}
                                </option>
                              </>
                            );
                          })
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <div className="flex btn1 p-2 rounded-md items-center justify-between gap-2">
                      <MdDateRange size="20" />
                      <input
                        className="bg-[#f5f5f5] text-black w-full"
                        placeholder="End date"
                        name="endDate"
                        type="date"
                        value={dropDate}
                        onChange={(e) => {
                          setDropDate(e.target.value);
                          const start = new Date(pickupDate);
                          const end = new Date(e.target.value);
                          const diffTime = Math.abs(end - start);
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          setDays(diffDays);
                        }}
                        min={pickupDate}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <div className="flex btn1 p-2 rounded-md items-center justify-between gap-2">
                      <BiTimeFive size="20" />
                      <select
                        name="dropTime12h"
                        onChange={(e) => handleDropTimeChange(e.target.value)}
                        className="bg-[#f5f5f5] text-black w-full"
                        required
                      >
                        <option value="">Select Time</option>
                        {[...Array(12)].map((_, hour) => 
                          ['AM', 'PM'].map(modifier => {
                            const displayHour = hour === 0 ? 12 : hour;
                            return (
                              <>
                                <option value={`${displayHour}:00 ${modifier}`}>
                                  {displayHour}:00 {modifier}
                                </option>
                                <option value={`${displayHour}:30 ${modifier}`}>
                                  {displayHour}:30 {modifier}
                                </option>
                              </>
                               );
                              })
                            )}
                          </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <div className="flex btn1 p-2 rounded-md items-center justify-between gap-2">
                    <MdDateRange size="20" />
                    <input
                      className="bg-[#f5f5f5] text-black w-full"
                      placeholder="Pickup date"
                      name="Pickdate"
                      type="date"
                      value={pickupDate || getCurrentDate()}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <div className="flex btn1 p-2 rounded-md items-center justify-between gap-2">
                    <BiTimeFive size="20" />
                    <select
                        name="pickup_time"
                        onChange={(e) => handlePickupTimeChange(e.target.value)}
                        className="bg-[#f5f5f5] text-black w-full"
                        required
                      >
                        <option value="">Select Time</option>
                        {[...Array(12)].map((_, hour) => 
                          ['AM', 'PM'].map(modifier => {
                            const displayHour = hour === 0 ? 12 : hour;
                            return (
                              <>
                                <option value={`${displayHour}:00 ${modifier}`}>
                                  {displayHour}:00 {modifier}
                                </option>
                                <option value={`${displayHour}:30 ${modifier}`}>
                                  {displayHour}:30 {modifier}
                                </option>
                              </>
                            );
                          })
                        )}
                      </select>
                  </div>
                </div>
              </div>
            )}
          </InputBoxes>
        )}
        {formType == "Local Transport" && (
          <InputBoxes>
            <div className="flex gap-2">
            <div className="relative w-full">
  <Input
    placeholder="Enter pickup location"
    className="flex-1 w-full"
    value={pickupInput}
    autoComplete="off"
    onChange={(e) => {
      setPickupInput(e.target.value);
      setShowPickupSuggestions(true);
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setShowPickupSuggestions(false);
        setPickup(pickupInput);
      }
    }}
    required
  />
  {showPickupSuggestions && pickupSuggestions.length > 0 && (
    <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {pickupSuggestions.map((suggestion, index) => {
        // Extract the main location name before the comma
        const locationName = suggestion.split(',')[0];
        return (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setPickupInput(locationName);
              setPickup(locationName);
              setShowPickupSuggestions(false);
            }}
          >
            {suggestion}
          </div>
        );
      })}
    </div>
  )}
</div>
            
              <button
                type="button"
                onClick={getUserCurrentLocation}
                className="bg-blue-500 text-lg text-white px-4 py-2 rounded-md border border-gray-400"
              >
                < MdLocationOn />
              </button></div>


            <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
              <select
                className="form-control bg-[#f5f5f5] w-full"
                name="trip_package"
                id="trip_package"
                onChange={(e) => setPackage(e.target.value)}
                required
              >
                <option value="">Select Package</option>
                <option value="8|80">8 Hr/ 80 Kilometer</option>
                <option value="12|120">12 Hr/ 120 Kilometer</option>
              </select>
            </div>

            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <MdDateRange size="20" />
                <input
                  className="bg-[#f5f5f5] text-black w-full"
                  placeholder="Pickup date"
                  name="Pickdate"
                  type="date"
                  value={pickupDate || getCurrentDate()} // Set initial value to current date
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <BiTimeFive size="20" />
                <select
                        name="pickup_time"
                        onChange={(e) => handlePickupTimeChange(e.target.value)}
                        className="bg-[#f5f5f5] text-black w-full"
                        required
                      >
                        <option value="">Select Time</option>
                        {[...Array(12)].map((_, hour) => 
                          ['AM', 'PM'].map(modifier => {
                            const displayHour = hour === 0 ? 12 : hour;
                            return (
                              <>
                                <option value={`${displayHour}:00 ${modifier}`}>
                                  {displayHour}:00 {modifier}
                                </option>
                                <option value={`${displayHour}:30 ${modifier}`}>
                                  {displayHour}:30 {modifier}
                                </option>
                              </>
                            );
                          })
                        )}
                      </select>
              </div>
            </div>
          </InputBoxes>
        )}
        {formType == "Airport" && (
          <InputBoxes>
            <div className="flex rounded-md items-center justify-start gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="Drop at Airport"
                  className="text-black flex items-center gap-2"
                >
                  Drop at Airport
                  <input
                    type="radio"
                    id="Drop at Airport"
                    name="radio"
                    value="Drop at Airport"
                    checked={tripType === "Drop at Airport"}
                    onChange={(e) => {
                      handleTripTypeChange(e);
                      setPickupInput("");
                      setDropoffInput("");
                    }}
                    required
                  />
                </label>
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="Pickup from Airport"
                  className="text-black flex items-center gap-2"
                >
                  Pickup from Airport
                  <input
                    type="radio"
                    id="Pickup from Airport"
                    name="radio"
                    value="Pickup from Airport"
                    checked={tripType === "Pickup from Airport"}
                    onChange={(e) => {
                      handleTripTypeChange(e);
                      setPickupInput("");
                      setDropoffInput("");
                    }}
                    required
                  />
                </label>
              </div>
            </div>
            {tripType === "Drop at Airport" && (
              <>
                <div className="flex gap-2">
                <div className="relative w-full">
  <Input
    placeholder="Enter pickup location"
    className="flex-1 w-full"
    value={pickupInput}
    autoComplete="off"
    onChange={(e) => {
      setPickupInput(e.target.value);
      setShowPickupSuggestions(true);
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setShowPickupSuggestions(false);
        setPickup(pickupInput);
      }
    }}
    required
  />
  {showPickupSuggestions && pickupSuggestions.length > 0 && (
    <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {pickupSuggestions.map((suggestion, index) => {
        // Extract the main location name before the comma
        const locationName = suggestion.split(',')[0];
        return (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setPickupInput(locationName);
              setPickup(locationName);
              setShowPickupSuggestions(false);
            }}
          >
            {suggestion}
          </div>
        );
      })}
    </div>
  )}
</div>
                  <button
                    type="button"
                    onClick={getUserCurrentLocation}
                    className="bg-blue-500 text-lg text-white px-4 py-2 rounded-md border border-gray-400"
                  >
                    < MdLocationOn />
                  </button></div>
 

                <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
                  <select
                    name="airport_name"
                    id="airport_name"
                    required
                    className="form-control bg-[#f5f5f5] text-black w-full"
                    onChange={(e) => setDropoffInput(e.target.value)}
                  >
                    <option value="">Select Dropoff location</option>
                    <option value="MUMBAI INTERNATIONAL AIRPORT">
                      MUMBAI INTERNATIONAL AIRPORT.TERMINAL - 2
                    </option>
                    <option value="DOMESTIC AIRPORT MUMBAI">
                      DOMESTIC AIRPORT MUMBAI 1 - A
                    </option>
                  </select>
                </div>
              </>
            )}
            {tripType === "Pickup from Airport" && (
              <>
                <div className="flex gap-6 btn1 p-2 rounded-md h-12 items-center">
                  <select
                    name="airport_name"
                    id="airport_name"
                    required
                    className="form-control bg-[#f5f5f5] text-black w-full"
                    onChange={(e) => setPickupInput(e.target.value)}
                  >
                    <option value="">Select Pickup location</option>
                    <option value="MUMBAI INTERNATIONAL AIRPORT">
                      MUMBAI INTERNATIONAL AIRPORT.TERMINAL - 2
                    </option>
                    <option value="DOMESTIC AIRPORT MUMBAI">
                      DOMESTIC AIRPORT MUMBAI 1 - A
                    </option>
                  </select>
                </div>

                <div className="relative w-full">
                  <Input
                    placeholder="Enter drop location"
                    value={dropoffInput}
                    autoComplete="off"
                    className="w-full"
                    onChange={(e) => {
                      setDropoffInput(e.target.value);
                      setShowDropoffSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setShowDropoffSuggestions(false);
                        setDropoff(dropoffInput);
                      }
                    }}
                    required
                  />
                  {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                    <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[100]" style={{ top: 'calc(100% + 4px)' }}>
                      {dropoffSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDropoffInput(suggestion);
                            setDropoff(suggestion);
                            setShowDropoffSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            {/* <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
              <select
                className="form-control bg-[#f5f5f5] w-full"
                name="trip_package"
                id="trip_package"
                onChange={(e) => setPackage(e.target.value)}
                required
              >
                <option value="">Select Package</option>
                <option value="6|60">4 Hr/ 40 Kilometer</option>
              </select>
            </div> */}
            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <MdDateRange size="20" />
                <input
                  className="bg-[#f5f5f5] text-black w-full"
                  placeholder="Pickup date"
                  name="Pickdate"
                  type="date"
                  value={pickupDate || getCurrentDate()} // Set initial value to current date
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <BiTimeFive size="20" />
                <select
                        name="pickup_time"
                        onChange={(e) => handlePickupTimeChange(e.target.value)}
                        className="bg-[#f5f5f5] text-black w-full"
                        required
                      >
                        <option value="">Select Time</option>
                        {[...Array(12)].map((_, hour) => 
                          ['AM', 'PM'].map(modifier => {
                            const displayHour = hour === 0 ? 12 : hour;
                            return (
                              <>
                                <option value={`${displayHour}:00 ${modifier}`}>
                                  {displayHour}:00 {modifier}
                                </option>
                                <option value={`${displayHour}:30 ${modifier}`}>
                                  {displayHour}:30 {modifier}
                                </option>
                              </>
                            );
                          })
                        )}
                      </select>
              </div>
            </div>
          </InputBoxes>
        )}
        <ConfirmBtn type="submit" value="Proceed Booking" />
      </InputContainer>
    </Wapper>
  );
}
export default Search;

const Wapper = tw.div`
w-full max-w-md bg-white rounded-lg shadow-lg p-6
`;
const ButtonContainer = tw.div`
 border-b py-2 mb-2
`;
const Back = tw.img`
h-8 cursor-pointer 
`;
const InputContainer = tw.form`
 flex mb-2 border-b flex-col w-full gap-2 text-sm
`;
const InputBoxes = tw.div`
flex flex-col flex-1 gap-2
`;
const Input = tw.input`
h-12 btn1 rounded-md p-2 outline-none borber-none
`;

const ConfirmBtn = tw.input`
bg-[#0080ff]  text-white py-3 shadow-md text-center text-lg cursor-pointer rounded-md font-medium
`;
