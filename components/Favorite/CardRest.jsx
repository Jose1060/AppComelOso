import React from "react";
import { ImageBackground, Text, View } from "react-native";
import tw from "twrnc";

const CardRest = ({ item }) => {
	return (
		<View style={tw`rounded-2xl h-20 overflow-hidden`}>
			<ImageBackground
				style={tw`rounded-2xl h-full flex`}
				source={{
					uri: item.image,
				}}
				resizeMode="cover">
				<View style={tw`pl-5 bg-white/50 justify-center h-full`}>
					<Text style={tw`text-2xl`}>{item.title}</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default CardRest;
