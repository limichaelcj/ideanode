//gets the client's cursor position for use in render or other actions

export const saveClientXY = (x,y) => {
  return {
    type: "SAVE_CLIENT_XY",
    payload: {
      x: x,
      y: y
    }
  }
}
