import React, {Component} from "react"
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import PropertyList from "./components/propertyListComponent"
import HomePage from "./components/homeComponent"
import Navbar from "./components/Nav"

class App extends Component {
    render() {
	  return (
	    <div clsssName='App'>
	    <Navbar/>

	    <Routes>
	    <Route path='/' element={<HomePage/>}/>
	    <Route path='listings' element={<PropertyList/>}/>

	    </Routes>
	    
	    </div>
	  )
	}
}

export default App

