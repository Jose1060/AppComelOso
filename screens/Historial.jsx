import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestList from "../components/Historial/RestList";
import tw from "twrnc";

const Historial = ({ navigation }) => {
	return (
		<SafeAreaView style={tw`bg-green-200 min-h-full`}>
			<View style={tw`flex flex-col justify-center items-center mt-8 mb-7`}>
				<Text style={tw`text-3xl`}>Restaurantes</Text>
			</View>
			<RestList navigation={navigation} />
		</SafeAreaView>
	);
};

export default Historial;
