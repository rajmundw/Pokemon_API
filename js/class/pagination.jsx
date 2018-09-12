import React from "react";
import ReactDOM from 'react-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changePage} from '../actions/page-action.jsx'
class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.onUpdatePage = this.onUpdatePage.bind(this)
    }

    onUpdatePage(event) {

        this.props.updatePage(Number(event.target.innerText))     // aktualizacja state plus wywołanie nowego wysukania i aktualizacja odpowiedzi z jsona
        this.props.newFetch(event.target.innerText)

            let previousClickedNumber = document.querySelector('.clicked')

            previousClickedNumber.className = 'number'     //usunięcie klasy

            event.target.className = 'clicked'     //dodanie klasy      (stylizacja numerow stron)

        }



    createPagesNumber = () => {                                      // stworzenie divow z numerami stron
        const pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]   //numery stron
        const newPagesArray = pagesArray.map((arrayNumber, index) => {       //tworzenie react componentu do wyrenderowania liczby stron
            if (index == 0) {     // if po to zeby przy zaladwaniau strony pierwsza strona miala klase clicked
                return <div data-numberPages={index + 1} onClick={this.onUpdatePage}
                            className="clicked">{index + 1}</div>
            }
            return <div data-numberPages={index + 1} onClick={this.onUpdatePage} className="number">{index + 1}</div>
        })            // data numberPages zeby ułatwic wczytywanie id pokemonow z jsona
        return <div className="numbers">{newPagesArray}</div>  //tablica do renderowania numerow
    }

    render() {
        return (
            <div className="root-pagination">
                <div className="pagination">{this.createPagesNumber()}</div>
            </div>) //renderowanie liczby stron
    }
}

const mapStateToProps=(state,props)=>{
    return{
        jsonAnswer: state.jsonAnswer,                 // pobieranie elemetow stanu
        pageNumber: state.pageNumber,
    }
}
const mapActionsToProps=(dispatch)=> {

    return bindActionCreators({
        updatePage: changePage                        // zamiana elementow stanu
    }, dispatch)
}

export default connect(mapStateToProps,mapActionsToProps)(Pagination)