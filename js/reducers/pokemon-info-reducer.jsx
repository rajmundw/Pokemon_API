import {CHANGE_POKEMON} from '../actions/pokemon-info-action.jsx'
const pokemonReducer=(state='',action)=>{
    switch (action.type){
        case CHANGE_POKEMON:
            return action.payload.element
        default:
            return state
    }
}

export default pokemonReducer