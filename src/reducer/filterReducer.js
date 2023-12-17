// filterReducer function handles state changes for filtering characters, locations, and episodes in the application
const filterReducer = (state, action) => {
    // Switch statement to determine the type of action and update the state accordingly
    switch(action.type) {

        // Action type to load characters into the state
        case "LOAD_FILTER_CHARACTERS":
            return {
                ...state,
                filter_characters : [...action.payload],
                all_characters: [...action.payload],
            };

        // Action type to load locations into the state
        case "LOAD_FILTER_LOCATION":
            return {
                ...state,
                filter_location : [...action.payload],
                all_location: [...action.payload],
            };

        // Action type to load episodes into the state
        case "LOAD_FILTER_EPISODE":
            return {
                ...state,
                filter_episode : [...action.payload],
                all_episode: [...action.payload],
            };
        
        // Action type to set episode names data from the API
        case "SET_EPISODE_API_DATA":
            return{
                ...state,
                episode_name_data: action.payload,
            };

        // Action type to update filter values based on user input
        case "UPDATE_FILTERS_VALUE":
            const {name, value} = action.payload;

            if (state.filters[name] !== value) {
                return {
                ...state,
                Loading : true,
                filters: {
                    ...state.filters,
                    [name] : value,
            }}
            }
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name] : value,
            }}

        // Action type to reset all filter values
        case "RESET_FILTERS":
            const initialState = {
                filters: {
                    search_text: "",
                    status: "status",
                    gender: "gender",
                    species: "species",
                    type: "type",
                    location: "location",
                    episode: '0',
                }
            };
            return {
                ...state,
                filters: initialState.filters,
            };

        // Action type to filter characters based on filter values
        case "FILTER_CHARACTERS":
            let {all_characters} = state;
            let tempFilterCharacter = [...all_characters];
            let {all_location} = state;
            let tempFilterLocation = [...all_location];
            let {all_episode} = state;
            let tempFilterEpisode = [...all_episode];


            const {search_text, status, location, gender, species, type, episode} = state.filters;

            // Filter characters based on search text
            if(search_text) {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    console.log(`Name: ${curElem.name}, Search Text: ${search_text}`);
                    return curElem.name.toLowerCase().includes(search_text.toLowerCase());
                });
            }

            // Filter locations based on search text
            if(search_text) {
                tempFilterLocation = tempFilterLocation.filter((curElem) => {
                    console.log(`Name: ${curElem.name}, Search Text: ${search_text}`);
                    return curElem.name.toLowerCase().includes(search_text.toLowerCase());
                });
            }

            // Filter episodes based on search text
            if(search_text) {
                tempFilterEpisode = tempFilterEpisode.filter((curElem) => {
                    console.log(`Name: ${curElem.name}, Search Text: ${search_text}`);
                    return curElem.name.toLowerCase().includes(search_text.toLowerCase());
                });
            }

            // Filter characters based on status
            if(status !== "status") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.status.toLowerCase() === status.toLowerCase()
                });
            }

            // Filter characters based on location
            if(location !== "location") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.location.name.toLowerCase() === location.toLowerCase()
                });
            }

            // Filter characters based on episode
            if(episode !== '0')
            {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.episode.includes(`https://rickandmortyapi.com/api/episode/${episode}`);
                })
            }

            // Filter characters based on gender
            if(gender !== "gender") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.gender.toLowerCase() === gender.toLowerCase()
                });
            }

            // Filter characters based on species
            if(species !== "species") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.species.toLowerCase() === species.toLowerCase()
                });
            }

            // Filter characters based on type
            if(type !== "type") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.type.toLowerCase() === type.toLowerCase()
                });
            }

            // Return the updated state with filtered characters, locations, and episodes
            return {
                ...state,
                Loading : false,
                filter_location: tempFilterLocation,
                filter_characters: tempFilterCharacter,
                filter_episode: tempFilterEpisode,
            };

        // Default case returns the current state if the action type is not matched
        default:
            return state;
    }
};

export default filterReducer;