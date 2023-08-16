import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import API_URL from "../../config";
import { signupStyles } from "../Styles/SignUpStyle";
const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        setIsLogin(true);
        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 1000);
      } else {
        const responseData = await response.json();
        console.error("Kayıt hatası:", responseData.error);
      }
    } catch (error) {
      console.error("Kayıt işlemi sırasında bir hata oluştu:", error);
    }
  };
  return (
    <View style={signupStyles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={signupStyles.image}
      ></Image>
      <TextInput
        style={signupStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={signupStyles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={signupStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={signupStyles.TouchableOpacity}
        onPress={handleSignup}
      >
        <Text style={signupStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={signupStyles.signinButtonContainer}>
        <Text style={signupStyles.text}>Do you already have an account?</Text>
        <Text
          style={signupStyles.signinText}
          onPress={() => navigation.navigate("SignIn")}
        >
          Sign In
        </Text>
      </View>
      {isLogin && <Text>Succesfully Login, you are redirect</Text>}
    </View>
  );
};

export default SignupScreen;
