import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { Map } from './Map'
import { SceneList } from './SceneList'
import { Store } from '../store'

import styles from './Application.less'


export const Application = inject('store')(observer(({ store }: IProps) => (
    <div className={styles.root}>
        <Map
            className={styles.map}
            scenes={store.scenes}
            onClick={(x, y) => store.search(x, y)}
        />
        <SceneList
            className={styles.sceneList}
            scenes={store.scenes}
        />

        {store.errors.map((e, i) => (
            <div key={i} className={styles.error}>
                <div className={styles.error__contents}>
                    <div className={styles.error__heading}>{e.heading}</div>
                    <div className={styles.error__message}>{e.message}</div>
                    <button
                        className={styles.error__button}
                        onClick={() => store.dismissError(e)}>
                        Dismiss
                    </button>
                </div>
            </div>
        ))}
    </div>
)))


/*
 * Types
 */

interface IProps {
    store?: Store
}
