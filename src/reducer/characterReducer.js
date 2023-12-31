// CharacterReducer function handles state changes for character data in the application
const CharacterReducer = (state, action) => {
    // Switch statement to determine the type of action and update the state accordingly
    switch(action.type){
        // Action type to set loading state
        case "SET_LOADING":
           return{
            ...state,
            isLoading: true,
           };

        // Action type to set character data from the API
        case "SET_API_DATA":
            return{
                ...state,
                isLoading: false,
                characters: action.payload,
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

export default CharacterReducer;