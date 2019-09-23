import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ListItem = ({ key, todo, onClickedItem }) => {

  onClickedList = () => {
    if (onClickedItem) {
      onClickedItem(key)
    }
  }

  return (
    <View key={"item" + key} style={styles.item}>
      <Text style={{ flex: 2 }} >{key} - {todo}</Text>
      <View style={{ flex: 1 }} >
        <Button title="rimuovi" onPress={onClickedList} />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
})


export default ListItem;
