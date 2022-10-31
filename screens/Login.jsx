import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
	Image,
} from "react-native";
import tw from "twrnc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const bgImage = require("../assets/bg/login.jpg");

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const onHandleLogin = () => {
		if (email !== "" && password !== "") {
			signInWithEmailAndPassword(auth, email, password)
				.then(() => Alert.alert("Bienvenido "))
				.catch((err) => {
					Alert.alert("Error", err.message);
				});
		} else if (email === "" || password === "") {
			Alert.alert("Error", "Debe ingresar un correo y contraseña");
		}
	};

	return (
		<View style={tw`flex-1`}>
			<Image source={bgImage} style={tw`h-70 w-full absolute`} />
			<View
				style={tw`w-full flex flex-col justify-center items-center z-10 h-40 absolute`}>
				<Text style={tw`text-white text-3xl`}>ComelOso</Text>
				<Text
					style={tw`max-w-[200px] text-center mt-2 leading-[15px] text-gray-200`}>
					Hecho con cariño
				</Text>
			</View>
			<View
				style={tw`w-full h-3/4 absolute bottom-0 rounded-tl-[25] bg-white`}
			/>
			<SafeAreaView style={tw`w-full items-center mt-58`}>
				<Text style={tw`text-3xl text-orange-300 font-bold`}>Login</Text>
				<TextInput
					style={tw` w-3/4 h-12 mt-4 rounded-lg bg-gray-100 px-6`}
					placeholder="Ingrese su correo"
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoFocus={true}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={tw` w-3/4 h-12 mt-4 rounded-lg bg-gray-100 px-6`}
					placeholder="Ingrese su Contraseña"
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={true}
					textContentType="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
				<TouchableOpacity
					style={tw`w-3/4 bg-orange-400 rounded-xl py-3 mt-10`}
					onPress={onHandleLogin}>
					<Text style={tw`text-white text-center text-lg`}>Login</Text>
				</TouchableOpacity>
				<View style={tw`w-3/4 items-center justify-center flex-row mt-5`}>
					<Text style={tw`text-gray-500 text-center text-sm`}>
						¿No tienes una cuenta?
					</Text>
					<TouchableOpacity
						style={tw`pl-2`}
						onPress={() => navigation.navigate("Register")}>
						<Text style={tw`text-orange-500 text-center text-sm`}>
							Registrate
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default Login;
