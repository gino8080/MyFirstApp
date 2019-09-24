import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import moment from "moment";

const ListItem = ({ index, todo, onClickedItem }) => {

  onClickedList = () => {
    if (onClickedItem) {
      onClickedItem(index)
    }
  }

  return (
    <View key={"item" + index} style={styles.item}>

      <View style={{ flex: 1 }} >
        { /* Semplice ternaria stampèo del testo*/}
        <Text>{todo.done ? "Fatto!" : "Da fare"}</Text>
        {
          /* Ternaria due diversi componenti  */
          todo.done ? <Text>FATTO!</Text> : <Text>NON FATTO</Text>
        }

        {
          /* Solo se si verifica ( true ) stampo il componente  */
          todo.done && <Text>FATTO!</Text>
        }

      </View>

      <View style={{ flex: 2 }}>
        <Text>{index} - {todo.text}</Text>
        <Text> {moment(todo.date).fromNow()}</Text>
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
