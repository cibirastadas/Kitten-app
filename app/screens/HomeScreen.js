import React, { useState, useEffect } from "react";
import color from "../config/color";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
} from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import CustomModal from "../components/CustomModal";

const HomeScreen = ({ navigation }) => {
  const [ammount, setAmmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [kittens, setKittens] = useState([]);

  const fetchData = async () => {
    fetch("http://placekitten.com/g/200/300")
      .then((response) => response.blob())
      .then(async (blob) => {
        let reader = new FileReader();
        reader.onload = () => {
          setKittens(reader.result);
        };
        const x = reader.readAsDataURL(blob);
        console.log(x);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const handleAmmount = (text) => {
    setAmmount(text);
  };
  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    //Apply ammount to data
  };
  const Item = ({ name }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() =>
        navigation.navigate("About", {
          kittenName: name,
        })
      }
    >
      <Image
        resizeMode="contain"
        source={{
          uri: "http://placekitten.com/g/350/300",
          width: "100%",
          height: 300,
        }}
      />
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => <Item name={item.name} />;

  return loading ? (
    <View style={{ alignItems: "center" }}>
      <AnimatedEllipsis style={{ ...styles.loadingScreen }} />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center" }}>
      <CustomModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        handleAmmount={handleAmmount}
        ammount={ammount}
      />
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Choose the amount of kitten</Text>
      </TouchableHighlight>
      <View style={styles.imageBox}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() =>
            navigation.navigate("About", {
              kittenName: "Kitten Name",
            })
          }
        >
          <Image
            resizeMode="contain"
            source={{
              uri: "http://placekitten.com/g/350/300",
              width: "100%",
              height: 300,
            }}
          />
        </TouchableHighlight>
        {/*         <FlatList
    initialNumToRender={ammount}
      data={kittens}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    /> */}
        <Text style={{ textAlign: "center", fontSize: 20 }}>Kitten name</Text>
      </View>
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
    width: "95%",
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
