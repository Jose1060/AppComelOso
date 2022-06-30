// In App.js in a new project

import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./Navigation";
import { AuthenticatedUserProvider } from "./utils/LoginContext";

function App() {
	return (
		<AuthenticatedUserProvider>
			<Navigation />
		</AuthenticatedUserProvider>
	);
}

export default App;
