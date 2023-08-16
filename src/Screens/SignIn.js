import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
//hooks
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/slicers/user";
//storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//style
import { signinStyles } from "../Styles/SignInStyle";
const SigninScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  const storeJWT = async (user, token) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error storing user:", error);
    }
  };

  const handleSignin = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(setUser(responseData.user));
        dispatch(setToken(responseData.token));
        if (rememberMe) {
          storeJWT(responseData.user, responseData.token);
        }

        navigation.navigate("AppTabs");
      } else {
        const responseData = await response.json();
        console.error("Login Error:", responseData.error);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <View style={signinStyles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={signinStyles.image}
      ></Image>
      <TextInput
        style={signinStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={signinStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={signinStyles.loginContainer}>
        <TouchableOpacity
          style={signinStyles.signinButton}
          title="Sign In"
          onPress={handleSignin}
        >
          <Text style={signinStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={signinStyles.rememberMeContainer}>
          <Text>Remember Me</Text>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ true: "#0c61ff" }}
          />
        </View>
      </View>

      <View style={signinStyles.signupButtonContainer}>
        <Text>Don't have an account?</Text>
        <Text
          style={signinStyles.signupButtonText}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default SigninScreen;
