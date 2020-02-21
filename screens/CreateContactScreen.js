import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
  Toas,
} from "react-native";
import { Avatar, Button, Header } from "react-native-elements";
import ModalIndicator from "../components/ModalIndicator";
import ModalAddPhoto from "../components/ModalAddPhoto";
import FormContact from "../components/FormContact";

const CreateContactScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [photo, setPhoto] = React.useState("N/A");
  const [valid, setValid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isShowAddPhoto, setIsShowAddPhoto] = React.useState(null);
  const [suggestionsPhoto, setSuggestionsPhoto] = React.useState([
    "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  ]);
  const [loading, setLoading] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState("N/A");
  const [validPhoto, setValidPhoto] = React.useState(false);

  const onShowAlert = (type, message) => {
    Alert.alert(
      type,
      message,
      [
        {
          text: "OK",
          onPress: () => {
            if (type === "success") {
              navigation.goBack();
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onSaveContact = async () => {
    setLoading(true);
    let body = {
      firstName,
      lastName,
      age: parseInt(age),
      photo,
    };
    try {
      const response = await fetch(
        "https://simple-contact-crud.herokuapp.com/contact",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      let responseJson = await response.json();
      if (responseJson.statusCode === 400 || responseJson.statusCode === 500) {
        setLoading(false);
        onShowAlert("failed", responseJson.message);
      } else {
        setLoading(false);
        onShowAlert("success", responseJson.message);
      }
    } catch (e) {
      onShowAlert("error", e);
    }
  };

  const onChangeText = (fieldName, value) => {
    switch (fieldName) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "age":
        setAge(value);
        break;
    }
  };

  navigation.setOptions({
    title: "New Contact",
    headerLeft: () => (
      <Button onPress={() => navigation.goBack()} title="Cancel" type="clear" />
    ),
    headerRight: () => (
      <Button
        onPress={onSaveContact}
        title="Done"
        type="clear"
        disabled={!valid}
      />
    ),
  });

  //set valid for save contact
  React.useEffect(() => {
    if (firstName !== "" && lastName !== "" && age !== "" && photo !== "N/A") {
      setValid(true);
    }
  }, [firstName, lastName, age, photo]);

  //set selected photo with first item when open modal
  React.useEffect(() => {
    if (isShowAddPhoto && suggestionsPhoto.length > 0) {
      setSelectedPhoto(suggestionsPhoto[0]);
    }
  }, [suggestionsPhoto, isShowAddPhoto]);

  //set valid photo
  React.useEffect(() => {
    if (selectedPhoto !== "N/A") {
      setValidPhoto(true);
    }
  }, [selectedPhoto]);
  return (
    <View style={styles.container}>
      <FormContact
        firstName={firstName}
        lastName={lastName}
        age={age}
        photo={photo}
        isCreate={true}
        onPressAddPhoto={() => setIsShowAddPhoto(true)}
        onChangeText={onChangeText}
      />
      <ModalAddPhoto
        visible={isShowAddPhoto}
        onCancelPress={() => setIsShowAddPhoto(false)}
        onDonePress={() => {
          setPhoto(selectedPhoto), setIsShowAddPhoto(false);
        }}
        validPhoto={validPhoto}
        photo={selectedPhoto}
        suggestionsPhoto={suggestionsPhoto}
        onSelectPhoto={suggestionPhoto => setSelectedPhoto(suggestionPhoto)}
      />
      <ModalIndicator visible={loading} closeModal={() => setLoading(false)} />
    </View>
  );
};

export default CreateContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listHeader: {
    paddingVertical: 8,
    alignItems: "center",
    borderBottomColor: "#CED0CE",
    borderBottomWidth: 0.5,
  },
  listHeaderText: {
    fontSize: 24,
  },
  listHeaderSearch: {
    flexDirection: "row",
    backgroundColor: "#CED0CE",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  listHeaderIcon: {
    marginRight: 8,
  },
  headerTextInput: {
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%",
  },
  wrapperInput: {
    paddingHorizontal: 8,
  },
  textInput: {
    paddingVertical: 8,
    borderBottomColor: "#CED0CE",
    borderBottomWidth: 0.5,
  },
});
