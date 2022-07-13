import React from 'react';
import { useState, useEffect } from 'react';
import './Pagination.css'
//import style from "./Pagination.css"

//export default function Paginado({ dogsPerPage, allDogs, paginado }) {

const Paginado = ({ dogsPerPage, allDogs, paginado }) => {
    const pageNumbers = []
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0)
    }, [allDogs])


    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    const handleOnClick = (index, number) => {
        setActiveIndex(index);
        paginado(number)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (

        <div className='pagination'>
            {pageNumbers.map((number, index) => (
                <span className={activeIndex === index ? "active" : "unactive"} key={number} onClick={() => handleOnClick(index, number)}>
                    {number}
                </span>

            ))}
        </div>

    );
};

export default Paginado;
