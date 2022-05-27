import { useState } from 'react'
import searchIcon from '../images/searchIcon.png'

function LocationSearchBar(props) {
  const [place, setPlace] = useState('')
  
  const changePlace = (e) => {
    setPlace(e.target.value)
  }

  return (
    <div>
      <form className='locSearchBox'>

        <input value={place} className="locSearchInput" placeholder="Search Location"
          onChange={changePlace}
          name="location"
        />
        <button  onClick={() => props.initSearch(place)}><img src={ searchIcon } className='searchIcon'/></button>
        
      </form>


    </div>
  )
}

export default LocationSearchBar

