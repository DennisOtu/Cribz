import { useContext } from 'react'
import searchIcon from '../images/search.svg'
import { searchContext } from "../contexts/searchContext.js"
import { Link } from 'react-router-dom'

function CompoundSearchBar() {
  const { searchState, searchDispatch } = useContext(searchContext)

  return (
    <div className="d-flex flex-row fixedTopSearch">
      <div>
        <div className="container d-flex flex-row">
          <button onClick={()=>searchDispatch({type: 'setExploreTrue'})} className="butnPill leftPill">
            Explore
          </button>
          <div className="form-group">
            <input value={searchState.newLocation} className="searchInputLocation form-field" placeholder={searchState.newLocation? `${searchState.newLocation}` : "Enter location..."}
              onChange={(e)=>searchDispatch({type: 'setNewLocation', payload: e.target.value})}
              name="location"
            />
          </div>

          <div>
              <select className='searchInputBedrooms' value={searchState.newBedrooms} onChange={(e)=>searchDispatch({type: 'setNewBedrooms', payload: e.target.value})} >
                <option value='1'> 1 bed </option>
                <option value='2'> 2 beds</option>
                <option value='3'> 3 beds</option>
                <option value='4'> 4 beds</option>
                <option value='5'> 5 beds</option>
                <option value='6'> 6 beds</option>
                <option value='7'> 7 beds</option>
                <option value='8'> 8 beds</option>
                <option value='9'> 9 beds</option>
              </select>
          </div> 
        
          <button onClick={()=> searchDispatch({type: 'initSearch'})} className="searchButn"><img src={ searchIcon } className='searchIcon'/></button>
        </div>
        </div>
    </div>
  )
}

export default CompoundSearchBar

