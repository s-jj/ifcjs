import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorIcon from "@mui/icons-material/GppMaybe";
import FloorplanIcon from "@mui/icons-material/FindInPage";
import ModelsIcon from "@mui/icons-material/HolidayVillage";
import ListIcon from "@mui/icons-material/ViewList";
import DeleteIcon from "@mui/icons-material/Delete";
import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import { Tool } from "../../../types";
import { FrontMenuMode } from "../types";

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toggleMenu: (active: boolean, mode?: FrontMenuMode) => void
): Tool[] {
  return [
    {
      name: "Info",
      icon: <ListIcon />,
      action: () => {
        toggleMenu(true, "BuildingInfo");
      },
    },
    {
      name: "Models",
      icon: <ModelsIcon />,
      action: () => {
        toggleMenu(true, "ModelList");
      },
    },
    {
      name: "Floorplans",
      icon: <FloorplanIcon />,
      action: () => {
        console.log("Models!");
      },
    },
    {
      name: "Issues",
      icon: <ErrorIcon />,
      action: () => {
        console.log("Models!");
      },
    },
    {
      name: "Map",
      icon: <MapIcon />,
      action: () => {
        dispatch({ type: "CLOSE_BUILDING" });
      },
    },
    {
      name: "Delete building",
      icon: <DeleteIcon />,
      action: () => {
        dispatch({ type: "DELETE_BUILDING", payload: state.building });
      },
    },
    {
      name: "Log out",
      icon: <LogoutIcon />,
      action: () => {
        dispatch({ type: "LOGOUT" });
      },
    },
  ];
}
