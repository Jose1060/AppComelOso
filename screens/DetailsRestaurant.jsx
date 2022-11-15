import {
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { firestore } from "../config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AuthUserContext } from "../utils/LoginContext";
import { FontAwesome5 } from "@expo/vector-icons";

const handleFav = async (user, idRes, added) => {
	if (added) {
		await updateDoc(doc(firestore, "users", user), {
			restaurantes_visitados_favoritos: arrayRemove(idRes),
		});
		return;
	}

	await updateDoc(doc(firestore, "users", user), {
		restaurantes_visitados_favoritos: arrayUnion(idRes),
	});
};

const data = [
	{
		id: 1,
		comentario:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Non repellendus placeat molestias accusantium eveniet nobis provident facere vero ipsa. Eligendi, culpa. Sit placeat voluptate nesciunt dolor suscipit. Molestiae, deleniti vero!",
		nombre: "Juan",
		fecha: "Hoy",
	},
	{
		id: 2,
		comentario:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Non repellendus placeat molestias accusantium eveniet nobis provident facere vero ipsa. Eligendi, culpa. Sit placeat voluptate nesciunt dolor suscipit. Molestiae, deleniti vero!",
		nombre: "Alberto",
		fecha: "Hoy",
	},
	{
		id: 3,
		comentario:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Non repellendus placeat molestias accusantium eveniet nobis provident facere vero ipsa. Eligendi, culpa. Sit placeat voluptate nesciunt dolor suscipit. Molestiae, deleniti vero!",
		nombre: "Pedro",
		fecha: "Hoy",
	},
];

const DetailsRestaurant = ({ route, navigation }) => {
	const { item } = route.params;
	const { userData } = useContext(AuthUserContext);
	const [added, setAdded] = useState("false");

	useEffect(() => {
		const even = (element) => element == item.id;
		const find = userData.restaurantes_visitados_favoritos.some(even);
		console.log(find);
		console.log(added);
		setAdded(find);
	}, [userData]);

	return (
		<SafeAreaView>
			<ScrollView>
				<View>
					<View style={tw`relative pb-8`}>
						<Image
							source={{ uri: item.imagen }}
							style={tw`h-90 rounded-b-10`}
						/>

						<TouchableOpacity
							onPress={() => {
								console.log(userData);
								handleFav(userData.uid, item.id, added);
							}}
							style={tw`rounded-full bg-red-600 p-5 absolute bottom-0 right-10`}>
							{added ? (
								<FontAwesome5 name="heart-broken" size={40} color="white" />
							) : (
								<AntDesign name="heart" size={40} color="white" style={tw``} />
							)}
						</TouchableOpacity>
					</View>
					<View style={tw`flex flex-col items-center p-5 pb-10`}>
						<Text style={tw`text-[30px] text-center mb-5 font-bold`}>
							{item.nombre}
						</Text>
						<Text style={tw`text-sm`}>
							{item.descripcion ? item.descripcion : "No hay descripcion :c"}
						</Text>
					</View>
				</View>
				<View style={tw``} />
				<ScrollView horizontal={true}>
					<View style={tw`flex flex-row items-center p-5 pb-10`}>
						<View
							style={tw`flex flex-col items-center bg-white rounded-xl py-4 px-2 shadow-lg mr-4 w-35 h-42`}>
							<Text style={tw`text-xl text-center mb-5`}>Rating</Text>
							<TouchableOpacity style={tw`overflow-hidden rounded-full mb-3`}>
								<View
									style={tw`justify-center items-center rounded-full bg-yellow-200 h-14 w-14 `}>
									<Text style={tw`text-lg font-bold`}>{item.val}/10</Text>
								</View>
							</TouchableOpacity>
							<Text style={tw`text-sm`}>
								{item.calificaciones} calificaciones
							</Text>
						</View>

						<View
							style={tw`flex flex-col items-center bg-white rounded-xl py-4 px-2 shadow-lg mr-4 w-35 h-42`}>
							<Text style={tw`text-xl text-center mb-5`}>
								Años de experiencia
							</Text>
							<TouchableOpacity style={tw`overflow-hidden rounded-full mb-3`}>
								<View
									style={tw`justify-center items-center rounded-full bg-yellow-200 h-14 w-14 `}>
									<Text style={tw`text-lg font-bold`}>5</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View
							style={tw`flex flex-col items-center bg-white rounded-xl py-4 px-2 shadow-lg mr-4 w-35 h-42`}>
							<Text style={tw`text-xl text-center mb-5`}>Rango</Text>
							<TouchableOpacity style={tw`overflow-hidden rounded-full mb-3`}>
								<View
									style={tw`justify-center items-center rounded-full bg-yellow-200 h-14 w-14 `}>
									<Text style={tw`text-lg font-bold`}>💎</Text>
								</View>
							</TouchableOpacity>
							<Text style={tw`text-sm text-center`}>Diamante</Text>
						</View>
					</View>
				</ScrollView>
				<View style={tw`bg-white pt-5 rounded-3xl`}>
					<Text style={tw`text-2xl text-center mb-5 `}>Comentarios</Text>
					{data.map((item) => (
						<View style={tw`flex flex-col items-center p-5`} key={item.id}>
							<Text style={tw`text-sm`}>{item.comentario}</Text>
							<View style={tw`flex-col justify-end items-end w-full pr-5`}>
								<Text style={tw`text-sm`}>{item.nombre}</Text>
								<Text style={tw`text-sm`}>{item.fecha}</Text>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default DetailsRestaurant;
