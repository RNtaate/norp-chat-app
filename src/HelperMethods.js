import moment from 'moment';
const getCurrentTime = () => {
  return moment().format('LT');
}

export default getCurrentTime;