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
import { firebase } from "../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react/cjs/react.development";
import { useNavigation } from "@react-navigation/native";
import { AnimatableComponent } from "react-native-animatable";
const btnColor = "darkturquoise";
const pink = "#F053F3";
const blue = "#5BB1F2";
const btn_blue = "#5BB1F2";
const btn_pink = "#ECAAF3";
import * as Animatable from 'react-native-animatable';
const noUserErrorCode = 'auth/invalid-email'
const noNetworkErrorCode = 'auth/network-request-failed'
const wrongPasswordCode = 'auth/wrong-password'
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
    marginTop: 5,
    marginBottom: 5,
    alignItems: "baseline",
    alignContent: "center",
  },
  text_input: {
    marginLeft: 20,
    borderBottomColor: "#a5a5a5",
    borderBottomWidth: 1.5,
    width: '80%',
    height: '80%'
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
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button_text: { color: "white", fontSize: 20 },
  btn_icon: {},
  create_account: {
    color: "#1b68f7",
    textDecorationColor: "#1b68f7",
    textDecorationLine: "underline",
    marginTop: 50,
  }, error_view: {

    flexDirection: 'row', width: '70%',

    padding: 1,
    justifyContent: 'flex-start', alignItems: 'center'
  },
  error_msg: {


    color: 'tomato', fontSize: 12, height: '100%', fontWeight: '600'

  }
});




// const Button = () => {
//   return (
//     <LinearGradient
//       colors={[btn_blue, btn_pink]}
//       start={[0, 0]}
//       end={[1, 1]}
//       style={styles.btn_gradient}
//     >
//       <TouchableOpacity style={styles.button} onPress={() => singIn()}>
//         <Text style={styles.button_text}>Login</Text>
//         <MaterialCommunityIcons name="arrow-right" size={30} color="#ffff" />
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };




const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isWrongPassword, setIsWrongPassword] = useState(false)
  const [isWrongEmail, setIsWrongEmail] = useState(false)
  const navigation = useNavigation()
  const singIn = () => {
    console.log(email, password);
    let aut = firebase.auth()
    aut.signInWithEmailAndPassword(email, password).
      then(() => { console.log('Logged in'); navigation.navigate('home') }).
      catch((err) => { console.error(err.code);; handleAuthError(err.code) })

  }
  const handleAuthError = (errCode) => {
    console.log(errCode);
    if (errCode == noUserErrorCode) {
      setIsWrongEmail(true)
    } else {
      if (isWrongEmail) { setIsWrongEmail(false) }
    }
    if (errCode == wrongPasswordCode) {
      setIsWrongPassword(true)
    } else {
      if (isWrongPassword) { setIsWrongPassword(false) }
    }
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
            style={{ fontSize: 40, color: blue, textAlign: "center", margin: 30, fontWeight: "700", }}>
            Login
          </Text>

          <View style={styles.email}>
            <MaterialCommunityIcons name="email-outline" size={25} />
            <TextInput
              keyboardType="email-address"
              placeholder="example@example.com"
              // value={this.state.email}
              style={styles.text_input} onChangeText={text => setEmail(text)} />
          </View>

          {isWrongEmail && <Animatable.View animation='fadeInLeft' duration={700} style={styles.error_view}>
            <Text style={styles.error_msg}>Invalid email !</Text>
          </Animatable.View>}

          <View style={styles.email}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={25}
              style={styles.btn_icon} />
            <TextInput
              secureTextEntry={true}
              placeholder="password"
              // value={this.state.password}
              style={styles.text_input} onChangeText={text => setPassword(text)} />
          </View>
          {isWrongPassword &&
            <Animatable.View animation='fadeInLeft' duration={700} style={styles.error_view}>
              <Text style={styles.error_msg}>Invalid passwod !</Text>
            </Animatable.View>}

          <TouchableOpacity onPress={() => navigation.navigate('authcreateaccount')}>
            <Text style={styles.create_account}>Create account</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={[btn_blue, btn_pink]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.btn_gradient}
          >
            <TouchableOpacity style={styles.button} onPress={singIn}>
              <Text style={styles.button_text}>Login</Text>
              <MaterialCommunityIcons name="arrow-right" size={30} color="#ffff" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

}

export default Login;
