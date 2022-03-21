import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {

  return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <Link to="/" className="px-5 navbar-brand">
          CRIBZ
        </Link>

        <Link to="listings" className="nav-link">
          Properties
        </Link>

      </nav>

  )
}

export default Navbar

