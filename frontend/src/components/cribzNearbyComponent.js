import axios from 'axios'
import { useQuery } from 'react-query'

function CribzNearby(props) {

    const findCribz = () => {
        return axios.get(`http://localhost:8000/api/v1/listings/location?location=${props.area}&limit=5`)
    }

    const { data, isLoading } = useQuery('findNearby', findCribz, { refetchInterval: 1000 })


    return (
        <div className="d-flex flex-row">
            {isLoading && <h2>Loading...</h2>}
            {data && data.data[0].data.map(crib => crib._id != props.exclude &&
                <div className="searchCard m-2">
                    <img src={crib.images.picture_url}></img>
                    <div className="container p-2 ">
                        <p>{crib.address.street.split(',', 1)}</p>
                        <p style={{ fontSize: '12px' }}>Beds: {crib.bedrooms} Baths: {parseInt(crib.bathrooms.$numberDecimal)}</p>
                    </div>
                </div>                    
            )}
        </div>
    )
}

export default CribzNearby

