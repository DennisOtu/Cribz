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
        <div style={{ paddingTop: '50px' }}>
            {isLoading && <h6 style={{ textAlign: 'center', color: 'var(--textColor)' }}>Loading...</h6>}
            {data &&
                <div className="d-flex flex-column mx-4">
                    <img src={data.data[0].images.picture_url} className="detImg" ></img>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column col-lg-8">
                            <div className="detInfo">
                                <h4 style={{fontFamily: 'var(--fontSerif)'}}>{data.data[0].name}</h4>
                                <h4 style={{ color: 'var(--cribzBlue)' }}>${data.data[0].price.$numberDecimal}</h4>
                                <h6 style={{color: 'var(--textColor)'}}>{data.data[0].bedrooms} Bed(s), {parseInt(data.data[0].bathrooms.$numberDecimal)} Bath(s)</h6>
                                <p style={{ color: 'var(--textColor)'}}>{data.data[0].address.street.split(',').slice(0, 1)}, {data.data[0].address.street.split(',').slice(2, 3)}</p>
                            </div>
                            <div className="detMap">
                                <Map center={[data.data[0].address.location.coordinates[1], data.data[0].address.location.coordinates[0]]} defaultZoom={11} animate={true}>|
                                    <Marker width={50} anchor={[data.data[0].address.location.coordinates[1], data.data[0].address.location.coordinates[0]]} />
                                </Map>
                            </div>
                           
                        </div>
                        <div className="showInterestDiv greySpace">
                            <h6 style={{fontFamily: 'var(--fontSerif)', textAlign: 'center', color: 'var(--textColor)'}}>Show Interest</h6>
                            <form className="d-flex flex-column">
                                <input placeholder="Phone" onChange={''} name="Phone"/>
                                <input placeholder="Email" onChange={''} name="Email"/>
                                <textarea
                                    value={`I am interested in "${data.data[0].name}" in ${data.data[0].address.street.split(',').slice(0, 1)}`}
                                    onChange={''}
                                />
                                <button className="butn mt-2" onClick={''}>Submit</button>
                            </form>
                        </div>

                    </div>

                    {data.data[0].description && 
                        <div style={{ marginInline: '8em'}}>
                            <h4 style={{ fontFamily: 'var(--fontSerif)'}}>Description</h4>
                            <p className="mt-3" style={{fontSize: '16px', color: 'var(--textColor)' }}>{data.data[0].description}</p>
                        </div>
                    }

                    <div className="mb-4 amenitiesDiv">
                        <h4 style={{ fontFamily: 'var(--fontSerif)', marginBottom: '1em'}}>Amenities</h4>
                        <div>{data.data[0].amenities.map(item => <p style={{fontSize: '14px', color: 'var(--textColor)', letterSpacing: 'var(--letterSpaceSm)'}}>{item}</p>)}</div>
                    </div>

                    {data.data[0].reviews[0] &&
                        <div>
                            <h5 style={{textAlign:'center', fontFamily: 'var(--fontSerif)', color: 'var(--textColor)'}}>Reviews</h5>
                            <div className="reviewsDiv">{data.data[0].reviews.map((item, index) => index <6 &&
                                    <div>
                                    <h6>{item.reviewer_name}</h6>
                                        <p style={{fontSize: '12px', color: 'var(--textColor)', fontFamily: 'var(--fontSerif)'}}>{item.date.split('-').slice(1,2)}-{item.date.split('-').slice(0,1)}</p>
                                        <p style={{ color: 'var(--textColor)', fontSize: '14px'}}>{item.comments}</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    }

                </div>
            }

            {data && 
                <div>
                    <h5 style={{textAlign: 'center', fontFamily: 'var(--fontSerif)', color: 'var(--textColor)', marginBlock: '2em'}}>Cribz Nearby</h5>
                    <div className="greySpace">
                        <CribzNearby area={data.data[0].address.street.split(',', 1)} exclude={cribID}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default CribDetails
