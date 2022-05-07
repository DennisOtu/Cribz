import { useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import axios from "axios"

function CribDetails() {
    const { cribID } = useParams()

    const findCrib = () => {
        return axios.get(`http://localhost:8000/api/v1/listings/compound/${cribID}`)
    }

    const { data, isLoading } = useQuery('getDetails', findCrib)

    return (
        <div style={{ marginTop: '50px'}}>
            {isLoading && <h1>Loading...</h1>}
            {data && <h1>{data.data[0].name}</h1>}
        </div>


    )
}

export default CribDetails
