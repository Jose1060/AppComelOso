// In App.js in a new project

import * as React from "react";
import Navigation from "./Navigation";
import { AuthenticatedUserProvider } from "./utils/LoginContext";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://flyby-gateway.herokuapp.com/",
	cache: new InMemoryCache(),
});

function App() {
	console.log("Holi ʕ•ᴥ•ʔ");
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<AuthenticatedUserProvider>
					<Navigation />
				</AuthenticatedUserProvider>
			</Provider>
		</ApolloProvider>
	);
}

export default App;
