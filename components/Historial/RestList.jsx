import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
} from "react-native";
import CardRest from "./CardRest";
import tw from "twrnc";

const rest = [
	{
		id: 1,
		title: "Restaurante 1",
		address: "Calle 1",
		phone: "123456789",
		image:
			"https://enlacocina.b-cdn.net/wp-content/uploads/2019/11/Consejos-para-atender-un-grupo-en-tu-restaurante.jpg",
		description: "Descripcion del restaurante 1",
	},
	{
		id: 2,
		title: "Restaurante 2",
		address: "Calle 2",
		phone: "123456789",
		image:
			"https://enlacocina.b-cdn.net/wp-content/uploads/2019/11/Consejos-para-atender-un-grupo-en-tu-restaurante.jpg",
		description: "Descripcion del restaurante 2",
	},
	{
		id: 3,
		title: "Restaurante 3",
		address: "Calle 3",
		phone: "123456789",
		image:
			"https://enlacocina.b-cdn.net/wp-content/uploads/2019/11/Consejos-para-atender-un-grupo-en-tu-restaurante.jpg",
		description: "Descripcion del restaurante 3",
	},
	{
		id: 4,
		title: "Restaurante 4",
		address: "Calle 4",
		phone: "123456789",
		image:
			"https://enlacocina.b-cdn.net/wp-content/uploads/2019/11/Consejos-para-atender-un-grupo-en-tu-restaurante.jpg",
		description: "Descripcion del restaurante 4",
	},
	{
		id: 5,
		title: "Restaurante 5",
		address: "Calle 5",
		phone: "123456789",
		image:
			"https://enlacocina.b-cdn.net/wp-content/uploads/2019/11/Consejos-para-atender-un-grupo-en-tu-restaurante.jpg",
		description: "Descripcion del restaurante 5",
	},
];

const RestList = () => {
	const [search, onChangeSearch] = useState("");

	return (
		<View>
			<View style={tw`mx-5 flex-row bg-white rounded-3xl px-3 pt-1 pb-1 mb-5`}>
				<TextInput
					style={tw`flex-auto text-xl bg-white rounded-xl pl-3 pt-1 pb-1`}
					placeholder="Buscar"
					onChangeText={(text) => onChangeSearch(text)}
					value={search}
				/>
				<TouchableOpacity>
					<View style={tw`bg-rose-300 rounded-xl px-2 pt-1 pb-1`}>
						<Text style={tw`text-xl text-white text-center`}>Buscar</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={tw`mx-5`}>
				<FlatList
					data={rest}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => {
						return <CardRest item={item} />;
					}}
					ItemSeparatorComponent={() => <View style={tw`h-4`} />}
				/>
			</View>
		</View>
	);
};

export default RestList;
