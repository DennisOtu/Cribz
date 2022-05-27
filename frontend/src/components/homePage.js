import LocationSearchBar from "./locationSearchBar"
import { useState } from "react"
import CompoundSearchPage from "./compoundSearchPage"
import cribIcon from '../images/cribIcon.png'

function HomePage() {
  const [location, setLocation] = useState('')
  const bedrooms = ''
  const [finding, setFinding] = useState(false)

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
      <div className="hero">
        <img src={ cribIcon } className="heroIcon"/>
        <h1 className="jumboText">Find your dream home</h1>
        <LocationSearchBar location={location} initSearch={initSearch}/>
      </div>

    )
  }
}
export default HomePage
