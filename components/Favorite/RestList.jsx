import React, { useState, useContext, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
} from "react-native";
import CardRest from "./CardRest";
import tw from "twrnc";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { AuthUserContext } from "../../utils/LoginContext.js";

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

const RestList = ({ navigation }) => {
	const [search, onChangeSearch] = useState("");
	const { userData } = useContext(AuthUserContext);
	const [rests, setRests] = useState([]);
	const [getRests, result] = useLazyQuery(GET_REST);
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
		<View style={tw`h-full`}>
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
					style={tw`h-150`}
					data={rests}
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
