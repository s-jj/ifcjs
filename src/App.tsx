import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BuildingViewer } from "./components/building/building-viewer";
import { MapViewer } from "./components/map/map-viewer";
import { LoginForm } from "./components/user/login-form";
import { ContextProvider } from "./middleware/context-provider";

function App() {
	return (
		<ContextProvider>
			<Router>
				<Routes>
					<Route path="/building" element={<BuildingViewer />} />
					<Route path="/map" element={<MapViewer />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/" element={<LoginForm />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

export default App;
