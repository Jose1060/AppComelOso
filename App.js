// In App.js in a new project

import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./Navigation";

function HomeScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home</Text>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return <Navigation />;
}

export default App;
