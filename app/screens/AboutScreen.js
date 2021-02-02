import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AboutScreen = ({ route }) => {
  const { name, img } = route.params;
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
            uri: img,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontSize: 25 }}>{name}</Text>
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
