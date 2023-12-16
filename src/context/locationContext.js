import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/locationReducer.js";

// Create a context to manage the location state
const AppContext = createContext();

// Rick and Morty API endpoint for locations
const API = "https://rickandmortyapi.com/api/location";

// Initial state for the location application
const initialState = {
    isLoading : false,
    isError : false,
    location : [],
}

// LocationProvider component manages the location state and provides it to its children
const LocationProvider = ({children}) => {
    // Use reducer to manage state changes
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Function to fetch location data from the API
    const getLocation = async (url) => {
        // Set loading state
        dispatch({type: "SET_LOADING"});
        try {
            let res = [];
            let promises = [];

            // Start from page 1 and make requests for all pages
            for (let i = 1; i < 8; i++) {
                promises.push(axios.get(`${url}/?page=${i}`));
            }

            // Wait for all promises to resolve
            let responses = await Promise.all(promises);

            // Extract data from each response and concatenate it to res
            responses.forEach((response) => {
                res = [...res, ...response.data.results];
            });

            // Set the location data in the state
            const location = res;
            dispatch({type: "SET_API_LOCATION_DATA", payload: location});

        } catch (error) {
            // Handle API error
            dispatch({type: "API_ERROR"});
        }
    };
    
    // Fetch location data on component mount
    useEffect(() => {
        getLocation(API);
    }, []);

    // Provide state values and functions to the children components through context
    return (<AppContext.Provider value={{...state}}>{children}</AppContext.Provider>);
};


//custom hook to access the location context
const useLocationContext = () => {
    return useContext(AppContext);
};

export {LocationProvider, AppContext, useLocationContext};