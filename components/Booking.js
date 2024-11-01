import React, { useState,useEffect} from "react";
import tw from "tailwind-styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Car, MapPin, Calendar, Clock, DollarSign, Info, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (bookingDone) {
      const timer = setTimeout(() => {
        setBookingDone(false);
      }, 1000); // Popup disappears after 5 seconds
  
      return () => clearTimeout(timer); // Cleanup on unmount or when bookingDone changes
    }
  }, [bookingDone]);

  // Price calculation logic (unchanged)
  const chauffeurCharges = 300;
  const gstRate = 0.05;
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
    // ... (rest of the handleFormSubmit function remains unchanged)
    setBookingDone(true);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handlebooking}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Booking Details</Title>
      </Header>

      <Content>
        <BookingSummary>
          <CarAndPriceSection>
            <CarImage className={selectedCar.imgUrl} />
            <CarInfo>
              <CarName>{selectedCar.service}</CarName>
              <CarSeats>{selectedCar.seaters} seaters</CarSeats>
              <PriceDisplay>{formattedFinalPrice}</PriceDisplay>
            </CarInfo>
          </CarAndPriceSection>

          <DetailsToggle onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
            {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </DetailsToggle>

          {showDetails && (
            <>
              <SummarySection>
                <SectionTitle>
                  <MapPin size={20} />
                  Trip Details
                </SectionTitle>
                <TripInfo>
                  <InfoItem>
                    <Label>Pickup:</Label>
                    <Value>{pickup}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>Dropoff:</Label>
                    <Value>{dropoff}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>Trip Type:</Label>
                    <Value>
                      {formType === "Local Transport"
                        ? formType + " (" + Package + ")"
                        : formType + " (" + tripType + ")"}
                    </Value>
                  </InfoItem>
                </TripInfo>
              </SummarySection>

              <SummarySection>
                <SectionTitle>
                  <Calendar size={20} />
                  Date & Time
                </SectionTitle>
                <DateTimeInfo>
                  <InfoItem>
                    <Label>Pickup Date:</Label>
                    <Value>{pickupDate}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>Pickup Time:</Label>
                    <Value>{pickupTime}</Value>
                  </InfoItem>
                  {days && (
                    <InfoItem>
                      <Label>Duration:</Label>
                      <Value>{days} day(s)</Value>
                    </InfoItem>
                  )}
                </DateTimeInfo>
              </SummarySection>

              <SummarySection>
                <SectionTitle>
                  <DollarSign size={20} />
                  Fare Breakdown
                </SectionTitle>
                <FareBreakdown>
                  <InfoItem>
                    <Label>Base Price:</Label>
                    <Value>₹{basePrice.toLocaleString("en-IN")}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>Chauffeur Charges:</Label>
                    <Value>₹{chauffeurCharges.toLocaleString("en-IN")}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>GST (5%):</Label>
                    <Value>₹{gstAmount.toLocaleString("en-IN")}</Value>
                  </InfoItem>
                </FareBreakdown>
              </SummarySection>

              <SummarySection>
                <SectionTitle>
                  <Info size={20} />
                  Additional Information
                </SectionTitle>
                <AdditionalInfo>
                  <InfoItem>
                    <Label>Extra Hour Charge:</Label>
                    <Value>₹{selectedCar.extraHr}/hour</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>Extra Km Charge:</Label>
                    <Value>₹{selectedCar.extraKm}/km</Value>
                  </InfoItem>
                  {formType === "OutStation" && (
                    <InfoItem>
                      <Label>Minimum Distance:</Label>
                      <Value>300 Km/day</Value>
                    </InfoItem>
                  )}
                </AdditionalInfo>
              </SummarySection>
            </>
          )}
        </BookingSummary>

        <BookingForm onSubmit={handleFormSubmit}>
          <FormTitle>Enter Your Details</FormTitle>
          <InputGroup>
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
          </InputGroup>
          <Input
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            required
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <SubmitButton type="submit">Confirm Booking</SubmitButton>
        </BookingForm>
      </Content>

      {bookingDone && (
        <SuccessPopup>
          <PopupContent>
            <SuccessIcon />
            <SuccessMessage>Inquiry submitted!</SuccessMessage>
            <SuccessSubMessage>Kindly look out for our call.</SuccessSubMessage>
            <ThankYouMessage>Thank You 🙏</ThankYouMessage>
          </PopupContent>
        </SuccessPopup>
      )}

      <ToastContainer />
    </Container>
  );
};

const Container = tw.div`
  flex flex-col min-h-screen bg-gray-100
`;

const Header = tw.header`
  flex items-center bg-white shadow-md p-4
`;

const BackButton = tw.button`
  p-2 rounded-full hover:bg-gray-200 transition-colors
`;

const Title = tw.h1`
  text-2xl font-semibold ml-4
`;

const Content = tw.div`
  flex flex-col lg:flex-row gap-8 p-6
`;

const BookingSummary = tw.div`
  flex-1 bg-white rounded-lg shadow-md p-6 space-y-6
`;

const CarAndPriceSection = tw.div`
  flex items-center space-x-4 mb-4
`;

const CarImage = tw.div`
  w-32 h-32 bg-cover bg-center rounded-lg
`;

const CarInfo = tw.div`
  flex-1
`;

const CarName = tw.h3`
  text-xl font-semibold
`;

const CarSeats = tw.p`
  text-gray-600
`;

const PriceDisplay = tw.div`
  text-2xl font-bold text-green-600 mt-2
`;

const DetailsToggle = tw.button`
  w-full flex items-center justify-between bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors
`;

const SummarySection = tw.div`
  border-b border-gray-200 pb-4 last:border-b-0
`;

const SectionTitle = tw.h2`
  text-lg font-semibold mb-4 flex items-center gap-2
`;

const TripInfo = tw.div`
  space-y-2
`;

const DateTimeInfo = tw.div`
  space-y-2
`;

const FareBreakdown = tw.div`
  space-y-2
`;

const AdditionalInfo = tw.div`
  space-y-2
`;

const InfoItem = tw.div`
  flex justify-between items-center
`;

const Label = tw.span`
  text-gray-600
`;

const Value = tw.span`
  font-medium
`;

const BookingForm = tw.form`
  flex-1 bg-white rounded-lg shadow-md p-6 space-y-4
`;

const FormTitle = tw.h2`
  text-xl font-semibold mb-4
`;

const InputGroup = tw.div`
  flex gap-4
`;

const Input = tw.input`
  w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
`;

const SubmitButton = tw.button`
  w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors
`;

const SuccessPopup = tw.div`
  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
`;

const PopupContent = tw.div`
  bg-white rounded-lg shadow-lg p-8 text-center
`;

const SuccessIcon = tw.div`
  w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center
  before:content-['✓'] before:text-white before:text-4xl
`;

const SuccessMessage = tw.h2`
  text-2xl font-semibold text-green-600 mb-2
`;

const SuccessSubMessage = tw.p`
  text-lg text-gray-600 mb-2
`;

const ThankYouMessage = tw.p`
  text-lg font-medium
`;

export default Booking;