import React from "react";
import { Platform, StyleSheet, Button, View } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Icon } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";

//IMPORT SCENES
import DashBoardScreen from "../screens/news/DashBoard";
import ArticlesScreen from "../screens/news/Articles";
import ArticleScreen from "../screens/news/Article";
import SearchScreen from "../screens/news/Search";

//ROUTES CONFIG ====================================================

let font = Platform.OS === "ios" ? "HelveticaNeue" : "Roboto";
let size = Platform.OS === "ios" ? 24 : 25;
let titleColor = "#363434";
let iconColor = "#808689";

//Nav Header Styles
let headerStyle = { backgroundColor: "#fff" };
let headerTitleStyle = {
  fontWeight: "bold",
  fontSize: 25,
  fontFamily: 'sans-serif',
  color: '#E67E22',
};

//Nav Buttons
let SearchBtn = (props: { onPress: any }) => (
  <BorderlessButton {...props} style={styles.wrapper}>
    <Icon type={`ionicon`} name={"md-search"} size={size} color={iconColor} />
  </BorderlessButton>
);

//ROUTES STACK ====================================================

const DashboardStack = createStackNavigator(
  {
    DashBoard: DashBoardScreen,
    Articles: ArticlesScreen,
    Article: ArticleScreen,
    Search: SearchScreen,
  },
  {
    initialRouteName: "DashBoard",
    defaultNavigationOptions: ({ navigation }): Object => ({
      headerStyle,
      headerTitleStyle,
      headerRight:() => <SearchBtn onPress={() => navigation.navigate("Search")} />,
    }),
  }
);

//ROUTER ====================================================
const Router = createAppContainer(DashboardStack);
export default Router;

const styles = StyleSheet.create({
  wrapper: {
    height: 44,
    width: 44 + 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
