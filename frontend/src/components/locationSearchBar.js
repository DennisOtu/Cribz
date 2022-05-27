import { useState } from 'react'

function LocationSearchBar(props) {
  const [place, setPlace] = useState('')
  
  const changePlace = (e) => {
    setPlace(e.target.value)
  }

  return (
    <div className="d-flex flex-row my-4">
      <div className="col-lg-6 d-flex flex-column">
        <div className="container d-flex flex-row">
          <div className="form-group">
            <input value={place} className="form-field mx-2" placeholder="Search Location"
              onChange={changePlace}
              name="location"
            />
          </div>
        
          <button onClick={()=>props.initSearch(place)} className="mx-2 btn btn-success">Search</button>
        </div>
        </div>
    </div>
  )
}

export default LocationSearchBar

