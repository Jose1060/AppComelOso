import React from "react";
import { View, Text } from "react-native";
import PasosIcon from "../icons/PasosIcon";
import tw from "twrnc";

const CuaPasos = () => {
	return (
		<View style={tw`w-full rounded-xl shadow-xl mt-5 bg-white`}>
			<View style={tw`flex flex-row justify-around items-center p-2`}>
				<View style={tw`pr-3`}>
					<Text style={tw`text-2xl `}>1500 </Text>
					<Text style={tw`text-lg`}>Pasos</Text>
				</View>
				<PasosIcon width={60} height={60} />
			</View>
		</View>
	);
};

export default CuaPasos;
