import util from './util.js'
/**
 * ajax wrapper
 * @param $http
 * @param api
 * @param method
 * @param params
 * @param isMock
 * @returns {Promise.<T>}
 */
const fetch = ($http, api, method, params, useMock) => {
  if (useMock) {
    const url = 'schema/' + util.replaceId(api) + '_' + method.toLowerCase() + '.json'
    return $http({
      url,
      method: 'GET',
      params
    }).then((response) => {
      return response.data.data
    })
  } else {
    const payload = {
      method,
      url: `api/${api}`
    }
    if (method === 'GET') {
      payload.params = params
    } else {
      payload.data = params
    }
    if (method === 'DELETE') {
      payload.headers = {'Content-Type': 'application/json'}
    }
    return $http(payload).then((response) => {
      return response.data.data
    })
  }
}

export default fetch
