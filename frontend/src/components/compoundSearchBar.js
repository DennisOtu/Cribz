import { useContext } from 'react'
import searchIcon from '../images/searchIcon.png'
import { searchContext } from "../contexts/searchContext.js"
import { Link } from 'react-router-dom'

function CompoundSearchBar() {
  const { searchState, searchDispatch } = useContext(searchContext)

  return (
    <div className="d-flex flex-row fixedTopSearch">
      <div>
        <div className="container d-flex flex-row">
          <button onClick={()=>searchDispatch({type: 'setExploreTrue'})} className="butn">
            Explore
          </button>
          <div className="form-group">
            <input value={searchState.newLocation} className="searchBox form-field mx-3" placeholder={searchState.newLocation? `${searchState.newLocation}` : "Any location"}
              onChange={(e)=>searchDispatch({type: 'setNewLocation', payload: e.target.value})}
              name="location"
            />
          </div>

          <div>
              <select className='searchBox' value={searchState.newBedrooms} onChange={(e)=>searchDispatch({type: 'setNewBedrooms', payload: e.target.value}) }>
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
                <option value='4'> 4 </option>
                <option value='5'> 5 </option>
                <option value='6'> 6 </option>
                <option value='7'> 7 </option>
                <option value='8'> 8 </option>
                <option value='9'> 9 </option>
              </select>
          </div> 
        
          <button onClick={()=> searchDispatch({type: 'initSearch'})} className="searchButn mx-3"><img src={ searchIcon } className='searchIcon'/></button>
        </div>
        </div>
    </div>
  )
}

export default CompoundSearchBar

