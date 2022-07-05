import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import Etiqueta from "../components/Preferencias/Etiqueta";
import { AuthUserContext } from "../utils/LoginContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

const preferenciasList = [
	{
		id: 1,
		preferencia: "Comida Peruana",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "green",
		presionado: false,
	},
	{
		id: 2,
		preferencia: "Comida Mexicana",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "pink",
		presionado: false,
	},
	{
		id: 3,
		preferencia: "Comida Italiana",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "yellow",
		presionado: false,
	},
	{
		id: 4,
		preferencia: "Comida Japonesa",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "red",
		presionado: false,
	},
];

const preferenciasList2 = [
	{
		id: 1,
		preferencia: "Vegetariano",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "orange",
		presionado: false,
	},
	{
		id: 2,
		preferencia: "Vegano",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "yellow",
		presionado: false,
	},
	{
		id: 3,
		preferencia: "Sin Gluten",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "green",
		presionado: false,
	},
	{
		id: 4,
		preferencia: "Sin Lacteos",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "red",
		presionado: false,
	},
];

const preferenciasList3 = [
	{
		id: 1,
		preferencia: "Barato",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "orange",
		presionado: false,
	},
	{
		id: 2,
		preferencia: "Medio",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "yellow",
		presionado: false,
	},
	{
		id: 3,
		preferencia: "Caro",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "green",
		presionado: false,
	},
	{
		id: 4,
		preferencia: "Todos",
		img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
		color: "red",
		presionado: false,
	},
];

const Preferencias = () => {
	const [prefer, setPrefer] = useState([]);
	const { user, setUserData } = useContext(AuthUserContext);
	const onPrefSelect = (preferencia) => {
		if (prefer.includes(preferencia) === false) {
			setPrefer([...prefer, preferencia]);
		} else if (prefer.includes(preferencia) === true) {
			setPrefer(prefer.filter((pref) => pref !== preferencia));
		}
	};

	return (
		<SafeAreaView style={tw`bg-orange-100 min-h-full`}>
			<ScrollView style={tw`h-full`}>
				<Text style={tw`text-3xl mt-5 ml-5 font-bold`}>Preferencias</Text>
				<View style={tw`mt-5 mx-5`}>
					<Text style={tw`text-lg mb-5`}>
						Porfavor dejanos saber mas de tus gustos para que podamos ofrecerte
						la mejor experiencia.
					</Text>

					<View>
						<Text style={tw`text-lg mb-4 pb-2 border-b-2 text-pink-600`}>
							¿Que tipo de comida te gusta?
						</Text>
						<FlatList
							style={tw`rounded-3xl`}
							horizontal={true}
							data={preferenciasList}
							keyExtractor={(item) => item.id}
							showsHorizontalScrollIndicator={false}
							decelerationRate={0}
							scrollEventThrottle={16}
							ItemSeparatorComponent={() => <View style={tw`w-2`} />}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										style={tw`rounded-3xl`}
										onPress={() => {
											if (item.presionado === false) {
												item.presionado = true;
											} else if (item.presionado === true) {
												item.presionado = false;
											}
											onPrefSelect(item.preferencia);
											console.log(item.presionado);
										}}>
										<Etiqueta
											{...item}
											color={item.presionado ? "gray" : item.color}
										/>
									</TouchableOpacity>
								);
							}}
						/>
					</View>
					<View style={tw`mt-10`}>
						<Text style={tw`text-lg mb-4 pb-2 border-b-2 text-pink-600`}>
							¿Como te gusta?
						</Text>
						<FlatList
							style={tw`rounded-3xl `}
							horizontal={true}
							data={preferenciasList3}
							keyExtractor={(item) => item.id}
							showsHorizontalScrollIndicator={false}
							decelerationRate={0}
							scrollEventThrottle={16}
							ItemSeparatorComponent={() => <View style={tw`w-2`} />}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										onPress={() => {
											if (item.presionado === false) {
												item.presionado = true;
											} else if (item.presionado === true) {
												item.presionado = false;
											}
											onPrefSelect(item.preferencia);
											console.log(item.presionado);
										}}>
										<Etiqueta
											{...item}
											color={item.presionado ? "gray" : item.color}
										/>
									</TouchableOpacity>
								);
							}}
						/>
					</View>
					<View style={tw`mt-10`}>
						<Text style={tw`text-lg mb-4 pb-2 border-b-2 text-pink-600`}>
							¿Te gusta la carne o una rica manzana?
						</Text>
						<FlatList
							style={tw`rounded-3xl `}
							horizontal={true}
							data={preferenciasList2}
							keyExtractor={(item) => item.id}
							showsHorizontalScrollIndicator={false}
							decelerationRate={0}
							scrollEventThrottle={16}
							ItemSeparatorComponent={() => <View style={tw`w-2`} />}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										onPress={() => {
											if (item.presionado === false) {
												item.presionado = true;
											} else if (item.presionado === true) {
												item.presionado = false;
											}
											onPrefSelect(item.preferencia);
											console.log(item.presionado);
										}}>
										<Etiqueta
											{...item}
											color={item.presionado ? "gray" : item.color}
										/>
									</TouchableOpacity>
								);
							}}
						/>

						<TouchableOpacity
							style={tw`bg-green-500 rounded-3xl px-5 py-2 mt-15`}
							onPress={async () => {
								console.log(prefer);
								if (prefer.length >= 3) {
									await updateDoc(doc(firestore, "users", user.uid), {
										preferencias: prefer,
									});
								} else {
									Alert.alert(
										"Por favor seleccione un minimo de 3 preferencias"
									);
								}
							}}>
							<Text style={tw`text-white text-lg`}>Aceptar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Preferencias;
