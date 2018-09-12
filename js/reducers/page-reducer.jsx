import {CHANGE_PAGE} from '../actions/page-action.jsx'
 const pageReducer=(state='',action)=>{
    switch (action.type){
        case CHANGE_PAGE:
            return action.payload.page
        default:
            return state
    }
}

 export default pageReducer