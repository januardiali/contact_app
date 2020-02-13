import * as React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ContactScreen from "../screens/ContactScreen";
import CreateContactScreen from "../screens/CreateContactScreen";
import ContactDetailScreen from "../screens/ContactDetailScreen";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "Contact";

export default function StackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator mode="modal" initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: "",
          headerRight: props => (
            <Button
              title="ADD"
              onPress={() => {
                // Pass params back to home screen
                navigation.navigate("CreateContact");
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="CreateContact" component={CreateContactScreen} />
      <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
    </Stack.Navigator>
  );
}
