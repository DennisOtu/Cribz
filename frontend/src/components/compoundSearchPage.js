import { useState, useEffect } from "react"
import LocNBedsComponent from "./locNBedsComponent"
import ExploreComponent from "./exploreComponent"
import CompoundSearchBar from "./compoundSearchBar"

function CompoundSearchPage(props) {
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [page, setPage] = useState(1)
  const [explore, setExplore] = useState(true)

  useEffect(() => {
    if (props.locSearch) {
      setLocation(props.location)
      setBedrooms(props.bedrooms)
      setExplore(false)
      //setLocOnly(locSearch)
    }
  },[] 
  )

  function allCribz() {
    setExplore(true)
  }

  function initSearch(place, beds) {
    if (place && beds) {
      setExplore(false)
      setLocation(place)
      setBedrooms(beds)
    }
    if (!beds) {
      setExplore(false)
      setLocation(place)
      setBedrooms('')
    }
  }

  function nextPage() {
    setPage(page => page + 1)
    console.log(`nextBtn clicked: page = ${page}`)
  }

  function previousPage() {
    setPage(page => page -1)
    console.log(`prevBtn clicked: page = ${page}`);
  }

  if (explore) {
    return (
      <div>
        <CompoundSearchBar allCribz={allCribz} initSearch={initSearch}/>
        <ExploreComponent nextPage={nextPage} previousPage={previousPage} page={page}/>
      </div>
    )
  } else {
    if (bedrooms && location) {
      return (
        <div>
          <CompoundSearchBar allCribz={allCribz} initSearch={initSearch}/>
          <LocNBedsComponent location={location} bedrooms={bedrooms} nextPage={nextPage} previousPage={previousPage} page={page}/>
        </div>
      )
    }
    if (!bedrooms) {
      return (
        <div>
          <CompoundSearchBar allCribz={allCribz} initSearch={initSearch} location={location}/>
          <LocNBedsComponent location={location} nextPage={nextPage} previousPage={previousPage} page={page}/>
        </div>
      )
    }

  }
  
}

export default CompoundSearchPage

