import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const Etiqueta = (props) => {
	return (
		<View
			style={tw`bg-${props.color}-300 flex flex-row px-5 py-2 rounded-3xl min-w-40 justify-center items-center`}>
			<Text style={tw`text-white text-lg mr-5`}>{props.preferencia}</Text>
			<Image source={{ uri: props.img }} style={tw`w-10 rounded-full h-10`} />
		</View>
	);
};

export default Etiqueta;
