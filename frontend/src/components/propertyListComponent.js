import { useState, useEffect } from "react"
import axios from 'axios'

const PropertyList = () => {
	const [cribs, setCribs] = useState(null)
	const [page, setPage] = useState(0)
    let currentPage = page+1

    const nextPage = () => {
    	setPage(page+1)
    }

    const previousPage = () => {
    	setPage(page-1)
    }

    useEffect(()=>{
  	axios.get(`http://localhost:8000/api/v1/listings?page=${page}`)
  	.then((res) => {
  		setCribs(res.data)
  		console.log(res.data)
  	})
    .then(console.log('use effect ran'))
    },[page]) 


    return (
    	<div>
    	    {cribs && <div> {`page ${currentPage}`} <button className='mx-2' onClick={nextPage}> next page </button> </div>}
    	    {currentPage > 1 && <button onClick={previousPage}>previous page</button>}
	        <ul>
	        {cribs && cribs.map(crib => <li>{crib.name}, {crib.address.country}</li>)}
	        </ul> 
        </div>  
    )
}

export default PropertyList

