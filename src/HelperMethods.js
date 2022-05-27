const getCurrentTime = () => {
  return `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
}

export default getCurrentTime;