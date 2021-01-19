import {IBloc, IBlocState} from "./Bloc";

class BlocProvider {
    static of = <T extends IBloc<S>, S extends IBlocState>(context: IBloc<IBlocState>[], type: string): T | undefined => {
        const found: unknown | undefined = context.find((bloc) => {
            return bloc.type === type;
        });
        return found as T;
    };
}

export default BlocProvider;
