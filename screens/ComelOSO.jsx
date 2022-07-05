import { Icon } from "@rneui/base";
import React, { useState } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import tw from "twrnc";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import ItemListRecomend from "../components/ComelOso/ItemListRecomend";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

const lugares = [
	{
		id: 1,
		name: "Casa de la comida",
		address: "Calle de la comida",
		coods: {
			lat: -16.403205763546257,
			lng: -71.52293249251396,
		},
		img: "https://picsum.photos/200/300",
	},
	{
		id: 2,
		name: "Restaurante Ceviche",
		address: "Calle de la comida",
		coods: {
			lat: -16.399413561638138,
			lng: -71.52145447922516,
		},
		img: "https://picsum.photos/200/300",
	},
	{
		id: 3,
		name: "Restaurante Patita",
		address: "Calle de la comida",
		coods: {
			lat: -16.399261253092654,
			lng: -71.52167467902146,
		},
		img: "https://picsum.photos/200/300",
	},
	{
		id: 4,
		name: "Restaurante Paco",
		address: "Calle de la comida",
		coods: {
			lat: -16.398715757182295,
			lng: -71.53702362032118,
		},
		img: "https://picsum.photos/200/300",
	},
	{
		id: 5,
		name: "Restaurante Pancho",
		address: "Calle de la comida",
		coods: {
			lat: -16.398715757182295,
			lng: -71.53702362032118,
		},
		img: "https://picsum.photos/200/300",
	},
	{
		id: 6,
		name: "Tablon",
		address: "Calle de la comida",
		coods: {
			lat: -16.399263530288216,
			lng: -71.52168088309791,
		},
		img: "https://picsum.photos/200/300",
	},
];

const ComelOSO = ({ navigation }) => {
	const [userCords, setUserCords] = useState(null);

	const dispatch = useDispatch();

	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			alert("No se pudo obtener la ubicación");
			return;
		}
		const location = await Location.getCurrentPositionAsync({});
		console.log(location);
		setUserCords(location.coords);
	};

	return (
		<SafeAreaView style={tw` items-center bg-orange-200 flex-1 pt-10`}>
			<Text style={tw`text-4xl font-light`}>ComelOSO</Text>
			<TouchableOpacity
				onPress={() => {
					getLocation();
					console.log("Cordenadas de usuario", userCords);
				}}
				style={tw`p-2 bg-orange-300 rounded-full w-45 h-45 mt-4 items-center justify-center`}>
				<Icon
					name="compass-outline"
					color={"white"}
					type="material-community"
					size={150}
				/>
			</TouchableOpacity>
			<View style={tw`mx-5 w-full p-5`}>
				<View style={tw`mb-5`}>
					<GooglePlacesAutocomplete
						styles={{
							container: {
								flex: 0,
							},
							textInput: {
								fontSize: 18,
							},
						}}
						placeholder="Search"
						query={{
							key: Constants.manifest.extra.googleMapsKey,
							language: "en",
						}}
						onPress={(data, details = null) => {
							console.log("data----------------------------", data);
							console.log("details-------------------------", details);
							dispatch(
								setOrigin({
									location: details.geometry.location,
									description: data.description,
								})
							);
							dispatch(setDestination(null));
						}}
						nearbyPlacesAPI="GooglePlacesSearch"
						debounce={400}
						minLength={2}
						enablePoweredByContainer={false}
					/>
				</View>
				<View style={tw`h-70 rounded-2xl overflow-hidden`}>
					<FlatList
						style={tw`rounded-2xl overflow-hidden`}
						data={lugares}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={() => <View style={tw`h-2`} />}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									onPress={() => {
										dispatch(
											setDestination({
												location: item.coods,
												name: item.name,
												address: item.address,
												img: item.img,
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
										name={item.name}
										img={item.img}
										address={item.address}
									/>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ComelOSO;
