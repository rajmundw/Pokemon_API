export const CHANGE_JSON='json answer'
export const changeJson=(newArray)=>{
    return {
        type: CHANGE_JSON,
        payload:{
            array: newArray
        }
    }
}

// akcja zmiany tablicy //Redux