import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect } from 'react'

function LocNBedsComponent(props) {
  useEffect(() => refetch, [props.page])
  
  const findCribz = () => {
    return axios.get(`http://localhost:8000/api/v1/listings/compound?location=${props.location}&bedrooms=${props.bedrooms}&page=${props.page}`)
  }
  
  const { data, isLoading, refetch } = useQuery('find', findCribz)

  return (
    <div className="d-flex flex-row my-4">
      <div className="col-lg-6 d-flex flex-column">

        <div className="row  mt-4">
          {isLoading && <h2>Loading...</h2>}
          {data && data.data.map(crib =>
            <div className="card col-md-5 m-2">
              <img className="card-image" src={crib.images.picture_url}></img>
              <div className="card-body">
                <h5 className="card-title">{crib.name}</h5>
                <p className="card-text">Beds: {crib.bedrooms} Baths: {parseInt(crib.bathrooms.$numberDecimal)}</p>
              </div>
              
            </div>
          )}
          <div className="row">
            {data &&
              <div className="d-flex flex-column text-center">
                <p>{`page ${props.page}`}</p>
                <div>
                {props.page > 1 && <button className="btn btn-secondary" onClick={()=>props.previousPage()}> prev </button>}
                <button className='btn btn-secondary mx-2' onClick={()=>props.nextPage()}> next </button>
                </div>
              </div>
            }            
          </div>
        </div>
      </div>


      <div className="container">
        {data &&
          <Map height={500} center={ [ data.data[0].address.location.coordinates[1], data.data[0].address.location.coordinates[0] ] } defaultZoom={11} animate={true}>
            {data && data.data.map(crib => <Marker width={50}
              anchor={[crib.address.location.coordinates[1], crib.address.location.coordinates[0]]} />)
            }
          </Map>
        }
      </div>
      
    </div> 
    
  ) 
}

export default LocNBedsComponent

