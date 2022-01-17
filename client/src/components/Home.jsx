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
import loadingImage from '../images/run_pikachu.gif';
import './Home.css';

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
const [loading, setLoading] = useState(false);

const customStyles = {
    container: provided => ({
      ...provided,
      width: 150,
    }),
    option: (provided, state) =>({
        ...provided,
        minWidth: 150,
        color: state.isSelected ? 'red': 'black',
    }),
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        color: state.selectProps.menuColor,
        padding: 5,
      }),
      control: (provided, state) => ({
        ...provided,
        width: 150,
      })
  };

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}


useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());

}, [dispatch])

function handleClick(e){
    allPokemon = null;
    e.preventDefault();
    dispatch(filterPokemonByType('all'))
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
    {value: '>', label: 'Lower attack'},
    {value: '<', label: 'Bigger attack'}
]



return (
    <div>
        {allPokemon.length > 0?
        <><h1>Pokedex</h1><div className="inside">
                <Link to='/CreatePokemon'><button>Create pokemon</button></Link>
                <button onClick={e => { handleClick(e); } }>
                    Load all pokemon
                </button>
                <SearchBar />
            </div><div>
                    <Select className="react-select" onChange={e => handleSortByName(e)} options={options1} placeholder='Order by name' styles={customStyles} />
                    <Select className="react-select" onChange={e => handleSortByattack(e)} options={options4} placeholder='Order by attack' styles={customStyles} />
                    <Select className="react-select" onChange={e => handleFilterByCreate(e)} options={options2} placeholder='Filer created' styles={customStyles} />
                    <Select className="react-select" onChange={e => handleFilterByType(e)} options={options3} placeholder='Filter by type' styles={customStyles} />
                    <img className={loading ? 'elVisible' : 'elNotVisible'} src={loadingImage} alt='loading' />
                    <Paginado
                        pokemonPerPage={pokemonPerPage}
                        allPokemon={allPokemon.length}
                        paginado={paginado} />
                    {currentPokemon.map && currentPokemon.map(p => {
                        return (
                            <Card name={p.name} image={p.image} key={p.id} id={p.id} type={!p.createdInDb ? p.type + (' ') : p.types.map(t => t.name + (' '))} attack={p.attack} defense={p.defense} />
                        );
                    })}
                </div></>
                :
                <div>
                    <h1>Pokedex</h1><div className="inside">
                <Link to='/CreatePokemon'><button>Create pokemon</button></Link>
                <button onClick={e => { handleClick(e); } }>
                    Load all pokemon
                </button>
                <SearchBar />
                </div><div>
                    <Select className="react-select" onChange={e => handleSortByName(e)} options={options1} placeholder='Order by name' styles={customStyles} />
                    <Select className="react-select" onChange={e => handleSortByattack(e)} options={options4} placeholder='Order by attack' styles={customStyles} />
                    <Select className="react-select" onChange={e => handleFilterByCreate(e)} options={options2} placeholder='Filer created' styles={customStyles} />
                    <Select className="react-select" onChange={e => handleFilterByType(e)} options={options3} placeholder='Filter by type' styles={customStyles} />
                    <img className={loading ? 'elVisible' : 'elNotVisible'} src={loadingImage} alt='loading' />
                    <Paginado
                        pokemonPerPage={pokemonPerPage}
                        allPokemon={allPokemon.length}
                        paginado={paginado} />
                <h1>Loading pokemon...</h1>                     
                <img src={loadingImage} alt='loading'/>
                </div>
                </div>
                }
    </div>
)


}