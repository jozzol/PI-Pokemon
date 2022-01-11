import React from "react";
import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPokemon, getTypes, filterPokemonByType, filterPokemonByCreate, orderByName, orderByAttack } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Select from 'react-select'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home(){
const dispatch = useDispatch()
const allPokemon = useSelector ((state) => state.pokemon)
const allTypes = useSelector ((state) => state.type)
const [order, setOrder] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [pokemonPerPage, setPokemonPerPage] = useState(12)
const indexOfLastPokemon = currentPage * pokemonPerPage
const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage
const currentPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}


useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());

}, [dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getPokemon());
}

function handleFilterByType(e){
    dispatch(filterPokemonByType(e))
}

function handleFilterByCreate(e){
    dispatch(filterPokemonByCreate(e))
}

function handleSortByName(e){
    dispatch(orderByName(e))
    setCurrentPage(1);
    setOrder(`${e}`)
}

function handleSortByattack(e){
    dispatch(orderByAttack(e))
    setCurrentPage(1);
    setOrder(`${e}`)
}

const options1 = [
    {value: 'a-z', label: 'A-Z'},
    {value: 'z-a', label: 'Z-A'}
]
const options2 = [
    {value: 'all', label: 'All'},
    {value: 'created', label: 'Created'},
    {value: 'official', label: 'Official'}
]
const options3 = [{value:'all', label:'All'}].concat(allTypes.map(t =>({
    value: t.name, label: t.name
})))

const options4 = [
    {value: '>', label: 'Bigger attack'},
    {value: '<', label: 'Lower attack'}
]



return (
    <div>
        <Link to= '/CreatePokemon'>Create pokemon</Link>
        <h1>Henry Pokemon</h1>
        <button onClick={e=> {handleClick(e)}}>
            Load all pokemon
        </button>
        <div>
            <Select onChange={e => handleSortByName(e)} options={options1} placeholder='Order by name'/>
            <Select onChange={e => handleSortByattack(e)} options={options4} placeholder='Order by attack'/>
            <Select onChange={e => handleFilterByCreate(e)} options={options2} placeholder='Filer created'/>
            <Select onChange={e => handleFilterByType(e)} options={options3} placeholder='Filter by type'/>
            <SearchBar/>
            <Paginado
                pokemonPerPage={pokemonPerPage}
                allPokemon={allPokemon.length}
                paginado={paginado}
            />
            {
                currentPokemon.map && currentPokemon.map(p =>{
                    return (
                    <Card name={p.name} image={p.image} key={p.id} id={p.id} type={!p.createdInDb? p.type + (' '): p.types.map(t => t.name + (' '))} attack={p.attack}/>
                    )
                })
            }
        </div>
    </div>
)


}