import { Icon } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import ItemListRecomend from "../components/ComelOso/ItemListRecomend";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { AuthUserContext } from "../utils/LoginContext";

const GET_REST = gql`
	query GetRestaurantesCerca(
		$latitud1: Float
		$longitud1: Float
		$etiquetas2: [String]
	) {
		getRestaurantesCerca(
			latitud1: $latitud1
			longitud1: $longitud1
			etiquetas2: $etiquetas2
		) {
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

const ComelOSO = ({ navigation }) => {
	const [userCords, setUserCords] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { userData } = useContext(AuthUserContext);
	const dispatch = useDispatch();
	const [getRests, result] = useLazyQuery(GET_REST);
	const [rests, setRests] = useState([]);

	useEffect(() => {
		if (userCords !== null) {
			console.log("longitud: ", userCords.longitude);
			console.log("latitud: ", userCords.latitude);
			console.log(userData.preferencias);

			getRests({
				variables: {
					latitud1: userCords.latitude,
					longitud1: userCords.longitude,
					etiquetas2: userData.preferencias,
				},
			});

			if (result.data) {
				setRests(result.data.getRestaurantesCerca);
				console.log(result.data.getRestaurantesCerca);
			}
			console.log(result.data);
		}
	}, [userCords]);

	const getLocation = async () => {
		setIsLoading(true);
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			alert("No se pudo obtener la ubicación");
			return;
		}
		const location = await Location.getCurrentPositionAsync({});
		setUserCords(location.coords);
		console.log(userCords);
		setIsLoading(false);
	};

	return (
		<SafeAreaView style={tw` items-center bg-orange-200 flex-1 pt-10`}>
			<Text style={tw`text-4xl font-light`}>ComelOSO</Text>
			<TouchableOpacity
				onPress={() => {
					getLocation();
				}}
				style={tw`p-2 bg-orange-300 rounded-full w-45 h-45 mt-4 items-center justify-center`}>
				{isLoading ? (
					<ActivityIndicator size={150} color="#ea4c4c" />
				) : (
					<Icon
						name="compass-outline"
						color={"white"}
						type="material-community"
						size={150}
					/>
				)}
			</TouchableOpacity>
			<View style={tw`mx-5 w-full p-5`}>
				<View style={tw`h-90 rounded-2xl overflow-hidden`}>
					{rests.length > 0 ? (
						<FlatList
							style={tw`rounded-2xl overflow-hidden`}
							data={rests}
							keyExtractor={(item) => item.id}
							ItemSeparatorComponent={() => <View style={tw`h-2`} />}
							renderItem={({ item, index }) => {
								return (
									<TouchableOpacity
										onPress={() => {
											dispatch(
												setDestination({
													location: { lat: item.latitud, lng: item.longitud },
													name: item.nombre,
													address: item.direccion,
													img: item.imagen,
												})
											);
											console.log("cordenadas de usuario", userCords);
											dispatch(
												setOrigin({
													location: userCords,
													description: "Tu ubicación",
												})
											);
											navigation.navigate("ComelOSOmap");
										}}>
										<ItemListRecomend
											name={item.nombre}
											img={item.imagen}
											address={item.direccion}
										/>
									</TouchableOpacity>
								);
							}}
						/>
					) : (
						<Text style={tw`text-center text-2xl font-light`}>
							No hay restaurantes cerca de ti
						</Text>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ComelOSO;
