import { Icon } from "@rneui/base";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import tw from "twrnc";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const ComelOSO = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`justify-center items-center bg-red-200 flex-1`}>
			<Text>ComelOSO</Text>
			<Icon
				style={tw`p-2 bg-black rounded-full w-10 mt-4`}
				name="arrowright"
				color={"white"}
				type="antdesign"
			/>
			<View style={tw`mx-5 w-full p-5`}>
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
		</SafeAreaView>
	);
};

export default ComelOSO;
