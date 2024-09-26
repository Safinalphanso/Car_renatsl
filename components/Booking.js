import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { carList } from "../data/carList";

const Booking = ({
  handlebooking,
  selectedCar,
  setSelectedCar,
  pickup,
  dropoff,
  tripType,
  days,
  pickupDate,
  Price,
  formType,
  Package,
  rideDistance,
  pickupTime,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // Updated price calculation logic
  const chauffeurCharges = 300; // Chauffeur fee
  const gstRate = 0.05; // GST rate (5%)
  const basePrice = Number(Price);
  const priceBeforeGST = basePrice + chauffeurCharges;
  const gstAmount = priceBeforeGST * gstRate;
  const finalPrice = priceBeforeGST + gstAmount;
  const formattedFinalPrice = finalPrice.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var text =
      "Name: " +
      name +
      " " +
      lname +
      "\n" +
      "Phone: " +
      phone +
      "\n" +
      "DutyType: " +
      (formType === "Local Transport"
        ? formType + "(" + Package + ")"
        : formType + "(" + tripType + ")") +
      "\n" +
      "Pickup: " +
      pickup +
      "\n" +
      "Dropoff: " +
      dropoff +
      "\n" +
      "Date-Time(pickup): " +
      pickupDate + "," + pickupTime +
      "\n" +
      "Days: " +
      days +
      " day/s" +
      "\n" +
      "Car: " +
      selectedCar.service +
      "\n" +
      "Price: " +
      formattedFinalPrice +
      ".";
    try {
      const response = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=918010955252&text=${encodeURIComponent(
          `${text}`
        )}&apikey=7911773`
      );
    } catch (error) {
      console.error(error);
    }
    setBookingDone(true);
  };

  useEffect(() => {
    if (bookingDone) {
      setTimeout(() => {
        window.location.reload(); // Refresh the browser after a certain duration
      }, 4000); // 4000 milliseconds = 4 seconds
    }
  }, [bookingDone]);

  return (
    <>
      <Buttoncon>
        <Back
          alt="Back button"
          onClick={handlebooking}
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
        />
      </Buttoncon>
      <div className="flex height w-full overflow-y-scroll gap-2 items-center justify-center flex-col md:flex-row">
        <div
          id="form"
          className="flex-1 flex w-full h-full rounded-xl items-center justify-center "
        >
          <InputContainer onSubmit={handleFormSubmit}>
            <InputBoxes>
              <Input
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              <Input
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                type="text"
                required
              />
              <Input
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                required
              />
            </InputBoxes>
            <ConfirmBtn type="submit" value="Submit" />
          </InputContainer>
        </div>
        <div className="flex-1 flex flex-col h-full w-full rounded-xl items-center border border-gray-600 justify-center overflow-y-scroll">
          <div className="flex flex-col w-full h-full p-2 rounded-xl">
            {bookingDone && (
              <div className="popup-animation h-screen w-screen  flex items-center justify-center">
                <div className="popup-content bg-white h-52 max-w-lg w-full rounded-lg shadow-md flex flex-col gap-4 items-center justify-center">
                  <div className="popup-icon h-16 w-16"></div>
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <h2 className="font-semibold text-[#3BA09A]">Inquiry submitted!!</h2>
                    <h2 className="text-lg">Kindly lookout for our call.</h2>
                    <h2 className="text-lg">Thank You🙏</h2>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center items-center border-b border-gray-600">
              <h1 className="text-gray-500 text-center text-lg">
                Scroll To View More
              </h1>
            </div>
            <div className="flex justify-between border-b border-gray-600 gap-4 py-2 flex-col md:flex-row items-center w-full">
              <div
                alt="Selected Car Image"
                className={`w-full md:w-1/2 aspect-square border-b md:border-r md:border-b-0 border-gray-600 ${selectedCar.imgUrl}`}
              ></div>
              <CarDetails className="flex-1 flex justify-center mb-4 md:mb-0">
                <Service>{selectedCar.service}</Service>
                <h3 className="text-xl text-center">
                  {selectedCar.seaters + " seaters"}
                </h3>
              </CarDetails>
            </div>
            <div className="w-full justify-center flex text-lg border-b border-gray-600 py-2 ">
              <div className="flex flex-col items-start gap-2">
                <h2 className="flex text-green-700 ">
                  Pickup:- <span className="text-black">{pickup}</span>
                </h2>
                <h2 className="flex text-red-500 gap-2">
                  Dropoff:- <span className="text-black">{dropoff}</span>
                </h2>
                <h2 className="flex gap-2">
                  DutyType:-
                  <span className="text-black">
                    {formType === "Local Transport"
                      ? formType + "(" + Package + ")"
                      : formType + "(" + tripType + ")"}
                  </span>
                </h2>
                <h2 className="flex gap-2">
                  Pickup Date-Time:-
                  <span className="text-black">{pickupDate + " , " + pickupTime}</span>
                </h2>
              </div>
            </div>
            <div className="flex py-2 justify-center items-center w-full font-uber font-semibold text-4xl border-b border-gray-600">
              <h2>{formattedFinalPrice}</h2>
            </div>

            {/* Updated Fare Breakdown Section */}
            <div className="py-2 flex flex-col justify-center items-center gap-3">
              <h2 className="text-xl font-semibold">Fare Breakdown</h2>
              <ul className="flex flex-col gap-2">
                <li>&#x2022; Vehicle Base Price: ₹{basePrice.toLocaleString("en-IN")}</li>
                <li>&#x2022; Chauffeur Charges: ₹{chauffeurCharges.toLocaleString("en-IN")}</li>
                <li>&#x2022; Price before GST: ₹{priceBeforeGST.toLocaleString("en-IN")}</li>
                <li>&#x2022; GST (5%): ₹{gstAmount.toLocaleString("en-IN")}</li>
                <li>&#x2022; Final Price: {formattedFinalPrice}</li>
              </ul>
            </div>

            {/* Updated Additional Information Section */}
            <div className="py-2 flex flex-col justify-center items-center gap-3">
              <h2 className="text-xl font-semibold">Additional Information</h2>
              {formType === "OutStation" && tripType === "Round Trip" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022;{" "}
                    {"Outstation (Roundtrip " +
                      days +
                      " day/s) " +
                      formattedFinalPrice +
                      " Including 5% GST"}
                  </li>
                  <li>
                    &#x2022;{" "}
                    {"Minimum distance / day " + "300 Km"}
                  </li>
                  <li>
                    &#x2022; Extra charges driver allowance Day ₹400 / Night (11:00 PM to 5:00 AM) ₹300 
                  </li>
                  <li>
                    &#x2022; Extra Hour Charge: ₹{selectedCar.extraHr} per hour
                  </li>
                  <li>
                    &#x2022; Extra Km Charge: ₹{selectedCar.extraKm} per km
                  </li>
                  <li>
                    &#x2022; Opening/Closing Km & Time will be Calculated from our Garage 
                  </li>
                  <li>
                    &#x2022; The final fare may vary depending on Traffic Conditions, Route Selection & Vehicle Availability.
                  </li>
                </ul>
              )}
              {formType === "OutStation" && tripType === "One Way" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022;{" "}
                    {"Outstation (One Way) " + formattedFinalPrice + " Including 5% GST"}
                  </li>
                  <li>
                    &#x2022;{" "}
                    {"Minimum distance " + "300 Km"}
                  </li>
                  <li>
                    &#x2022; Extra Hour Charge: ₹{selectedCar.extraHr} per hour
                  </li>
                  <li>
                    &#x2022; Extra Km Charge: ₹{selectedCar.extraKm} per km
                  </li>
                </ul>
              )}
              {formType === "Local Transport" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022; Extra Hour Charge: ₹{selectedCar.extraHr} per hour
                  </li>
                  <li>
                    &#x2022; Extra Km Charge: ₹{selectedCar.extraKm} per km
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const Buttoncon = tw.div`
  h-12 w-full flex justify-center items-center
`;

const Back = tw.img`
  w-10 h-10 
`;

const InputContainer = tw.form`
  flex flex-col justify-center items-center gap-4 p-4 
`;

const InputBoxes = tw.div`
  flex flex-col gap-2
`;

const Input = tw.input`
  h-12 w-full border border-gray-400 p-2 rounded-lg
`;

const ConfirmBtn = tw.input`
  h-12 w-full bg-[#3BA09A] text-white rounded-lg cursor-pointer
`;

const CarDetails = tw.div`
  flex flex-col items-center justify-center text-center p-4
`;

const Service = tw.h2`
  text-2xl font-semibold
`;

export default Booking;