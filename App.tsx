import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Click me!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C3E8BD",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ADBDFF",
    padding: 5,
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 40,
  },
});

export default App;
