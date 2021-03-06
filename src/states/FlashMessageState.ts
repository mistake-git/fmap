import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface State {
    message: string;
    severity: 'success'| 'error'| 'info'| undefined
}

export const initialState: State = {
    message: "",
    severity: undefined,
}

export const FlashMessageReducer = reducerWithInitialState(initialState)