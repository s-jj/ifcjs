import { State } from "./state";
import { Action } from "./actions";

type ReducerFunction = (state: State, action: Action) => State;

const reducerFunctions: Record<string, ReducerFunction> = {
  UPDATE_USER: (state, action) => ({
    ...state,
    user: action.payload,
  }),
  OPEN_BUILDING: (state, action) => ({
    ...state,
    building: action.payload,
  }),
  UPDATE_BUILDING: (state, action) => ({
    ...state,
    building: action.payload,
  }),
  CLOSE_BUILDING: (state, action) => ({
    ...state,
    building: null,
  }),
};

export const reducer: ReducerFunction = (state, action) => {
  const reducerFunction = reducerFunctions[action.type];

  if (reducerFunction) {
    return reducerFunction(state, action);
  }

  return { ...state };
};
