import React from "react";
import { View, StyleSheet, Button } from "react-native";

import useStatusBar from "../../hooks/useStatusBar";
import { logout } from "../../components/Firebase/firebase";
// import Router from "../router";

export default function Logout() {
  // useStatusBar("dark-content");
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  handleSignOut()
  // return (
  //   <View style={styles.container}>
  //     <Button title="Sign Out" onPress={handleSignOut} />
  //   </View>
  // );
}


function HomeScreen() {
  useStatusBar("dark-content");
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
