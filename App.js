import React from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { Button, Text, Container, Header, Footer, Content, Body, Title, Item, Label, Input, Icon } from "native-base";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ListItem from "./components/ListItem";
import { Logs, AppLoading } from 'expo';
import { stubTodos } from "./data/todos";
import { showAlert } from "./components/helpers";
import ModalDatePicker from "react-native-modal-datetime-picker";
import Storage from "./data/Storage";

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

  const [isReady, setIsReady] = React.useState(false);

  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState(undefined);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(undefined);


  //sostiuisce il vecchio ComponentDidMount + ComponentDidUpdate + ComponentWillUnmount

  React.useEffect(
    () => {
      console.log("UseEffect App.js");
      loadFonts();

    },
    []
  )

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    })

    setIsReady(true)
    setTimeout(getLocalTodos, 500)
  }

  const getLocalTodos = () => {
    Storage.get("todos")
      .then(_todos => {
        console.log("_todos", _todos);
        setTodos(_todos || [])
      })
      .catch(error => {
        console.error(error);
        setTodos([])
      })
      .finally(() => {
        console.log("Finally!")
      });
  }

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

    Storage.set("todos", newTodos)

    //reset fields
    setText("");
    setSelectedDate(undefined)
    setShowCalendar(false);
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

    showAlert({
      message: "Sei sicuro che vuoi cancellare il todo " + todos[index].text,
      onOk: () => {
        console.log("removeTodo", index)
        const _todos = [...todos];
        _todos.splice(index, 1);

        setTodos(_todos);
        Storage.set("todos", _todos)
      }

    })

  }

  const changeStatus = (index) => {
    console.log("changeStatus", index);

    const _todos = [...todos];
    _todos[index].done = !_todos[index].done;
    setTodos(_todos);

  }


  if (!isReady) {
    return <AppLoading />
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>ToDo App!</Title>
        </Body>
      </Header>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
        <Icon name={selectedDate ? "notifications" : "notifications-off"} active onPress={() => { setShowCalendar(true); }}
          style={{ margin: 10, color: selectedDate ? "yellow" : "grey" }} />
        <Item rounded style={{ flex: 1, marginHorizontal: 10 }}>
          <Input value={text}
            clearButtonMode="always"
            placeholder="Scrivi il tuo todo.."
            //onChangeText={(newText) => { handleTextChange(newText) }}
            enablesReturnKeyAutomatically
            returnKeyType="done"
            returnKeyLabel="Add"
            onChangeText={handleTextChange}
            onSubmitEditing={addNewTodo} />

        </Item>
        <Icon name="add-circle" active style={{ margin: 10, color: text.length === 0 ? "grey" : "blue" }} onPress={addNewTodo} />
      </View>

      <Content scrollEnabled={true}>
        {
          !todos ?
            <ActivityIndicator color="orange" size="large" />
            :
            <FlatList
              //style={styles.bordered}
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
        }



      </Content>

      <ModalDatePicker
        isVisible={showCalendar}
        onCancel={() => setShowCalendar(false)}
        onConfirm={(date) => {
          console.log("onConfirm", date);
          setSelectedDate(date);
          setShowCalendar(false);
        }}
      />
    </Container>
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
