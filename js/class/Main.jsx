import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {changePage} from '../actions/page-action.jsx'
import {changeJson} from '../actions/json-action.jsx'
import {answer} from '../actions/json-action.jsx'
import {bindActionCreators} from'redux'
import Pokemon from './pokemon.jsx'
import Pagination from './pagination.jsx'
import Header from './Header.jsx'

class Main extends React.Component {
    constructor(props){
        super(props)
        this.changeArray=this.changeArray.bind(this)            // aby działał this
    }

    changeArray(answer){
        this.props.updateJsonAnwer(answer)         // aktualizacja tablicy z odpowiedzia
    }
    newFetch = (number) => {                                                      // zapytanie do serwera
        const answer = fetch(`https://rajmundw.github.io/Pokemon_API/pokemon?_page=${number}`)
    .then(resp => resp.json())
            .then(data => {
                this.changeArray(data)                             // wywołanie funkcji aktualizacji tablicy
            })
            .catch(err => console.log(err))  // obsluga bledu
    }


    componentDidMount() {
        this.newFetch()                // wywołanie odpowiedzio przy zamonowaniu komponentu
    }




    render() {
        return (
            <div>
                <Header />
                <Pokemon />
                <Pagination  newFetch={this.newFetch}/>
            </div>  // renderowanie elementow strony i przezazanie przez props zapytania do jsona

        )
    }
}

const mapStateToProps=(state,props)=>{
    return{
        jsonAnswer: state.jsonAnswer,
        pageNumber: state.pageNumber,
    }
}
const mapActionsToProps=(dispatch)=> {

    return bindActionCreators({
        updatePage: changePage,
        updateJsonAnwer: changeJson,
        updateAnswer: answer
    }, dispatch)
}
export default connect(mapStateToProps,mapActionsToProps)(Main)
