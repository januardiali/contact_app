import * as React from "react";
import { View, StyleSheet, Modal } from "react-native";
import PropTypes from "prop-types";
import { Avatar, Header, Text } from "react-native-elements";

import HeaderContact from "./HeaderContact";

const ModalAddPhoto = props => {
  const {
    visible,
    photo,
    validPhoto,
    suggestionsPhoto,
    onCancelPress,
    onDonePress,
    onSelectPhoto,
  } = props;
  return (
    <Modal visible={visible}>
      <>
        <Header
          placement="left"
          leftComponent={{
            icon: "chevron-left",
            text: "Cancel",
            onPress: onCancelPress,
          }}
          rightComponent={{
            text: "Done",
            onPress: onDonePress,
            disabled: validPhoto,
          }}
          containerStyle={{ backgroundColor: "#FFFFFF" }}
        />
        <HeaderContact photo={photo} />
        <View style={styles.wrapperSuggestion}>
          <Text style={styles.suggestionTitle}>Suggestions</Text>
          <View style={styles.suggestionList}>
            {suggestionsPhoto.map((suggestionPhoto, index) => {
              return (
                <Avatar
                  key={index.toString()}
                  size="small"
                  rounded
                  source={{ uri: suggestionPhoto }}
                  onPress={() => onSelectPhoto(suggestionPhoto)}
                  activeOpacity={0.7}
                  containerStyle={{ marginRight: 8 }}
                />
              );
            })}
          </View>
        </View>
      </>
    </Modal>
  );
};

ModalAddPhoto.propTypes = {
  visible: PropTypes.bool,
  photo: PropTypes.string,
  validPhoto: PropTypes.bool,
  suggestionsPhoto: PropTypes.arrayOf(PropTypes.string),
  onCancelPress: PropTypes.func,
  onDonePress: PropTypes.func,
  onSelectPhoto: PropTypes.func,
};

ModalAddPhoto.defaultProps = {
  visible: false,
  photo: "N/A",
  validPhoto: false,
  suggestionsPhoto: [],
};

export default ModalAddPhoto;

const styles = StyleSheet.create({
  wrapperSuggestion: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  suggestionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  suggestionList: {
    flexDirection: "row",
  },
});
