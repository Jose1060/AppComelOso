import React, { useContext } from "react";
import { View, Text } from "react-native";
import RestIcon from "../icons/RestIcon";
import tw from "twrnc";
import { AuthUserContext } from "../../utils/LoginContext";

const CuaGrande = () => {
	const { userData } = useContext(AuthUserContext);
	return (
		<View style={tw`shadow-xl rounded-3xl w-full`}>
			<View
				style={tw`bg-white rounded-3xl flex flex-col py-4 px-3 justify-around items-center`}>
				<View style={tw`pb-5`}>
					<RestIcon style={tw``} width={100} height={110} />
				</View>
				<View style={tw`flex flex-col`}>
					<Text style={tw`text-3xl text-pink-400 font-bold mb-1`}>
						{userData.restaurantes_visitados.length}
					</Text>
					<Text style={tw`items-end justify-end text-lg`}>
						Restaurantes visitados
					</Text>
				</View>
			</View>
		</View>
	);
};

export default CuaGrande;
