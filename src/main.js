import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IngredientListScreen from "./Screens/IngredientList";
import { TouchableOpacity } from "react-native";
import SignInScreen from "./Screens/SignIn";
import SignUpScreen from "./Screens/SignUp";
import AddIngredientScreen from "./Screens/AddIngredient";
import { useUser } from "./hooks/useUser";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setToken } from "./store/slicers/user";
import Icon from "react-native-vector-icons/Entypo";
import FaIcon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkJWTValidity();
  }, []);

  const checkJWTValidity = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");
      if (storedUser && storedToken) {
        dispatch(setUser(JSON.parse(storedUser)));
        dispatch(setToken(storedToken));
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error checking JWT validity:", error);
      console.error("Error details:", error.message);
      setIsLoading(false);
    }
  };
  const handleSignout = async (navigation) => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");

      dispatch(setUser(null));
      dispatch(setToken(null));

      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={({ navigation }) => ({
              headerTitle: "Shop Book",
              headerTitleStyle: { color: "#fff" },
              headerTransparent: false,
              headerStyle: { backgroundColor: "#273240" },
              headerRight: () => (
                <TouchableOpacity onPress={() => handleSignout(navigation)}>
                  <FaIcon name="sign-out" size={40} color="white" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="IngredientList"
            component={IngredientListScreen}
          />
          <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  const user = useUser();

  return (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name="IngredientList"
        component={IngredientListScreen}
        options={({ focused }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="list"
                size={focused ? 30 : 25}
                color={focused ? "#BFA278" : "#5F6B73"}
              />
            );
          },
        })}
      />

      <Tab.Screen
        name="AddIngredient"
        component={AddIngredientScreen}
        options={({ focused }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="add-to-list"
                size={focused ? 30 : 25}
                color={focused ? "#BFA278" : "#5F6B73"}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#5F6B73",
    height: 100,
  },
  tabBarItemStyle: {
    backgroundColor: "#fff",
    margin: 10,
  },
};

export default Main;
