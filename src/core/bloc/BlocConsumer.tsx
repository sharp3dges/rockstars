import React, {useContext, useEffect, useState} from 'react';
import {IBloc, IBlocState} from "./Bloc";
import BlocRegistry from "./BlocRegistry";
import BlocProvider from "./BlocProvider";

type BlocProps<T extends IBloc<S>, S extends IBlocState> = {
    builder: (bloc: T, state: S) => React.ReactNode;
    type: string;
};

const BlocConsumer = <T extends IBloc<S>, S extends IBlocState>({ builder, type }: BlocProps<T, S>) => {
    const context = useContext(BlocRegistry);
    const bloc = BlocProvider.of<T, S>(context, type);
    if (bloc === undefined) {
        throw new Error("Error, tried to access a block that was not registered");
    }
    const [blocState, setBlocState] = useState(bloc.state());

    useEffect(() => {
        const subscription = bloc.subscribe(setBlocState);
        return () => {
            subscription.unsubscribe();
        };
    }, [bloc, setBlocState]);

    return (<>{builder(bloc, blocState)}</>);
};

export default BlocConsumer;
