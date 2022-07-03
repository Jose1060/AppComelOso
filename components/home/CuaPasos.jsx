import React, { useContext } from "react";
import { View, Text } from "react-native";
import PasosIcon from "../icons/PasosIcon";
import tw from "twrnc";
import { AuthUserContext } from "../../utils/LoginContext";

const CuaPasos = () => {
	const { userData } = useContext(AuthUserContext);
	return (
		<View style={tw`w-full rounded-xl shadow-xl mt-5 bg-white`}>
			<View style={tw`flex flex-row justify-around items-center p-2`}>
				<View style={tw`pr-3`}>
					<Text style={tw`text-2xl `}>{userData.pasos} </Text>
					<Text style={tw`text-lg`}>Pasos</Text>
				</View>
				<PasosIcon width={60} height={60} />
			</View>
		</View>
	);
};

export default CuaPasos;
