import { useState, useEffect } from "react"
import axios from 'axios'
import { Map, Marker } from 'pigeon-maps'

const LocationSearch = () => {
	const [location, setLocation] = useState('')
	const [place, setPlace] = useState('')

	const [cribs, setCribs] = useState(null)
  const [page, setPage] = useState(0)
  

    let currentPage = page+1

    useEffect(()=>{
    	axios.get(`http://localhost:8000/api/v1/listings/location?location=${location}&page=${page}`)
  	    .then((res) => {
  		setCribs(res.data)
  		console.log(res.data)})
    },[location, page])

    const nextPage = () => {
    	setPage(page+1)
    }

      const previousPage = () => {
        setPage(page-1)
      }

    const handleInputChange = (e) => {
      setPlace(e.target.value);
    };

    const getLocationCribs = ()=>{
    	setLocation(place)
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="description">Location</label>
          <input value={place} className="form-field mx-2" placeholder="enter location" onChange={handleInputChange}
            name="location"/>
        </div>
        
        <button onClick={getLocationCribs} className="btn btn-success">
          Submit
        </button>

        {cribs && <div> {`page ${currentPage}`} <button className='mx-2' onClick={nextPage}> next page </button> </div>}
    	  {currentPage > 1 && <button onClick={previousPage}>previous page</button>}
    	  
        <ul>
        {cribs && cribs.map(crib => <li>{crib.name}, {crib.address.country}</li>)}
        </ul> 
        
        {cribs &&
          <Map height={400} width={800} center={ [ cribs[0].address.location.coordinates[1], cribs[0].address.location.coordinates[0] ] } defaultZoom={11} animate={true}>
            {cribs && cribs.map(crib => <Marker width={50}
              anchor={[crib.address.location.coordinates[1], crib.address.location.coordinates[0]]} />)
            }
          </Map>
        }      
      </div> 

    )
}

export default LocationSearch
