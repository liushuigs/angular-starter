class TopCtrl {
  constructor(userService) {
    this.userService = userService
    this.init()
  }

  init() {
    this.inited = false
    this.user = {}
    this.userService.get().then((data) => {
      this.user = this.userService.getUserInfo()
      this.inited = true
    }, () => {
      this.inited = true
    })
  }
}
TopCtrl.$inject = [
  'userService',
]

export default TopCtrl
