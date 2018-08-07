// takes a string argument, mode

export const changeMode = (mode) => {
  return {
    type: 'CHANGE_MODE',
    payload: mode
  }
}
