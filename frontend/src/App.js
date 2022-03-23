import React, {Component} from "react"
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import PropertyList from "./components/propertyListComponent"
import HomePage from "./components/homeComponent"
import Navbar from "./components/Nav"
import LocationSearch from './components/locationSearchComponent'

class App extends Component {
    render() {
	  return (
	    <div clsssName='App'>
	    <Navbar/>

	    <Routes>
	    
	    <Route path='/' element={<HomePage/>}/>
	    <Route path='listings' element={<PropertyList/>}/>
	    <Route path='listings/location' element={<LocationSearch/>}/>

	    </Routes>
	    
	    </div>
	  )
	}
}

export default App

