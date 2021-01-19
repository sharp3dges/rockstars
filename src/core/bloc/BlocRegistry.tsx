import {IBloc, IBlocState} from "./Bloc";
import React from "react";

const BlocRegistry = React.createContext<IBloc<IBlocState>[]>([]);

export default BlocRegistry;
