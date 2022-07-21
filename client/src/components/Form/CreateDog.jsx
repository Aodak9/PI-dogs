import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments, getDogs} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './CreateDog.css'
import axios from "axios";

function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory()
    const Temps = useSelector((state) => state.temperaments);
    console.log(Temps, 'linea 20')
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
        life_span: '',
        sexo: '',
        temperament: []
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        console.log(input)
    };

    function handleSelect(id) {
        setInput({
            ...input,
            temperament: [
                ...input.temperament,
                id,
                // e.target.value
            ]
        });
    };

    /*function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(i => i !== el)
        })
    }*/
    console.log(input, "linea 50")
    function handleSubmit(e) {
        e.preventDefault();
        //dispatch(postDog(input))
        axios.post("http://localhost:3001/dogs", input)
            .then(response => {
                console.log(response, "Linea 54")
            })
            .catch(error => {
                console.log(error)
                alert("Hubo un error en el Posteo")
            })
        alert("Dog Creado")
        dispatch(getDogs())
        setInput({
            name: '',
            height: '',
            weight: '',
            image: '',
            life_span: '',
            sexo: '',
            temperament: [],
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    return (
        <div className='createContainer'>
            <section className='titleForm'>
                <div>
                    <Link to='/home'><button><h3>Back</h3></button></Link>
                    <h1>Create your dog breed</h1>
                    <form onSubmit={(e) => handleSubmit(e)} className='formCreate'>

                        <div className='input_field'>
                            <input className='input'
                                placeholder="Name"
                                maxLength={25}
                                type="text"
                                name="name"
                                required="required"
                                value={input.name}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className='input_field'>
                            <input className='input'
                                placeholder="height"
                                maxLength={5}
                                type="text"
                                name="height"
                                required="required"
                                value={input.height}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className='input_field'>
                            <input className='input'
                                placeholder="weight"
                                maxLength={5}
                                type="text"
                                name="weight"
                                required="required"
                                value={input.weight}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className='input_field'>
                            <input className='input'
                                placeholder="Image: URL.jpg"
                                type="text"
                                name="image"
                                required="required"
                                value={input.image}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className='input_field'>
                            <input className='input'
                                placeholder="life span"
                                maxLength={3}
                                type="number"
                                name="life_span"
                                required="required"
                                value={input.years}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div>
                            <select name="sexo" value={input.sexo} onChange={e => handleChange(e)} required>
                                <option value="">Sex</option>
                                <option value="Hembra">Female</option>
                                <option value="Macho">Male</option>
                            </select>
                        </div>
                        <form>Temperament</form>
                        <div className='platforms_subContainer'>
                            {
                                Temps.map(i => {
                                    return <div>
                                        <div>
                                            {i.name}
                                        </div>
                                        <input type="checkbox" onChange={() => handleSelect(i.id)}>

                                        </input>
                                    </div>
                                })
                            }

                            {/*<select>
                                {
                                    Temps?.map((t, key) => (
                                        <option key={key} value={t} />
                                    ))
                                    Temps.map(i => (
                                        <option onChange={() => handleSelect(i.id)} value={i.name}>{i.name}</option>
                                    ))
                                }
                                <ul>
                                    <li>{input.temperaments.map(i => i + ",")}</li>
                                </ul>
                            </select>*/}

                            <button type='submit'>Create Dog</button>
                        </div>
                        {/*{input.temperaments.map(el =>
                            <div className='divOcc'>
                                <p>{el}</p>
                                <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                            </div>
                        )};*/}
                    </form>

                </div>
            </section>
        </div>
    )
}

export default CreateDog;