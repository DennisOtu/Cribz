import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { searchContext } from "../contexts/searchContext.js"
import ReactPaginate from "react-paginate"

function LocNBedsComponent() {
	const { searchState, searchDispatch } = useContext(searchContext)

  const findCribz = () => {
    return axios.get(`http://localhost:8000/api/v1/listings/compound?location=${searchState.searchLocation}&bedrooms=${searchState.bedrooms}&page=${searchState.page}`)
  }
  
  const { data, isLoading, refetch } = useQuery('find', findCribz)
  
	useEffect(() =>{  
		if (data) {
			const totalCribz = data.data[0].metadata[0].total
			const totalPages = Math.ceil(totalCribz / 20)
			searchDispatch({type: 'updatePageCount', payload : totalPages})
		}
	},[searchState.pageCount, searchState.page])
	
	const changePage = (e) => {
		const newPage = e.selected
		searchDispatch({type: 'changePage', payload: newPage})
		refetch()
	}

  return (
    <div className="d-flex flex-row mb-4 px-4">
		<div className="col-lg-8 d-flex flex-column">
			<div className="row" style={{ paddingTop: '50px' }}>
			  {isLoading && <h6 style={{ color: 'var(--textColor)' }}>Loading...</h6>}
			  {data && data.data[0].data.map(crib =>
				<div className="searchCard">
				  <Link style={{ textDecoration: 'none', color: 'inherit', borderRadius: 'inherit' }} to={`../listings/compound/${crib._id}`} action='replace'>
					<img src={crib.images.picture_url}></img>
					<div className="container d-flex flex-column m-0 p-1">
					  <ul style={{ listStyleType: 'none', padding: 0, overflow: 'hidden' }}>
						<li style={{ fontWeight: 'bold', fontSize: '14px' }}>${crib.price.$numberDecimal}</li>
						<li style={{ fontSize: '12px' }}>{crib.bedrooms}bds | {parseInt(crib.bathrooms.$numberDecimal)}ba | {crib.property_type}</li>
						<li style={{ fontSize: '12px', fontWeight: '300' }}>{crib.address.street.split(',', 1)}, {crib.address.country}</li>
					  </ul>
					</div>
				  </Link> 
				</div>
			  )}
			</div>
		<ReactPaginate  breakLabel={'...'} previousLabel={"prev"} nextLabel={"next"} pageCount={searchState.pageCount}
		onPageChange={changePage} pageRangeDisplayed={3} containerClassName={"paginationDiv"} previousLinkClassName={"previousBttn"}
		nextLinkClassName={"nextBttn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}
		renderOnZeroPageCount={null}
		/>
		</div>


      {data && 
        <div className='mapDiv'>
          <Map center={ [ data.data[0].data[0].address.location.coordinates[1], data.data[0].data[0].address.location.coordinates[0] ] } defaultZoom={11} animate={true}>
            {data.data[0].data.map(crib => <Marker width={50}
              anchor={[crib.address.location.coordinates[1], crib.address.location.coordinates[0]]} />)
            }
          </Map>
        </div>
      }
    </div> 
  ) 
}

export default LocNBedsComponent

