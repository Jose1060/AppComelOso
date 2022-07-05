import "dotenv/config";

export default {
	expo: {
		name: "AppComelOso",
		slug: "AppComelOso",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			bundleIdentifier: "com.josem.appcomeloso.app",
			supportsTablet: true,
		},
		android: {
			package: "com.josem.appcomeloso",

			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#FFFFFF",
			},
			config: {
				googleMaps: {
					apiKey: process.env.GOOGLE_MAPS_API_KEY,
				},
			},
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		extra: {
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
			measurementId: process.env.MEASUREMENT_ID,
			googleMapsKey: process.env.GOOGLE_MAPS_APIKEY,
		},
	},
};
