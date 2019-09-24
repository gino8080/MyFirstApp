
import moment from "moment";

const defaultFormat = "DD/MM/YYYY HH:mm";

const formatDate = (date, format = defaultFormat) => {
  return moment(date).format(format);
}



export {
  formatDate,
  moment
}
