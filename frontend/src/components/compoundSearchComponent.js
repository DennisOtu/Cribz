import { useState, useEffect } from "react"
import axios from 'axios'
import { Map, Marker } from 'pigeon-maps'

const CompoundSearch = () => {
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [page, setPage] = useState(1)
  const [cribz, setCribz] = useState()


  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/listings?page=${page}`)
      .then((res) => {
        setCribz(res.data)
        console.log(res.data)
      })
      .then(console.log('use effect ran')
    )}, []
  )

  const nextPage = () => {
    setCribz(null) 
    const newPage = page + 1
    setPage(newPage)
    console.log(`nextBtn clicked: page = ${page}`)
    getCribz()
  }

  const previousPage = () => {
    setCribz(null)
    setPage(page => page - 1)
    console.log(`prevBtn clicked: page = ${page}`);
    getCribz()
  }

  const getCribz = () => {
    try {
      axios.get(`http://localhost:8000/api/v1/listings/compound?location=${location}
      &bedrooms=${bedrooms}&page=${page}`)
        .then((res) => {
          setCribz(res.data)
          console.log(`page=${page}: getCribz funct`)
          console.log(res.data)
        })
    
    } catch (error) {
      console.log(error)
      return
    }

  }

  const changeLocation = (e) => {
    setPage(1)
    setLocation(e.target.value)
  };

  const changeBedNum = (e) => {
    setPage(1)
    setBedrooms(e.target.value)
  }


  
  const exploreCribz = () => {
    setPage(1)
    axios.get(`http://localhost:8000/api/v1/listings?page=${page}`)
    .then((res) => {
      setCribz(res.data)
      console.log(res.data)
    })
    
  }
  
  return (
    <div className="d-flex flex-row my-4">
      <div className="col-lg-6 d-flex flex-column">
        <div className="container d-flex flex-row">
          <button className="btn btn-secondary" onClick={exploreCribz}>
            Explore
          </button>
          <div className="form-group">
            <input value={location} className="form-field mx-2" placeholder="Any location"
              onChange={changeLocation}
              name="location"
            />
          </div>

          <div >
              <select value={bedrooms} onChange={changeBedNum}>
                <option value=''>Any Beds</option>
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
        
          <button onClick={getCribz} className="mx-2 btn btn-primary">Search</button>
        </div>

        <div className="row  mt-4">
          {cribz && cribz.map(crib =>
            <div className="card col-md-5 m-2">
              <img className="card-image" src={crib.images.picture_url}></img>
              <div className="card-body">
                <h5 className="card-title">{crib.name}</h5>
                <p className="card-text">Beds: {crib.bedrooms} Baths: {parseInt(crib.bathrooms.$numberDecimal)}</p>
              </div>
              
            </div>
          )}
          <div className="row">
            {cribz &&
              <div className="d-flex flex-column text-center">
                <p>{`page ${page}`}</p>
                <div>
                {page > 1 && <button className="btn btn-secondary" onClick={previousPage}> prev </button>}
                <button className='btn btn-secondary mx-2' onClick={nextPage}> next </button>
                </div>
              </div>
            }            
          </div>
        </div>
      </div>


      <div className="container">
        {cribz &&
          <Map height={500} center={ [ cribz[0].address.location.coordinates[1], cribz[0].address.location.coordinates[0] ] } defaultZoom={11} animate={true}>
            {cribz && cribz.map(crib => <Marker width={50}
              anchor={[crib.address.location.coordinates[1], crib.address.location.coordinates[0]]} />)
            }
          </Map>
        }
      </div>
     
    </div> 

  )
}

export default CompoundSearch

