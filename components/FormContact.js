import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import { ListItem } from "react-native-elements";

import HeaderContact from "./HeaderContact";

const FormContact = props => {
  const {
    firstName,
    lastName,
    age,
    photo,
    isEdit,
    isCreate,
    onChangeText,
    onPressAddPhoto,
  } = props;
  return (
    <>
      <HeaderContact
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        onPress={onPressAddPhoto}
        isCreate={isCreate}
        isEdit={isEdit}
      />
      {isEdit || isCreate ? (
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.textInput}
            value={firstName}
            placeholder="First name"
            underlineColorAndroid="transparent"
            onChangeText={text => onChangeText("firstName", text)}
          />
          <TextInput
            style={styles.textInput}
            value={lastName}
            placeholder="Last name"
            underlineColorAndroid="transparent"
            onChangeText={text => onChangeText("lastName", text)}
          />
          <TextInput
            style={styles.textInput}
            value={age}
            placeholder="Age"
            underlineColorAndroid="transparent"
            onChangeText={text => onChangeText("age", text)}
          />
        </View>
      ) : (
        <>
          <ListItem title="Age" subtitle={age} bottomDivider />
        </>
      )}
    </>
  );
};

FormContact.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool,
  onChangeText: PropTypes.func,
  onPressAddPhoto: PropTypes.func,
};

FormContact.defaultProps = {
  firstName: "",
  lastName: "",
  age: "",
  photo: "N/A",
  isEdit: false,
  isCreate: false,
};

export default FormContact;

const styles = StyleSheet.create({
  wrapperInput: {
    paddingHorizontal: 8,
  },
  textInput: {
    paddingVertical: 8,
    borderBottomColor: "#CED0CE",
    borderBottomWidth: 0.5,
  },
});
