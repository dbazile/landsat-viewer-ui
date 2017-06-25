import {action, IObservableArray, observable} from 'mobx'
import axios from 'axios'


const SEARCH_PRECISION = 1
const KEY_SCENES = 'SCENES'


export class Store {
    @observable.shallow
    scenes: landsatviewer.SceneList = JSON.parse(sessionStorage.getItem(KEY_SCENES))

    @observable
    errors: IObservableArray<ErrorDetails> = [] as any

    private cancelSearch: () => void

    @action
    public async search(x: number, y: number) {
        if (this.cancelSearch) {
            this.cancelSearch()
        }

        try {
            const response = await axios.get('/api/scenes', {
                params: {
                    x: Math.round(x / SEARCH_PRECISION) * SEARCH_PRECISION,
                    y: Math.round(y / SEARCH_PRECISION) * SEARCH_PRECISION,
                },
                cancelToken: new axios.CancelToken(cancel => this.cancelSearch = cancel),
            })

            sessionStorage.setItem(KEY_SCENES, JSON.stringify(response.data))

            this.scenes = response.data
        }
        catch (err) {
            if (axios.isCancel(err)) {
                return  // Nothing to do
            }

            this.errors.push({
                heading: 'Oh no, something is broken!',
                message: err.response
                    ? `A server error prevents search: ${err.response.data.error}.`
                    : `An application error prevents search: ${err.toString()}`,
            })
        }
        finally {
            this.cancelSearch = null
        }
    }

    @action
    appendError(err: ErrorDetails) {
        this.errors.push(err)
    }

    @action
    dismissError(err: ErrorDetails) {
        this.errors.remove(err)
    }
}


export interface ErrorDetails {
    heading: string
    message: string
}
