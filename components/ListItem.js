import React from "react";
import { View, StyleSheet, Switch, TouchableOpacity, Platform } from "react-native";
import { formatDate } from "./helpers"
import { Container, Button, Header, Content, List, ListItem as ListIt, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';

const ListItem = ({ index, todo, onClickedItem, onChangeStatus }) => {

  onClickedList = () => {
    if (onClickedItem) {
      onClickedItem(index)
    }
  }

  return (
    <ListIt avatar>
      <Left>
        <TouchableOpacity onPress={() => onChangeStatus(index)}>
          {
            todo.done ?
              <Icon name="checkmark-circle-outline" style={{ ...styles.icon, color: "green" }} />
              :
              <Icon name="radio-button-off" style={styles.icon} />
          }</TouchableOpacity>
      </Left>
      <Body>
        <Text>{todo.text}</Text>
        <Text note> {formatDate(todo.date)}</Text>
      </Body>
      <Right>
        <Icon name="remove-circle" onPress={onClickedList}
          style={[styles.icon, { color: "#888" }]} />
      </Right>
    </ListIt>)

}

const styles = StyleSheet.create({
  icon: {
    fontSize: Platform.OS === "android" ? 30 : 25,
    width: 25
  }
})


export default ListItem;
