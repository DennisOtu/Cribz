import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {

  return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <Link to="/" className="mx-4 nav-link">
          Home
        </Link>

        <Link to="listings" className="mx-4 nav-link">
          All Cribs
        </Link>

        <Link to="listings/location" className="mx-4 nav-link">
          Location
        </Link>

      </nav>

  )
}

export default Navbar

