import {BehaviorSubject, Subscription} from "rxjs";
import {Dispatch, SetStateAction} from "react";

export interface IBlocState {

}

export interface IBloc<T extends IBlocState> {
    type: string;
    subscribe(observer: Dispatch<SetStateAction<T>>): Subscription;
    state(): T;
    nextState(state: T): void;
    nextError<E extends Error>(error: E, durationMs?: number): void;
    dispose(): void;
}

class Bloc<T extends IBlocState> implements IBloc<T> {
    type: string = 'Bloc';

    protected _state: BehaviorSubject<T>;

    constructor(initialState: T) {
        this._state = new BehaviorSubject(initialState);
    }

    subscribe = (observer: Dispatch<SetStateAction<T>>): Subscription =>
        this._state.subscribe(observer);
    state = (): T => this._state.getValue();
    nextState = (state: T) => this._state.next(state);
    nextError = <E extends Error>(error: E, durationMs: number = 5000) => {
        this._state.next({...this.state(), error: error});
        setTimeout(() => this._state.next({...this.state(), error: null}), durationMs);
    };

    dispose = () => {
       this._state.complete();
    };
}

export default Bloc;
