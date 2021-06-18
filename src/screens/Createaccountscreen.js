import React from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity, Keyboard
} from "react-native";
import { firebase } from '../config/firebase'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react/cjs/react.development";
import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";
import { invalidUserCode, noNetworkErrorCode, wrongPasswordCode } from "../constants/authCodes";
import { setUserName } from "./Homescreen";
const btnColor = "darkturquoise";
const pink = "#F053F3";
const blue = "#5BB1F2";
const btn_blue = "#5BB1F2";
const btn_pink = "#ECAAF3";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffff",
    },
    logo: {
        flex: 1,
        resizeMode: "contain",
    },

    login: {

        flex: 2,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",

    },
    email: {

        paddingHorizontal: 20,
        width: "80%",
        height: 40,
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "#000000",
        marginTop: 20,
        marginBottom: 8,
        alignItems: "baseline",
        alignContent: "center",
        overflow: 'scroll'
    },
    text_input: {
        marginLeft: 20,
        width: '80%',
        height: '80%',
        borderBottomColor: "#a5a5a5",
        overflow: 'scroll',
        borderBottomWidth: 1.5,
    },
    btn_gradient: {
        width: "60%",
        height: 40,
        borderRadius: 50,
        marginTop: 30,

        elevation: 4
    },
    button: {
        // flexDirection: "row",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center", justifyContent: 'space-between'
    },
    button_text: {
        color: "white",
        fontSize: 15,
        //  justifyContent: 'flex-start' 
    },
    btn_icon: {

    },
    create_account: {
        color: "#1b68f7",
        textDecorationColor: "#1b68f7",
        textDecorationLine: "underline",
        marginTop: 50,
    },
    error_view: {

        flexDirection: 'row', width: '70%',
        //  backgroundColor: 'green',
        padding: 1,
        justifyContent: 'flex-start', alignItems: 'center'
    },
    error_msg: {

        // marginTop:5,
        color: 'tomato', fontSize: 12, height: '100%', fontWeight: '600'
        // backgroundColor: 'blue',
    }
});




const Createaccount = () => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isWrongUserName, setIsWrongUserName] = useState(false)
    const [isWrongPassword, setIsWrongPassword] = useState(false)
    const [isWrongEmail, setIsWrongEmail] = useState(false)
    const navigation = useNavigation()

    const createAccount = () => {
        // console.log('commnt'); 
        if (userName.length < 5) { setIsWrongUserName(true) } else {
            isWrongUserName ? setIsWrongUserName(false) : null

            firebase.auth().createUserWithEmailAndPassword(email, password)
            
            .then(() => {
                isWrongEmail ? setIsWrongEmail(false) :null
                isWrongPassword ? setIsWrongPassword(false):null
                setUserName(userName)
                navigation.navigate('home')
            }
            ).catch((err) => handleAuthError(err.code))
        }



    }
    const handleAuthError = (errCode) => {
        if (errCode === invalidUserCode) { setIsWrongEmail(true) }
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        style={styles.logo}
                        source={require("../../assets/images/logo.png")}
                    />
                </View>
                <View style={styles.login}>
                    <Text
                        style={{
                            fontSize: 30,
                            color: blue,
                            textAlign: "center",
                            margin: 30,
                            fontWeight: "700",
                        }}
                    >
                        Welcome
                    </Text>
                    <View style={styles.email}>
                        <Feather name="user" size={25} />
                        <TextInput

                            placeholder="User name"
                            style={styles.text_input}
                            onChangeText={(text) => setUserName(text)}
                        />
                    </View>
                    {isWrongUserName &&
                        <Animatable.View animation='fadeInLeft' duration={700} style={styles.error_view}>
                            <Text style={styles.error_msg}>User name should be greater than 5 characters !</Text>
                        </Animatable.View>}
                    <View style={styles.email}>
                        <MaterialCommunityIcons name="email-outline" size={25} />
                        <TextInput
                            keyboardType="email-address"
                            placeholder="example@example.com"
                            style={styles.text_input}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    {isWrongEmail &&
                        <Animatable.View animation='fadeInLeft' duration={700} style={styles.error_view}>
                            <Text style={styles.error_msg}>Invalid email !</Text>
                        </Animatable.View>}
                    <View style={styles.email}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={25}
                            style={styles.btn_icon}
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder="password"
                            style={styles.text_input}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    {isWrongPassword &&
                        <Animatable.View animation='fadeInLeft' duration={700} style={styles.error_view}>
                            <Text style={styles.error_msg}>Invalid passwod !</Text>
                        </Animatable.View>}

                    <LinearGradient
                        colors={[btn_blue, btn_pink]}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={styles.btn_gradient}
                    >
                        <TouchableOpacity style={styles.button}
                            onPress={createAccount}>
                            <Text style={styles.button_text}>Create account</Text>
                            <MaterialCommunityIcons name="arrow-right" size={30} color="#ffff" />
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );

}

export default Createaccount;
