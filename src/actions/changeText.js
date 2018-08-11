//updates store and display text while typing in edit mode

export const changeText = (id,section,text) => {
  return {
    type: 'CHANGE_TEXT',
    payload: {
      id: id,
      section: section,
      text: text
    }
  }
}
