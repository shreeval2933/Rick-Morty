import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/characterReducer.js";

// Create a context to manage the application state
const AppContext = createContext();

// Rick and Morty API endpoint
const API = "https://rickandmortyapi.com/api/character";

// Initial state for the application
const initialState = {
    isLoading : false,
    isError : false,
    characters : [],
}


// AppProvider component manages the application state and provides it to its children
const AppProvider = ({children}) => {

    // Use reducer to manage state changes
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Function to fetch character data from the API
    const getCharacter = async (url) => {
        dispatch({type: "SET_LOADING"});
        try {
            let res = [];
            let promises = [];

            // Start from page 1 and make requests for all pages
            for (let i = 1; i < 43; i++) {
                promises.push(axios.get(`${url}/?page=${i}`));
            }

            // Wait for all promises to resolve
            let responses = await Promise.all(promises);

            // Extract data from each response and concatenate it to res
            responses.forEach((response) => {
                res = [...res, ...response.data.results];
            });

            // Set the characters data in the state
            const characters = res;
            dispatch({type: "SET_API_DATA", payload: characters});

        } catch (error) {
            // Handle API error
            dispatch({type: "API_ERROR"});
        }
    };
    
    // Fetch character data on component mount
    useEffect(() => {
        getCharacter(API);
    }, []);

    // Provide state values and functions to the children components through context
    return (<AppContext.Provider value={{...state}}>{children}</AppContext.Provider>);
};


// Custom hook to access the application context
const useCharacterContext = () => {
    return useContext(AppContext);
};

// Export the AppProvider component, AppContext, and useCharacterContext hook
export {AppProvider, AppContext, useCharacterContext};