import * as React from "react";
import { Modal, ActivityIndicator, View, StyleSheet } from "react-native";

const ModalIndicator = props => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.closeModal}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.wrapper}>
        <View style={styles.body}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default ModalIndicator;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  body: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 5,
  },
});
