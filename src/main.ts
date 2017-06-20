// Styles
import './styles/globals.less'


// Polyfills
import 'core-js/es6/object'
import 'core-js/es6/string'


// Bootstrapping
import {createElement} from 'react'
import {render} from 'react-dom'

import {Store} from './store'
import {Application} from './components/Application'


const store = new Store()

render(
    createElement(Application, { store }),
    document.querySelector('#Application'),
)
