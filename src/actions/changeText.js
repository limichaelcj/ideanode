//updates store and display text while typing in edit mode

export const changeText = (id,head,body,foot) => {
  return {
    type: 'CHANGE_TEXT',
    payload: {
      id,
      head,
      body,
      foot
    }
  }
}
