import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 300,
    resizeMode: "contain",
  },

  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  signinButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  rememberMeContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  signupButtonContainer: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },

  touchableOpacity: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  signupButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 2,
    textDecorationLine: "underline",
  },
});

export default signinStyles;
