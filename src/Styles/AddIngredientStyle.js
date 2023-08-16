import { StyleSheet } from "react-native";
export const addIngredientStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#5F6B73",
    flex: 1,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: "white",
  },
  addIcon: {
    color: "white",
  },
  addText: {
    color: "#fff",
    textDecorationLine: "none",
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#BFA278",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  addInput: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
