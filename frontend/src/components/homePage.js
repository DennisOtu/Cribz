import LocationSearchBar from "./locationSearchBar"
import { useState } from "react"
import CompoundSearchPage from "./compoundSearchPage"
import cribIcon from '../images/cribIcon.png'
import { useQuery } from 'react-query'
import axios from 'axios'

function HomePage() {
  const [location, setLocation] = useState('')
  const bedrooms = ''
  const [finding, setFinding] = useState(false)
  const randomPage = Math.ceil(Math.random() * 15)
  const findRandom = () => {
    return axios.get(`http://localhost:8000/api/v1/listings?page=${randomPage}&limit=10`)
  }  
  const { data, isLoading } = useQuery('exploreRandom', findRandom)

  function initSearch(place) {
    setLocation(place)
    setFinding(true)
  }
  
  if (finding) {
    return (
      <div>
        <CompoundSearchPage location={location} bedrooms={bedrooms} locSearch={true} />
      </div>
    )
  } else {
    return (
      <div>
        <div className="hero">
          <img src={cribIcon} style={{height: '200px'}}/>
          <h1 className="jumboText">Find your dream home</h1>
          <LocationSearchBar location={location} initSearch={initSearch}/>
        </div> 

        {isLoading && <h6 style={{ textAlign: 'center', color: 'var(--textColor)' }}>Loading...</h6>}
        
        {data &&
          <div style={{marginInline: '1.5em'}}>
            <h6 style={{ textAlign: 'center', paddingBlock: '2em', color: 'var(--textColor)', fontFamily: 'var(--fontSerif)'}}>Explore Cribz</h6>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gridGap: '6px', height: '60vh'}}>


              {data.data[0].data.map((crib, index) =>
                <div className={`index${index}`} style={{
                  background: `url(${crib.images.picture_url})`,
                  borderRadius: '8px', display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', textAlign: 'start',
                }} >
                  <p style={{
                    background: 'var(--textColor)', color: 'white', fontSize: '12px',
                    letterSpacing: 'var(--letterSpaceMd)', fontWeight: '200',
                    textTransform: 'lowercase', padding: '6px'
                  }}>{crib.name}</p>
                  
                </div>
              )}

            </div>

          </div>
        }

      </div>
    )
  }
}

export default HomePage

