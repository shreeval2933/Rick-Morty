import { createContext, useContext, useEffect, useReducer} from "react";
import { useCharacterContext } from "./characterContext.js";
import { useLocationContext } from "./locationContext.js";
import { useEpisodeContext } from "./episodeContext.js";
import reducer from '../reducer/filterReducer.js';
import axios from "axios";

// Create a context to manage the filter state
const FilterContext = createContext();

// Initial state for the filter application
const initialState = {
    Loading : false,
    filter_characters : [],
    all_characters: [],
    filter_location : [],
    all_location: [],
    filter_episode : [],
    all_episode: [],
    episode_name_data : [],
    filters: {
        search_text : "",
        status : "status",
        gender : "gender",
        species : "species",
        type : "type",
        location : "location",
        episode : '0',
    }
}

// FilterContextProvider component manages the filter state and provides it to its children
export const FilterContextProvider = ({children}) => {

    // UseCharacterContext, useLocationContext, and useEpisodeContext hooks to access relevant context
    const {characters} = useCharacterContext();
    const {location} = useLocationContext();
    const {episode} = useEpisodeContext();

    // Use reducer to manage state changes
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Function to fetch episode name data for filter options
    const getEpisode = async () => {
            try {
                let res = [];
                let episode_name = [];

                for (let i = 1; i < 52; i++) {
                    res = await axios.get(`https://rickandmortyapi.com/api/episode/${i}`);
                    episode_name = episode_name.concat(res.data.name);
                }
                const episode_all_data = episode_name;
                dispatch({type: "SET_EPISODE_API_DATA", payload: episode_all_data});
            } catch (error) {
                console.log(error);
            }
        };

    //update the filter values
    const updateFilterValue = (event) => {
        dispatch({type: "SET_FILTER_LOADING"});
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type: "UPDATE_FILTERS_VALUE", payload: {name, value} });
    }

    // Function to reset all filter values
    const resetFiltersValue = () => {
       return dispatch({ type: "RESET_FILTERS" });
    };

    // Fetch episode name data on component mount
    useEffect(() => {
        getEpisode();
    }, []);

    // Update filtered characters when character, location, episode, or filter values change
    useEffect(() => {
        dispatch({type: "FILTER_CHARACTERS"});
    }, [characters, location, episode, state.filters]);

    // Load characters data into state on component mount
    useEffect(() => {
        dispatch({type: "LOAD_FILTER_CHARACTERS", payload: characters});
    }, [characters]);

    // Load location data into state on component mount
    useEffect(() => {
        dispatch({type: "LOAD_FILTER_LOCATION", payload: location});
    }, [location]);

    // Load episode data into state on component mount
    useEffect(() => {
        dispatch({type: "LOAD_FILTER_EPISODE", payload: episode});
    }, [episode]);

    // Provide state values and functions to the children components through context
    return(
        <FilterContext.Provider value={{...state, updateFilterValue, resetFiltersValue}}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook to access the filter context
export const useFilterContext = () => {
    return useContext(FilterContext);
}