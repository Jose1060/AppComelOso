import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";
import RestList from "../components/Favorite/RestList";

const Favorite = () => {
	return (
		<SafeAreaView style={tw`bg-red-100 min-h-full`}>
			<View style={tw`flex flex-col justify-center items-center mt-8 mb-7`}>
				<Text style={tw`text-4xl`}>Favoritos</Text>
			</View>
			<RestList />
		</SafeAreaView>
	);
};

export default Favorite;
