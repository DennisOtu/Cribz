import { useEffect, useContext } from "react"
import { useQuery } from 'react-query'
import LocNBedsComponent from "./locNBedsComponent"
import ExploreComponent from "./exploreComponent"
import CompoundSearchBar from "./compoundSearchBar"
import ReactPaginate from "react-paginate"
import { searchContext } from "../contexts/searchContext.js"

function CompoundSearchPage() {
  const { searchState, searchDispatch } = useContext(searchContext)
  
	const changePage = (e) => {
		const newPage = e.selected
		searchDispatch({type: 'changePage', payload: newPage})
	}

	if (searchState.explore === true) {
	  return (
		<div className="greySpace">
		  <CompoundSearchBar />
		  <ExploreComponent />

		</div>

	  )
	} else {
		return (
			<div className="greySpace">
			  <CompoundSearchBar />
			  <LocNBedsComponent />
			</div>
			  /*<ReactPaginate  breakLabel={'...'} previousLabel={"prev"} nextLabel={"next"} pageCount={searchState.pageCount}
			  onPageChange={(e)} pageRangeDisplayed={5} containerClassName={"paginationDiv"} previousLinkClassName={"previousBttn"}
			  nextLinkClassName={"nextBttn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}
			  renderOnZeroPageCount={null}
			  />*/
	  )
	}
}

export default CompoundSearchPage

