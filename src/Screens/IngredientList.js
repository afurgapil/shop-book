import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
//hooks
import { useToken } from "../hooks/useToken";
import { useUser } from "../hooks/useUser";
import { useValue } from "../hooks/useValue";
import { setUser } from "../store/slicers/user";
import { useDispatch } from "react-redux";
//style
import { ingredientListStyle } from "../Styles/IngredientListStyle";
//icon
import Icon from "react-native-vector-icons/AntDesign";
import MIcon from "react-native-vector-icons/MaterialIcons";
const sortOptions = [
  { label: "Sort Ingredients", value: "Sort Ingredients" },
  { label: "Bought First", value: "Bought First" },
  { label: "Not Bought First", value: "Not Bought First" },
  { label: "Alphabetical (a-z)", value: "Alphabetical (a-z)" },
  { label: "Alphabetical (z-a)", value: "Alphabetical (z-a)" },
  { label: "Notes First", value: "Notes First" },
  { label: "Notes Last", value: "Notes Last" },
];
const filterOptions = [
  { label: "All Filters", value: "All Filters" },
  { label: "Bought Status", value: "Bought Status" },
  { label: "Category", value: "Category" },
  { label: "Store", value: "Store" },
];

const IngredientItem = ({ ingredient, onCheckboxChange, onDelete }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const token = useToken();
  const user = useUser();
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const handleCheckboxChange = async (isChecked) => {
    try {
      const response = await fetch(
        `http://localhost:3000/ingredients/set/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            id: userId,
            updatedIngredients: [
              {
                ...ingredient,
                isBought: isChecked,
                lastBuy: isChecked ? new Date() : ingredient.lastBuy,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        onCheckboxChange(ingredient._id, isChecked);
      } else {
        console.error("Failed to update user ingredients.");
      }
    } catch (error) {
      console.error("Failed to update user ingredients.", error);
    }
  };
  const deleteIngredient = async (ingredientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/ingredients/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ingredientId,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        onDelete(updatedUser);
        dispatch(setUser(updatedUser));
      } else {
        console.error("Failed to delete ingredient.");
      }
    } catch (error) {
      console.error("Failed to delete ingredient.", error);
    }
  };

  return (
    <View style={ingredientListStyle.ingredientContainer}>
      <View style={ingredientListStyle.collapse}>
        <Text style={ingredientListStyle.ingredientName}>
          {ingredient.name}
        </Text>
        <View style={ingredientListStyle.collapse}>
          <TouchableWithoutFeedback
            style={ingredientListStyle.collapseIcon}
            onPress={toggleCollapse}
          >
            {isCollapsed ? (
              <Icon name="down" size={25} />
            ) : (
              <Icon name="up" size={25} />
            )}
          </TouchableWithoutFeedback>

          <Switch
            value={ingredient.isBought}
            onValueChange={handleCheckboxChange}
            trackColor={{ false: "#273240", true: "#273240" }}
            thumbColor={ingredient.isBought ? "#BFA278" : "white"}
            ios_backgroundColor="#000000"
          />
        </View>
      </View>
      {!isCollapsed && (
        <View style={ingredientListStyle.ingredientContainer}>
          <View style={ingredientListStyle.iconTextContainer}>
            <MIcon name="category" style={ingredientListStyle.icon}></MIcon>
            <Text style={ingredientListStyle.text}>
              Category: {ingredient.category}
            </Text>
          </View>

          {ingredient.notes && (
            <View style={ingredientListStyle.iconTextContainer}>
              <MIcon name="notes" style={ingredientListStyle.icon}></MIcon>
              <Text style={ingredientListStyle.text}>
                Note: {ingredient.notes}
              </Text>
            </View>
          )}

          {ingredient.store && (
            <View style={ingredientListStyle.iconTextContainer}>
              <MIcon name="store" style={ingredientListStyle.icon}></MIcon>
              <Text style={ingredientListStyle.text}>
                Store: {ingredient.store}
              </Text>
            </View>
          )}

          {ingredient.lastBuy && (
            <View style={ingredientListStyle.iconTextContainer}>
              <Icon name="calendar" style={ingredientListStyle.icon} />

              <Text style={ingredientListStyle.text}>
                Last Buy:{ingredient.lastBuy.toString().slice(0, 10)}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={ingredientListStyle.deleteIcon}
            onPress={() => {
              deleteIngredient(ingredient._id);
            }}
          >
            <Icon name="delete" size={30}></Icon>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const IngredientListScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [userId, setUserId] = useState(null);
  const user = useUser();
  const token = useToken();
  const value = useValue();
  const [filterBy, setFilterBy] = useState("All Filters");
  const [isFilterByModalOpen, setIsFilterByModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState("Sort Ingredients");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);
  useEffect(() => {
    fetchIngredients();
  }, [userId, value]);
  useEffect(() => {
    const categoryList = ingredients.reduce((acc, ingredient) => {
      if (!acc.includes(ingredient.category)) {
        acc.push(ingredient.category);
      }
      return acc;
    }, []);
    const storeList = ingredients.reduce((acc, ingredient) => {
      if (!acc.includes(ingredient.store)) {
        acc.push(ingredient.store);
      }
      return acc;
    }, []);
    switch (filterBy) {
      case "Bought Status":
        setCategories(["All", "Bought", "Not Bought"]);
        break;
      case "Category":
        setCategories(["All", ...categoryList]);
        break;
      case "Store":
        setCategories(["All", ...storeList]);
        break;
      default:
        break;
    }
  }, [ingredients, filterBy]);

  const handleCheckboxChange = async (ingredientId, isChecked) => {
    try {
      const updatedIngredients = ingredients.map((ing) => {
        if (ing._id === ingredientId) {
          return {
            ...ing,
            isBought: isChecked,
            lastBuy: isChecked ? new Date() : ing.lastBuy,
          };
        }
        return ing;
      });

      const response = await fetch(
        `http://localhost:3000/ingredients/set/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            id: userId,
            updatedIngredients: updatedIngredients,
          }),
        }
      );

      if (response.ok) {
        setIngredients(updatedIngredients);
      } else {
        console.error("Failed to update user ingredients.");
      }
    } catch (error) {
      console.error("Failed to update user ingredients.", error);
    }
  };
  const handleDelete = async (ingredientId) => {
    try {
      fetchIngredients();
    } catch (error) {
      console.error("Failed to delete ", error);
    }
  };
  const handleSortOptionChange = (itemValue) => {
    setSelectedSortOption(itemValue);
    closeSortModal();
    closeFilterModal();
  };
  const fetchIngredients = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/get/ingredients/${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        setIngredients(data);
      } else {
        console.error("Failed to fetch user's ingredients.");
      }
    } catch (error) {
      console.error("Failed to fetch ingredients.", error);
    }
  };
  const compareIngredients = (a, b) => {
    switch (selectedSortOption) {
      case "Sort Ingredients":
        if (a.isBought === false && b.isBought === true) {
          return -1;
        }
        if (a.isBought === true && b.isBought === false) {
          return 1;
        }
        break;
      case "Not Bought First":
        if (a.isBought === false && b.isBought === true) {
          return -1;
        }
        if (a.isBought === true && b.isBought === false) {
          return 1;
        }
        break;
      case "Bought First":
        if (a.isBought === true && b.isBought === false) {
          return -1;
        }
        if (a.isBought === false && b.isBought === true) {
          return 1;
        }
        break;
      case "Alphabetical (a-z)":
        return a.name.localeCompare(b.name);
      case "Alphabetical (z-a)":
        return b.name.localeCompare(a.name);
      case "Notes First":
        if (!a.notes && b.notes) {
          return 1;
        }
        if (a.notes && !b.notes) {
          return -1;
        }
        break;
      case "Notes Last":
        if (!a.notes && b.notes) {
          return -1;
        }
        if (a.notes && !b.notes) {
          return 1;
        }
        break;
      default:
        return 0;
    }
  };

  const filterIngredients = (ingredientList) => {
    let filteredList = ingredientList;

    if (filterCategory === "All") {
      return filteredList;
    } else if (filterCategory === "Bought") {
      return filteredList.filter((ingredient) => ingredient.isBought);
    } else if (filterCategory === "Not Bought") {
      return filteredList.filter((ingredient) => !ingredient.isBought);
    }

    if (filterBy === "Store" && filterCategory !== "All") {
      filteredList = filteredList.filter(
        (ingredient) => ingredient.store === filterCategory
      );
    }

    if (filterBy === "Category" && filterCategory !== "All") {
      filteredList = filteredList.filter(
        (ingredient) => ingredient.category === filterCategory
      );
    }

    return filteredList;
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };
  const closeFilterByModal = () => {
    setIsFilterByModalOpen(false);
  };
  const closeSortModal = () => {
    setIsSortModalOpen(false);
  };
  return (
    <View style={ingredientListStyle.container}>
      <View style={ingredientListStyle.filterContainer}>
        <View id="filterByPicker">
          <TouchableOpacity
            style={ingredientListStyle.filterButton}
            onPress={() => setIsFilterByModalOpen(!isFilterByModalOpen)}
          >
            <Text style={ingredientListStyle.filterButtonText}>{filterBy}</Text>
          </TouchableOpacity>
          <Modal
            visible={isFilterByModalOpen}
            onBackdropPress={closeFilterByModal}
            backdropOpacity={0.5}
          >
            <View style={ingredientListStyle.modalContainer}>
              <View style={ingredientListStyle.modal}>
                <View style={ingredientListStyle.modalHeader}>
                  <Text>Filter Ingredients</Text>
                  <Icon
                    name="closecircle"
                    size="25"
                    onPress={() => setIsFilterByModalOpen(false)}
                  ></Icon>
                </View>
                <Picker
                  selectedValue={filterBy}
                  onValueChange={(itemValue) => {
                    setFilterBy(itemValue);
                  }}
                >
                  {filterOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
        </View>
        {filterBy !== "All Filters" && (
          <View id="filterPicker">
            <TouchableOpacity
              style={ingredientListStyle.filterButton}
              onPress={() => setIsFilterModalOpen(!isFilterModalOpen)}
            >
              <Text style={ingredientListStyle.filterButtonText}>
                {filterCategory}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={isFilterModalOpen}
              onBackdropPress={closeFilterModal}
              backdropOpacity={0.5}
            >
              <View style={ingredientListStyle.modalContainer}>
                <View style={ingredientListStyle.modal}>
                  <View style={ingredientListStyle.modalHeader}>
                    <Text>Filter Ingredients</Text>
                    <Icon
                      name="closecircle"
                      size="25"
                      onPress={() => setIsFilterModalOpen(false)}
                    ></Icon>
                  </View>
                  <Picker
                    selectedValue={filterCategory}
                    onValueChange={(itemValue) => {
                      setFilterCategory(itemValue);
                    }}
                  >
                    {categories.map((category) => (
                      <Picker.Item
                        key={category}
                        label={category}
                        value={category}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </View>
        )}

        <View id="sortPicker">
          <TouchableOpacity
            style={ingredientListStyle.filterButton}
            onPress={() => setIsSortModalOpen(!isSortModalOpen)}
          >
            <Text style={ingredientListStyle.filterButtonText}>
              {selectedSortOption}
            </Text>
          </TouchableOpacity>
          <Modal
            isVisible={isSortModalOpen}
            onBackdropPress={closeSortModal}
            backdropOpacity={0.5}
          >
            <View style={ingredientListStyle.modalContainer}>
              <View style={ingredientListStyle.modal}>
                <View style={ingredientListStyle.modalHeader}>
                  <Text>Sort Ingredients</Text>
                  <Icon
                    name="closecircle"
                    size="25"
                    onPress={() => setIsSortModalOpen(false)}
                  ></Icon>
                </View>
                <Picker
                  selectedValue={selectedSortOption}
                  onValueChange={handleSortOptionChange}
                >
                  {sortOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <ScrollView style={ingredientListStyle.scrollView}>
        {ingredients.length > 0 ? (
          filterIngredients(ingredients)
            .sort(compareIngredients)
            .map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                onCheckboxChange={handleCheckboxChange}
                onDelete={handleDelete}
              />
            ))
        ) : (
          <View>
            <Text style={ingredientListStyle.noContext}>
              There are no ingredients available.
            </Text>
            <View style={ingredientListStyle.buttonContainer}>
              <TouchableOpacity
                style={ingredientListStyle.addButton}
                onPress={() => navigation.navigate("AddIngredient")}
              >
                <Text style={ingredientListStyle.buttonText}>
                  Add Ingredient Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default IngredientListScreen;
