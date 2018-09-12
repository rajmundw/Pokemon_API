import {CHANGE_JSON} from '../actions/json-action.jsx'
const jsonReducer=(state=[],action)=>{
switch (action.type){
        case CHANGE_JSON:
            return action.payload.array
        default:
            return state
    }
}
export default  jsonReducer
