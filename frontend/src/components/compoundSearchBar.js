import { useState } from 'react'
import searchIcon from '../images/searchIcon.png'

function CompoundSearchBar(props) {
  const [place, setPlace] = useState('')
  const [beds, setBeds] = useState('')

  const changePlace = (e) => {
    setPlace(e.target.value)
  }

  const changeBeds = (e) => {
    setBeds(e.target.value)
  }

  return (
    <div className="d-flex flex-row py-2">
      <div className="col-lg-6 d-flex flex-column">
        <div className="container d-flex flex-row">
          <button onClick={()=>props.allCribz()} className="butn">
            Explore
          </button>
          <div className="form-group">
            <input value={place} className="searchBox form-field mx-2" placeholder={props.location? `${props.location}` : "All locations"}
              onChange={changePlace}
              name="location"
            />
          </div>

          <div>
              <select className='searchBox' value={beds} onChange={changeBeds}>
                <option value=''>All Beds</option>
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
        
          <button onClick={()=>props.initSearch(place, beds)} className="searchButn mx-2"><img src={ searchIcon } className='searchIcon'/></button>
        </div>
        </div>
    </div>
  )
}

export default CompoundSearchBar

