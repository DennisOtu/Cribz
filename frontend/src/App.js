import React, { Component, createContext, useState, useReducer } from "react"
import { Routes, Route, Link } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./components/homePage"
import Navbar from "./components/Navbar"
import CompoundSearchPage from "./components/compoundSearchPage"
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import CribDetailsPage from "./components/cribDetailsPage"
import ExploreCribDetailsPage from "./components/exploreCribDetailsPage"
import Footer from "./components/footer"
import { library } from '@fortawesome/fontawesome-svg-core'
import  { fab } from '@fortawesome/free-brands-svg-icons'
import { searchContext } from "./contexts/searchContext.js"
import { searchReducer, initSearchState } from "./searchReducer.js"
import SignupPage from "./components/signupPage.js"
import LoginPage from "./components/loginPage.js"

library.add(fab)

const queryClient = new QueryClient()

function App() {
  const [searchState, searchDispatch] = useReducer(searchReducer, initSearchState)
  //const [page, setPage] = useState(1)
  //const [pageCount, setPageCount] = useState(0)
  //const [paginate, setPaginate] = useState(false)
  //const limit = 20

	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<searchContext.Provider value={{searchState, searchDispatch}}>
					<Navbar/>
					<Routes>
						<Route path='/' element={<HomePage/>}/>
						<Route path='listings/:cribID' element={<ExploreCribDetailsPage/>}/>
						<Route path='listings/compound' element={<CompoundSearchPage/>}/>
						<Route path='listings/compound/:cribID' element={<CribDetailsPage/>}/>
						<Route path='/signup' element={<SignupPage/>}/>
						<Route path= '/login' element={<LoginPage/>}/>
					</Routes>
					<Footer/>
				</searchContext.Provider>
			</div>
			<ReactQueryDevtools initialIsOpen={false}/>
		</QueryClientProvider>
	)
}

export default App

