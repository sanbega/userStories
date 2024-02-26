import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function fetchData() {
    try {
      // const response = await fetch("http://localhost:8080/item/1");
      // const response = await fetch("");
      const response = await fetch(
        "https://fa76-2800-484-387b-6600-3a32-3cb7-b11e-f335.ngrok-free.app/item/1"
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function clearItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function toggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: item.completed === 1 ? 0 : 1 }
          : item
      )
    );
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Task {...item} toggleItem={toggleItem} clearItem={clearItem} />
            )}
            ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </SafeAreaView>
        <StatusBar style="auto" />
      </View>
    </BottomSheetModalProvider>
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
