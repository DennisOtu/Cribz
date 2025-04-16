import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { searchContext } from "../contexts/searchContext.js"

function ExploreComponent() {
  const { searchState, searchDispatch } = useContext(searchContext)

  useEffect(() => refetch(), [searchState.page])

  const exploreCribz = () => {
    return axios.get(`http://localhost:8000/api/v1/listings?page=${searchState.page}`)
  }
  
  const { data, isLoading, refetch } = useQuery('exploreAll', exploreCribz)
  
  if (data) {
    const totalCribz = data.data[0].metadata[0].total
    //paginateData(totalCribz)
  }

  return (
    <div className="d-flex flex-row mb-4">
      <div className="col-lg-8 d-flex flex-column">

        <div className="row" style={{ paddingTop: '125px' }}>
          {isLoading && <h6 style={{ color: 'var(--textColor)' }}>Loading...</h6>}
          {data && data.data[0].data.map(crib =>
            <div className="searchCard m-2">
              <Link style={{ textDecoration: 'none', color: 'inherit', borderRadius: 'inherit' }} to={`${crib._id}`}>
                <img src={crib.images.picture_url}></img>
                <div className="container px-1 pt-2 d-flex flex-row">
                  <p>{crib.address.street.split(',', 1)}</p>
                  <p style={{ fontSize: '12px', marginLeft: '2em'}}>Beds: {crib.bedrooms} Baths: {parseInt(crib.bathrooms.$numberDecimal)}</p>
                </div>  
              </Link> 
            </div>              
          )}
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

