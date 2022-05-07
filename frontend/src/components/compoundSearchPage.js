import { useState, useEffect } from "react"
import LocNBedsComponent from "./locNBedsComponent"
import ExploreComponent from "./exploreComponent"
import CompoundSearchBar from "./compoundSearchBar"
import ReactPaginate from "react-paginate"

function CompoundSearchPage(props) {
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [page, setPage] = useState(1)
  const [explore, setExplore] = useState(true)
  const [paginate, setPaginate] = useState(false)
  const limit = 20
  const [pageCount, setPageCount] = useState(0)

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
    setPageCount(0)
    setLocation('')
    setBedrooms('')
    setExplore(true)
  }

  function initSearch(place, beds) {
    if (place && beds) {
      setPageCount(0)
      setExplore(false)
      setLocation(place)
      setBedrooms(beds)
    }
    if (!beds) {
      setPageCount(0)
      setExplore(false)
      setLocation(place)
      setBedrooms('')
    }
  }

  function paginateData(totalCribz) {
    setPageCount(Math.ceil(totalCribz / limit))
    setPaginate(true)
  }

  const changePage = (e) => {
    setPage(e.selected)
  }

  if (explore) {
    return (
      <div className="greySpace">
        <CompoundSearchBar allCribz={allCribz} initSearch={initSearch} />

        <ExploreComponent page={page} paginateData={paginateData} />
        <ReactPaginate  breakLabel={'...'} previousLabel={"prev"} nextLabel={"next"} pageCount={pageCount}
        onPageChange={changePage} pageRangeDisplayed={5} containerClassName={"paginationDiv"} previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"} activeClassName={"paginationActive"} renderOnZeroPageCount={null}
        />
      </div>
    )
  } else {
    if (bedrooms && location) {
      return (
        <div className="greySpace">
          <CompoundSearchBar allCribz={allCribz} initSearch={initSearch}/>
          <LocNBedsComponent location={location} bedrooms={bedrooms} page={page} paginateData={paginateData} />
          <ReactPaginate  breakLabel={'...'} previousLabel={"prev"} nextLabel={"next"} pageCount={pageCount}
          onPageChange={changePage} pageRangeDisplayed={5} containerClassName={"paginationDiv"} previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}
          renderOnZeroPageCount={null}
          />
        </div>
      )
    }
    if (!bedrooms) {
      return (
        <div className="greySpace">
          <CompoundSearchBar allCribz={allCribz} initSearch={initSearch} location={location}/>
          <LocNBedsComponent location={location} page={page} paginateData={paginateData} />
          <ReactPaginate  breakLabel={'...'} previousLabel={"prev"} nextLabel={"next"} pageCount={pageCount}
          onPageChange={changePage} pageRangeDisplayed={5} containerClassName={"paginationDiv"} previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"} renderOnZeroPageCount={null}
          />
        </div>
      )
    }

  }
  
}

export default CompoundSearchPage

