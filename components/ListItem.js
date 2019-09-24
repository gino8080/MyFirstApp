import React from "react";
import { View, Text, StyleSheet, Button, Switch } from "react-native";
import { formatDate } from "./helpers"

const ListItem = ({ index, todo, onClickedItem, onChangeStatus }) => {

  onClickedList = () => {
    if (onClickedItem) {
      onClickedItem(index)
    }
  }

  return (
    <View key={"item" + index} style={styles.item}>

      <View style={{ flex: 1 }} >
        <Text>{todo.done ? "Fatto!" : "Da fare"}</Text>
        <Switch
          value={todo.done}
          onValueChange={(done) => onChangeStatus(index)}
        //onValueChange={onChangeStatus}
        />
      </View>

      <View style={{ flex: 2 }}>
        <Text>{index} - {todo.text}</Text>
        <Text> {formatDate(todo.date)}</Text>
      </View>

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
