import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { reducer } from "./state-handler";
import { State, initialState } from "./state";
import { Action } from "./actions";
import { executeCore } from "./core-handler";
import { Authenticator } from "./authenticator";
import { Events } from "./event-handler";

const appContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState);

  const events = new Events();
  events.on("OPEN_BUILDING", (buildingId: string) => {
    setState({ type: "OPEN_BUILDING", payload: buildingId });
  });

  const dispatch = (value: Action) => {
    setState(value);
    executeCore(value, events);
  };

  return (
    <appContext.Provider value={[state, dispatch]}>
      <Authenticator />
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => useContext(appContext);
