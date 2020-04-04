import * as React from 'react'
import * as $ from 'classnames'

import styles from './SceneList.less'


export const SceneList = ({ className, scenes }: IProps) => (
    <div className={$(styles.root, className)}>
        {scenes && scenes.features.map(scene => (
            <a key={scene.id} href={`/api/scenes/${scene.id}`} target="_blank" title="Get metadata URL" className={styles.scene}>
                <div className={styles.scene__id}>{scene.id}</div>
                <div className={styles.scene__timestamp}>{scene.properties.acquired}</div>
            </a>
        ))}
    </div>
)


interface IProps {
    className?: string
    scenes: landsatviewer.SceneList
}
