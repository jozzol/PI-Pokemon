import axios from 'axios';

export function getPokemon(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemon', {

        });

        return dispatch({
            type: "GET_POKEMON",
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/type', {

        });

        return dispatch({
            type: "GET_TYPE",
            payload: json.data
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const json = await axios.post('http://localhost:3001/pokemon', payload);
        console.log(json)
        return json;
    }
}

export function filterPokemonByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload: payload
    }
}

export function filterPokemonByCreate(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_CREATE',
        payload: payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload: payload
    }
}

export function orderByAttack(payload){
    return {
        type: 'ORDER_BY_ATTACK',
        payload: payload
    }
}

export function getNamePokemon(payload){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/pokemon?name=${payload}`);
            return dispatch ({
                type: 'GET_NAME_POKEMON',
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/pokemon/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}