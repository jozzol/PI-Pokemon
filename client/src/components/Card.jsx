import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

export default function Card({image, name, type, id, attack, defense}){
    return (
        <div className="card">
            <Link to = {`/pokemon/${id}`}>
            <img src={image} alt='not found' width='250px' height='250px'/>
            <h3 >{name}</h3>
            </Link>
            <h3 className="inside">Attack: {attack} Defense: {defense}</h3>
            <h3 >Types: {type}</h3>
        </div>
    );
}