import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import cribIcon from '../images/cribIcon.png'

const Navbar = () => {

  return (
    <nav className="navBar">
      <div className="brand" >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={cribIcon} className="brandIcon" />
          Cribz
        </Link>
      </div>

      <div className="navRight" >
        <div>
          <Link to="listings/compound" style={{ textDecoration: 'none', color: 'inherit' }}>
            Search Cribz
          </Link>
        </div>

        <div>
          <Link to="" style={{ textDecoration: 'none', color: 'inherit' }}>
            Sign Up
          </Link>
        </div>

        <div>
          <Link to="" style={{ textDecoration: 'none', color: 'inherit' }}>
            Log In
          </Link>
        </div>
      </div>
    


    </nav>

  )
}

export default Navbar

