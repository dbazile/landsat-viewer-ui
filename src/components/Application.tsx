import * as React from 'react'
import * as classnames from 'classnames/bind'
import axios from 'axios'

import styles from './Application.less'


const cn = classnames.bind(styles)

interface State {
    environment?: string
    revision?: string
    isRed?: boolean
}

export class Application extends React.Component<any, State> {
    constructor() {
        super()
        this.state = {
            environment: process.env.NODE_ENV,
            revision: '',
            isRed: false,
        }
    }

    public componentDidMount() {
        this.fetchRevision()
    }

    public render() {
        return (
            <main className={cn({
                'root': true,
                'some-global-thing': true,
                'isRed': this.state.isRed,
            })}>
                <h1>new-webapp</h1>
                <pre className={styles.subtitle}>{ JSON.stringify(this.state, null, 2) }</pre>
                <button onClick={() => this.setState((s: State) => s.isRed = !s.isRed)}>Clicky</button>
            </main>
        )
    }

    private fetchRevision() {
        axios.get('/').then(res =>
            this.setState(state => {
                state.revision = new DOMParser()
                    .parseFromString(res.data, 'text/html')
                    .documentElement
                    .getAttribute('data-app-revision')
            }),
        )
    }
}
