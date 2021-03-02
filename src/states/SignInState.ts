import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface State {
    email: string;
    password: string;
}

export const initialState: State = {
    email: "",
    password: "",
}

export const SignInReducer = reducerWithInitialState(initialState)