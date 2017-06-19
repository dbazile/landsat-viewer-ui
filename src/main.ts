// Styles
import './styles/globals.less'


// Polyfills
import 'core-js/es6/object'
import 'core-js/es6/string'


// Bootstrapping
import {createElement} from 'react'
import {render} from 'react-dom'

import {Application} from './components/Application'
import {SOME_CONFIG_PROPERTY} from './config'


render(
    createElement(Application),
    document.querySelector('#Application'),
)

console.info('Application bootstrapped.')
console.info('process.env.NODE_ENV:', process.env.NODE_ENV)
console.info('SOME_CONFIG_PROPERTY:', SOME_CONFIG_PROPERTY)
