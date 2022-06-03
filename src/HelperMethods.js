import moment from 'moment';

const CHATROOMS = ["JavaScript", "Python", "Ruby on Rails", "Java"]

const getCurrentTime = () => {
  return moment().format('LT');
}

export default getCurrentTime;
export {CHATROOMS};