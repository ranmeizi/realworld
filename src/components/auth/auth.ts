import { store } from '@/redux/store'

export function checkToken() {
    return !!store.getState().app.uinfo.token
}