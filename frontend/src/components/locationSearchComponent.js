import { useState, useEffect } from "react"
import axios from 'axios'

const LocationSearch = () => {
	const [location, setLocation] = useState('')
	const [keyWord, setKeyWord] = useState('')

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

    const handleInputChange = event => {
        setKeyWord(event.target.value);
    };

    const getLocationCribs = ()=>{
    	setLocation(keyWord)
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="description">Location</label>
          <input value={keyWord} className="form-field mx-2" placeholder="enter location" onChange={handleInputChange}
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
      </div> 

    )
}

export default LocationSearch

