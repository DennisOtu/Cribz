import LocationSearchBar from "./locationSearchBar"
import { useState } from "react"
import CompoundSearchPage from "./compoundSearchPage"

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
      <div>
        <h1>Find your dream home</h1>
        <LocationSearchBar location={location} initSearch={initSearch}/>
      </div>

    )
  }
}
export default HomePage
