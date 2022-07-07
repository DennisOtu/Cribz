import React, {Component} from "react"
import { Routes, Route, Link } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"
import PropertyList from "./components/propertyListComponent"
import HomePage from "./components/homePage"
import Navbar from "./components/Nav"
import LocationSearch from './components/locationSearchComponent'
import BedroomSearch from "./components/bedroomSearchComponent"
import CompoundSearch from "./components/compoundSearchPage"
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import CribDetails from "./components/cribDetailsPage"
import Footer from "./components/footer"

const queryClient = new QueryClient()

class App extends Component {
    render() {
		return (
			<QueryClientProvider client={queryClient}>
				<div clsssName='App'>
					<Navbar/>
					<Routes>
						<Route path='/' element={<HomePage/>}/>
						<Route path='listings' element={<PropertyList/>}/>
						<Route path='listings/location' element={<LocationSearch/>}/>
						<Route path='listings/bedrooms' element={<BedroomSearch/>}/>
						<Route path='listings/compound' element={<CompoundSearch/>} />
						<Route path='listings/compound/:cribID' element={<CribDetails/>}/>

					</Routes>
					<Footer/>
					</div>
				<ReactQueryDevtools initialIsOpen={false}/>
			</QueryClientProvider>
	  	)
	}
}

export default App

