import { mapHandler } from "../core/map/map-handler";
import { databaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";
import { buildingHandler } from "../core/building/building-handler";

type ActionHandler = (action: Action, events: Events) => void;

const actionHandlers: Record<string, ActionHandler> = {
  LOGIN: (action?, events?) => {
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
  OPEN_BUILDING: (action, events) => {
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
  UPLOAD_MODEL: async (action, events) => {
    const { model, file, building } = action.payload;
    const zipFile = await buildingHandler.convertIfcToFragments(file);
    databaseHandler.uploadModel(model, zipFile, building, events);
  },
  DELETE_MODEL: (action, events) => {
    const { model, building } = action.payload;
    databaseHandler.deleteModel(model, building, events);
  },
  START_BUILDING: async (action, events) => {
    const { container, building } = action.payload;
    await buildingHandler.start(container, building);
  },
  CLOSE_BUILDING: (action, events) => {
    buildingHandler.remove();
  },
};

export const executeCore = (action: Action, events: Events) => {
  const handler = actionHandlers[action.type];

  if (handler) {
    handler(action, events);
  }
};
