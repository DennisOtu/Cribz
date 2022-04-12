import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {

  return (
      <nav className="navbar navbar-expand navbar-light">

        <Link to="/" className="mx-4 nav-link">
          Home
        </Link>

        <Link to="listings" className="mx-4 nav-link">
          All Cribs
        </Link>

        <Link to="listings/location" className="mx-4 nav-link">
          Location
        </Link>

        <Link to="listings/bedrooms" className="mx-4 nav-link">
          Bedrooms
        </Link>

        <Link to="listings/compound" className="mx-4 nav-link">
          Compound Search
        </Link>
      </nav>

  )
}

export default Navbar

