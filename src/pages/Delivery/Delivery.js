import React,{useEffect,useState} from 'react'
import './Deliver.css'
import axios from 'axios';

const Delivery = () => {
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState(null);
  const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'
  // const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'

  const apiKey = 'AlzaSy8CAJZTzcPZl3yhDq5T07T-4WD-uZE-qMY'; // Replace with your actual API key

  const calculateDistance = async () => {
    if (!address1 || !street || !house || !city) {
      alert("Please fill in all fields.");
      return;
    }

    // Combine street, house, and city to form the second address
    const address2 = `${house} ${street}, ${city}`;

    try {
      const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json`, {
        params: {
          origins: address1,
          destinations: address2,
          key: apiKey,
        },
      });

      const distanceData = response.data.rows[0].elements[0];
      console.log(response.data.rows[0])
      console.log(response)
      if (distanceData.status === 'OK') {
        setDistance(distanceData.distance.text);
        localStorage.setItem('destence',distanceData.distance.text)
      } else {
        alert("Unable to calculate distance.");
      }
    } catch (error) {
      console.error("Error fetching distance data", error);
    }
  };

  const setLoc = ()=>{

        localStorage.setItem('destence',3)

  }

  return (
    <div className='widhter'>
            <h1 className='text-center '>Check where we deliver!</h1>
            <div>
      <h2>Distance Calculator</h2>
    
      <div className='mt-5'>
        <label>Street: </label>
        <input 
          type="text" 
          value={street} 
          onChange={(e) => setStreet(e.target.value)} 
          placeholder="Enter street" 
        />
      </div>
      <div>
        <label>House: </label>
        <input 
          type="text" 
          value={house} 
          onChange={(e) => setHouse(e.target.value)} 
          placeholder="Enter house number" 
        />
      </div>
      <div>
        <label>City: </label>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city" 
        />
      </div>
      <button onClick={calculateDistance}>Calculate Distance</button>
      <button onClick={setLoc}>onlcikc</button>
      {distance && (
        <div>
          <h3>Distance: {distance}</h3>
        </div>
      )}
    </div>
    </div>
  )
}

export default Delivery