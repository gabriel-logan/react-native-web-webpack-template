import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button
        title="Go to Notifications"
        onPress={() => {
          navigation.navigate("Notifications" as never);
        }}
      />
    </View>
  );
}

function Notifications() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile" as never);
        }}
      />
    </View>
  );
}

function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.navigate("Settings" as never);
        }}
      />
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Text style={styles.subTitle}>React Native Web</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      <Text style={styles.createdBy}>
        Created by:{" "}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/gabriel-logan");
          }}
        >
          <Text style={styles.link}>Gabriel Logan</Text>
        </TouchableOpacity>{" "}
        using{" "}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://necolas.github.io/react-native-web/");
          }}
        >
          <Text style={styles.link}>React Native Web</Text>
        </TouchableOpacity>
        , Webpack and TypeScript
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ADBDFF",
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    color: "blue",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    color: "green",
  },
  paragraph: {
    fontSize: 16,
    color: "black",
  },
  createdBy: {
    color: "black",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
