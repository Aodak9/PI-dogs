import React from "react";
import './Card.css'

export default function Card({ name, image, temperament, weight, bred_for }) {
    
    let temp =[];
    if(typeof temperament === 'object'){
        let arr = temperament??temperament.join().split(', ')
        temp = [...temp, arr]
    }
    if(typeof temperament === 'string'){
        let arr = temperament??temperament.split(', ')
        temp = [...temp, arr]
    }
    
    return (
        <div>            
            <div className='cardContainer'>
                <div className='titleDogs'>                    
                    <h3 style={{marginBottom:10}}>{name}</h3>
                    <h5>Weight: {weight}</h5>
                    <div className='imgPosterWrap'>
                        <img className='imgPoster' src={image} alt="img not found" width="400px" height="450px" />
                    </div>
                    <h5>Bred_for: {bred_for}</h5>
                    <div>
                        {                                                     
                            temp??temp.map((e, i)=> <h5 key={i}><span>{e}</span></h5>)
                        } 
                    </div>
                </div>
            </div>
        </div>
    );
}