import { createContext, useContext, useEffect, useReducer } from "react";
import { useCharacterContext } from "./characterContext.js";
import reducer from '../reducer/filterReducer.js';
import axios from "axios";

const FilterContext = createContext();

const initialState = {
    filter_characters : [],
    all_characters: [],
    characters_with_episode: [],
    filters: {
        search_text : "",
        status : "status",
        gender : "gender",
        species : "species",
        type : "type",
        location : "location",
    }
}

export const FilterContextProvider = ({children}) => {

    const {characters} = useCharacterContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    
    const getCharacter = async (characters) => {
        try {
            let res = [];
            let promises = [];

            const episodeUrl = characters.map((item) => item.episode.map((url) => {
                let tempEpisodeData = axios.get(url);
                return tempEpisodeData.name;
            }));

            // Start from page 1 and make requests for all pages
            
            // promises.push(axios.get(`${url}/?page=${i}`));
            

            // Wait for all promises to resolve
            let responses = await Promise.all(promises);

            // Extract data from each response and concatenate it to res
            responses.forEach((response) => {
                res = [...res, ...response.data.results];
            });

            const characters = res;
            dispatch({type: "SET_CHARACTER_WITH_EPISODE_DATA", payload: characters});

        } catch (error) {
            console.log(error);
        }
    };
    








    

    //update the filter values
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type: "UPDATE_FILTERS_VALUE", payload: {name, value} });
    }

    useEffect(() => {
        dispatch({type: "FILTER_CHARACTERS"});
    }, [characters, state.filters]);

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_CHARACTERS", payload: characters});
    }, [characters]);

    return(
        <FilterContext.Provider value={{...state, updateFilterValue,}}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
}