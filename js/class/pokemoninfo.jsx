import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class PokemonInfo extends React.Component{
    constructor(props){
        super(props)

    }

    returnToList(){                                        // powrót z dodatkowych inforamcjci o pokemonie bo listy
        document.querySelector('.main-pokemon').style.display='block'
        document.querySelector('.root-pagination').style.display='block'
        document.querySelector('.header').innerText='Pokemon'
        document.querySelector('.pokemon-extra-info').style.display='none'
        document.querySelector('body').className=''
    }

    pokemonInfo() {
        let array = []    //tablica do wrzucania react elelmentow do wyrenderowania potem z infomacjami o wybranym pokemonie
        for (let key in this.props.newPokemonInfo[0]) {
            if(typeof this.props.newPokemonInfo[0][key]!=='object') {
                array.push(
                    <div className="key-pokemon-info">
                        <h3 style={{display: 'inline-block'}}>{key}:</h3> {this.props.newPokemonInfo[0][key]}
                    </div>
                )
            }else if(this.props.newPokemonInfo[0][key]==null) {
                array.push(
                    <div className="key-pokemon-info">
                        <h3 style={{display: 'inline-block'}}>{key}:</h3> null
                    </div>
                )
            }else if(typeof this.props.newPokemonInfo[0][key][0]!='object') {
                let string = ''
                this.props.newPokemonInfo[0][key].forEach(item => {
                    string = `${item}, ${string}`
                })
                array.push(
                    <div className="key-pokemon-info">
                        <h3 style={{display: 'inline-block'}}>{key}:</h3> {string}
                    </div>
                )
            }else{
                let string=''
                this.props.newPokemonInfo[0][key].forEach((item,index)=>{

                    for(let key3 in item) {
                        if (key3 == 'name') {
                            string = `${item[key3]}, ${string}`
                        }
                    }
                })
                array.push(
                    <div className="key-pokemon-info">
                        <h3 style={{display: 'inline-block'}}>{key}:</h3> {string}
                    </div>
                )
                }
            }

        return (<div>{array}</div>)
    }
    render(){
        if(this.props.newPokemonInfo.length>0) {
            return (<div className="pokemon-extra-info">
                <div>{this.pokemonInfo()}</div>           {/*renderowanie dodatkowych inforamcji*/}
                <div className="back" onClick={this.returnToList}>Back</div> {/*powrót z wyswietlonego diva z informacjami */}
                <div  ><img className="pokemon-img" src={`${this.props.newPokemonInfo[0].img}`}/></div>   {/* div back*/}

            </div>)
        }else{
            return null
        }
    }
}


const mapStateToProps=(state,props)=>{
    return{
        newPokemonInfo: state.newPokemon,                 // pobieranie elemetow stanu
    }
}


export default connect(mapStateToProps)(PokemonInfo)