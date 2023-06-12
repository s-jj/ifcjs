import { on } from "events";
import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FC, useEffect } from "react";
import { useAppContext } from "./context-provider";

let authInitialized = false;

export const Authenticator: FC = () => {
	const auth = getAuth(getApp());
	const dispatch = useAppContext()[1];

	const listenToAuthState = () => {
		onAuthStateChanged(auth, (foundUser) => {
			const user = foundUser ? { ...foundUser } : null;
			dispatch({ type: "UPDATE_USER", payload: user });
		});
	};

	useEffect(() => {
		if (!authInitialized) {
			listenToAuthState();
			authInitialized = true;
		}
	}, []);

	return <></>;
};
