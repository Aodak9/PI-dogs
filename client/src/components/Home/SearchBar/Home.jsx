import React from 'react';
import './Home.css'
import style from './Home.css'
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated, byOrder, FilterTemperaments, FilterWeight, getTemperaments } from '../../../redux/actions/index';
/*getDogTemperament,*/
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import Paginado from '../Pagination/Pagination'
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch()
    const filterDogs = useSelector((state) => state.filterDogs)
    const allDogs = useSelector((state) => state.dogs)
    const Temps = useSelector((state) => state.temperaments)
    console.log(filterDogs, "Linea 30")
    console.log(Temps, "linea 100")
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage] = useState(8)
    const [order, setOrder] = useState('')
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    //console.log(filterDogs, "Linea 25")
    const currentDogs = filterDogs.slice(indexOfFirstDog, indexOfLastDog)
    //console.log(currentDogs, "linea 26")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    /*const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
    }*/


    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterTemperaments(e) {
        e.preventDefault()
        dispatch(FilterTemperaments(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterWeight(e) {
        dispatch(FilterWeight(e.target.value))
        //console.log(e.targe.value)
        setCurrentPage(1);
    }
    

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }

    /* function handleDispatchTemp(e) {
         dispatch(filterTemp(allDogs, e.target.value));
 
     }*/

    function handleOrder(e) {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    /*const handleTemperament = (e) => {
        e.preventDefault();
        state.temperament ? dispatch(getDogTemperament(state.temperament)) : alert('No has colocado un Temperamento')
        //dispatch(removegetDogsLoaded())
        setState({ ...state, temperament: "" });
    }*/

    return (
        <div className='homeContainer'>
            <div className='dogContainer'>
                <div className='backgroundNavi'>
                <div className='divNav'>
                <h1>THE BEST BREEDS OF DOGS ARE HERE!!</h1>
                <button onClick={e => { handleClick(e) }}>
                    Cargar Dogs
                </button>
                <div>
                    <select className={style.fOrder} onChange={e => handleOrder(e)} >
                        <option value='Asc'>Ascendente</option>
                        <option value='Desc'>Descendente</option>
                    </select>
                    <select className={style.fOrder} onChange={e => handleFilterCreated(e)}>
                        <option value='all'>Todos</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Existentes</option>
                    </select>
                    <select className={style.fOrder} onChange={e => handleFilterWeight(e)}>
                        <option value=''>Ordenar Peso</option>
                        <option value='high'>Descendente</option>
                        <option value='less'>Ascendente</option>
                    </select>
                    

                    {/*<select name="temperament" value={state.temperament} onChange={(e) => handleChange(e)} className={style.fTemp}>
                        <option value="temperament">Por Temperamento</option>
                        {
                            Temps?.map((t, key) => (
                                <option key={key} value={t}>{t}</option>
                            ))
                        }
                    </select>
                    <button
                        className={`${!state.temperament?.length && "disabled"}`}
                    type="button" name="temperament" onClick={(e) => handleTemperament(e)}>BUSCAR</button>*/}



                    <select className={style.fOrder} onChange={e => handleFilterTemperaments(e)}>
                        <option value='All Temperaments'>All Temperaments</option>
                        {
                            /*Temps?.map((t, key) => (
                                <option key={key} value={t}>{t}</option>
                            ))*/

                            Temps.map(temperament => <option value={temperament.name} key={temperament.id}>{temperament.name}</option>)
                        }
                    </select>
                    <button onClick={e => { handleClick(e) }}></button>



                    {/*<select onChange={onChangeByTemps} className={style.fTemp}>
                        <option value='allTemps'>Por Temperamento</option>
                        {
                            Temps.map(temperament => <option value={temperament.id} key={temperament.id}>{temperament.name}</option>)
                        }
                    </select>*/}


                
                <Paginado
                    dogsPerPage={dogsPerPage}
                    //totalPost={states.currentInfo.length}
                    allDogs={filterDogs.length}
                    paginado={paginado}
                />
                </div>
                </div>
                </div>
                <SearchBar />;
                <div className='dogResults'>
                    {currentDogs?.map((breed) => {
                        console.log(breed.temperament)
                        return (
                            <div className='fullresultsContainer'>
                                <div className='dog'>
                                    <div className='dogResults'>
                                        <Fragment >
                                            <Link to={"/details/" + breed.id} style={{textDecoration:'none'}}>
                                                <Card
                                                    name={breed.name}
                                                    image={breed.image}
                                                    temperament={breed.temperament}
                                                    weight={breed.weight}
                                                    key={breed.id}
                                                />
                                            </Link>
                                        </Fragment>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                    <div><Paginado
                    dogsPerPage={dogsPerPage}
                    //totalPost={states.currentInfo.length}
                    allDogs={filterDogs.length}
                    paginado={paginado}
                    />
                    </div>
            </div>
        </div >

    )
}