//deletes node with the unique ID in state.node.ideas

export const deleteNode = (id) => {
  return {
    type: 'DELETE_NODE',
    payload: id
  }
}
