import moment from 'moment';

const CHATROOMS = ["JavaScript", "Python", "Ruby on Rails", "Java"]
const SOCKETLINK = "https://enigmatic-taiga-99914.herokuapp.com/";

const getCurrentTime = () => {
  return moment().format('LT');
}

export default getCurrentTime;
export {CHATROOMS, SOCKETLINK};