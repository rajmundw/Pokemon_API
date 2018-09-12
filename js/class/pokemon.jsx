import React from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import appendReactDOM from 'append-react-dom'
import ReactDOMServer from 'react-dom/server'
import renderHTML from 'react-render-html'
import PokemonInfo from './pokemoninfo.jsx'
import {changePokemon} from '../actions/pokemon-info-action.jsx'

class Pokemon extends React.Component {
    constructor(props){
        super(props)
        this.onUpdatePokemon=this.onUpdatePokemon.bind(this)    // aby moc zmienic state
    }

    onUpdatePokemon(array){
        this.props.changePokemon(array)                       //funckja do zmiany state
    }
    showAllInfromation = (choosenPokemon) => {      // pokazuje wszystkie infomacje o pokemonie po kliku na jego diva //choosenPokemon nie oznacza ze bedzie to dokładnie ten pokemon wiec trzeva zrobic kilka warunkow

            let choosenDiv = ''
            if (choosenPokemon.target.className == "pokemon-name" || choosenPokemon.target.className == "all-type") {               //ify zeby kazdy element diva byl obslugiwany
                choosenDiv = choosenPokemon.target.parentElement
            } else if (choosenPokemon.target.className == "pokemon-typ" || choosenPokemon.target.className == 'photo') {
                choosenDiv = choosenPokemon.target.parentElement.parentElement
            } else {
                choosenDiv = choosenPokemon.target;
            }                                                            // dokładnie ten pokemon ktory zostal wybrany

            let pokemonObject = this.props.jsonAnswer.filter(item => {
                return item.name == choosenDiv.dataset.name
            })                  // odbiekt z tablicy z odpowiedzi jsona ktory reprezentuje wybranego pokemona

        this.onUpdatePokemon(pokemonObject)        // wrzucenie tablicy do state


        if(document.querySelector('.pokemon-extra-info')!=null){
            document.querySelector('.pokemon-extra-info').style.display='block'
        }
            document.querySelector('.main-pokemon').style.display='none'
            document.querySelector('.root-pagination').style.display='none'
            document.querySelector('.header').innerText=choosenDiv.dataset.name
            document.querySelector('body').className='pokemon-info'                     // pokazywanie infomacji o wybranym pokemonie



    }





    createPokemons=()=>{                    //tworzenie divow z pokemonami na podstawie jsonResponse
        let pokemonsArray = [] ;    // owa tablica
        let typeArray=[]
        pokemonsArray=this.props.jsonAnswer.map(arrayElement=>{
            let background

            typeArray=arrayElement.type.map(type=>{
                if (type=='Grass'){
                    background='green'
                }else if (type=='Poison')
                {
                    background="purple"        // kolory typow pokemona
                }else if (type=='Fire'){
                    background='red'
                }else if (type=="Flying"){
                    background="lightblue"
                }else if (type=="Water"){
                    background='#26C8FF'
                }else if (type=="Bug"){
                    background='#8A911C'
                }else if (type=="Electric"){
                    background='yellow'
                }else if (type=="Ground"){
                    background="#702D1B"
                }else if(type=="Fighting"){
                    background='black'
                }else if (type=="Psychic"){
                    background="#21386E"
                }else if (type=="Rock"){
                    background="grey"
                }else if (type=="Ice"){
                    background="#00FEFF"
                }else if (type=="Dragon"){
                    background='#E75E2C'
                }
                else background='brown'
                    return <div style={{backgroundColor:background}} className="pokemon-typ">{type}</div>    // typ pokemona z tlem
            })



            return <div onClick={this.showAllInfromation} className="pokemon" data-name={arrayElement.name} >
                <div style={{clear:'both'}} className='img'>
                        <img className='photo' src={`${arrayElement.img}`}/>
                </div>
                <div className="pokemon-name" style={{clear:'both',height:'20px',margin:'0px, auto'}}>#{arrayElement.num} {arrayElement.name}</div>
                <div className="all-type">
                    {typeArray}
                </div>
            </div>
        })
        return <div>{pokemonsArray}</div>  //gotowa tablica do renderowania
    }


    render(){
        return (<div>
                    <div className="main-pokemon">
                        {this.createPokemons()}
                    </div>
                        < PokemonInfo />
                </div>)
                                        //renderowanie pokemonow
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
        changePokemon: changePokemon                        // zamiana elementow stanu
    }, dispatch)
}
export default connect(mapStateToProps,mapActionsToProps)(Pokemon)