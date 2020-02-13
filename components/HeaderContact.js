import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import PropTypes from "prop-types";

const HeaderContact = props => {
  const { firstName, lastName, photo, isEdit, isCreate, onPress } = props;
  return (
    <View style={styles.header}>
      <Avatar
        size="medium"
        rounded
        icon={{ name: "person" }}
        source={{ uri: photo }}
      />
      {isEdit || isCreate ? (
        <Button onPress={onPress} title="Add Photo" type="clear" />
      ) : (
        <Text>
          {firstName} {lastName}
        </Text>
      )}
    </View>
  );
};

HeaderContact.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool,
};
HeaderContact.defaultProps = {
  firstName: "",
  lastName: "",
  photo: "N/A",
  isEdit: false,
  isCreate: false,
};

export default HeaderContact;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    alignItems: "center",
    borderBottomColor: "#CED0CE",
    borderBottomWidth: 0.5,
  },
});
