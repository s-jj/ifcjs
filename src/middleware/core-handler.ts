import { mapHandler } from "../core/map/map-handler";
import { databaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";

type ActionHandler = (action: Action, events: Events) => void;

const actionHandlers: Record<string, ActionHandler> = {
  LOGIN: (action, events) => {
    databaseHandler.login();
  },
  LOGOUT: (action, events) => {
    databaseHandler.logout();
  },
  START_MAP: (action, events) => {
    const { container, user } = action.payload;
    mapHandler.start(container, user, events);
  },
  REMOVE_MAP: (action, events) => {
    mapHandler.remove();
  },
  ADD_BUILDING: (action, events) => {
    mapHandler.addBuilding(action.payload);
  },
  DELETE_BUILDING: (action, events) => {
    databaseHandler.deleteBuilding(action.payload, events);
  },
  UPDATE_BUILDING: (action, events) => {
    databaseHandler.updateBuilding(action.payload);
  },
  UPLOAD_MODEL: (action, events) => {
    const { model, file, building } = action.payload;
    databaseHandler.uploadModel(model, file, building, events);
  },
  DELETE_MODEL: (action, events) => {
    const { model, building } = action.payload;
    databaseHandler.deleteModel(model, building, events);
  },
};

export const executeCore = (action: Action, events: Events) => {
  const handler = actionHandlers[action.type];

  if (handler) {
    handler(action, events);
  }
};
