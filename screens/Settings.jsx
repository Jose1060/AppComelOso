import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import ExitIcon from "../components/icons/Settings/ExitIcon";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";

const Settings = () => {
	const onSignOut = () => {
		signOut(auth).catch((error) => console.log(error));
	};

	return (
		<SafeAreaView>
			<View>
				<View style={tw`mt-10 ml-5`}>
					<Text style={tw`text-black text-4xl`}>Configuracion</Text>
				</View>
				<ScrollView>
					<View style={tw`flex flex-col items-center mx-5`}>
						<View style={tw`flex flex-row h-50 justify-evenly w-full mt-5`}>
							<TouchableOpacity
								style={tw`bg-red-300 flex-1 justify-center items-center rounded-xl mr-2`}
								onPress={() => {
									onSignOut();
								}}>
								<View>
									<ExitIcon width={110} height={110} color="white" />
									<Text style={tw`text-xl text-white`}>Cerrar Sesion</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={tw`bg-green-400 flex-1 justify-center items-center rounded-xl ml-2`}>
								<View>
									<ExitIcon width={110} height={110} color="white" />
									<Text style={tw`text-xl text-white`}>Settings</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default Settings;
