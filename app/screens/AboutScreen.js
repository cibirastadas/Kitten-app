import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import color from "../config/color";

const AboutScreen = ({ navigation, route }) => {
  const { kittenName } = route.params;
  var loremIpsum = require("lorem-ipsum-react-native");
  var output = loremIpsum({
    count: 5,
    units: "sentences",
  });
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%", height: 300 }}>
        <Image
          source={{
            uri: "http://placekitten.com/g/350/300",
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontSize: 25 }}>{kittenName}</Text>
        <Text
          style={{ fontSize: 15, paddingVertical: 10, paddingHorizontal: 7 }}
        >
          {output}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutScreen;
