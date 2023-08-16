import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;

export const ingredientListStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#5F6B73",
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  collapse: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collapseIcon: {
    marginRight: 20,
    paddingRight: 20,
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#BFA278",
  },
  TouchableOpacity: {
    marginTop: 10,
  },
  switch: {
    color: "red",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },

  filterButton: {
    padding: 10,
    backgroundColor: "#B2BABF",
    borderRadius: 5,
    maxWidth: 120,
  },
  filterButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "100%",
    bottom: 0,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sortPicker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  noContext: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#BFA278",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  ingredientContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ddd",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    marginRight: 5,
    fontSize: 20,
    color: "#273240",
  },
  text: {
    fontSize: 16,
  },
  deleteIcon: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
});
