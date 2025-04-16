import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import cribIcon from '../images/cribIcon.png'
import { useContext } from 'react'
import { searchContext } from '../contexts/searchContext.js'

const Navbar = () => {
	const { searchState, searchDispatch } = useContext(searchContext)

  return (
    <nav className="navBar">
      <div className="brand" >
        <Link to="/" onClick={()=>searchDispatch({type: 'goHome' }) } style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={cribIcon} className="brandIcon" />
          CRIBZ
        </Link>
      </div>

      <div className="navRight" >
        <div>
          <Link to="listings/compound" onClick={()=>searchDispatch({type: 'setExploreTrue'})} style={{ textDecoration: 'none', color: 'inherit' }}>
            SEARCH
          </Link>
        </div>

        <div>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            SIGN UP
          </Link>
        </div>

        <div>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            LOG IN
          </Link>
        </div>
      </div>
    


    </nav>

  )
}

export default Navbar

