import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from '../actions/index'
import './PokeDetails.css';

export default function PokeDetails(){
    const {id} = useParams();

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch])

    const myPokemon = useSelector((state) => state.detail)

    return(
        <div className="container">
            {myPokemon.length > 0? <div>
                    <img src={myPokemon[0].image} alt='' width='450px' height='450px'></img>
                <h1>{myPokemon[0].name}</h1>
                    <div className="detail-card">
                        <p>HP: {myPokemon[0].hp} </p>
                        <p>ATTACK: {myPokemon[0].attack} </p>
                        <p>DEFENSE: {myPokemon[0].defense} </p>
                        <p>SPEED: {myPokemon[0].speed} </p>
                        <p>HEIGHT: {myPokemon[0].height} </p>
                        <p>WEIGHT: {myPokemon[0].weight} </p>
                        <p>TYPES: {!myPokemon[0].createdInDb? myPokemon[0].type + (' '): myPokemon[0].types.map(t => t.name + (' '))} </p>
                    </div>
            </div>: <p> Loading...</p>}
            <Link to='/home'>
            <button>Back</button>
            </Link>
        </div>
    )
}