import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/episodeReducer.js";

// Create a context to manage the episode state
const AppContext = createContext();

// Rick and Morty API endpoint for episodes
const API = "https://rickandmortyapi.com/api/episode";

// Initial state for the episode application
const initialState = {
    isLoading : false,
    isError : false,
    episode : [],
}

// EpisodeProvider component manages the episode state and provides it to its children
const EpisodeProvider = ({children}) => {

    // Use reducer to manage state changes
    const [state, dispatch] = useReducer(reducer, initialState);

    // Function to fetch episode data from the API
    const getEpisode = async (url) => {
        // Set loading state
        dispatch({type: "SET_LOADING"});
        try {
            let res = [];
            let promises = [];

            // Start from page 1 and make requests for all pages
            for (let i = 1; i < 4; i++) {
                promises.push(axios.get(`${url}/?page=${i}`));
            }

            // Wait for all promises to resolve
            let responses = await Promise.all(promises);

            // Extract data from each response and concatenate it to res
            responses.forEach((response) => {
                res = [...res, ...response.data.results];
            });

            // Set the episode data in the state
            const episode = res;
            dispatch({type: "SET_API_EPISODE_DATA", payload: episode});

        } catch (error) {
            // Handle API error
            dispatch({type: "API_ERROR"});
        }
    };
    
    // Fetch episode data on component mount
    useEffect(() => {
        getEpisode(API);
    }, []);

    // Provide state values and functions to the children components through context
    return (<AppContext.Provider value={{...state}}>{children}</AppContext.Provider>);
};


//custom hook
const useEpisodeContext = () => {
    return useContext(AppContext);
};

export {EpisodeProvider, AppContext, useEpisodeContext};