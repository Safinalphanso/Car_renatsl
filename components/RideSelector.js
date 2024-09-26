import { useEffect, useState } from "react";
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
    if (Package === "4|40") {
      setCurrentCarList(carList);
    } else if (Package === "8|80") {
      setCurrentCarList(carList2);
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
        if (tripType === "Round Trip") {
          setDistance(distance.toFixed(0) * 2);
        } else {
          setDistance(distance.toFixed(0));
        }
      };

      calculateDistance();
    }
  }, [pickupCoordinates, dropoffCoordinates, rideDistance, tripType]);

  const openPopup = (car) => {
    setSelectedCar(car);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Wrapper>
      <Carlist>
        {currentCarList
          .filter(car => car && car.service && car.seaters) // Filter out cars with null values
          .map((car, index) => (
            <Car key={index}>
              <Carimg className={`${car.imgUrl}`}></Carimg>
              <div className="flex-1 gap-4 flex flex-col justify-evenly items-center md:flex-row">
                <CarDetails className="flex-1">
                  <Service>{car.service}</Service>
                  <h3 className="text-base text-center">
                    {car.seaters + " seaters"}
                  </h3>
                </CarDetails>
                {formType !== "Airport" && (
                  <Price className="text-center font-uber">
                    {"Extra: ₹" + car.extraKm + " /km"}
                  </Price>
                )}
                <div className="flex flex-col flex-1 items-center justify-center">
                  <Price className="font-uber">
                    {Number(
                      formType === "Airport"
                        ? car.airport
                        : formType === "Local Transport"
                        ? car[Package]
                        : formType === "OutStation"
                        ? tripType === "Round Trip"
                          ? (car.extraKm * 300 + 400) * days
                          : rideDistance >= 500
                          ? car.extraKm * 300 + 800
                          : car.extraKm * 300 + 400
                        : ""
                    ).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Price>
                  <Time
                    onClick={() => {
                      setPrice(
                        Number(
                          formType === "Airport"
                            ? car.airport
                            : formType === "Local Transport"
                            ? car[Package]
                            : formType === "OutStation"
                            ? tripType === "Round Trip"
                              ? (car.extraKm * 300 + 400) * days
                              : rideDistance >= 500
                              ? car.extraKm * 300 + 800
                              : car.extraKm * 300 + 400
                            : ""
                        ).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                      );
                      openPopup(car);
                    }}
                  >
                    Fare Details
                  </Time>
                </div>
              </div>
              <button
                onClick={() => {
                  handlebooking();
                  openPopup(car);
                  setPrice(
                    formType === "Airport"
                      ? car.airport
                      : formType === "Local Transport"
                      ? car[Package]
                      : formType === "OutStation"
                      ? tripType === "Round Trip"
                        ? (car.extraKm * 300 + 400) * days
                        : rideDistance >= 500
                        ? car.extraKm * 300 + 800
                        : car.extraKm * 300 + 400
                      : ""
                  );
                }}
                className="bg-[#0080ff] shadow-md text-white rounded-lg text-xl font-medium p-2 book"
              >
                Inquire
              </button>
            </Car>
          ))}
      </Carlist>

      {showPopup && selectedCar && (
        <Popup>
          <div className="h-14 text-lg rounded-t-lg flex font-medium justify-center items-center text-white max-w-xl bg-[#AF302F] w-full md:w-5/6">
            <h2>Fare Breakup</h2>
          </div>
          <PopupContent>
            <CloseButton onClick={closePopup}>
              <img
                className="h-4"
                src="https://img.icons8.com/?size=512&id=46&format=png"
              />
            </CloseButton>
            {formType === "OutStation" && tripType === "Round Trip" && (
              <ul className="flex flex-col gap-2">
                <li>
                  &#x2022;{" "}
                  {"Outstation (Roundtrip " +
                    days +
                    " day/s) " +
                    price +
                    " Excluding 5% GST"}
                </li>
                <li>&#x2022; {"Minimum distance / day " + "300 Km"}</li>
                <li>
                  &#x2022;{" "}
                  {"extra amount per km ₹" + carList[selectedCar.index].extraKm}
                </li>
                <li>
                  &#x2022; Driver allowance Day ₹400 / Night(11:00 PM to 5:00
                  AM) ₹300
                </li>
                <li>
                  &#x2022;Opening KM/Time and Closing Time/Km will calculate
                  from Our garage to garage
                </li>
                <li>
                  &#x2022; All Parking, Toll, Border Tax wherever applicable
                  will be charged extra
                </li>
              </ul>
            )}
            {formType === "OutStation" && tripType === "One Way" && (
              <ul className="flex flex-col gap-2">
                <li>
                  &#x2022;
                  {"Outstation (Oneway) ( " + price + " Excluding 5% GST )"}
                </li>
                <li>
                  &#x2022; All Parking, Toll, Border Tax wherever applicable
                  will be charged extra
                </li>
                <li>
                  &#x2022;Opening KM/Time and Closing Time/Km will calculate
                  from Our garage to garage
                </li>
              </ul>
            )}
            {formType === "Local Transport" && (
              <ul className="flex flex-col gap-2">
                <li>
                  &#x2022;{" "}
                  {"Local (" +
                    Package +
                    ") : " +
                    price +
                    "( Excluding 5 % GST )"}
                </li>
                <li>&#x2022; Duration - 1 Day (Toll and parking extra).</li>
                <li>
                  &#x2022; {"Extra charge per hour : ₹" + selectedCar.extraHr}
                </li>
                <li>
                  &#x2022; {"Extra charge per km : ₹" + selectedCar.extraKm}
                </li>
                <li>
                  &#x2022;Opening KM/Time and Closing Time/Km will calculate
                  from Our garage to garage
                </li>
              </ul>
            )}
            {formType === "Airport" && (
              <ul className="flex flex-col gap-2">
                <li>
                  &#x2022;
                  {"Airport Transfer (AIRPORTDROP) :" +
                    price +
                    "( Excluding 5% GST )"}
                  ,
                </li>
                <li>&#x2022; Toll and parking extra.</li>
                <li>
                  &#x2022; {"Extra charge per hour : ₹" + selectedCar.extraHr}
                </li>
                <li>
                  &#x2022; {"Extra charge per km : ₹" + selectedCar.extraKm}
                </li>
              </ul>
            )}
          </PopupContent>
        </Popup>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col justify-center items-center w-full
`;

const Carlist = tw.div`
  flex flex-col w-full mt-2
`;

const Car = tw.div`
  flex flex-col justify-between p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300
`;

const Carimg = tw.div`
  w-full h-24 bg-cover bg-center rounded-lg
`;

const CarDetails = tw.div`
  flex-1 flex flex-col justify-center items-start
`;

const Service = tw.h3`
  text-lg font-bold
`;

const Price = tw.h4`
  text-xl font-medium
`;

const Time = tw.button`
  mt-2 bg-[#0080ff] text-white rounded-lg px-4 py-1
`;

const Popup = tw.div`
  fixed inset-0 flex items-center justify-center z-50
  bg-black bg-opacity-50
`;

const PopupContent = tw.div`
  bg-white rounded-lg shadow-lg p-4 w-full max-w-md
`;

const CloseButton = tw.button`
  absolute top-2 right-2 bg-transparent border-none cursor-pointer
`;

export default RideSelector;
