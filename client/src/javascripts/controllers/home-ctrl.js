class HomeCtrl {
  constructor(userService) {
    this.userService = userService
    this.init()
  }

  init() {
    this.users = []
    this.userService.getUsers().then((data) => {
      this.users = data
    })
  }
}
HomeCtrl.$inject = [
  'userService',
]

export default HomeCtrl
