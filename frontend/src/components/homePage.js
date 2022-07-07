import LocationSearchBar from "./locationSearchBar"
import { useState } from "react"
import CompoundSearchPage from "./compoundSearchPage"
import cribIcon from '../images/cribIcon.png'
import { useQuery } from 'react-query'
import axios from 'axios'
import troubleFinding from '../images/troubleFinding.png'

function HomePage() {
  const [location, setLocation] = useState('')
  const bedrooms = ''
  const [finding, setFinding] = useState(false)
  const randomPage = Math.ceil(Math.random() * 15)
  const findRandom = () => {
    return axios.get(`http://localhost:8000/api/v1/listings?page=${randomPage}&limit=16`)
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
        <div>
          {isLoading && <h6 style={{ textAlign: 'center', color: 'var(--textColor)' }}>Loading...</h6>}        
          {data &&
            <div>
              <div style={{ margin: '6px',display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(10, 1fr)', gridGap: '6px', height: '200vh'}}>
                {data.data[0].data.map((crib, index) =>
                  <div className={`index${index}`} style={{  borderRadius: '8px',
                    background: `url(${crib.images.picture_url})`, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', textAlign: 'start'
                  }} >
                    <p style={{
                      background: 'var(--textColor)', color: 'white', fontSize: '16px',
                      letterSpacing: 'var(--letterSpaceMd)', fontWeight: '200',
                      textTransform: 'lowercase', padding: '6px'
                    }}>{crib.name}</p>
                    
                  </div>
                )}

              </div>
              <div className="my-5 d-flex flex-row" style={{height: '60vh'}}>
                <div className="col-lg-7 d-flex flex-column" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                  <p style={{ fontFamily: 'var(--fontSans)', fontWeight: '300', color: 'var(--cribzYellow)', fontSize: '58px'}}>Trouble finding what you want?</p>
                  <p style={{ fontFamily: 'var(--fontSerif)', fontWeight: '300', color: 'var(--textColor)', fontSize: '24px'}}>Visit our search page to explore more listings</p>
                  <button className="butnOutLine" style={{ width: '250px', marginTop: '2em'}}>More Cribz</button>

                </div>
                <div className="d-flex" style={{alignItems: 'center'}}><img src={troubleFinding} style={{ width: '100%',  marginBottom: '15%'}}/></div>

              </div>
              <div style={{ background: 'var(--darkBlue)', color: 'rgba(255, 255, 255, 0.7)', paddingBlock: '3em', margin: '0'}}>
                <h5 className="text-center mb-4" style={{ fontFamily: 'var(--fontSerif)', color: 'wheat'}}>Customer Reviews</h5>
                <div style={{  marginInline: '8em',  display: 'grid',  gridTemplateColumns: 'repeat(3, 1fr)'}}>
                  <div className="outlineCard">
                    <h6 style={{color:'white'}}>Customer 1</h6>
                    <p style={{fontSize: '12px', fontFamily: 'var(--fontSerif)'}}>07-2022</p>
                    <p style={{  fontSize: '14px' }}>Curabitur at leo sit amet tortor consectetur tempus.
                      Etiam purus urna, pulvinar ac placerat sit amet, lobortis nec tortor. Fusce diam dolor,
                      pulvinar eget velit nec, faucibus interdum nisi. Nunc massa arcu, dapibus sit amet iaculis nec, accumsan ut lectus.
                    </p>
                  </div>
                  <div className="outlineCard">
                    <h6 style={{ color: 'white' }}>Customer 2</h6>
                    <p style={{fontSize: '12px', fontFamily: 'var(--fontSerif)'}}>07-2022</p>
                    <p style={{  fontSize: '14px' }}>Nullam blandit velit a efficitur venenatis.
                      In sed metus tincidunt, lobortis velit non, tincidunt velit. Pellentesque dui quam,
                      ultricies vitae urna ut, suscipit interdum lacus.
                    </p>
                  </div>
                  <div className="outlineCard">
                    <h6 style={{ color: 'white' }}>Customer 3</h6>
                    <p style={{fontSize: '12px', fontFamily: 'var(--fontSerif)'}}>07-2022</p>
                    <p style={{  fontSize: '14px' }}>Vestibulum sollicitudin, felis et commodo blandit,
                      libero lacus mollis turpis, a laoreet augue augue a dui. Mauris ac tempus elit. Vivamus mattis mi ex.
                    </p>
                  </div>
                  <div className="outlineCard">
                    <h6 style={{ color: 'white' }}>Customer 4</h6>
                    <p style={{fontSize: '12px', fontFamily: 'var(--fontSerif)'}}>06-2022</p>
                    <p style={{  fontSize: '14px' }}>Duis non erat ante. Fusce lacinia mauris nisl,
                      faucibus semper odio vulputate vel. Morbi eleifend orci ut pellentesque auctor
                    </p>
                  </div>
                  <div className="outlineCard">
                    <h6 style={{ color: 'white' }}>Customer 5</h6>
                    <p style={{fontSize: '12px', fontFamily: 'var(--fontSerif)'}}>06-2022</p>
                    <p style={{  fontSize: '14px' }}>Donec mattis, augue non sollicitudin pharetra,
                      nunc sem consequat tortor, ligula.
                    </p>
                  </div>
                  <div className="outlineCard">
                    <h6 style={{ color: 'white' }}>Customer 6</h6>
                    <p style={{fontSize: '12px', fontFamily: 'var(--fontSerif)'}}>05-2022</p>
                    <p style={{  fontSize: '14px' }}>Vivamus orci arcu, rhoncus vitae augue et,
                      porttitor accumsan eros. Maecenas ultricies, ipsum eu molestie malesuada, ante nulla rhoncus quam, at ultricies
                      turpis risus eget magna. Phasellus suscipit imperdiet justo a efficitur. Vestibulum ante ipsum primis in
                      faucibus orci luctus et ultrices posuere cubilia curae.
                    </p>
                  </div>
                  
                </div>
              </div>

            </div>
          }
        </div>
       
      </div>
    )
  }
}

export default HomePage

