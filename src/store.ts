import { action, observable, useStrict, IObservableArray } from 'mobx'
import axios, { AxiosResponse } from 'axios'


useStrict(true)

const SEARCH_PRECISION = 1
const KEY_SCENES = 'SCENES'


export class Store {
    @observable.shallow
    scenes: landsatviewer.SceneList = JSON.parse(sessionStorage.getItem(KEY_SCENES))

    @observable
    errors: IObservableArray<ErrorDetails> = [] as any

    private cancelSearch: () => void

    @action
    search(x: number, y: number) {
        if (this.cancelSearch) {
            this.cancelSearch()
        }

        const config = {
            params: {
                x: Math.round(x / SEARCH_PRECISION) * SEARCH_PRECISION,
                y: Math.round(y / SEARCH_PRECISION) * SEARCH_PRECISION,
            },
            cancelToken: new axios.CancelToken(func => this.cancelSearch = func),
        }

        return axios.get('/api/scenes', config)
            .then(action((response: AxiosResponse) => {
                sessionStorage.setItem(KEY_SCENES, JSON.stringify(response.data))
                this.scenes = response.data
            }))
            .catch(action((err: any) => {
                if (axios.isCancel(err)) {
                    return  // Nothing to do
                }

                this.errors.push({
                    heading: 'Oh no, something is broken!',
                    message: err.response
                        ? `A server error prevents search: ${err.response.data.error}.`
                        : `An application error prevents search: ${err.toString()}`,
                })
            }))
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
