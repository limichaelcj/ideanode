//adds a new node to the nodeFile object
//uses the next unique ID in the store state
//this unique ID increments for every node created
//the unique ID is the nodeFile object key for the node
//this ID should be reduced upon save to make up for deleted node space

export const addNode = (id,x,y) => {
  return {
    type: 'ADD_NODE',
    payload: {
      id: id,
      dim: {
        x: x-50,
        y: y-50,
        h: 100,
        w: 100
      },
      text: {
        head: 'New Idea',
        body: 'Text',
        foot: id
      },
      input: [],
      output: []
    }
  }
}
