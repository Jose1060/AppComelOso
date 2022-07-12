import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useFormik, Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AuthUserContext } from "../utils/LoginContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import * as Yup from "yup";

const RegistroSchema = Yup.object().shape({
	nombre: Yup.string()
		.min(3, "El nombre debe tener al menos 3 caracteres")
		.required("El nombre es requerido")
		.max(40, "El nombre no puede tener más de 20 caracteres"),
	apellido: Yup.string()
		.min(3, "El apellido debe tener al menos 3 caracteres")
		.required("El apellido es requerido")
		.max(40, "El apellido no puede tener más de 20 caracteres"),
	numero: Yup.number()
		.required("El número de teléfono es requerido")
		.min(9, "El número de teléfono debe tener al menos 9 dígitos")
		.positive("Numero invalido")
		.integer("Numero invalido"),
	acepto: Yup.boolean().oneOf(
		[true],
		"Debe aceptar los términos y condiciones"
	),
	genero: Yup.string().required("El género es requerido"),
});

const RegisterName = ({ navigation }) => {
	const { user } = useContext(AuthUserContext);

	return (
		<SafeAreaView style={tw`flex-1 bg-purple-200`}>
			<ScrollView>
				<View style={tw`mt-5 ml-5 mb-15`}>
					<Text style={tw`text-4xl mb-6`}>Datos Personales </Text>
					<Text>
						Todos estos datos son necesarios para que puedas usar ComelOSO.
					</Text>
				</View>
				<View style={tw`mx-5`}>
					<Formik
						initialValues={{
							nombre: "",
							apellido: "",
							genero: "",
							numero: "",
							acepto: false,
						}}
						validationSchema={RegistroSchema}
						onSubmit={async (values) => {
							if (values.acepto == true) {
								await updateDoc(doc(firestore, "users", user.uid), {
									...values,
								});
								navigation.navigate("Preferencias");
							} else {
								alert("Debe aceptar los terminos y condiciones");
							}
						}}>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							touched,
							isSubmitting,
							setFieldValue,
						}) => (
							<View>
								<View style={tw`mb-4`}>
									<TextInput
										placeholder="Nombre"
										style={tw`px-4 py-1 bg-white text-lg rounded-xl`}
										value={values.nombre}
										onChangeText={handleChange("nombre")}
									/>
									{errors.nombre ? (
										<Text style={tw` text-red-500 pl-2`}>
											{errors.nombre && touched.nombre && errors.nombre}
										</Text>
									) : null}
								</View>
								<View style={tw`mb-4`}>
									<TextInput
										placeholder="Apellio"
										style={tw`px-4 py-1 bg-white text-lg rounded-xl`}
										value={values.apellido}
										onChangeText={handleChange("apellido")}
									/>
									{errors.apellido ? (
										<Text style={tw`text-red-500 pl-2`}>
											{errors.apellido && touched.apellido && errors.apellido}
										</Text>
									) : null}
								</View>
								<View style={tw`mb-4`}>
									<TextInput
										placeholder="Numero de telefono"
										style={tw`px-4 py-1 bg-white text-lg rounded-xl`}
										value={values.numero}
										onChangeText={handleChange("numero")}
										maxLength={9}
										keyboardType="numeric"
									/>
									{errors.numero ? (
										<Text style={tw`text-red-500 pl-2`}>
											{errors.numero && touched.numero && errors.numero}
										</Text>
									) : null}
								</View>
								<View style={tw`mb-7`}>
									<Picker
										selectedValue={values.genero}
										style={tw`pl-4 pr-5 bg-white text-lg border-0 rounded-xl`}
										onValueChange={(itemValue) =>
											itemValue ? setFieldValue("genero", itemValue) : null
										}>
										<Picker.Item label="Seleccione un genero" value="" />
										<Picker.Item label="Masculino" value="masculino" />
										<Picker.Item label="Femenino" value="femenino" />
									</Picker>
									{errors.genero ? (
										<Text style={tw`text-red-500 pl-2`}>
											{errors.genero && touched.genero && errors.genero}
										</Text>
									) : null}
								</View>
								<View style={tw``}>
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
									{errors.acepto ? (
										<Text style={tw`mb-4 text-red-500 pl-2`}>
											{errors.acepto && touched.acepto && errors.acepto}
										</Text>
									) : null}
								</View>
								<TouchableOpacity
									style={tw`bg-green-500 rounded-3xl px-5 py-2 mt-15 mb-10`}
									onPress={handleSubmit}>
									{isSubmitting ? (
										<ActivityIndicator size="large" color="#ffaa49" />
									) : (
										<Text style={tw`text-white text-lg`}>Aceptar</Text>
									)}
								</TouchableOpacity>
							</View>
						)}
					</Formik>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RegisterName;
