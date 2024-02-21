import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // console.log("esto es fetchData+++++2", fetchData);
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://localhost:8080/item/1");
    const data = await response.json();
    console.log("voy aca ", fetchData);
    setItems(data);
  }

  // console.log("esto es fetchData+++++", fetchData);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ items }) => (
            <Text>
              <Task {...items} />
            </Text>
          )}
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}
/* <Text>{JSON.stringify(items, null, 2)}</Text> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
  contentContainerStyle: {
    padding: 15,
  },
});
