import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import tw from "twrnc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const bgImage = require("../assets/bg/register.jpg");

const Register = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onHandleCreate = () => {
		if (email !== "" && password !== "" && confirmPassword !== "") {
			if (password === confirmPassword) {
				createUserWithEmailAndPassword(auth, email, password)
					.then(async (res) => {
						await setDoc(doc(firestore, "users", res.user.uid), {
							email: email,
							nombre: "",
							apellido: "",
							fechaNacimiento: "",
							genero: "",
							foto: "",
							createdAt: serverTimestamp(),
							active: true,
							preferencias: [],
							pasos: 0,
							puntos: 0,
							restaurantes_visitados: [],
							restaurantes_visitados_favoritos: [],
							numero: "",
						}).then(() => {
							navigation.navigate("Preferencias");
						});
					})
					.catch((err) => {
						Alert.alert("Error", err.message);
					});
			} else if (password !== confirmPassword) {
				Alert.alert("Las contraseñas no coinciden");
			}
		}
	};

	return (
		<View style={tw`flex-1`}>
			<ScrollView>
				<Image source={bgImage} style={tw`h-70 w-full absolute`} />
				<View
					style={tw`w-full h-3/4 absolute bottom-0 rounded-tl-[25] bg-white`}
				/>
				<SafeAreaView style={tw`w-full items-center mt-58`}>
					<Text style={tw`text-4xl text-orange-300 font-bold`}>Registro</Text>
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
					<TextInput
						style={tw` w-3/4 h-12 mt-4 rounded-lg bg-gray-100 px-6`}
						placeholder="Ingrese su Contraseña"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry={true}
						textContentType="password"
						value={confirmPassword}
						onChangeText={(text) => setConfirmPassword(text)}
					/>
					<TouchableOpacity
						style={tw`w-3/4 bg-orange-400 rounded-xl py-3 mt-10`}
						onPress={onHandleCreate}>
						<Text style={tw`text-white text-center text-[15px]`}>
							Registrar
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw`w-3/4 bg-gray-400 rounded-xl py-3 mt-4 mb-6`}
						onPress={() => navigation.navigate("Login")}>
						<Text style={tw`text-white text-center text-[15px]`}>
							Iniciar Sesión
						</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
};

export default Register;
