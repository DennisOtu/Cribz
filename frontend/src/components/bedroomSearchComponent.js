import { useState } from "react"
import axios from 'axios'

const BedroomSearch = () => {
	const [bedrooms, setBedrooms] = useState('')
	const [cribs, setCribs] = useState(null)


    const handleInputChange = event => {
        setBedrooms(event.target.value);
    };

    const getBedroomCribs = ()=>{
    	axios.get(`http://localhost:8000/api/v1/listings/bedrooms?bedrooms=${bedrooms}`)
  	    .then((res) => {
  		setCribs(res.data)
  		console.log(res.data)})
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="description">number of bedrooms</label>
          <input value={bedrooms} className="form-field mx-2" placeholder="enter number" onChange={handleInputChange}
            name="bedrooms"/>
        </div>
        <button onClick={getBedroomCribs} className="btn btn-success">
          Submit
        </button>
        <ul>
        {cribs && cribs.map(crib => <li>{crib.name}, {crib.address.country}</li>)}
        </ul> 
      </div> 

    )
}

export default BedroomSearch