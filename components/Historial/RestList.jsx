import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";
import CardRest from "./CardRest";
import tw from "twrnc";
import { gql, useQuery } from "@apollo/client";

const GET_REST = gql`
	query Query {
		getRestaurantes {
			nombre
			id
			latitud
			longitud
			imagen
			descripcion
		}
	}
`;

const RestList = ({ navigation }) => {
	const { loading, error, data } = useQuery(GET_REST);
	if (loading) return <ActivityIndicator size={150} color="#ea4c4c" />;
	if (error) return <Text>Error :(</Text>;
	console.log(data.getRestaurantes);

	return (
		<View style={tw`h-full `}>
			<View style={tw`mx-5 flex-row bg-white rounded-3xl px-3 pt-1 pb-1 mb-5`}>
				<TextInput
					style={tw`flex-auto text-xl bg-white rounded-xl pl-3 pt-1 pb-1`}
					placeholder="Buscar"
				/>
				<TouchableOpacity>
					<View style={tw`bg-rose-300 rounded-xl px-2 pt-1 pb-1`}>
						<Text style={tw`text-xl text-white text-center`}>Buscar</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={tw`mx-6`}>
				<FlatList
					style={tw`h-150`}
					data={data.getRestaurantes}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("DetailsRestaurant", { item });
								}}>
								<CardRest item={item} />
							</TouchableOpacity>
						);
					}}
					ItemSeparatorComponent={() => <View style={tw`h-4`} />}
				/>
			</View>
		</View>
	);
};

export default RestList;
