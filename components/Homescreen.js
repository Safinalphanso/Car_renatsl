export default function HomeScreen(){
return(
    <div className="h-full w-full flex-1 flex items-center justify-center p-2 md:p-4">
    <div 
      id="bg" 
      className="relative flex h-full rounded-lg w-full flex-col items-center justify-center md:flex-row gap-4 sm:gap-4 sm:p-4 p-2"
    >
      <div className={`absolute inset-0 transition-opacity duration-500 rounded-lg ${
        isSearchHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <Map
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          Package={Package}
          formType={formType}
        />
      </div>
      <div className={`absolute inset-0 bg transition-opacity duration-500 rounded-lg ${
        isSearchHovered ? 'opacity-0' : 'opacity-100'
      }`} />
      
      <div
        id="homePage"
        className="order-1 md:-order-1 flex flex-col gap-6 justify-center items-center w-full md:w-3/6 relative z-10"
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
        className="flex justify-center items-center w-full md:w-3/6 relative z-10"
        onMouseEnter={() => setIsSearchHovered(true)}
        onMouseLeave={() => setIsSearchHovered(false)}
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
        />
      </div>
    </div>
  </div>
)
}