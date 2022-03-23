import { useState } from "react"
import axios from 'axios'

const LocationSearch = () => {
	const [location, setLocation] = useState('')
	const [cribs, setCribs] = useState(null)


    const handleInputChange = event => {
        setLocation(event.target.value);
    };

    const getLocationCribs = ()=>{
    	axios.get(`http://localhost:8000/api/v1/listings/location?location=${location}`)
  	    .then((res) => {
  		setCribs(res.data)
  		console.log(res.data)})
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="description">Location</label>
          <input value={location} className="form-field mx-2" placeholder="enter location" onChange={handleInputChange}
            name="location"/>
        </div>
        <button onClick={getLocationCribs} className="btn btn-success">
          Submit
        </button>
        <ul>
        {cribs && cribs.map(crib => <li>{crib.name}, {crib.address.country}</li>)}
        </ul> 
      </div> 

    )
}

export default LocationSearch