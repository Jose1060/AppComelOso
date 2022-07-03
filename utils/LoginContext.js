import React, { createContext, useState } from "react";

export const AuthUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);

	return (
		<AuthUserContext.Provider value={{ user, setUser, userData, setUserData }}>
			{children}
		</AuthUserContext.Provider>
	);
};
