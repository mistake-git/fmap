import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface State {
    message: string;
    severity: 'success'| 'error'| 'info'| undefined
    open: boolean
}

export const initialState: State = {
    message: "",
    severity: undefined,
    open: false
}

export const FlashReducer = reducerWithInitialState(initialState)