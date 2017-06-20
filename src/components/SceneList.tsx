import * as React from 'react'
import * as $ from 'classnames'

import styles from './SceneList.less'


interface Props {
    className?: string
    scenes: landsatviewer.SceneList
}

export const SceneList = ({ className, scenes }: Props) => (
    <div className={$(styles.root, className)}>
        {scenes && scenes.features.map((scene, i) => (
            <a key={i} href={`/api/scenes/${scene.id}`} target="_blank" title="Get metadata URL" className={styles.scene}>
                <div className={styles.scene__id}>{scene.id}</div>
                <div className={styles.scene__timestamp}>{scene.properties.acquiredOn}</div>
            </a>
        ))}
    </div>
)
