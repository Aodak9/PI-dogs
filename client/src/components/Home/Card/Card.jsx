import React from "react";
import './Card.css'

export default function Card({ name, image, temperament, weight }) {
    return (
        <div>
            <div className='cardContainer'>
                <div className='titleDogs'>
                    <h3>{name}</h3>
                    <h5>Weight {weight}</h5>
                    <div className='imgPosterWrap'>
                        <img className='imgPoster' src={image} alt="img not found" width="400px" height="450px" />
                    </div>
                    <h5>{temperament}</h5>
                </div>
            </div>
        </div>
    );
}