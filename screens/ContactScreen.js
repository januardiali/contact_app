import * as React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";

import usePrevious from "../utils/usePrevious";

const ContactScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const prevIsFocused = usePrevious(isFocused);
  const getContact = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://simple-contact-crud.herokuapp.com/contact",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      let responseJson = await response.json();
      setContacts(responseJson.data);
      setLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };

  const renderItem = ({ item, index }) => {
    const name = item.firstName + " " + item.lastName;
    const titleAvatar =
      item.firstName.split("")[0].toUpperCase() +
      item.lastName.split("")[0].toUpperCase();
    return (
      <View>
        <ListItem
          key={index}
          leftAvatar={{
            source: { uri: item.photo },
            size: "small",
            title: titleAvatar,
          }}
          title={name}
          onPress={() => navigation.navigate("ContactDetail", { item })}
        />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  React.useEffect(() => {
    getContact();
  }, []);

  React.useEffect(() => {
    if (prevIsFocused !== isFocused && isFocused) {
      getContact();
    }
  }, [isFocused, prevIsFocused]);

  navigation.setOptions({
    title: "",
    headerRight: () => (
      <Button
        title="ADD"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("CreateContact");
        }}
        type="clear"
      />
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Contacts</Text>
      </View>
      {loading && (
        <View style={styles.wrapperLoading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  wrapperLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
