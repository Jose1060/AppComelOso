import React from "react";
import { View, Image, Text } from "react-native";
import tw from "twrnc";

const CardCarousel = ({ item }) => {
	return (
		<View style={tw`w-full`}>
			<View
				style={tw`mx-2 p-3 rounded-3xl bg-white/70 items-center flex flex-col w-72 min-h-60`}>
				<Image
					source={{ uri: item.imagen }}
					style={tw`w-full h-40 m-0 mb-5 rounded-3xl`}
				/>
				<View style={tw`flex flex-col justify-start items-start w-full `}>
					<Text style={tw`text-xl`}>{item.nombre}</Text>
					<Text style={tw`text-sm`}>{item.descripcion}</Text>
				</View>
			</View>
		</View>
	);
};

export default CardCarousel;
