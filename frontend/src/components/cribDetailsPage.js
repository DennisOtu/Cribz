import { useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import axios from "axios"
import { Map, Marker } from 'pigeon-maps'
import CribzNearby from "./cribzNearbyComponent"

function CribDetails() {
    const { cribID } = useParams()
 
    const findCrib = () => {
        return axios.get(`http://localhost:8000/api/v1/listings/compound/${cribID}`)
    }

    const { data, isLoading } = useQuery('getDetails', findCrib)

    return (
        <div style={{ paddingTop: '50px', marginBottom: '2em' }}>
            {isLoading && <h1>Loading...</h1>}
            {data &&
                <div className="d-flex flex-column mx-4">
                    <img src={data.data[0].images.picture_url} className="detImg" ></img>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column col-lg-6">
                            <div className="detInfo">
                                <div>{data.data[0].name}</div>
                                <div>${data.data[0].price.$numberDecimal}</div>
                                <div className="m-1">{data.data[0].address.street}</div>
                                <div>Beds: {data.data[0].bedrooms} Baths: {parseInt(data.data[0].bathrooms.$numberDecimal)}</div>

                            </div>
                            <div className="detMap">
                                Map Info
                                <Map center={[data.data[0].address.location.coordinates[1], data.data[0].address.location.coordinates[0]]} defaultZoom={11} animate={true}>|
                                    <Marker width={50} anchor={[data.data[0].address.location.coordinates[1], data.data[0].address.location.coordinates[0]]} />
                                </Map>
                            </div>
                           
                        </div>
                        <div className="mb-5">
                            <div>Show Interest</div>
                            <form className="d-flex flex-column">

                                <input value={''}  placeholder="Phone" onChange={''} name=""/>
                                <input value={''}  placeholder="Email" onChange={''} name=""/>
                                <input value={''}  placeholder="Message" onChange={''} name=""/>
                                <button className="butn" onClick={''}>Submit</button>

                            </form>
                        </div>

                    </div>

                    {data.data[0].description && 
                        <div style={{ marginInline: '8em'}}>
                            <h3 style={{ fontFamily: 'var(--fontSerif)', letterSpacing: 'var(--letterSpaceMd)'}}>Description</h3>
                            <p className="mt-3" style={{ letterSpacing: 'var(--letterSpaceSm)' }}>{data.data[0].description}</p>
                        </div>
                    }

                    <div className="mb-4 amenitiesDiv">
                        <h3>Amenities</h3>
                        <div>{data.data[0].amenities.map(item => <li>{item}</li>)}</div>
                    </div>

                    {data.data[0].reviews[0] &&
                        <div>
                            <h3 style={{marginLeft: '4.5em'}}>Reviews</h3>
                            <div className="reviewsDiv">{data.data[0].reviews.map((item, index) => index <5 &&
                                    <div className="reviewCard">
                                        <h4>{item.reviewer_name}</h4>
                                        <p>{item.date.split('-').slice(1,2)}-{item.date.split('-').slice(0,1)}</p>
                                        <p>{item.comments}</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    }

                </div>
            }

            {data && 
                <div>
                    <h3 style={{marginLeft: '5.5em'}}>Cribz Nearby</h3>
                    <div className="my-3 greySpace">
                        <CribzNearby area={data.data[0].address.street.split(',', 1)} exclude={cribID}/>
                    </div>
                </div>

            }

        </div>


    )
}

export default CribDetails
