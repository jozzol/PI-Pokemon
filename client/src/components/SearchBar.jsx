import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../actions";
import './SearchBar.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        // console.log(name)
    }

    function handleSubmit(e){
        dispatch(getNamePokemon(e))
    }

    return (
        <div>
            <input
                type = 'text'
                placeholder="Search pokemon..."
                onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(name)}>Search</button>
        </div>
    )
}