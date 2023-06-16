import { FC } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css";

export const BuildingInfoMenu: FC<{
  onToggleMenu: (active: boolean) => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();

  const { building } = state;
  if (!building) {
    throw new Error("Building not found");
  }

  return (
    <Box>
      <p>This is the building info</p>
    </Box>
  );
};
