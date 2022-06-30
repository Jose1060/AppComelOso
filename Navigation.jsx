import React, {
	useRef,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";
import { NavigationContainer } from "@react-navigation/native";
import {
	Animated,
	Dimensions,
	Image,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";

//Icons
import { FontAwesome5, Octicons, Ionicons } from "@expo/vector-icons";
import osoIcono from "./assets/iconos/oso-icono.png";

//screens
import HomeScreen from "./screens/HomeScreen";
import ComelOSO from "./screens/ComelOSO";
import Favorite from "./screens/Favorite";
import Historial from "./screens/Historial";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { auth } from "./config/firebase";
import { AuthUserContext } from "./utils/LoginContext";

//Home Stack

const HomeStackNavigator = createNativeStackNavigator();
const HomeStack = () => {
	return (
		<HomeStackNavigator.Navigator initialRouteName="HomeScreen">
			<HomeStackNavigator.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
		</HomeStackNavigator.Navigator>
	);
};

//Historial Stack

const HistorialStackNavigator = createNativeStackNavigator();
const HistorialStack = () => {
	return (
		<HistorialStackNavigator.Navigator initialRouteName="Historial">
			<HistorialStackNavigator.Screen
				name="Historial"
				component={Historial}
				options={{ headerShown: false }}
			/>
		</HistorialStackNavigator.Navigator>
	);
};

//ComelOSO Stack

const ComelOSOStackNavigator = createNativeStackNavigator();
const ComelOSOStack = () => {
	return (
		<ComelOSOStackNavigator.Navigator initialRouteName="ComelOSO">
			<ComelOSOStackNavigator.Screen
				name="ComelOSO"
				component={ComelOSO}
				options={{ headerShown: false }}
			/>
		</ComelOSOStackNavigator.Navigator>
	);
};

//Favorite Stack

const FavoriteStackNavigator = createNativeStackNavigator();
const FavoriteStack = () => {
	return (
		<FavoriteStackNavigator.Navigator initialRouteName="Favorite">
			<FavoriteStackNavigator.Screen
				name="Favorite"
				component={Favorite}
				options={{ headerShown: false }}
			/>
		</FavoriteStackNavigator.Navigator>
	);
};

//Settings

const SettingsStackNavigator = createNativeStackNavigator();
const SettingsStack = () => {
	return (
		<SettingsStackNavigator.Navigator initialRouteName="Settings">
			<SettingsStackNavigator.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: false }}
			/>
		</SettingsStackNavigator.Navigator>
	);
};

//Tab
const Tab = createBottomTabNavigator();

const MyTabs = () => {
	const tabOffsetValue = useRef(new Animated.Value(0)).current;
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "orange",
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "white",
					position: "absolute",
					bottom: 30,
					marginHorizontal: 20,
					heigth: 60,
					borderRadius: 10,
					shadowColor: "#000",
					shadowOpacity: 0.06,
					shadowOffset: {
						width: 10,
						height: 10,
					},
					paddingHorizontal: 20,
				},
			}}>
			<Tab.Screen
				name="HomeTab"
				component={HomeStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="home" size={size} color={color} />
					),
				}}
				listeners={() => ({
					tabPress: () => {
						Animated.spring(tabOffsetValue, {
							toValue: 0,
							useNativeDriver: true,
						}).start();
					},
				})}></Tab.Screen>
			<Tab.Screen
				name="HistorialTab"
				component={HistorialStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="pizza-slice" size={size} color={color} />
					),
				}}
				listeners={() => ({
					tabPress: () => {
						Animated.spring(tabOffsetValue, {
							toValue: getWidth(),
							useNativeDriver: true,
						}).start();
					},
				})}
			/>
			<Tab.Screen
				name="ComelOSOTab"
				component={ComelOSOStack}
				options={{
					tabBarIcon: () => (
						<TouchableOpacity
							style={tw`w-16 h-16 bg-red-100/50 rounded-full justify-center items-center mb-10`}>
							<Image source={osoIcono} style={tw`w-12 h-12 `}></Image>
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name="FavoriteTab"
				component={FavoriteStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Octicons name="heart-fill" size={size} color={color} />
					),
				}}
				listeners={() => ({
					tabPress: () => {
						Animated.spring(tabOffsetValue, {
							toValue: getWidth() * 3,
							useNativeDriver: true,
						}).start();
					},
				})}
			/>
			<Tab.Screen
				name="SettingsTab"
				component={SettingsStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="settings-sharp" size={size} color={color} />
					),
				}}
				listeners={() => ({
					tabPress: () => {
						Animated.spring(tabOffsetValue, {
							toValue: getWidth() * 4,
							useNativeDriver: true,
						}).start();
					},
				})}
			/>
		</Tab.Navigator>
	);
};

function getWidth() {
	let width = Dimensions.get("window").width;
	width = width - 80;
	return width / 5;
}

// Login Stack

const LoginStackNavigator = createNativeStackNavigator();
const LoginNavStack = () => {
	return (
		<LoginStackNavigator.Navigator initialRouteName="Login">
			<LoginStackNavigator.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<LoginStackNavigator.Screen
				name="Register"
				component={Register}
				options={{ headerShown: false }}
			/>
		</LoginStackNavigator.Navigator>
	);
};

const Navigation = () => {
	const { user, setUser } = useContext(AuthUserContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
			authenticatedUser ? setUser(authenticatedUser) : setUser(null);
			setIsLoading(false);
		});
		return () => unsubscribe();
	}, [user]);

	console.log(user);
	if (isLoading) {
		return (
			<View style={tw`flex-1 justify-center items-center`}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			{user ? <MyTabs /> : <LoginNavStack />}
		</NavigationContainer>
	);
};

export default Navigation;
