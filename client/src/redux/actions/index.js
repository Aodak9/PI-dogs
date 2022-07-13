import axios from 'axios';
export const DOGS = "DOGS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER = "ORDER";
export const GET_NAME_DOGS = "GET_NAME_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const DETAILS = "DETAILS";
export const SORT_RAZA = "SORT_RAZA";
export const GET_DOGS = "GET_DOGS";


export function removegetDogsLoaded() {
    return ({ type: GET_DOGS, payload: undefined });

}
export function getDogs() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/dogs')
        console.log(json, "linea 9")
        return dispatch({
            type: DOGS,
            payload: json.data
        })
    };
};

export function getNameDogs(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dogs?name=' + name)
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data
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

export function filterTemp(razaActual, temperamento) {
    let filtro = [...razaActual];
    filtro = filtro.filter(actual => {
        if (actual.temperaments) {
            let razaTemp = actual.temperaments.split(', ')
            return razaTemp.includes(temperamento);
        } else {
            return false
        }
    })
    return function (dispatch) {
        dispatch({ type: SORT_RAZA, payload: filtro })
    }
}










// import axios from 'axios'

// export const GET_ALL_DOGS = 'GET_ALL_DOGS';
// export const SEARCH_DOGS = 'SEARCH_DOGS';
// export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
// export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
// export const CREATE_BREED = 'CREATE_BREED';
// export const DELETE_DOG_DETAIL = 'DELETE_DOG_DETAIL';
// export const SET_PAGES_CONFIG = 'SET_PAGES_CONFIG';
// export const SET_PAGE = 'SET_PAGE';
// export const SET_STATUS = 'SET_STATUS'
// export const FILTER_DOGS = 'FILTER_DOGS'
// export const CLEAR_FILTERS = 'CLEAR_FILTERS'
// export const SET_FILTER = 'SET_FILTER'



// export function getAllDogs() {
//     return async function (dispatch) {
//       let data = await axios.get("/dogs");
//       let dataJ = await data.json();
//       dispatch({ type: GET_ALL_DOGS, payload: dataJ });
//     };
//   }
  
//   export function searchDogsByName(name) {
//     return async function (dispatch) {
//       let data = await axios.get(`/dogs?name=${name}`);
//       data = await data.json();
//       dispatch({ type: SEARCH_DOGS, payload: data });
//     };
//   }
  
//   export function getDogDetail(idDog) {
//     return async function (dispatch) {
//       let data = await axios.get(`/dogs/${idDog}`);
//       data = await data.json();
//       dispatch({ type: GET_DOG_DETAIL, payload: data });
//     };
//   }
  
//   export function getTemperaments(){
//     return async function(dispatch){
//       let data = await axios.get('/temperaments');
//       data = await data.json();
//       dispatch({ type: GET_TEMPERAMENTS, payload: data})
//     }
//   }
  
//   export function createDog(newDog) {
//     return async function(dispatch){
//       let data = await axios.post('/post', newDog);
//       data = await data.json();
//       dispatch({ type: CREATE_BREED, payload: data})
//     }
//   }
//   export function deleteDogDetail() {
//     return {
//       type: DELETE_DOG_DETAIL,
//     };
//   }
  
//   export function setPageConfig() {
//     return {
//         type: SET_PAGES_CONFIG
//     }
// }

// export function setPage(payload) {
//     return {
//         type: SET_PAGE,
//         payload
//     }
// }

// export function setStatus(payload) {
//     return{
//         type: SET_STATUS,
//         payload
//     }
// }

// export function setFilter(payload) {
//   return {
//       type: SET_FILTER,
//       payload
//   }
// }
  
//   export function filterDogs(payload){
//     return{
//       type: FILTER_DOGS,
//       payload
//     }
//   }
  
//   export function clearFilters(){
//     return{
//       type: CLEAR_FILTERS
//     }
//   }
  
//   // export function filterByTemperaments(temps){
//   //   return  {
//   //     type: "FILTER_BY_TEMPERAMENTS",
//   //     payload: temps
//   //   }
//   // }
  
//   // export function startLoading(){
//   //   return{
//   //     type: "LOADING"
//   //   }
//   // }