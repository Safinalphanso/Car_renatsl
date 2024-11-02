import tw from "tailwind-styled-components";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Confirm from "../components/Confirm";
import Link from "next/link";
import { BsFillTelephoneFill, BsFacebook, BsLinkedin } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import Navbar from "../components/Navbar";
import Fleet from "../components/Fleet";
import WhyChooseUs from "../components/WhuChooseUS";
import Footer from "../components/Footer";
import Image from 'next/image';

// Typing Animation Component
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const fullText = 'Rent. Explore. Thrive.';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(current => current + fullText[index]);
        setIndex(index + 1);
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      const restartTimeout = setTimeout(() => {
        setText('');
        setIndex(0);
      }, 2000);

      return () => clearTimeout(restartTimeout);
    }
  }, [index]);

  return (
    <h1 className="text-[10.7vw] leading-[10.7vw] md:text-[3.7vw] md:leading-[3.7vw] bold text-blue-500">
      {text}
      <span className="animate-blink">|</span>
    </h1>
  );
};

export default function Home() {
  const [confirm, setconfirm] = useState(false);
  const [search, setSearch] = useState(false);
  const [formType, setFormType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [days, setDays] = useState("");
  const [isMapFixed, setIsMapFixed] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [Package, setPackage] = useState("");
  const [pickupCoordinates, setpickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setdropoffCoordinates] = useState([0, 0]);
  const [showPopup, setShowPopup] = useState(false);

  const handleclick = () => {
    setSearch(!search);
  };

  const handleconfirm = () => {
    console.log(formType, pickupDate, pickupTime, pickup, days, dropoff, tripType, Package);
    setconfirm(!confirm);
  };

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
      new URLSearchParams({
        access_token:
          "pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og",
        limit: 1,
      })
    )
      .then((response) => response.json())
      .then((data) => {
        setpickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
      new URLSearchParams({
        access_token:
          "pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og",
        limit: 1,
      })
    )
      .then((response) => response.json())
      .then((data) => {
        setdropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    if (pickup !== "" && dropoff !== "") {
      getPickupCoordinates(pickup);
      getDropoffCoordinates(dropoff);
    } else if (pickup !== "" && Package !== "") {
      getPickupCoordinates(pickup);
    }
  }, [pickup, dropoff, Package, search]);

  useEffect(() => {
    if (search) {
      toast.info(
        "Opening KM/Time and Closing Time/Km will calculate from Our garage to garage",
        {
          position: "top-center",
          autoClose: false,
          draggablePercent: 20,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }, [search]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Wrapper className={`${search && !confirm ? "p-2 h-screen md:flex-row gap-2" : "p-0 h-auto"}`}>
      {!confirm && (
        <>
          <div
            id="scroll"
            className={`flex flex-col flex-1 gap-8 ${search ? "border rounded-xl" : ""} order-1 md:-order-1 border-gray-600`}
          >
            {!search && (
              <>
                <div className="h-screen flex flex-col">
                  <Navbar />
                  <div className="h-full w-full flex-1 flex items-center justify-center p-2 md:p-4">
                    <div 
                      id="bg" 
                      className={`relative flex h-full rounded-lg w-full flex-col items-center ${isSearchHovered || isMapFixed ? "justify-end":"justify-center"} md:flex-row gap-4 sm:gap-4 sm:p-4 p-2`}
                    >
                      {/* Map Toggle Button */}
                      <button
                        onClick={() => setIsMapFixed(!isMapFixed)}
                        className="absolute top-4 right-4 z-20 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                      >
                        <span className="material-icons">
                          {isMapFixed ? 'map_off' : 'map'}
                        </span>
                        {isMapFixed ? "Hide Map" : "Show Map"}
                      </button>

                      <div className={`absolute inset-0 transition-opacity duration-500 rounded-lg ${
                        isSearchHovered || isMapFixed ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <Map
                          pickupCoordinates={pickupCoordinates}
                          dropoffCoordinates={dropoffCoordinates}
                          Package={Package}
                          formType={formType}
                        />
                      </div>
                      <div className={`absolute inset-0 bg transition-opacity duration-500 rounded-lg ${
                        isSearchHovered || isMapFixed ? 'opacity-0' : 'opacity-100'
                      }`} />
                      
                      <div
                        id="homePage"
                        className={`order-1 md:-order-1 ${!isSearchHovered && !isMapFixed ? "flex":"hidden"} flex-col gap-6 justify-center items-center w-full md:w-3/6 relative z-10`}
                      >
                        <Header>
                          <TypingAnimation />
                        </Header>
                        <Header className="flex flex-col text-2xl font-semibold">
                          <h2 className="text-gray-100 text-center">
                            press the button below to start booking your dream
                            ride today
                            <span className="text-white text-start">
                              . Let the journey begin!
                            </span>
                          </h2>
                        </Header>
                      </div>
                      <div 
                        className="flex justify-center items-end w-full md:w-3/6 relative z-10"
                        onMouseEnter={() => !isMapFixed && setIsSearchHovered(true)}
                        onMouseLeave={() => !isMapFixed && setIsSearchHovered(false)}
                      >
                        <Search
                          handleclick={handleclick}
                          handleconfirm={handleconfirm}
                          pickup={pickup}
                          setPickup={setPickup}
                          dropoff={dropoff}
                          setDropoff={setDropoff}
                          tripType={tripType}
                          setTripType={setTripType}
                          formType={formType}
                          setFormType={setFormType}
                          setDays={setDays}
                          setPickupDate={setPickupDate}
                          pickupDate={pickupDate}
                          setPickupTime={setPickupTime}
                          setPackage={setPackage}
                          Package={Package}
                          getPickupCoordinates={getPickupCoordinates}
                          getDropoffCoordinates={getDropoffCoordinates}
                          setpickupCoordinates={setpickupCoordinates}
                          setdropoffCoordinates={setdropoffCoordinates}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Fleet />
                <WhyChooseUs />
                <Footer />
              </>
            )}
          </div>
        </>
      )}
      {confirm && (
        <Confirm
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          handleconfirm={handleconfirm}
          pickup={pickup}
          dropoff={dropoff}
          tripType={tripType}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          days={days}
          formType={formType}
          Package={Package}
        />
      )}
      {showPopup && (
        <Popup>
          <div className="h-14 text-lg rounded-t-lg flex font-medium justify-center items-center text-white max-w-md bg-[#0080FF] w-full md:w-5/6">
            <h2>Select a option</h2>
          </div>
          <PopupContent>
            <CloseButton onClick={closePopup}>
              <Image
                className="h-4"
                src="https://img.icons8.com/?size=512&id=46&format=png"
              />
            </CloseButton>
            <ActionButtons className="items-center">
              <ActionButton
                onClick={() => {
                  setFormType("OutStation");
                  handleclick();
                  closePopup();
                }}
              >
                <ActionButtonImg src="https://img.icons8.com/?size=512&id=GR0X8aZ3trYu&format=png" />
                <Text>OutStation</Text>
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setFormType("Local Transport");
                  handleclick();
                  closePopup();
                }}
              >
                <ActionButtonImg src="https://img.icons8.com/?size=512&id=fsoiqMUp0O4v&format=png" />
                <Text>Local Transport</Text>
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setFormType("Airport");
                  handleclick();
                  closePopup();
                }}
              >
                <ActionButtonImg src="https://img.icons8.com/?size=512&id=akvTP3kbVnLv&format=png" />
                <Text>Airport(Pickup / dropoff)</Text>
              </ActionButton>
            </ActionButtons>
          </PopupContent>
        </Popup>
      )}
      <FloatingCallButton className="FloatingCallButton">
        <Link href="tel:80109 55252">
          <FloatingCallIcon className="FloatingCallIcon" />
        </Link>
      </FloatingCallButton>
      <ToastContainer
        position="top-center"
        autoClose={false}
        draggablePercent={20}
        limit={1}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </Wrapper>
  );
}

// Styled Components
const Wrapper = tw.div`
  flex flex-col bg-white
`;

const Header = tw.div`
  flex flex-col justify-between items-center 
`;

const ActionButtons = tw.div`
  flex justify-center w-full flex-col gap-2
`;

const ActionButton = tw.button`
 flex w-full font-medium px-4 py-2 shadow-md text-base items-center h-16  justify-between rounded-lg transform hover:scale-105 transition border border-gray-400
`;

const Text = tw.span`text-start w-5/6`;

const ActionButtonImg = tw.img`
  h-10 
`;

const Popup = tw.div`
  fixed top-0 left-0 right-0 bottom-0 flex items-center flex-col justify-center bg-black bg-opacity-50 p-2 z-10 text-black
`;

const PopupContent = tw.div`
  bg-white rounded-b-lg max-w-md w-full md:w-5/6 py-6 flex justify-center items-center flex-col px-2
`;

const CloseButton = tw.button`
  absolute top-4 right-4 p-2 rounded-full bg-white text-black
`;

const FloatingCallButton = tw.div`
  md:hidden borber borber-gray-500 flex fixed bottom-6 right-6 p-4 bg-blue-700 rounded-full shadow-lg items-center gap-2 text-white transition-all duration-300
`;

const FloatingCallIcon = tw(BsFillTelephoneFill)`
  text-2xl
`;