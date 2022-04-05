import { useState, useEffect } from "react"
import axios from 'axios'

const CompoundSearch = () => {
	const [location, setLocation] = useState('')
	const [place, setPlace] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bedNum, setBedNum] = useState('')
  const [page, setPage] = useState(0)
  const [pageReset, setPageReset] = useState(0)

	const [cribs, setCribs] = useState(null)
    let currentPage = page+1

    useEffect(()=>{
    	axios.get(`http://localhost:8000/api/v1/listings/compound?location=${location}&bedrooms=${bedrooms}&page=${page}`)
  	    .then((res) => {
  		setCribs(res.data)
  		console.log(res.data)})
    },[location, bedrooms, page])

    const nextPage = () => {
    	setPage(page+1)
    }

    const previousPage = () => {
    	setPage(page-1)
    }

    const changeLocation = (e) => {
      setPlace(e.target.value);
    };

    const changeBedNum = (e) => {
      setPageReset(0)
      setBedNum(e.target.value)
    }
  

    const getCribs = ()=>{
      setLocation(place)
      setBedrooms(bedNum)
      setPage(pageReset)
    }

  return (
      <div>
        <div>
          <div className="form-group">
            <label htmlFor="description">Location</label>
            <input value={place} className="form-field mx-2" placeholder="enter location" onChange={changeLocation}
              name="location"/>
          </div>
        </div>
        <div>
          number of bedrooms
            <select className='mx-2' value={bedNum} onChange={changeBedNum}>
              <option value=''></option>
              <option value='1'> 1 </option>
              <option value='2'> 2 </option>
              <option value='3'> 3 </option>
              <option value='4'> 4 </option>
              <option value='5'> 5 </option>
              <option value='6'> 6 </option>
              <option value='7'> 7 </option>
              <option value='8'> 8 </option>
              <option value='9'> 9 </option>

            </select>
        </div>
        <button onClick={getCribs} className="btn btn-success">
          Submit
        </button>

        {cribs && <div> {`page ${currentPage}`} <button className='mx-2' onClick={nextPage}> next page </button> </div>}
        {currentPage > 1 && <button onClick={previousPage}>previous page</button>}
      
        <ul>
        {cribs && cribs.map(crib => <li>{crib.name} - {crib.address.country} - {crib.bedrooms} Bedrooms</li>)}
        </ul> 
      
      </div> 

    )
}

export default CompoundSearch

