import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {changePage} from '../actions/page-action.jsx'
import {bindActionCreators} from'redux'

import Main from './Main.jsx'



    class App extends React.Component {

        render() {
            return (
                <div>
                    <Main/>
                </div>                   //renderowanie

            )
        }
    }

export default connect()(App)