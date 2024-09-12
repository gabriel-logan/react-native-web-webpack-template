import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Text style={styles.subTitle}>React Native Web</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      <Text>
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
  },
  subTitle: {
    fontSize: 20,
  },
  paragraph: {
    fontSize: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default App;
