// LocationReducer function handles state changes for location data in the application
const LocationReducer = (state, action) => {
    // Switch statement to determine the type of action and update the state accordingly
    switch(action.type){
        // Action type to set loading state
        case "SET_LOADING":
           return{
            ...state,
            isLoading: true,
           };

        // Action type to set location data from the API
        case "SET_API_LOCATION_DATA":
            return{
                ...state,
                isLoading: false,
                location: action.payload,
            };
        
        // Action type to handle API errors
        case "API_ERROR":
            return{
                ...state,
                isLoading: false,
                isError:true,
            };
        
        // Default case returns the current state if the action type is not matched
        default:
            return state;
    };
};

export default LocationReducer;