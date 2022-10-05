import {
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

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
	return (
		<SafeAreaView>
			<ScrollView>
				<View>
					<Image source={{ uri: item.img }} style={tw`h-90`} />

					<View style={tw`flex flex-col items-center p-5 pb-10 bg-purple-300`}>
						<Text style={tw`text-xl text-center mb-5 `}>{item.title}</Text>
						<Text style={tw`text-sm`}>
							{item.descipcion ? item.descipcion : "No hay descripcion :c"}
						</Text>
					</View>
				</View>
				<ScrollView horizontal={true}>
					<View style={tw`flex flex-row items-center p-5 pb-10 bg-green-300`}>
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
							<Text style={tw`text-sm text-center`}>
								Diamante corona ejecutivo
							</Text>
						</View>
					</View>
				</ScrollView>
			</ScrollView>
			<View style={tw`bg-white pt-5 rounded-3xl`}>
				<Text style={tw`text-2xl text-center mb-5 `}>Comentarios</Text>
				<FlatList
					data={data}
					nestedScrollEnabled
					ItemSeparatorComponent={() => (
						<View style={tw`h-2 w-full  items-center justify-center`}>
							<View style={tw`bg-black h-[0.5] w-40`} />
						</View>
					)}
					renderItem={({ item }) => (
						<View style={tw`flex flex-col items-center p-5 `}>
							<Text style={tw`text-sm`}>{item.comentario}</Text>
							<View style={tw`flex-col justify-end items-end w-full pr-5`}>
								<Text style={tw`text-sm`}>{item.nombre}</Text>
								<Text style={tw`text-sm`}>{item.fecha}</Text>
							</View>
						</View>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DetailsRestaurant;
