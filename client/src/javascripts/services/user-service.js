import BaseService from './base-service.js'
import api from '../configs/api.js'
import _ from 'lodash'

class UserService extends BaseService{
  constructor($http, $timeout) {
    super($http, $timeout)
    this.isMock = true
    this.init()
  }

  init() {
    this.userInfo = {}
  }

  get() {
    return this.fetch(api('user.me'), 'GET', {}).then((data) => {
      this.userInfo = data
    })
  }

  getUserInfo() {
    return this.userInfo
  }

  getById(userId) {
    return this.fetch(api('user.id', userId), 'GET', {})
  }

  getUsers() {
    return this.fetch(api('user'), 'GET')
  }

  isLogin() {
    return this.userInfo.name != ''
  }

  userId() {
    return this.userInfo.id
  }
}
UserService.$inject = [
  '$http',
  '$timeout',
  '$cookies'
]

export default UserService
