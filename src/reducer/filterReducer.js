const filterReducer = (state, action) => {
    switch(action.type) {

        case "LOAD_FILTER_CHARACTERS":
            return {
                ...state,
                filter_characters : [...action.payload],
                all_characters: [...action.payload],
            };
        
        case "UPDATE_FILTERS_VALUE":
            const {name, value} = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name] : value,
                }
            };

        case "FILTER_CHARACTERS":
            let {all_characters} = state;
            let tempFilterCharacter = [...all_characters];

            const {search_text, status, location, gender, species, type} = state.filters;

            //  console.log("Before filtering:", tempFilterCharacter);

            if(search_text) {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    console.log(`Name: ${curElem.name}, Search Text: ${search_text}`);
                    return curElem.name.toLowerCase().includes(search_text);
                });
            }

            // console.log("After search_text filter:", tempFilterCharacter);

            if(status !== "status") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.status.toLowerCase() === status.toLowerCase()
                });
            }

            if(location !== "location") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.location.name.toLowerCase() === location.toLowerCase()
                });
            }

            // console.log("After status filter:", tempFilterCharacter);

            if(gender !== "gender") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.gender.toLowerCase() === gender.toLowerCase()
                });
            }


            if(species !== "species") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.species.toLowerCase() === species.toLowerCase()
                });
            }

    
            if(type !== "type") {
                tempFilterCharacter = tempFilterCharacter.filter((curElem) => {
                    return curElem.type.toLowerCase() === type.toLowerCase()
                });
            }

            // console.log("After gender filter:", tempFilterCharacter);

            return {
                ...state,
                filter_characters: tempFilterCharacter,
            };

        default:
            return state;
    }
};

export default filterReducer;