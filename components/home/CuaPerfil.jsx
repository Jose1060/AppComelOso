import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import NivelIcon from "../icons/NivelIcon";
import tw from "twrnc";
import { AuthUserContext } from "../../utils/LoginContext";

const CuaPerfil = () => {
	const { userData } = useContext(AuthUserContext);
	return (
		<View style={tw`w-full bg-white p-2 rounded-xl shadow-xl`}>
			<View style={tw`flex flex-row `}>
				<Image
					source={require("./../../assets/imagenes/perfil.png")}
					style={tw`w-10 h-10 rounded-full mr-3`}
				/>
				<Text style={tw`text-xl w-25`}>{userData.email}</Text>
			</View>
			<View style={tw`w-full flex justify-center items-center`}>
				<NivelIcon />
			</View>
		</View>
	);
};

export default CuaPerfil;
