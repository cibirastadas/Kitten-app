import React, { useState, useEffect } from "react";
import color from "../config/color";
import { checkConnection } from "../components/Connection";
import NoConnection from "../components/NoConnection";
import KittenNames from "../components/KittensNames";
import CustomModal from "../components/CustomModal";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
  LogBox,
} from "react-native";

import AnimatedEllipsis from "react-native-animated-ellipsis";

const HomeScreen = ({ navigation }) => {
  const [inputAmmount, setInputAmmount] = useState("");
  const [chosenAmmount, setChosenAmmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false);
  const [kittens, setKittens] = useState([
    {
      key: "0",
      img: "",
      name: "",
    },
  ]);

  const fetchKittensData = () => {
    const newArray = [...Array(chosenAmmount)].map((a, index) => {
      return {
        key: String(index),
        img: `http://placekitten.com/g/${randomKittenPicture()}/${randomKittenPicture()}`,
        name: randomKittenName(),
      };
    });
    setKittens(newArray);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    checkConnection().then((res) => {
      setConnectStatus(res);
    });
    setLoading(true);
    fetchKittensData();
    setLoading(false);
  }, [chosenAmmount]);

  const randomKittenPicture = () => {
    return Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  };

  const randomKittenName = () => {
    var kittensNames = KittenNames;
    return kittensNames[Math.floor(Math.random() * kittensNames.length)];
  };

  const handleAmmount = (text) => {
    setInputAmmount(text);
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    setChosenAmmount(Number(inputAmmount));
  };

  const Item = ({ item }) => (
    <View style={styles.imageBox}>
      <View style={{ width: "100%", height: 300 }}>
        <TouchableHighlight
          style={{}}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() =>
            navigation.navigate("About", {
              name: item.name,
              img: item.img,
            })
          }
        >
          <Image
            source={{
              uri: item.img,
              width: "100%",
              height: "100%",
              resizeMode: "stretch",
            }}
          />
        </TouchableHighlight>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          letterSpacing: 5,
          paddingTop: 10,
        }}
      >
        {item.name}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return loading && connectStatus ? (
    <View style={{ alignItems: "center" }}>
      <AnimatedEllipsis style={{ ...styles.loadingScreen }} />
    </View>
  ) : !connectStatus ? (
    <NoConnection />
  ) : (
    <View style={{ flex: 1, alignItems: "center" }}>
      <CustomModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        handleAmmount={handleAmmount}
        inputAmmount={inputAmmount}
      />
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Choose the amount of kitten</Text>
      </TouchableHighlight>
      <FlatList
        style={{ flex: 1, width: "95%" }}
        data={kittens}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  loadingScreen: {
    top: 50,
    fontSize: 72,
  },
  openButton: {
    backgroundColor: color.primary,
    padding: 15,
    elevation: 2,
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageBox: {
    width: "100%",
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
