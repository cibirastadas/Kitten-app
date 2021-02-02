import React from "react";
import { View, Text } from "react-native";

const NoConnection = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No internet connection... Try again</Text>
    </View>
  );
};

export default NoConnection;
