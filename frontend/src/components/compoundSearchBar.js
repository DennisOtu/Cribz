import { useState } from 'react'

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
    <div className="d-flex flex-row my-4">
      <div className="col-lg-6 d-flex flex-column">
        <div className="container d-flex flex-row">
          <button onClick={()=>props.allCribz()} className="btn btn-secondary">
            Explore
          </button>
          <div className="form-group">
            <input value={place} className="form-field mx-2" placeholder="All locations"
              onChange={changePlace}
              name="location"
            />
          </div>

          <div >
              <select value={beds} onChange={changeBeds}>
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
        
          <button onClick={()=>props.initSearch(place, beds)} className="mx-2 btn btn-primary">Search</button>
        </div>
        </div>
    </div>
  )
}

export default CompoundSearchBar

