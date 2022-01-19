
const initialState = {
    pokemon : [],
    allPokemon : [],
    type: [],
    detail: []
}


function rootReducer(state = initialState, action){
    const allPokemon = state.allPokemon
    switch(action.type){
        case 'GET_POKEMON':
            return {
                ...state,
                pokemon: action.payload,
                allPokemon: action.payload
            }
        case 'GET_TYPE':
            return {
                ...state,
                type: action.payload
            }
        case 'GET_NAME_POKEMON':
            const nameFiltered = allPokemon.filter(p => p.name === action.payload)
            // console.log(action.payload)
            return {
                ...state,
                pokemon: nameFiltered
            }
        case "POST_POKEMON":
            return{
                ...state,
            }
        case 'FILTER_BY_TYPE':
            // console.log(action.payload)
            const typeFiltered = action.payload.value === 'all'|| action.payload === 'all'? allPokemon: allPokemon.filter(p => !p.createdInDb? p.type.includes(action.payload.value): p.types.map(t => t.name).includes(action.payload.value))
            return{
                ...state,
                pokemon: typeFiltered
            }
        case 'FILTER_BY_CREATE':
            const createFiltered = action.payload.value === 'created' ? allPokemon.filter(p => p.createdInDb): allPokemon.filter(p => !p.createdInDb)
            return{
                ...state,
                pokemon: createFiltered
            }
        case 'ORDER_BY_NAME':
            const copy = [...state.pokemon]
            let sortedName = action.payload.value === 'a-z'?
                copy.sort(function (a,b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1;
                    }
                    return 0;
                }) :
                copy.sort(function (a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                pokemon: sortedName
            }

        case 'ORDER_BY_ATTACK':
            const copyA = [...state.pokemon]
            let sortedAttack = action.payload.value === '>'?
                copyA.sort(function (a,b) {
                    return a.attack - b.attack;
                }) :
                copyA.sort(function (a,b){
                    return b.attack - a.attack;
                })
            return{
                ...state,
                pokemon: sortedAttack
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }    
        
        default:
            return state;
    }
}

export default rootReducer