import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function checkMark({ id, completed, toggleItems }) {}

export default function Task({
  id,
  title,
  Shared_with_id,
  completed,
  //   clearItem,
  //   toggleItem,
}) {
  return (
    <TouchableOpacity>
      <View>
        <Text style={styles.text}></Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {},
  constainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subTitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100",
  },
});
