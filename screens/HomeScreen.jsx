import React, { useContext } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import Cuadricula from "../components/home/Cuadricula";
import Recuerdos from "../components/home/Recuerdos";
import { AuthUserContext } from "../utils/LoginContext";

const HomeScreen = ({ navigation }) => {
	const { userData } = useContext(AuthUserContext);
	return (
		<SafeAreaView style={tw`flex flex-col h-full bg-yellow-200`}>
			<View style={tw`mt-10 ml-5`}>
				<Text style={tw`text-black text-4xl`}>ComelOSO</Text>
			</View>
			<View>
				<ScrollView>
					<Cuadricula />
					<Recuerdos navigation={navigation} />;
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
