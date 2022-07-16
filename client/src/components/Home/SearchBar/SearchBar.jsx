import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getNameDogs } from '../../../redux/actions/index';
import './SearchBar.css'
import { useHistory, Link } from 'react-router-dom';

export default function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch()
    const history = useHistory();


    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (name !== '')
            dispatch(getNameDogs(name))
        history.push('/home/getNameDogs')
        setName('')
    }

    const resetInput = () => {
        setName('')
    }

    return (
        <nav className='navBar'>
            <div className='home-Create'>
                <Link to='/home' onClick={resetInput} className='homeText'><div>HOME</div></Link>
                <Link to='/dogs' className='createText'><div>CREATE DOG</div></Link>
            </div>
            <form onClick={(e) => handleSubmit(e)}>
                <input
                    className='searchInput'
                    //type ='text'
                    placeholder="Search you're breed..."
                    onChange={(e) => handleInputChange(e)}
                    value={name || ''}
                />
                <button type='submit' className='searchIcon' >< span color='black' size='18px' /></button>
            </form>
            <div />
        </nav>
    )
}