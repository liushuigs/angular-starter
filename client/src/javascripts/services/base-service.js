import fetch from '../modules/fetch.js'
import _ from 'lodash'

class BaseService {
  constructor($http, $timeout) {
    this.$http = $http
    this.$timeout = $timeout
    this.isMock = false
  }

  fetch(api, method, params, isMock) {
    // use service customized isMock first
    const useMock = _.isBoolean(isMock) ? isMock : this.isMock
    return fetch(this.$http, api, method, params, useMock)
  }
}

export default BaseService
