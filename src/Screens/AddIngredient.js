import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
//hooks
import { useToken } from "../hooks/useToken";
import { useUser } from "../hooks/useUser";
import { useDispatch } from "react-redux";
import { useValue } from "../hooks/useValue";
import { setData } from "../store/slicers/data";
//style
import { addIngredientStyle } from "../Styles/AddIngredientStyle";
//icon
import Icon from "react-native-vector-icons/AntDesign";
const AddIngredientScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [store, setStore] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const token = useToken();
  const user = useUser();
  const value = useValue();
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const handleAddIngredient = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/ingredients/add/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name,
            category,
            notes: showNotes ? notes : "",
            store: showStore ? store : "",
            isBought: false,
            lastBuy: "",
          }),
        }
      );

      if (response.ok) {
        const savedIngredient = await response.json();
        setName("");
        setCategory("");
        setNotes("");
        setStore("");
        dispatch(setData(!value));
        navigation.goBack();
      } else {
        console.log("Error adding ingredient");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={addIngredientStyle.container}>
      <TextInput
        style={addIngredientStyle.input}
        placeholder="Name"
        placeholderTextColor="white"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={addIngredientStyle.input}
        placeholder="Category"
        placeholderTextColor="white"
        value={category}
        onChangeText={setCategory}
      />
      {showNotes ? (
        <TextInput
          style={addIngredientStyle.input}
          placeholder="Notes"
          placeholderTextColor="white"
          value={notes}
          onChangeText={setNotes}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setShowNotes(true)}
          style={addIngredientStyle.addInput}
        >
          <Icon
            name="plussquareo"
            size={25}
            style={addIngredientStyle.addIcon}
          />
          <Text style={addIngredientStyle.addText}>Add Note</Text>
        </TouchableOpacity>
      )}
      {showStore ? (
        <TextInput
          style={addIngredientStyle.input}
          placeholder="Store"
          placeholderTextColor="white"
          value={store}
          onChangeText={setStore}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setShowStore(true)}
          style={addIngredientStyle.addInput}
        >
          <Icon
            name="plussquareo"
            size={25}
            style={addIngredientStyle.addIcon}
          />
          <Text style={addIngredientStyle.addText}>Add Store</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={addIngredientStyle.addButton}
        onPress={handleAddIngredient}
      >
        <Text style={addIngredientStyle.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddIngredientScreen;
