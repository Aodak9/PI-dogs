import { FILTER_CREATED, ORDER, DOGS, FILTER_BY_TEMPERAMENTS, FILTER_BY_WEIGHT, GET_NAME_DOGS, GET_TEMPERAMENTS, DETAILS } from "../actions/index";

const initialState = {
    dogs: [],
    filterDogs: [],
    allDogs: [],
    temperaments: [],
    details: {},
}

function orderByWeight(dogs, type) {
    const temp = JSON.parse(JSON.stringify(dogs))
    if (type === "less") {
        temp.sort((a, b) => {
            if (parseInt(a.weight.split("-")[0]) > (parseInt(b.weight.split("-")[0]))) {
                return 1
            }
            if (parseInt(b.weight.split("-")[0]) > (parseInt(a.weight.split("-")[0]))) {
                return -1
            }
            return 0;
        })
    } else {
        temp.sort((a, b) => {
            if (parseInt(a.weight.split("-")[0]) > (parseInt(b.weight.split("-")[0]))) {
                return -1
            }
            if (parseInt(b.weight.split("-")[0]) > (parseInt(a.weight.split("-")[0]))) {
                return 1
            }
            return 0;
        })
    }

    return temp;
}

function filterByTemperaments(dogs, type) {
    if (type === "All Temperaments") {
        return dogs
    }
    let filtro = dogs.filter(dog => {
        return dog.temperament && dog.temperament.includes(type)

    })
    return filtro;
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case DOGS:
            return {
                ...state,
                dogs: action.payload,
                filterDogs: action.payload
            }
        case GET_NAME_DOGS:
            return {
                ...state,
                filterDogs: action.payload
            }
        case DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }


        /*case GET_DOG_TEMPERAMENTS:
            return {
                ...state,
                dogsTemperaments: action.payload
            }*/

        case FILTER_CREATED:
            const dogsAll = state.dogs
            const filterCreated = action.payload === "created" ? dogsAll.filter(el => el.id.length >= 10) : dogsAll.filter(el => !el.id.length <= 4)
            //console.log(filterCreated, "Linea 12")
            return {
                ...state,
                //dogs: action.payload === "all" ? state.allDogs : { data: filterCreated }
                filterDogs: action.payload === 'all' ? state.dogs : filterCreated
            }
        case ORDER:
            const orderName = action.payload === 'Asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0;
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });

            return {
                ...state,
                dogs: orderName
            }

        case FILTER_BY_TEMPERAMENTS: {
            return {
                ...state,
                filterDogs: filterByTemperaments(state.filterDogs, action.payload)
            }
        }

        case FILTER_BY_WEIGHT: {
            return {
                ...state,
                filterDogs: orderByWeight(state.filterDogs, action.payload),
            }
        }

        default:
            return state;
    }

};


export default rootReducer;