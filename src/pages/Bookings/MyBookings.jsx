// import { AppContext } from "../../Context/AppContext";
// import './Bookings.css';
// import Button from "../../components/Button/Button";
// import CenterCard from "../../components/CenterCard/CenterCard";
// import React,{useEffect,useState} from 'react';
// import promo from '../../assets/addvertise.svg';
// import { format } from 'date-fns'


// function MyBookings() {
//   const [bookingData, setBookingData] = useState([]);
//   const [fulldata,setFullData] = useState([]);
//   const [searchText , setSearchText] = useState('');  

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem('bookings')) || [];
//     // console.log(data);
//     setBookingData(data);
//     setFullData(data);
//     // console.log('Booking data:', data);
//   }, []);

//   const formatdate = (date) =>{
//     const DATE = new Date(date);
//     return format(DATE, 'd MMMM yyyy')
//   };

//   const handleSearch = () =>{

//     if(searchText.trim() === '')
//     {
      
//       setBookingData(fulldata);
//       console.log('fulldata',fulldata)
//       console.log('Booking data:', bookingData);
//     }
//     else{
//       const newData = fulldata.filter((item) => 
//       item['Hospital Name'].toLowerCase().includes(searchText.toLowerCase()) 
//       );
//       console.log('newData',newData)
//       setBookingData(newData);
//     }

//   } ;

//   return (
//     <div className="my-bookings">

//     <div className="headerDiv">
//       <div className="my-bookings-header">
//          <h1>My Bookings</h1>
//       </div>
//       <div className="hospitalSearch">
//         <input 
//           type="text" 
//           placeholder="Search for hospitals..." 
//           value={searchText} 
//           onChange={(e) => setSearchText(e.target.value)} 
//           className="hospitalSearchInput" 

//           />

//         <Button onClick={handleSearch}>Search</Button>
//       </div>
//     </div>
//     <div className="bookings-container">
//       <div className="bookingsColumn1">
//         {bookingData.length > 0 ? (
//           bookingData.map((item) => {
//             const data = {
//               'name': item['Hospital Name'],
//               'city': item['city'],
//               'state': item['state'],
//               'time': item['time'],
//               'date': formatdate(item['date']),
//               'id': item['id'],
//             };
//            return <CenterCard data={data} key={item.id} booking={true}/>
//           })
//         ) : (
//           <h1>No bookings available</h1>
//         )}
//       </div>
//       <div className="bookingsColumn2">
//         <img src={promo} alt="advertisement" className="advertisement" />
//       </div>
      
//     </div>
//     </div>
//   );
// }   

// export default MyBookings;

import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import './Bookings.css';
import Button from "../../components/Button/Button";
import CenterCard from "../../components/CenterCard/CenterCard";
import promo from '../../assets/addvertise.svg';

function MyBookings() {
  const [bookingData, setBookingData] = useState([]);
  const [fulldata, setFullData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
     const timer = setTimeout(() => {
      const data = JSON.parse(localStorage.getItem('bookings')) || [];
      setBookingData(data);
      setFullData(data);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid date';
    try {
      const dateObj = parseISO(dateString);
      if (isNaN(dateObj)) return 'Invalid date';
      return format(dateObj, 'd MMMM yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Invalid time';
    try {
      const dateObj = parseISO(dateString);
      if (isNaN(dateObj)) return 'Invalid time';
      return format(dateObj, 'hh:mm a');
    } catch {
      return 'Invalid time';
    }
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      setBookingData(fulldata);
    } else {
      const newData = fulldata.filter((item) =>
        item['Hospital Name'].toLowerCase().includes(searchText.toLowerCase())
      );
      setBookingData(newData);
    }
  };

  return (
    <div className="my-bookings" data-testid="my-bookings-page">
      <div className="headerDiv">
        <div className="my-bookings-header">
          <h1 data-testid="bookings-title">My Bookings</h1>
        </div>
        <div className="hospitalSearch">
          <input
            type="text"
            placeholder="Search for hospitals..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="hospitalSearchInput"
            data-testid="search-input"
          />
          <Button onClick={handleSearch} data-testid="search-button">
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div data-testid="loading-spinner">Loading...</div>
      ) : (
        <div className="bookings-container">
          <div className="bookingsColumn1" data-testid="bookings-list">
            {bookingData.length > 0 ? (
              bookingData.map((item, index) => {
                const dateTimeStr = item.bookingDateTime || '';

                const data = {
                  name: item['Hospital Name'],
                  city: item['City'] || item['city'],
                  state: item['State'] || item['state'],
                  date: formatDate(dateTimeStr),
                  time: formatTime(dateTimeStr),
                  id: item['id'] || `${item['Hospital Name']}-${index}`,
                };

                return (
                  <CenterCard 
                    data={data} 
                    key={data.id} 
                    booking={true} 
                    data-testid={`booking-card-${index}`}
                  />
                );
              })
            ) : (
              <h2 data-testid="no-bookings-message">No bookings available</h2>
            )}
          </div>
          <div className="bookingsColumn2">
            <img src={promo} alt="advertisement" className="advertisement" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
