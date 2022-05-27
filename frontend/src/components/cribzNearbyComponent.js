import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

function CribzNearby(props) {
    const navigate = useNavigate()
    
    const findCribz = () => {
        return axios.get(`http://localhost:8000/api/v1/listings/location?location=${props.area}&limit=6`)
    }

    const { data, isLoading } = useQuery('findNearby', findCribz, { refetchInterval: 1000 })

    function showCrib(cribId) {
        navigate(`../listings/compound/${cribId}`, { replace: true })
        window.location.reload(true)
    }
    
    return (
        <div>
            <div className="d-flex flex-row px-5 py-4">
            {isLoading && <h2>Loading...</h2>}
            {data && data.data[0].data.map(crib => crib._id != props.exclude &&
                <div className="searchCard m-2" onClick={ () => {showCrib(crib._id)} }>
                    <img src={crib.images.picture_url}></img>
                    <div className="container p-2 ">
                        <p>{crib.address.street.split(',', 1)}</p>
                        <p style={{ fontSize: '12px' }}>Beds: {crib.bedrooms} Baths: {parseInt(crib.bathrooms.$numberDecimal)}</p>
                    </div>
                    
                </div>                    
            )}
        </div>
        </div>

    )
}

export default CribzNearby

