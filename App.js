// In App.js in a new project

import * as React from "react";
import Navigation from "./Navigation";
import { AuthenticatedUserProvider } from "./utils/LoginContext";
import { Provider } from "react-redux";
import { store } from "./utils/store";

function App() {
	console.log("Holi ʕ•ᴥ•ʔ");
	return (
		<Provider store={store}>
			<AuthenticatedUserProvider>
				<Navigation />
			</AuthenticatedUserProvider>
		</Provider>
	);
}

export default App;
