import axios from "axios";
import React, { useEffect, useState } from "react";
import './DogDetails.css'
//import { useDispatch, useSelector } from "react-redux";
//import { getDetails } from "../../actions/index";
import { Link } from "react-router-dom";

function Detalles(props) {
    /*const dispatch = useDispatch();*/
    const [loading, setLoading] = useState(false)
    /*const myDog = useSelector((state) => state.details);*/
    const [dog, setDog] = useState({})
    console.log(dog, "linea 22")
    const { id } = props.match.params;

    function getDetails(id) {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(perro => {
                setDog(perro.data)
            })
    }

    useEffect(() => {
        getDetails(id)
        setLoading(true)
    }, [id]);

    return (
        <div className='fullContainer'>
            <div className='detailContainer'>
                {
                    dog ?
                        <div className='infoContainer'>
                            <div className='description'>
                                <h2>{dog.name}</h2>
                                <div>
                                    <img className="detailContainer" src={dog?.image} alt="Not found"></img>
                                    <br></br>
                                    <h3 className='description'>status</h3>
                                    <h5>Altura: {dog.height}</h5>
                                    <h5>Peso: {dog.weight}</h5>
                                    <h5>Edad: {dog.life_Span}</h5>
                                    <br></br>
                                    <h4 className='description'>Temperaments</h4>
                                    {dog.temperament?.map(i => (
                                        <h5>{i}</h5>
                                    ))}
                                </div>
                            </div>
                        </div> :
                        <div>Dog no existe</div>
                }
                <Link to='/home'>
                    <button className='noBold'><h3>Back</h3></button>
                </Link>
            </div>
        </div>

    )
};

export default Detalles;