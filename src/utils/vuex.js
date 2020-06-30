export const set = property => (state, payload) => (state[property] = payload)
// toggle property
export const toggle = property => state => (state[property] = !state[property])
// add to an array
export const add = property => (state, payload) => (state[property].push(payload))
// get
export const get = property => (state, payload) => (state[property].filter(item => item[payload] === payload))
// delete in array
// export const del = property => (state, payload) => (state[property].filter(item => item.id !== payload))
export const del = property => (state, payload) => {
  let pos = _.findIndex(state[property], { 'id': payload })
  // console.log('pos', pos)
  state[property].splice(pos, 1)
}
