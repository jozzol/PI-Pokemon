import React from "react";
import { Link } from "react-router-dom";

export default function Card({image, name, type, id, attack}){
    return (
        <div>
            <Link to = {`/pokemon/${id}`}>
            <img src={image} alt='not found' width='200px' height='250px'/>
            <h3>{name}</h3>
            </Link>
            <h3>{type}</h3>
            <h3>{id}</h3>
            <h3>Attack: {attack}</h3>
        </div>
    );
}