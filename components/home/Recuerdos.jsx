import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Recuerdos_Wave from "../icons/Waves/Recuerdos_Wave";
import CardCarousel from "./CardCarousel";
import { useNavigation } from "@react-navigation/native";
const rec = [
	{
		id: 1,
		title: "Recuerdo 1",
		description: "Descripcion del recuerdo 1",
		img: "https://www.enter.co/wp-content/uploads/2017/02/menu-restaurant-vintage-tableFINAL-768x432.jpg",
		val: "10",
		calificaciones: "5",
	},
	{
		id: 2,
		title: "Recuerdo 2",
		description: "Descripcion del recuerdo 2",
		img: "https://www.enter.co/wp-content/uploads/2017/02/menu-restaurant-vintage-tableFINAL-768x432.jpg",
		val: "5",
		calificaciones: "10",
	},
	{
		id: 3,
		title: "Recuerdo 3",
		description: "Descripcion del recuerdo 3",
		img: "https://www.enter.co/wp-content/uploads/2017/02/menu-restaurant-vintage-tableFINAL-768x432.jpg",
		val: "7",
		calificaciones: "30",
	},
	{
		id: 4,
		title: "Recuerdo 4",
		description: "Descripcion del recuerdo 4",
		img: "https://www.enter.co/wp-content/uploads/2017/02/menu-restaurant-vintage-tableFINAL-768x432.jpg",
		val: "8",
		calificaciones: "50",
	},
];

const Recuerdos = ({ navigation }) => {
	return (
		<View>
			<View style={tw`relative h-50 overflow-hidden`}>
				<Image
					source={require("./../../assets/imagenes/oso_inicio.png")}
					style={tw`w-full h-full`}
				/>
				<Recuerdos_Wave style={tw`absolute bottom-0 left-0 w-full h-11 z-20`} />
			</View>
			<View style={tw`bg-teal-300 pb-40`}>
				<View>
					<Text style={tw`mt-3 ml-3 text-2xl`}>Ver Recuerdos:</Text>
				</View>
				<FlatList
					data={rec}
					horizontal={true}
					keyExtractor={(item) => item.id + "-recuerdo-" + item.title}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
					decelerationRate={0}
					scrollEventThrottle={16}
					renderItem={({ item, index }) => {
						return (
							<View key={item.id}>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("DetailsRestaurant", { item });
									}}>
									<CardCarousel item={item} />
								</TouchableOpacity>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default Recuerdos;
