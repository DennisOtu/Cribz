import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchContext } from "../contexts/searchContext.js"
import Footer from './footer.js'
import ReactPaginate from "react-paginate"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ExploreComponent() {
  const { searchState, searchDispatch } = useContext(searchContext)
  
  const exploreCribz = () => {
    return axios.get(`http://localhost:8000/api/v1/listings?page=${searchState.page}`)
  }

  const { data, isLoading, refetch } = useQuery('exploreAll', exploreCribz)

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
    <div className="d-flex flex-row mb-4 ">
		<div className="col-lg-8 d-flex flex-column">
			<div className="row" style={{ paddingTop: '50px', marginLeft: '8px' }}>
			  {isLoading && <h6 style={{ color: 'var(--textColor)' }}>Loading...</h6>}
			  {data && data.data[0].data.map(crib =>
				<div className="searchCard">
				  <Link style={{ textDecoration: 'none', color: 'inherit', borderRadius: 'inherit' }} to={`${crib._id}`}>
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
        <div style={{
            height: '50vh', width: '100%', background: 'var(--darkBlue)',
            color: 'white', paddingTop: '4em', paddingInline: '4em', margin: 0,
            display: 'flex', flex: 'row', justifyContent: 'space-between', width: 'inherit'
        }}>
            <div className="d-flex flex-column col-lg-3">
                <p style={{fontFamily: 'var(--fontSerif)', color: 'var(--cribzYellow)', fontSize: '14px'}}>Cribz</p>
                <p style={{fontSize: '14px', marginTop: '2em', color: 'rgba(255, 255, 255, 0.7)'}}>Praesent tincidunt posuere dolor, nec bibendum tellus suscipit a.
                    Nullam pellentesque felis id porttitor scelerisque.
                </p>
            </div>
            <div>
                <p style={{ fontFamily: 'var(--fontSerif)', fontSize: '14px' }}>Discover</p>
                <div style={{marginTop: '3em', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)'}}>
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Services</p>
                    <p>Contact</p>
                </div>

            </div>
            <div>
                <p style={{ fontFamily: 'var(--fontSerif)', fontSize: '14px' }}>About</p>
                <div style={{marginTop: '3em', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)'}}>
                    <p>Clients</p>
                    <p>Teams</p>
                    <p>Career</p>
                </div>
            </div>
            <div>
                <p style={{ fontFamily: 'var(--fontSerif)', fontSize: '14px' }}>Help</p>
                <div style={{marginTop: '3em', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)'}}>
                    <p>Privacy Policy</p>
                    <p>Terms And Conditions</p>
                    <p>Partners</p>
                </div>
            </div>
            <div>
                <p style={{ fontFamily: 'var(--fontSerif)', fontSize: '14px' }}>Follow Us</p>
                <div style={{marginTop: '2em'}}>
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                    <FontAwesomeIcon icon={['fab', 'instagram']} style={{ marginInline: '1em'}}/>
                    <FontAwesomeIcon icon={['fab', 'facebook']}  />
                </div>

            </div>
        </div>
		</div>

      {data && 
        <div className='mapDiv'>
          <Map center={[data.data[0].data[0].address.location.coordinates[1], data.data[0].data[0].address.location.coordinates[0]]}
            defaultZoom={11} animate={true}>
            {data.data[0].data.map(crib => <Marker width={50}
              anchor={[crib.address.location.coordinates[1], crib.address.location.coordinates[0]]} />)
            }
          </Map>
        </div>
      }
    </div> 
  ) 
}

export default ExploreComponent

