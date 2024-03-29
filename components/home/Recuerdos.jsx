import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Recuerdos_Wave from "../icons/Waves/Recuerdos_Wave";
import CardCarousel from "./CardCarousel";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { AuthUserContext } from "../../utils/LoginContext.js";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";

const GET_REST = gql`
	query Variosrestaurantes($variosrestaurantesId: [ID]) {
		Variosrestaurantes(id: $variosrestaurantesId) {
			nombre
			direccion
			imagen
			descripcion
			latitud
			longitud
			id
		}
	}
`;

const Recuerdos = ({ navigation }) => {
	const { userData } = useContext(AuthUserContext);
	const [getRests, result] = useLazyQuery(GET_REST);
	const [rests, setRests] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//console.log("restaurantes", userData.restaurantes_visitados_favoritos);
		setLoading(true);
		console.log("Empezo", loading);
		getRests({
			variables: {
				variosrestaurantesId: userData.restaurantes_visitados_favoritos,
			},
		}).then((resp) => {
			console.log(resp.data.Variosrestaurantes[5]);
			setRests(resp.data.Variosrestaurantes);
			console.log("Acabo", loading);
		});
	}, [userData]);

	return (
		<View style={tw``}>
			{result.loading ? (
				<DialogLoading />
			) : (
				<View>
					<View style={tw`relative h-50 overflow-hidden`}>
						<Image
							source={require("./../../assets/imagenes/oso_inicio.png")}
							style={tw`w-[100%] h-full`}
						/>
						<Recuerdos_Wave
							style={tw`absolute bottom-0 left-0 w-full h-11 z-20`}
						/>
					</View>
					<View style={tw`bg-teal-300 pb-40`}>
						<View>
							<Text style={tw`mt-3 ml-3 text-2xl`}>Ver Recuerdos:</Text>
						</View>
						<FlatList
							data={rests}
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
			)}
		</View>
	);
};

export default Recuerdos;
