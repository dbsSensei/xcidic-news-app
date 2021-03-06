import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {StyleSheet} from 'react-native'

import handleSignOut from "../auth/LogoutScreen";

import * as api from "../../api";
import { addHeadlines } from "../../actions";
import Article from "../../utils";

import Panel from "../../components/NewsApp/Panel";
import PanelItem from "../../components/NewsApp/PanelItem";

export default function DashBoard(props: { navigation: { navigate: any } }) {
  const dispatch = useDispatch();
  const { navigate } = props.navigation;

  //1 - DECLARE VARIABLES
  const [error, setError]: any = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //Access Redux Store State
  const newsReducer = useSelector(
    ({ newsReducer }: { newsReducer: {} }) => newsReducer
  );
  const {
    business,
    entertainment,
    general,
    health,
    science,
    sports,
    technology,
  }: any = newsReducer;

  //==================================================================================================

  //2 - MAIN CODE BEGINS HERE
  useEffect(() => {
    getData();
  }, []);

  //==================================================================================================

  //3 - GET DATA
  async function getData() {
    setIsFetching(true);

    try {
      let data = await api.getHeadlines();
      dispatch(addHeadlines(data));
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }

  //==================================================================================================

  //4 - RENDER NEWS ITEM - A function that returns a function
  const renderItem = (
    size = "small",
    horizontal = false,
    grid = false,
    wrapper = true
  ) => {
    return ({ item, index }: { item: string; index: string }) => {
      let article = new Article(item, navigate);
      return (
        <PanelItem
          {...article}
          size={size}
          horizontal={horizontal}
          grid={grid}
          wrapper={wrapper}
        />
      );
    };
  };

  //==================================================================================================

  //5 - ON CTA PRESS
  const onCTAPress = (category: string) => navigate("Articles", { category });

  //==================================================================================================

  //6 - RENDER
  if (isFetching) return <ActivityIndicator style={{ paddingVertical: 8 }} />;
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>{`${error.message}`}</Text>
        <Text
          style={{ color: "blue", fontSize: 16, padding: 8 }}
          onPress={getData}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  let renderDefaultItem = renderItem();
  let renderHorizontalItem = renderItem(null!, true, false, true);

  let renderGridItem = renderItem("small", false, true, false);
  let renderHorizontalGridItem = renderItem(null!, true, true, false);

  let renderSportItem = renderItem("large");
  let renderTechItem = renderItem("large", false, true);
  return (
    <>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <Panel
          title={"Business"}
          data={business.articles.slice(0, 5)}
          renderItem={renderDefaultItem}
          onCTAPress={() => onCTAPress("Business")}
        />

        <Panel
          title={"Entertainment"}
          data={entertainment.articles.slice(0, 5)}
          renderItem={renderHorizontalItem}
          onCTAPress={() => onCTAPress("Entertainment")}
        />

        <Panel
          cols={1}
          title={"General"}
          data={general.articles.slice(0, 3)}
          renderItem={renderHorizontalGridItem}
          onCTAPress={() => onCTAPress("General")}
        />

        <Panel
          cols={2}
          title={"Health"}
          data={health.articles.slice(0, 3)}
          renderItem={renderGridItem}
          showDivider={false}
          onCTAPress={() => onCTAPress("Health")}
        />

        <Panel
          title={"Science"}
          data={science.articles.slice(0, 5)}
          renderItem={renderDefaultItem}
          onCTAPress={() => onCTAPress("Science")}
        />

        <Panel
          title={"Sports"}
          data={sports.articles.slice(0, 5)}
          renderItem={renderSportItem}
          onCTAPress={() => onCTAPress("Sports")}
        />

        <Panel
          cols={1}
          title={"Technology"}
          data={technology.articles.slice(0, 3)}
          renderItem={renderTechItem}
          showDivider={false}
          onCTAPress={() => onCTAPress("Technology")}
        />
      </ScrollView>
      {/* <View style={styles.button}> */}
        <Button color='#E67E22' title="Sign Out" onPress={handleSignOut} />
      {/* </View> */}
    </>
  );
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        color: 'red'
    }
  });

DashBoard.navigationOptions = ({}) => {
  return { title: `XcidicNews` };
};

