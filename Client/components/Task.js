import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SharedItemModalContent from "./SharedItemModalContent";
import ItemModalContent from "./ItemModalContent";

function CheckMark({ id, completed, toggleItem }) {
  async function toggle() {
    const response = await fetch(
      `https://fa76-2800-484-387b-6600-3a32-3cb7-b11e-f335.ngrok-free.app/items/${id}`,
      {
        // headers: {
        //   "x-api-key": "abcdef123456",
        //   "Content-Type": "application/json",
        // },
        method: "PUT",
        body: JSON.stringify({
          value: completed ? false : true,
          // value: !completed,
        }),
      }
    );
    const data = await response.json();
    toggleItem(id, !completed);
    console.log("esto es data", data);
  }
  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    ></Pressable>
  );
}

export default function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearItem,
  toggleItem,
}) {
  const [isDeleteActive, setIsDeleteActive] = React.useState(false);
  const bottomSheetModalRef = React.useRef(null);
  const sharedBottomSheetRef = React.useRef(null);
  const snapPoints = ["25%", "48%", "75%"];
  const snapPointsShared = ["40%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function handlePresentShared() {
    sharedBottomSheetRef.current?.present();
  }

  async function deleteItem() {
    const response = await fetch(
      `https://fa76-2800-484-387b-6600-3a32-3cb7-b11e-f335.ngrok-free.app/items/${id}`,
      {
        headers: {
          "x-api-key": "abcdef123456",
        },
        method: "DELETE",
      }
    );
    // clearItem(id);
    // console.log(response.status);
    // if (response.ok) {
    //   clearItem(id);
    // }
    // console.log(response.status);
  }
  // }

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleItem={toggleItem} />
        <Text style={styles.text}>{title}</Text>
      </View>
      {shared_with_id !== null ? (
        <Feather
          onPress={handlePresentShared}
          name="users"
          size={20}
          color="#383839"
        />
      ) : (
        <Feather
          onPress={handlePresentModal}
          name="share"
          size={20}
          color="#383839"
        />
      )}
      {isDeleteActive && (
        <Pressable onPress={deleteItem} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
        </Pressable>
      )}
      {/* shared todos info */}
      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <SharedItemModalContent
          id={id}
          title={title}
          shared_with_id={shared_with_id}
          completed={completed}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <ItemModalContent id={id} title={title} />
      </BottomSheetModal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383839",
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
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
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});
