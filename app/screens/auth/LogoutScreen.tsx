import { StyleSheet} from "react-native";

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
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
