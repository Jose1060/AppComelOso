import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import CuaGrande from "./CuaGrande";
import CuaPasos from "./CuaPasos";
import CuaPerfil from "./CuaPerfil";

const Cuadricula = () => {
	return (
		<View style={tw`mt-10 w-full`}>
			<View style={tw`flex flex-row px-5`}>
				<View style={tw`w-1/2 flex-auto mr-5`}>
					<CuaGrande />
				</View>
				<View style={tw`w-1/2 flex-auto flex flex-col`}>
					<CuaPerfil />
					<CuaPasos />
				</View>
			</View>
		</View>
	);
};

export default Cuadricula;
