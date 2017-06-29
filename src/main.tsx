// Styles
import './styles/globals.less'


// Polyfills
import 'core-js/es6'


// Bootstrapping
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import { Store } from './store'
import { Application } from './components/Application'


const store = (window as any).__store__ = new Store()

ReactDOM.render(
    <Provider store={store}>
        <Application/>
    </Provider>,
    document.querySelector('#Application'),
)
