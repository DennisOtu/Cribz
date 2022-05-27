import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

function LocNBedsComponent(props) {
  useEffect(() => refetch(props), [props.page])
    
  const findCribz = () => {
    if (props.location && props.bedrooms) {
      return axios.get(`http://localhost:8000/api/v1/listings/compound?location=${props.location}&bedrooms=${props.bedrooms}&page=${props.page}`)
    }
    if (!props.bedrooms) {
      return axios.get(`http://localhost:8000/api/v1/listings/location?location=${props.location}&page=${props.page}`)
    }
  }
  
  const { data, isLoading, refetch } = useQuery('find', findCribz)

  if (data) {
    const totalCribz = data.data[0].metadata[0].total
    props.paginateData(totalCribz)
  }
  
  return (
    <div className="d-flex flex-row mb-4 px-4">
      <div className="col-lg-6 d-flex flex-column">

        <div className="row" style={{ paddingTop: '125px' }}>
          {isLoading && <h2>Loading...</h2>}
          {data && data.data[0].data.map(crib =>
            <div className="searchCard col-md-5 m-2">
              <img src={crib.images.picture_url}></img>
              <div className="container p-2 ">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`${crib._id}`}>
                  <p>{crib.address.street.split(',', 1)}</p>
                  <p style={{ fontSize: '12px' }}>Beds: {crib.bedrooms} Baths: {parseInt(crib.bathrooms.$numberDecimal)}</p>
                </Link>
                
              </div>
              
            </div>
          )}

        </div>
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

