import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/characterReducer.js";

const AppContext = createContext();

const API = "https://rickandmortyapi.com/api/character";

const initialState = {
    isLoading : false,
    isError : false,
    characters : [],
}

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    // const getCharacter = async (url) => {
    //     dispatch({type: "SET_LOADING"});
    //     try {
    //         const res = await axios.get(url);
    //         const characters = await  res.data.results;
    //         dispatch({type: "SET_API_DATA", payload: characters});
    //     } catch (error) {
    //         dispatch({type: "API_ERROR"});
    //     }
    // };

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

            const characters = res;
            dispatch({type: "SET_API_DATA", payload: characters});

        } catch (error) {
            dispatch({type: "API_ERROR"});
        }
    };
    
    useEffect(() => {
        getCharacter(API);
    }, []);

    return (<AppContext.Provider value={{...state}}>{children}</AppContext.Provider>);
};


//custom hook
const useCharacterContext = () => {
    return useContext(AppContext);
};

export {AppProvider, AppContext, useCharacterContext};