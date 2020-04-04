declare namespace landsatviewer {
    interface Scene {
        id: string
        geometry: any
        properties: SceneProperties
    }

    interface SceneProperties {
        acquired: string
        resolution: number
        cloudCover: number
        wrsPath: string
        wrsRow: string
    }

    interface SceneList {
        features: Scene[]
        type: 'FeatureCollection'
    }
}


//
// Webpack Interop
//

declare module '*.less' {
    const _: any
    export default _
}

declare module '*.png' {
    const _: string
    export default _
}
