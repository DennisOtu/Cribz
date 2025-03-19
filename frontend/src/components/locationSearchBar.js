import { useContext } from 'react'
import searchIcon from '../images/searchIcon.png'
import { searchContext } from "../contexts/searchContext.js"

function LocationSearchBar() {
  const { state, dispatch } = useContext(searchContext)

  return (
    <div>
      <form className='locSearchBox'>
        <input value={state.newLocation} className="locSearchInput" placeholder="Search Location"
          onChange={(e)=>dispatch({type: 'setNewLocation', payload: e.target.value})}
          name="location"
        />
        <button type='button'  onClick={()=>dispatch({type: 'findLocation'})}><img src={ searchIcon } className='searchIcon'/></button>
      </form>
    </div>
  )
}

export default LocationSearchBar

