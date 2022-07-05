import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { selectDestination, selectOrigin } from "../../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
	const origin = useSelector(selectOrigin);

	const destination = useSelector(selectDestination);
	return (
		<View style={tw`h-full w-full`}>
			<MapView
				style={tw`flex-1`}
				mapType="mutedStandard"
				initialRegion={{
					latitude: origin.location.latitude,
					longitude: origin.location.longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}>
				{origin?.location && (
					<Marker
						coordinate={{
							latitude: origin.location.latitude,
							longitude: origin.location.longitude,
						}}
					/>
				)}
				{destination?.location && (
					<Marker
						coordinate={{
							latitude: destination.location.lat,
							longitude: destination.location.lng,
						}}
					/>
				)}
				{origin?.location && destination?.location && (
					<MapViewDirections
						origin={{
							latitude: origin.location.latitude,
							longitude: origin.location.longitude,
						}}
						destination={{
							latitude: destination.location.lat,
							longitude: destination.location.lng,
						}}
						apikey={Constants.manifest.extra.googleMapsKey}
						strokeWidth={5}
						strokeColor="orange"
					/>
				)}
			</MapView>
		</View>
	);
};

export default Map;
