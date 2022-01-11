import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Select from 'react-select'

function validateName(input){
    let error = {};
    if(!input.name){
        error.name = 'Name your pokemon';
    } 
    return error;
}



export default function PokeCreate(){
    const dispatch = useDispatch()
    const type = useSelector((state) => state.type)  
    const navigate = useNavigate() 
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name:'',
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        image:'',
        type: []
    })
    const allTypes = useSelector ((state) => state.type)

    const optionsT = allTypes.map(t =>({
        value: t.name, label: t.name
    }))

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validateName({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    }
    function handleChangeTypes(e){
        setInput({
            ...input,
            type: [...input.type, e.at(-1).value]
        })
        console.log(input)

    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        alert('Pokemon created!')
        setInput({
            name:'',
            hp:0,
            attack:0,
            defense:0,
            speed:0,
            height:0,
            weight:0,
            image:'',
            type: []
        })
        navigate('/home')
    }

    useEffect(()=>{
        dispatch(getTypes())
    }, []);

    return(
        <div>
            <Link to= '/home'><button>Back</button></Link>
            <h1>Create new pokemon</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>

                <label>NAME:</label>
                <input
                type= 'text'
                value= {input.name}
                name= 'name'
                onChange={handleChange}
                
                />
                {error.name &&(
                    <p className= 'error'>{error.name}</p>
                )}
                </div>
                <div>

                <label>HP:</label>
                <input
                type= 'number'
                value= {input.hp}
                name= 'hp'
                onChange={handleChange}
                
                />
                </div>
                <div>

                <label>ATTACK:</label>
                <input
                type= 'number'
                value= {input.attack}
                name= 'attack'
                onChange={handleChange}
                
                />
                </div>
                <div>

                <label>DEFENSE:</label>
                <input
                type= 'number'
                value= {input.defense}
                name= 'defense'
                onChange={handleChange}
                
                />
                </div>
                <div>

                <label>SPEED:</label>
                <input
                type= 'number'
                value= {input.speed}
                name= 'speed'
                onChange={handleChange}
                
                />
                </div>
                <div>

                <label>HEIGHT:</label>
                <input
                type= 'number'
                value= {input.height}
                name= 'height'
                onChange={handleChange}
                
                />
                </div>
                <div>

                <label>WEIGHT:</label>
                <input
                type= 'number'
                value= {input.weight}
                name= 'weight'
                onChange={handleChange}
                
                />
                </div>

                <div>
                <label>IMAGE:</label>
                <input
                type= 'text'
                value= {input.image}
                name= 'image'
                onChange={handleChange}
                
                />
                <div>
                <label>TYPE:</label>
                <Select onChange={e =>handleChangeTypes(e)} options={optionsT} placeholder='Select types' isMulti= 'true' />

                </div>
                </div>
                <button type='submit'>Create new pokemon</button>

            </form>
        </div>
    )

}