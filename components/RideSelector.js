import { useEffect, useState } from "react";
import Image from 'next/image';
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";
import { carList2 } from "../data/carList2";

const RideSelector = ({
  pickupCoordinates,
  dropoffCoordinates,
  tripType,
  handlebooking,
  selectedCar,
  setSelectedCar,
  setPrice,
  formType,
  Package,
  price,
  days,
  rideDistance,
  setDistance,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentCarList, setCurrentCarList] = useState(carList);

  useEffect(() => {
    if(Package ===""){
      setCurrentCarList(carList2)
    }
    else{
    setCurrentCarList(Package === "8|80" ? carList2 : carList);
    }
  }, [Package]);

  useEffect(() => {
    if (
      pickupCoordinates[0] !== 0 &&
      pickupCoordinates[1] !== 0 &&
      dropoffCoordinates[0] !== 0 &&
      dropoffCoordinates[1] !== 0
    ) {
      const calculateDistance = async () => {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiZ29kaGEiLCJhIjoiY2xpZTh3ZWdoMDhkajNlcGRpZ3l0dTllOSJ9.uaD7_LAOgpJTzlhlRf9u9g`
        );
        const data = await response.json();
        const distance = data.routes[0].distance / 1000;
        setDistance(tripType === "Round Trip" ? distance.toFixed(0) * 2 : distance.toFixed(0));
      };

      calculateDistance();
    }
  }, [pickupCoordinates, dropoffCoordinates, rideDistance, tripType, setDistance]);

  const openPopup = (car) => {
    setSelectedCar(car);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const calculatePrice = (car) => {
    if (formType === "Airport") return car.airport;
    if (formType === "Local Transport") return car[Package];
    if (formType === "OutStation") {
      if (tripType === "Round Trip") return (car.extraKm * 300 + 400) * days;
      return rideDistance >= 500 ? car.extraKm * 300 + 800 : car.extraKm * 300 + 400;
    }
    return "";
  };

  return (
    <Wrapper>
      <CarGrid>
        {currentCarList
          .filter(car => car && car.service && car.seaters)
          .map((car, index) => (
            <CarCard key={index}>
              <CarImage className={car.imgUrl} />
              <CarInfo>
                <CarService>{car.service}</CarService>
                <CarSeats>{car.seaters} seaters</CarSeats>
                {formType !== "Airport" && (
                  <ExtraPrice>Extra: ₹{car.extraKm} /km</ExtraPrice>
                )}
                <Price>
                  {Number(calculatePrice(car)).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </Price>
                <FareDetailsButton onClick={() => {
                  setPrice(calculatePrice(car));
                  openPopup(car);
                }}>
                  Fare Details
                </FareDetailsButton>
              </CarInfo>
              <InquireButton
                onClick={() => {
                  handlebooking();
                  openPopup(car);
                  setPrice(calculatePrice(car));
                }}
              >
                Inquire
              </InquireButton>
            </CarCard>
          ))}
      </CarGrid>

      {showPopup && selectedCar && (
        <PopupOverlay>
          <PopupContent>
            <PopupHeader>Fare Breakup</PopupHeader>
            <CloseButton onClick={closePopup}>
              <Image
                className="h-4"
                src="https://img.icons8.com/?size=512&id=46&format=png"
                alt="Close"
              />
            </CloseButton>
            <PopupBody>
              {formType === "OutStation" && tripType === "Round Trip" && (
                <FareBreakdown>
                  <li>• Outstation (Roundtrip {days} day/s) {price} Excluding 5% GST</li>
                  <li>• Minimum distance / day 300 Km</li>
                  <li>• Extra amount per km ₹{selectedCar.extraKm}</li>
                  <li>• Driver allowance Day ₹400 / Night(11:00 PM to 5:00 AM) ₹300</li>
                  <li>• Opening KM/Time and Closing Time/Km will calculate from Our garage to garage</li>
                  <li>• All Parking, Toll, Border Tax wherever applicable will be charged extra</li>
                </FareBreakdown>
              )}
              {formType === "OutStation" && tripType === "One Way" && (
                <FareBreakdown>
                  <li>• Outstation (Oneway) ( {price} Excluding 5% GST )</li>
                  <li>• All Parking, Toll, Border Tax wherever applicable will be charged extra</li>
                  <li>• Opening KM/Time and Closing Time/Km will calculate from Our garage to garage</li>
                </FareBreakdown>
              )}
              {formType === "Local Transport" && (
                <FareBreakdown>
                  <li>• Local ({Package}) : {price}( Excluding 5 % GST )</li>
                  <li>• Duration - 1 Day (Toll and parking extra).</li>
                  <li>• Extra charge per hour : ₹{selectedCar.extraHr}</li>
                  <li>• Extra charge per km : ₹{selectedCar.extraKm}</li>
                  <li>• Opening KM/Time and Closing Time/Km will calculate from Our garage to garage</li>
                </FareBreakdown>
              )}
              {formType === "Airport" && (
                <FareBreakdown>
                  <li>• Airport Transfer (AIRPORTDROP) :{price}( Excluding 5% GST )</li>
                  <li>• Toll and parking extra.</li>
                  <li>• Extra charge per hour : ₹{selectedCar.extraHr}</li>
                  <li>• Extra charge per km : ₹{selectedCar.extraKm}</li>
                </FareBreakdown>
              )}
            </PopupBody>
          </PopupContent>
        </PopupOverlay>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  w-full
`;

const CarGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2
`;

const CarCard = tw.div`
  flex flex-col bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden
`;

const CarImage = tw.div`
  w-full h-40 bg-cover bg-center
`;

const CarInfo = tw.div`
  p-4 flex flex-col flex-grow
`;

const CarService = tw.h3`
  text-lg font-bold mb-1
`;

const CarSeats = tw.p`
  text-sm mb-2
`;

const ExtraPrice = tw.p`
  text-sm font-uber mb-2
`;

const Price = tw.h4`
  text-xl font-medium mb-2
`;

const FareDetailsButton = tw.button`
  text-[#0080ff] rounded-lg px-4 py-2 mt-auto
`;

const InquireButton = tw.button`
  bg-[#0080ff] text-white rounded-lg text-xl font-medium p-2 m-4
`;

const PopupOverlay = tw.div`
  fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50
`;

const PopupContent = tw.div`
  bg-white rounded-lg shadow-lg w-full max-w-md relative
`;

const PopupHeader = tw.div`
  bg-[#AF302F] text-white text-lg font-medium p-4 rounded-t-lg
`;

const CloseButton = tw.button`
  absolute top-2 right-2 bg-transparent border-none cursor-pointer
`;

const PopupBody = tw.div`
  p-4
`;

const FareBreakdown = tw.ul`
  list-disc pl-5 space-y-2
`;

export default RideSelector;