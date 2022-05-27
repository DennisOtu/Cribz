import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import cribIcon from '../images/cribIcon.png'

const Navbar = () => {

  return (
    <nav className="navBar">
      
      <Link to="/" className="brand mr-4 nav-link">
      <img src={cribIcon} className="brandIcon" />
        Cribz
      </Link>

      <div className="navRight" >
        <Link to="listings/compound" style={{ textDecoration: 'none', color: 'var(--fontColor)' }}>
          Search Cribz
        </Link>

        <Link to=""style={{ textDecoration: 'none', color: 'var(--fontColor)' }}>
          Sign Up
        </Link>

        <Link to="" style={{ textDecoration: 'none', color: 'var(--fontColor)' }}>
          Log In
        </Link>
      </div>
    


    </nav>

  )
}

export default Navbar

