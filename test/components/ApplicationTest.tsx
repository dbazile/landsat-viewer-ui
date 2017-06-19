import * as React from 'react'
import * as renderer from 'react-test-renderer'
import {Application} from '../../src/components/Application'

import classes from '../../src/components/Application.less'

describe('<Application/>', () => {
    it('has mocks for CSS modules', () => {
        expect(classes.subtitle).toEqual('subtitle')
        expect(classes.isRed).toEqual('isRed')
    })

    it('can render', () => {
        const component = renderer.create(<Application/>)
        expect(component.toJSON()).toMatchSnapshot()
    })
})
