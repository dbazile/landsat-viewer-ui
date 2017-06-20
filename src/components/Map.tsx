import 'leaflet/dist/leaflet.css'

import * as React from 'react'
import * as L from 'leaflet'
import * as classnames from 'classnames'

import styles from './Map.less'

const DEFAULT_CENTER = [-10, 0]
const DEFAULT_ZOOM = 3

const KEY_CENTER = 'VIEW_CENTER'
const KEY_ZOOM = 'VIEW_ZOOM'


const BASEMAP = L.tileLayer('https://api.mapbox.com/styles/v1/baziledavid/cj3rjith900032ro4p8fe30pz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmF6aWxlZGF2aWQiLCJhIjoiY2ozamUxN3NoMDBmdTJ3cXNvMGFvNmZ0ZSJ9.AjW3_wFRo5nt4JBUvM5fzQ', {
    attribution: `&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a>
                  &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>`,
})


interface Props {
    className?: string
    scenes: landsatviewer.SceneList

    onClick(x: number, y: number)
}

interface PreviewLayer extends L.TileLayer {
    sceneId: string
}

export class Map extends React.Component<Props, {}> {
    private target: HTMLElement
    private map: L.Map
    private vectors: L.FeatureGroup
    private preview: PreviewLayer

    public render() {
        return (
            <div className={classnames(styles.root, this.props.className)}>
                <div ref={e => this.target = e}/>
            </div>
        )
    }

    public componentDidMount() {
        this.vectors = L.featureGroup()

        this.map = L.map(this.target, {
            zoom: parseInt(sessionStorage.getItem(KEY_ZOOM), 10) || DEFAULT_ZOOM,
            center: JSON.parse(sessionStorage.getItem(KEY_CENTER)) || DEFAULT_CENTER,
            layers: [
                BASEMAP,
                this.vectors,
            ],
        })

        window['__map__'] = this.map  // tslint:disable-line

        this.map
            .on('click', this.onMapClick)
            .on('move', this.onMapMove)

        this.vectors
            .on('click', this.onFootprintClick)

        this.redrawFootprints()
    }

    public componentDidUpdate(nextProps: Props) {
        if (nextProps.scenes !== this.props.scenes) {
            this.redrawFootprints()
        }
    }

    private onFootprintClick = (e: any) => {
        L.DomEvent.stop(e)

        const sceneId = (e.layer as any).feature.id
        const {preview: currentPreview} = this
        if (currentPreview) {
            animateExit(currentPreview)

            this.preview = null
            if (currentPreview.sceneId === sceneId) {
                return
            }
        }

        const preview = L.tileLayer(`/api/tiles/${sceneId}/{z}/{x}/{y}.png`, {
            attribution: `&copy;<a href="https://landsat.usgs.gov/about-landsat" target="_blank" rel="noreferrer">Landsat8</a>,
                          &copy;<a href="https://www.planet.com" target="_blank" rel="noreferrer">Planet</a>`,
            bounds: e.target.getBounds(),
            pane: 'overlayPane',
            maxNativeZoom: 13,
        }) as PreviewLayer

        preview.sceneId = sceneId

        const loadingIndicator = createLoadingIndicator(e.layer.getBounds().getCenter())
            .addTo(this.map)

        preview
            .once('load tilerror', () => loadingIndicator.remove())
            .setZIndex(999)
            .addTo(this.map)

        this.preview = preview
    }

    private onMapClick = (e: L.MouseEvent) => {
        if (this.preview) {
            animateExit(this.preview)
        }

        const loadingIndicator = createLoadingIndicator(e.latlng)
            .addTo(this.map)

        this.props.onClick(e.latlng.lng, e.latlng.lat)
            .then(() => loadingIndicator.remove())
    }

    private onMapMove = () => {
        sessionStorage.setItem(KEY_CENTER, JSON.stringify(this.map.getCenter()))
        sessionStorage.setItem(KEY_ZOOM, this.map.getZoom().toString())
    }

    private redrawFootprints() {
        this.vectors.clearLayers()

        if (!this.props.scenes) {
            return  // Nothing to draw
        }

        this.vectors.addLayer(L.geoJSON(this.props.scenes, {
            style: () => ({
                className: styles.footprint,
            }),
        }))
    }
}


//
// Helpers
//

function animateExit(layer: L.TileLayer) {
    let opacity = 1
    const tick = () => {
        if (opacity <= 0) {
            layer.remove()
            return
        }

        opacity -= 0.05
        layer.setOpacity(opacity)
        requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

function createLoadingIndicator(coordinate: L.LatLng) {
    return L.circleMarker([0, 0], {className: styles.loadingIndicator})
        .setLatLng(coordinate)
}
