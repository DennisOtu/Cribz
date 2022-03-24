import { useState } from "react"
import axios from 'axios'

const BedroomSearch = () => {
	const [bedrooms, setBedrooms] = useState('')
	const [cribs, setCribs] = useState(null)

    const handleInputChange = e => {
        setBedrooms(e.target.value);
    };

    const getBedroomCribs = ()=>{
    	axios.get(`http://localhost:8000/api/v1/listings/bedrooms?bedrooms=${bedrooms}`)
  	    .then((res) => {
  		setCribs(res.data)
  		console.log(res.data)})
    }

    return (
      <div>
      <div>
      number of bedrooms
        <select className='mx-2' value={bedrooms} onChange={handleInputChange}>
          <option value=''></option>
          <option value='1'> 1 </option>
          <option value='2'> 2 </option>
          <option value='3'> 3 </option>
          <option value='4'> 4 </option>
        </select>
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