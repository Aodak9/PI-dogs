import axios from 'axios';
export const DOGS = "DOGS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER = "ORDER";
export const GET_NAME_DOGS = "GET_NAME_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_BY_HEIGHT = "FILTER_BY_HEIGHT";
export const DETAILS = "DETAILS";
export const SORT_RAZA = "SORT_RAZA";
export const GET_DOGS = "GET_DOGS";


export function removegetDogsLoaded() {
    return ({ type: GET_DOGS, payload: undefined });

}
export function getDogs() {
    return function (dispatch) {
         axios.get('http://localhost:3001/dogs').then(res =>{
            dispatch({
                 type: DOGS,
                 payload: res.data
             })
             console.log(res.data, "linea 9")
         })
    };
};

export function getNameDogs(name) {
    return  function (dispatch) {
        try {
            axios.get('http://localhost:3001/dogs?name=' + name).then( res => { 
                dispatch({
                    type: "GET_NAME_DOGS",
                    payload: res.data

            })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: DETAILS,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

export function getTemperaments() {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/temperament")
        console.log(info, "Linea 10")
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: info.data
        });

    }
}

/*export function getTemperaments() {
    return (dispatch) => {
        axios.get(`/temperament`)
            .then(response => {
                dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
            })
            .catch(error => console.log(error))
    }
}*/

/*export function getDogTemperament(name) {
    return (dispatch) => {
        axios.get(`/temperament/?name=${name}`)
            .then(response => {
                dispatch({ type: GET_DOG_TEMPERAMENTS, payload: response.data });
            })
            .catch(error => console.log(error))
    }
}*/

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload,

    }
}

export function byOrder(payload) {
    return {
        type: "ORDER",
        payload,
    }
}

export function FilterTemperaments(payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload,
    }
}

export function FilterWeight(payload) {
    return {
        type: FILTER_BY_WEIGHT,
        payload,
    }
}