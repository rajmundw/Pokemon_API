import React from 'react';
import ReactDOM from 'react-dom';
import App from './class/app2.jsx';
import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import jsonReducer from './reducers/json-reducer.jsx'
import pageReducer from './reducers/page-reducer.jsx'
import pokemonReducer from './reducers/pokemon-info-reducer.jsx'
import thunk from'redux-thunk'


const allReducers=combineReducers({
    jsonAnswer: jsonReducer,
    pageNumber: pageReducer, // połaczenie reducerow
    newPokemon: pokemonReducer
})

const allStoreEnhance=compose(applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension());           // wprowadzenie middleware i devToolsa

const store=createStore(
    allReducers,                                   //stwoerzenie stora
    {
        jsonAnswer: [],
        pageNumber: 1  ,                       // defaultowe wartości po to 1 rzeczy strona sie wczytywała
        newPokemon: [],
    },allStoreEnhance
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,// renderowanie
    document.getElementById('app'));
