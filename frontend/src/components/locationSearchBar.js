import { useContext } from 'react'
import searchIcon from '../images/search.svg'
import { searchContext } from "../contexts/searchContext.js"

function LocationSearchBar() {
  const { searchState, searchDispatch } = useContext(searchContext)

  return (
    <div className='locSearchBar'>
      <form>
        <input value={searchState.newLocation} placeholder="Enter Location..."
          onChange={(e)=>searchDispatch({type: 'setNewLocation', payload: e.target.value})}
          name="location"
        />
      </form>
      <button className='searchButn' type='button'  onClick={()=>searchDispatch({type: 'findLocation'})}><img src={ searchIcon } className='searchIcon'/></button>
    </div>
  )
}

export default LocationSearchBar

