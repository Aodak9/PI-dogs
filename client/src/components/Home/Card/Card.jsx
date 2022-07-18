import React from "react";
import './Card.css'

export default function Card({ name, image, temperament, weight }) {
    React.useEffect(()=>{
        // console.log(temperament)
    },[])
    let temp 
    temp = temperament?temperament.split(', '):undefined
    

    
    return (
        <div>
            <div className='cardContainer'>
                <div className='titleDogs'>
                    <h3 style={{marginBottom:10}}>{name}</h3>
                    <h5>Weight: {weight}</h5>
                    <div className='imgPosterWrap'>
                        <img className='imgPoster' src={image} alt="img not found" width="400px" height="450px" />
                    </div>
                    <div className='temperamento'>
                        {
                            temp?temp.map(e=> <h5 className="tm">{e}</h5>):<h3></h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}