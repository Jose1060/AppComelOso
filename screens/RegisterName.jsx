import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useFormik } from "formik";
import { Picker } from "@react-native-picker/picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AuthUserContext } from "../utils/LoginContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

const RegisterName = ({ navigation }) => {
	const { user } = useContext(AuthUserContext);

	const { values, isSubmitting, setFieldValue, handleSubmit } = useFormik({
		initialValues: {
			nombre: "",
			apellido: "",
			genero: "",
			numero: "",
		},
		onSubmit: async (values) => {
			await updateDoc(doc(firestore, "users", user.uid), {
				...values,
			});
			navigation.navigate("Preferencias");
		},
	});

	return (
		<SafeAreaView style={tw`flex-1 bg-purple-200`}>
			<View style={tw`mt-5 ml-5 mb-5`}>
				<Text style={tw`text-4xl mb-2`}>Datos Personales</Text>
				<Text>
					Todos estos datos son necesarios para que puedas usar ComelOSO.
				</Text>
			</View>
			<View style={tw`mx-5`}>
				<TextInput
					placeholder="Nombre"
					style={tw` px-4 py-1 bg-white text-lg rounded-xl mb-3`}
					value={values.nombre}
					onChangeText={(text) => setFieldValue("nombre", text)}
				/>
				<TextInput
					placeholder="Apellio"
					style={tw` px-4 py-1 bg-white text-lg rounded-xl mb-3`}
					value={values.apellido}
					onChangeText={(text) => setFieldValue("apellido", text)}
				/>
				<TextInput
					placeholder="Numero de telefono"
					style={tw` px-4 py-1 bg-white text-lg rounded-xl mb-3`}
					value={values.numero}
					onChangeText={(text) => setFieldValue("numero", text)}
					maxLength={9}
					keyboardType="numeric"
				/>

				<Picker
					selectedValue={values.genero}
					style={tw`pl-4 pr-5 py-2 bg-white text-lg border-0 rounded-xl mb-3`}
					onValueChange={(itemValue) =>
						itemValue ? setFieldValue("genero", itemValue) : null
					}>
					<Picker.Item label="Seleccione un genero" value="" />
					<Picker.Item label="Masculino" value="masculino" />
					<Picker.Item label="Femenino" value="femenino" />
				</Picker>
				<BouncyCheckbox
					size={20}
					fillColor="orange"
					unfillColor="#FFFFFF"
					text="Acepto los términos y condiciones"
					iconStyle={{ borderColor: "orange" }}
					onPress={(isChecked) => {
						setFieldValue("acepto", isChecked);
					}}
				/>

				<TouchableOpacity
					style={tw`bg-green-500 rounded-3xl px-5 py-2 mt-15`}
					onPress={async () => {
						handleSubmit();
					}}>
					{isSubmitting ? (
						<ActivityIndicator size="large" color="#ffaa49" />
					) : (
						<Text style={tw`text-white text-lg`}>Aceptar</Text>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RegisterName;
