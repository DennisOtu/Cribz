import { useState, useEffect } from "react"
import axios from 'axios'

const PropertyList = () => {
	const [cribs, setCribs] = useState(null)

    useEffect(()=>{
  	axios.get("http://localhost:8000/api/v1/listings")
  	.then((res) => {
  		setCribs(res.data.list.display)
  		console.log(res.data.list.display)

  	})
    .then(console.log('use effect ran'))
    },[]) 
 
    return (
        <ul>
        {cribs && cribs.map(crib => <li>{crib.name}, {crib.address.country}</li>)}
        </ul>    
    )
}

export default PropertyList

