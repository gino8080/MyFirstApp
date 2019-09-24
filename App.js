import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableHighlight, FlatList } from 'react-native';
import ListItem from "./components/ListItem";
import { Logs } from 'expo';
import { stubTodos } from "./data/todos";

import ModalDatePicker from "react-native-modal-datetime-picker";

if (__DEV__) {
  // https://github.com/expo/expo/issues/2623#issuecomment-441364587
  const isRemoteDebuggingEnabled = typeof atob !== 'undefined';
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }

  console.disableYellowBox = true;
}

export default function App() {

  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState(stubTodos);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(undefined);

  const handleTextChange = (newText) => {
    console.log("ecco il", "newText", newText)
    setText(newText)
  }

  const addNewTodo = () => {
    if (text.length === 0) return;

    console.log("addNewTodo")
    const newTodos = [...todos, createTodo()];
    //newTodos.push(text);
    setTodos(newTodos);
    console.log("todos", todos);

    setText("");
    setSelectedDate(undefined)
  }

  const createTodo = () => {
    return {
      id: Math.random().toString(),
      date: selectedDate || new Date(),
      text: text,
      done: false
    }
  }

  const removeTodo = (index) => {
    console.log("removeTodo", index)
    const _todos = [...todos];
    _todos.splice(index, 1);

    setTodos(_todos);

  }

  const changeStatus = (index) => {
    console.log("changeStatus", index);

    const _todos = [...todos];
    _todos[index].done = !_todos[index].done;
    setTodos(_todos);

  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "row", width: "100%", borderColor: "green", borderWidth: 3 }}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder="Scrivi il tuo todo.."
          //onChangeText={(newText) => { handleTextChange(newText) }}
          enablesReturnKeyAutomatically
          returnKeyType="done"
          returnKeyLabel="Add"
          onChangeText={handleTextChange}
          onSubmitEditing={addNewTodo}
        />

        <Button title="Data" onPress={() => setShowCalendar(true)}></Button>
      </View>

      <Button disabled={text.length === 0} title="Add" onPress={addNewTodo}></Button>

      <View style={{ flex: 1, width: "100%" }}>

        <FlatList
          style={styles.bordered}
          data={todos}
          keyExtractor={(item, index) => `todo-${item.id}`}
          renderItem={
            ({ item, index }) => {
              //debugger;
              return (<ListItem
                index={index}
                todo={item}
                onClickedItem={removeTodo}
                onChangeStatus={changeStatus}
              />)
            }}
        />

      </View>

      <ModalDatePicker
        isVisible={showCalendar}
        onCancel={() => setShowCalendar(false)}
        onConfirm={(date) => {
          console.log("onConfirm", date);
          setSelectedDate(date)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderColor: "red",
    borderWidth: 1

  },
  bordered: {

    borderWidth: 1
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    padding: 2,
    borderColor: "red",
    borderWidth: 1
  }
});
