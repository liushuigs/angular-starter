function routing($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise('/school')

  $urlRouterProvider.when('', '/home')
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'home.html',
    controller: 'HomeCtrl as hc'
  })
}

routing.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
]

export default routing
