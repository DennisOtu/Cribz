import { useState } from "react"
import LocNBedsComponent from "./locNBedsComponent"
import ExploreComponent from "./exploreComponent"
import CompoundSearchBar from "./compoundSearchBar"

function CompoundSearchPage() {
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [page, setPage] = useState(1)
  const [explore, setExplore] = useState(true)
  
  //const [cribz, setCribz] = useState()

  function allCribz() {
    setExplore(true)
  }

  function initSearch(place, beds) {
    setExplore(false)
    setLocation(place)
    setBedrooms(beds)
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
    return (
      <div>
        <CompoundSearchBar allCribz={allCribz} initSearch={initSearch}/>
        <LocNBedsComponent location={location} bedrooms={bedrooms} nextPage={nextPage} previousPage={previousPage} page={page}/>
      </div>
    )
  }
  
}

export default CompoundSearchPage

