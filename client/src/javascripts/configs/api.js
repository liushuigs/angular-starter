/**
 * api configuration
 * if the key includes a `:id`, it will be used for POST/DELETE method,
 * otherwise it should be used for GET method
 */
const apis =  {
  'user': 'users',
  'user.me': 'users/me',
  'user.id': 'users/:id',
}

/**
 * return the api path by providing its name and optional id
 * @param name {string}
 * @param id {number}
 * @returns {string}
 */
const api = (name, id) => {
  return apis[name].replace(':id', id)
}

export default api
