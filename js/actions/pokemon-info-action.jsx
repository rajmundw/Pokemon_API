export const CHANGE_POKEMON='pokemon'
export const changePokemon=(newPokemon)=>{
    return {
        type: CHANGE_POKEMON,
        payload:{
            element: newPokemon
        }
    }
}
