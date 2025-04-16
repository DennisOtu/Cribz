import { useContext } from 'react'
import searchIcon from '../images/searchIcon.png'
import { searchContext } from "../contexts/searchContext.js"

function LocationSearchBar() {
  const { searchState, searchDispatch } = useContext(searchContext)

  return (
    <div>
      <form className='locSearchBox'>
        <input value={searchState.newLocation} className="locSearchInput" placeholder="Search Location"
          onChange={(e)=>searchDispatch({type: 'setNewLocation', payload: e.target.value})}
          name="location"
        />
        <button type='button'  onClick={()=>searchDispatch({type: 'findLocation'})}><img src={ searchIcon } className='searchIcon'/></button>
      </form>
    </div>
  )
}

export default LocationSearchBar

