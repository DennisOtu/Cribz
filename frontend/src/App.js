import React, { Component, createContext, useState, useReducer } from "react"
import { Routes, Route, Link } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./components/homePage"
import Navbar from "./components/Nav"
import CompoundSearch from "./components/compoundSearchPage"
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import CribDetails from "./components/cribDetailsPage"
import ExploreCribDetails from "./components/exploreCribDetailsPage"
import Footer from "./components/footer"
import { library } from '@fortawesome/fontawesome-svg-core'
import  { fab } from '@fortawesome/free-brands-svg-icons'
import { searchContext } from "./contexts/searchContext.js"
import { searchReducer, initialState } from "./searchReducer.js"

library.add(fab)

const queryClient = new QueryClient()

function App() {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  //const [page, setPage] = useState(1)
  //const [pageCount, setPageCount] = useState(0)
  //const [paginate, setPaginate] = useState(false)
  //const limit = 20

	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<searchContext.Provider value={{state, dispatch}}>
					<Navbar/>
					<Routes>
						<Route path='/' element={<HomePage/>}/>
						<Route path='listings/:cribID' element={<ExploreCribDetails/>}/>
						<Route path='listings/compound' element={<CompoundSearch/>} />
						<Route path='listings/compound/:cribID' element={<CribDetails/>}/>

					</Routes>
					<Footer/>
				</searchContext.Provider>
			</div>
			<ReactQueryDevtools initialIsOpen={false}/>
		</QueryClientProvider>
	)
}

export default App

