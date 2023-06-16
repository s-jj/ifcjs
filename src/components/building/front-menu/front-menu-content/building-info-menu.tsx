import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css";
import { Navigate } from "react-router-dom";

export const BuildingInfoMenu: FC<{
  onToggleMenu: () => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();

  const { building } = state;

  if (!building) {
    throw new Error("Building not found");
  }

  const onUpdateBuilding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const newBuilding = { ...building } as any;
    newBuilding.name = data.get("building-name") || building.name;
    newBuilding.lng = data.get("building-lng") || building.lng;
    newBuilding.lat = data.get("building-lat") || building.lat;

    dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
    onToggleMenu();
  };

  return (
    <Box component="form" onSubmit={onUpdateBuilding}>
      <div className="list-item">
        <TextField
          fullWidth
          id="building-id"
          label="Building ID"
          name="building-id"
          autoComplete="building-id"
          defaultValue={building.uid}
          disabled={true}
        />
      </div>
      <div className="list-item">
        <TextField
          fullWidth
          id="building-name"
          label="Building name"
          name="building-name"
          autoComplete="building-name"
          defaultValue={building.name}
        />
      </div>
      <div className="list-item">
        <TextField
          fullWidth
          id="building-lng"
          label="Longitude"
          name="building-lng"
          autoComplete="building-lng"
          defaultValue={building.lng}
        />
      </div>
      <div className="list-item">
        <TextField
          fullWidth
          id="building-at"
          label="Lattitude"
          name="building-at"
          autoComplete="building-at"
          defaultValue={building.lat}
        />
      </div>
      <div className="list-item">
        <Button type="submit">Update building info</Button>
      </div>
    </Box>
  );
};
