import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import cribIcon from '../images/cribIcon.png'
import { useContext } from 'react'
import { searchContext } from '../contexts/searchContext.js'
import axios from 'axios'

const Navbar = () => {
	const { searchState, searchDispatch } = useContext(searchContext)
	const userInfo = JSON.parse(localStorage.getItem('user'))

	const handleLogout = () => {
		localStorage.removeItem('user')
		window.location.reload()
	}

	if (!userInfo) {
		return (
		<nav className="navBar">
		  <div className="brand" >
			<Link to="/" onClick={()=>searchDispatch({type: 'goHome' }) } style={{ textDecoration: 'none', color: 'inherit' }}>
			  <img src={cribIcon} className="brandIcon" />
			  Cribz
			</Link>
		  </div>
			<div className="navRight" >
				<div>
				  <Link to="listings/compound" onClick={()=>searchDispatch({type: 'setExploreTrue'})} style={{ textDecoration: 'none', color: 'inherit' }}>
					Search
				  </Link>
				</div>

				<div>
				  <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
					Sign Up
				  </Link>
				</div>

				<div>
				  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
					Log In
				  </Link>
				</div>
			</div>
		</nav>
		)
	} else {
		return (
		<nav className="navBar">
		  <div className="brand" >
			<Link to="/" onClick={()=>searchDispatch({type: 'goHome' }) } style={{ textDecoration: 'none', color: 'inherit' }}>
			  <img src={cribIcon} className="brandIcon" />
			  Cribz
			</Link>
		  </div>
			<div className="navRight" >
				<div>
				  <Link to="listings/compound" onClick={()=>searchDispatch({type: 'setExploreTrue'})} style={{ textDecoration: 'none', color: 'inherit' }}>
					Search
				  </Link>
				</div>

				<div>
				  <Link to="" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLogout}>
					Log Out
				  </Link>
				</div>

				<h6 style={{ color: 'var(--cribzYellow)' }}>
					 Hi { userInfo.userName }!
				</h6>
			</div>
		</nav>
		)
	}
}

export default Navbar



