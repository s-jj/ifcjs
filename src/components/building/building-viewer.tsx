import { Box, CssBaseline } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./building-topbar";
import { BuildingDrawer } from "./building-drawer";
import { getDrawerHeader } from "./mui-utils";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";

export const BuildingViewer: FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [width] = useState(240);

  const [state, dispatch] = useAppContext();

  const { user, building } = state;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!building) {
    return <Navigate to="/map" />;
  }

  const toggleDrawer = (active: boolean) => setSideOpen(active);
  const toggleFrontMenu = (active: boolean) => setFrontOpen(active);

  const DrawerHeader = getDrawerHeader();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <BuildingTopBar
          width={width}
          open={sideOpen}
          onOpen={() => toggleDrawer(true)}
        />
        <BuildingDrawer
          width={width}
          open={sideOpen}
          onClose={() => toggleDrawer(false)}
          onToggleMenu={() => toggleFrontMenu(true)}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <BuildingFrontMenu
            onToggleMenu={() => toggleFrontMenu(false)}
            open={frontOpen}
            mode="BuildingInfo"
          />
        </Box>
      </Box>
    </>
  );
};
