import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import cribIcon from '../images/cribIcon.png'
import { useContext } from 'react'
import { searchContext } from '../contexts/searchContext.js'
import axios from 'axios'

const Navbar = () => {
	const { searchState, searchDispatch } = useContext(searchContext)
	const loginInfo = JSON.parse(localStorage.getItem('user'))
	
	const handleLogout = () => {
		localStorage.removeItem('user')
		window.location.reload()
	}

	if (loginInfo) {
		return (
		<nav className="navBar">
		  <div className="brand" >
			<Link to="/" onClick={()=>searchDispatch({type: 'goHome' }) } style={{ textDecoration: 'none', color: 'inherit' }}>
			  <img src={cribIcon} className="brandIcon" />
			  CRIBZ
			</Link>
		  </div>

				<p style={{ marginLeft: '8rem' }}>
					Hello { loginInfo.userName }
				</p>

			<div className="navRight" >
				<div>
				  <Link to="listings/compound" onClick={()=>searchDispatch({type: 'setExploreTrue'})} style={{ textDecoration: 'none', color: 'inherit' }}>
					SEARCH
				  </Link>
				</div>

				<div>
				  <Link to="" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLogout}>
					LOGOUT
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
					LOGIN
				  </Link>
				</div>
			</div>
		</nav>
		)
	}
}

export default Navbar



