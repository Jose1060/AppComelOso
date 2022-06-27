import { View, Image, Text, FlatList, SafeAreaView } from "react-native";
import tw from "twrnc";
import Recuerdos_Wave from "../icons/Waves/Recuerdos_Wave";
import CardCarousel from "./CardCarousel";

const rec = [
	{
		id: 1,
		title: "Recuerdo 1",
		description: "Descripcion del recuerdo 1",
		img: "recuerdo",
	},
	{
		id: 2,
		title: "Recuerdo 2",
		description: "Descripcion del recuerdo 2",
		img: "recuerdo",
	},
	{
		id: 3,
		title: "Recuerdo 3",
		description: "Descripcion del recuerdo 3",
		img: "recuerdo",
	},
	{
		id: 4,
		title: "Recuerdo 4",
		description: "Descripcion del recuerdo 4",
		img: "recuerdo",
	},
];

const Recuerdos = () => {
	return (
		<View style={tw``}>
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
								<CardCarousel item={item} />
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default Recuerdos;
