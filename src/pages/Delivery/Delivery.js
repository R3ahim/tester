import React,{useEffect,useState} from 'react'
import './Deliver.css'
import axios from 'axios';
import StoreContextProvider from '../../components/context/StoreContext';

const Delivery = () => {
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(0);
  const [visible ,setVisible] = useState(false)
  const [headerText,setHeaderText] = useState('We deliver to your address')

  const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'
  // const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'


  
  const apiKey = 'AlzaSyTZ_eyJWeHxBphJBh4fcoxo2oB_b7QTkvA'; // Replace with your actual API key

  const calculateDistance = async () => {
    if (!address1 || !street || !house || !city) {
      alert("Please fill in all fields.");
      return;
    }

    // Combine street, house, and city to form the second address
    const address2 = `${house} ${street}, ${city}`;
  console.log(address2)
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
        // console.log(distanceData.distance.text,'line 44')
        const dist = distanceData.distance.text;
        if(dist <=3){
          setPrice(0)
        }
          if (dist <= 5) {
            setPrice(5);
          } else if (dist > 5 && dist <= 7) {
            setPrice(8);
          } else if (dist > 7 && dist <= 10) {
            setPrice(14);
          } 
          else if (dist > 10 ) {
            setPrice(18);
          }
      } else {
        alert("Unable to calculate distance.");
        setPrice(0.1);
        setHeaderText("we can't deliver to your Address")
    
      }
    } catch (error) {
      console.error("Error fetching distance data", error);
    }
    const dist = distance;
    console.log(dist)
   
     
      setVisible(true)
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const scheduleData = `
    Monday: 10:00 - 00:00
    Tuesday: 10:00 - 00:00
    Wednesday: 10:00 - 00:00
    Thursday: 10:00 - 00:00
    Friday: 10:00 - 02:00
    Saturday: 10:00 - 02:00
    Sunday: 10:00 - 00:00
  `;
  const deliverScedule = `
  Monday: 11:00 - 22:30
  Tuesday: 11:00 - 22:30
  Wednesday: 11:00 - 22:30
  Thursday: 11:00 - 22:30
  Friday: 11:00 - 22:30
  Saturday: 11:00 - 22:30
  Sunday: 11:00 - 22:30
`;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };

  useEffect(()=>{
    const calculatePrice = () => {
      const dist = distance; // Convert distance to a number
    
    }
    calculatePrice(); 
   },[distance])

// New data to add or update
const newData = { id: 1, name: 'kobbar', roll: 24 };

// Retrieve existing data from localStorage
let storedData = JSON.parse(localStorage.getItem('students')) || [];

// Find the index of the existing item with the same id
const existingIndex = storedData.findIndex(item => item.id === newData.id);

if (existingIndex !== -1) {
    // If the item exists, update it
    storedData[existingIndex] = { ...storedData[existingIndex], ...newData };
} else {
    // If the item doesn't exist, add the new data
    storedData.push(newData);
}


  return (
    <div  style={{backgroundColor:'#e2e2e2'}} className='delivery-container' >
            <h1 className='text-center '>Check where we deliver!</h1>



<div className="row g-3 marginer">
  <div className="col-md-5">
    <label htmlFor="inputEmail4" className="form-label">Street</label>
    <input type="text" className="form-control" id="inputEmail4"  value={street} 
          onChange={(e) => setStreet(e.target.value)}  placeholder='enter your Street name'/>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputPassword4" className="form-label">House Number</label>
    <input type="text" className="form-control" id="inputPassword4"  value={house} 
          onChange={(e) => setHouse(e.target.value)} 
          placeholder="Enter house number" />
  </div>
    <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">City</label>
    <input type="text" className="form-control" id="inputEmail4"   value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city" />
  </div>
  <div className="col-12">
      <button  onClick={calculateDistance} type="submit" className="btn btn-primary">Check</button>
  </div>  </div>

  {visible ? <div  className="details-container">
  <h2 style={{textAlign:'center' ,marginTop:'10px'}}>{headerText}</h2>
<div className="details-sub-container p-4">

  <div className="details-left">
 <h5>Opening hours: </h5>
<span>
    < p onClick={toggleVisibility}>
        {isVisible ? 'Today:  <' : ' Today:  >'}
      </p>
      {isVisible && (
        <pre >
          {scheduleData}
        </pre>
      )}
  </span>  
  <h5>Opening hours: </h5>

  <span>
    < p onClick={toggleVisibility2}>
        {isVisible2 ? 'Today:  <' : ' Today:  >'}
      </p>
      {isVisible2 && (
        <pre >
          {deliverScedule}
        </pre>
      )}
  </span>  

  </div>
  <div className="details-right">
    <h4>Shipping Information: </h4>
    <br />
    <p>Shipping Cost: {price === 0.1?'out of range':price}.00 PLN</p>
    <p>Minimum order value: 30.00 PLN</p>
    <p>Free delivery from: 100.00 PLN</p>
      <p>The driver carries a maximum of: 20 PLN</p>
    <p>Payment: Cash, Card on delivery, Quick transfer</p>
  </div>

  
  </div>
</div> : ' '}






    </div>
  )
}

export default Delivery