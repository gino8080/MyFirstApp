
import moment from "moment";
import React from "react";
import { Alert } from "react-native"
const defaultFormat = "DD/MM/YYYY HH:mm";

const formatDate = (date, format = defaultFormat) => {
  return moment(date).format(format);
}


const showAlert = ({ title = "Attenzione", message = "Sei sicuro?", onOk = () => { } }) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => onOk() },
    ],
    { cancelable: false }
  );
}

export {
  formatDate,
  showAlert,
  moment
}
