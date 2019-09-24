import { AsyncStorage } from "react-native"

const PREFIX = "magico@"
const Storage = {

  set: (key, value) => {
    AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
  },

  get: async (key) => {
    return AsyncStorage.getItem(PREFIX + key).then(stringTodos => {
      return JSON.parse(stringTodos)
    });
  }

}
export default Storage;
