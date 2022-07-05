import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/ComelOso/Map";
import { selectDestination } from "../slices/navSlice";
import { useSelector } from "react-redux";
import { Image } from "react-native";

const ComelOSOmap = () => {
	const destination = useSelector(selectDestination);

	return (
		<SafeAreaView style={tw`relative`}>
			<Map />
			<View
				style={tw`absolute bottom-0 left-0 right-0 bg-white mx-5 h-1/2 pt-6 px-2 rounded-3xl`}>
				<View style={tw`flex justify-between mb-5`}>
					<Text style={tw`text-center text-2xl`}>{destination.name}</Text>
					<Text style={tw`text-center text-lg text-gray-500`}>
						{destination.address}
					</Text>
				</View>
				<View style={tw`flex justify-center items-center`}>
					<Image
						style={tw.style("h-45 w-3/4 rounded-2xl", {
							resizeMode: "contain",
						})}
						source={{ uri: destination.img }}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ComelOSOmap;
