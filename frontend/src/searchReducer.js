export const initialState = {
	searchLocation: '',
	bedrooms: 1,
	newLocation: '',
	newBedrooms: 1,
	startSearch: false,
	explore: true,
	page: 1,
	pageCount: 0
}

export const searchReducer = (state, action) => {
	console.log(`action type: ${action.type}`)
	action.payload && console.log(`action payload: ${action.payload}`) 
	switch (action.type){
		case 'setNewLocation':
			return {...state, newLocation: state.newLocation = action.payload}
		case 'setNewBedrooms':
			return {...state, newBedrooms: state.newBedrooms = action.payload}
		case 'initSearch':
			return {...state, searchLocation: state.searchLocation = state.newLocation, bedrooms: state.bedrooms = state.newBedrooms, explore: state.explore = false, startSearch: state.startSearch = true}
		case 'findLocation':
			return {...state, searchLocation: state.searchLocation = state.newLocation, bedrooms: state.bedrooms = 1, newBedrooms: state.newBedrooms = 1, explore: state.explore = false, startSearch: state.startSearch = true}
		case 'setStartSearch':
			return {...state, startSearch: state.startSearch = true, explore: state.explore = false}
		case 'goHome':
			return {...state, explore: state.explore = false, startSearch: state.startSearch = false}
		case 'setExploreFalse':
			return {...state, explore: state.explore = false}
		case 'setExploreTrue':
			return {...state, explore: state.explore = true, newLocation: state.newLocation = '', bedrooms: state.bedrooms = 1}
		default:
			throw new Error()
	}
}




