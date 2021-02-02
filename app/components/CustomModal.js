import React from "react";
import color from "../config/color";
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
const CustomModal = ({
  modalVisible,
  handleModalVisible,
  handleAmmount,
  inputAmmount,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ ...styles.modalText }}>Ammount</Text>
          <TextInput
            placeholder="Enter ammount of kittens"
            style={{
              height: 40,
              padding: 10,
              borderColor: "gray",
              borderWidth: 2,
            }}
            onChangeText={(text) => handleAmmount(text)}
            keyboardType="numeric"
            maxLength={3}
            value={String(inputAmmount)}
          />
          <TouchableHighlight
            style={styles.hideModal}
            onPress={handleModalVisible}
          >
            <Text style={styles.textStyle}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hideModal: {
    backgroundColor: color.primary,
    marginTop: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
});
export default CustomModal;
