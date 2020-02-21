import * as React from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { ListItem, Button } from "react-native-elements";
import ModalIndicator from "../components/ModalIndicator";
import HeaderContact from "../components/HeaderContact";
import FormContact from "../components/FormContact";
import ModalAddPhoto from "../components/ModalAddPhoto";
import usePrevious from "../utils/usePrevious";

const ContactDetailScreen = ({ navigation, route }) => {
  const { params } = route;
  const [loading, setLoading] = React.useState(false);
  const [loadingEdit, setLoadingEdit] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [detail, setDetail] = React.useState({});
  const [input, setInput] = React.useState({});
  const [isShowAddPhoto, setIsShowAddPhoto] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [suggestionsPhoto, setSuggestionsPhoto] = React.useState([
    "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  ]);
  const [isValidPhoto, setIsValidPhoto] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState("N/A");

  const getDetailContact = async id => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://simple-contact-crud.herokuapp.com/contact/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      let responseJson = await response.json();
      setDetail(responseJson.data);
      setInput(responseJson.data);
      setLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };

  const onChangeText = (fieldName, value) => {
    setInput(prevInput => {
      return {
        ...prevInput,
        [fieldName]: value,
      };
    });
  };

  const onShowAlert = (type, message) => {
    Alert.alert(
      type,
      message,
      [
        {
          text: "OK",
          onPress: () => {
            if (isEdit) {
              setIsEdit(false);
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onSaveContact = async id => {
    setLoadingEdit(true);
    let body = {
      firstName: input.firstName,
      lastName: input.lastName,
      age: parseInt(input.age),
      photo: input.photo,
    };
    try {
      const response = await fetch(
        `https://simple-contact-crud.herokuapp.com/contact/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      let responseJson = await response.json();
      if (responseJson.statusCode === 400 || responseJson.statusCode === 500) {
        setLoadingEdit(false);
        onShowAlert("failed", responseJson.message);
      } else {
        setLoadingEdit(false);
        setDetail(responseJson.data);
        setInput(responseJson.data);
        onShowAlert("success", responseJson.message);
      }
    } catch (e) {
      onShowAlert("error", e);
    }
  };

  const onDeleteContact = async id => {
    console.log(id, "id");
    setLoadingEdit(true);
    let body = {
      firstName: input.firstName,
      lastName: input.lastName,
      age: parseInt(input.age),
      photo: input.photo,
    };
    try {
      const response = await fetch(
        `https://simple-contact-crud.herokuapp.com/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      let responseJson = await response.json();
      console.log(responseJson, "responseJson");
      if (responseJson.statusCode === 400 || responseJson.statusCode === 500) {
        setLoadingEdit(false);
        setTimeout(() => {
          onShowAlert("failed", responseJson.message);
        }, 1000);
      } else {
        setLoadingEdit(false);
        setTimeout(() => {
          onShowAlert("success", responseJson.message);
        }, 1000);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  //check detail not empty string
  React.useEffect(() => {
    if (
      input.firstName !== "" &&
      input.lastName !== "" &&
      input.age !== "" &&
      input.photo !== "N/A"
    ) {
      setIsValid(true);
    }
  }, [input]);

  //set valid photo and selected photo
  React.useEffect(() => {
    if (input.photo !== "N/A") {
      setSelectedPhoto(input.photo);
      setIsValidPhoto(true);
    }
  }, [input.photo]);

  //if have params.item call getDetail contact
  React.useEffect(() => {
    if (params.item) {
      getDetailContact(params.item.id);
    }
  }, [params.item]);

  navigation.setOptions({
    title: "",
    headerLeft: () => (
      <Button
        onPress={() => {
          if (isEdit) {
            setIsEdit(false);
          } else {
            navigation.goBack();
          }
        }}
        icon={
          !isEdit && {
            name: "chevron-left",
            size: 30,
          }
        }
        title={isEdit ? "Cancel" : ""}
        type="clear"
      />
    ),
    headerRight: () => {
      if (!isEdit) {
        return (
          <Button
            onPress={() => {
              setIsEdit(true);
              setInput(detail);
            }}
            title={"Edit"}
            type="clear"
          />
        );
      } else {
        return (
          <Button
            onPress={() => onSaveContact(params.item.id)}
            title={"Done"}
            type="clear"
            disabled={!isValid}
          />
        );
      }
    },
  });
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.wrapperLoading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {detail !== null && !loading && (
        <>
          <FormContact
            firstName={isEdit ? input.firstName : detail.firstName}
            lastName={isEdit ? input.lastName : detail.lastName}
            age={
              isEdit
                ? input.age && input.age.toString()
                : detail.age && detail.age.toString()
            }
            photo={isEdit ? input.photo : detail.photo}
            isEdit={isEdit}
            onPressAddPhoto={() => setIsShowAddPhoto(true)}
            onChangeText={onChangeText}
          />
          <ModalAddPhoto
            visible={isShowAddPhoto}
            onCancelPress={() => setIsShowAddPhoto(false)}
            onDonePress={() => {
              onChangeText("photo", selectedPhoto);
              setIsShowAddPhoto(false);
            }}
            validPhoto={isValidPhoto}
            photo={selectedPhoto}
            suggestionsPhoto={suggestionsPhoto}
            onSelectPhoto={suggestionPhoto => setSelectedPhoto(suggestionPhoto)}
          />
          {!isEdit && (
            <View style={styles.sectionBottom}>
              <Button
                title="Delete Contact"
                onPress={() => onDeleteContact(params.item.id)}
              />
            </View>
          )}
        </>
      )}
      <ModalIndicator
        visible={loadingEdit}
        closeModal={() => setLoadingEdit(false)}
      />
    </View>
  );
};

export default ContactDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapperLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBottom: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
