import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { Image } from "react-native";
import { Icon } from "@rneui/base";

const ItemListRecomend = (props) => {
	return (
		<View
			style={tw`w-full flex flex-row px-5 py-3 bg-white rounded-3xl items-center justify-between`}>
			<Image
				source={{ uri: props.img }}
				style={tw`w-12 h-12 rounded-full mr-5`}
			/>
			<View style={tw`flex flex-col max-w-50`}>
				<Text style={tw`text-black text-lg`}>{props.name}</Text>
				<Text style={tw`text-black text-sm`}>{props.address}</Text>
			</View>
			<View style={tw`bg-red-200 rounded-full p-1`}>
				<Icon
					name="compass-outline"
					color={"white"}
					type="material-community"
					size={40}
				/>
			</View>
		</View>
	);
};

export default ItemListRecomend;
