// import none
// this angular is for no-eslint-controlled directive
import 'angular'
// import all members
import controllers from './controllers'
import directives from './directives'
// import multiple members
// import single member
import register from './register'
import routing from './config.router'
import services from './services'
import templateCacheConfig from './configs/template-cache'
import filters from './filters'
import ngSanitize from 'angular-sanitize'
import uiRouter from 'angular-ui-router'
import 'angular-cookies'

const app = angular.module('app', [
  'ngCookies',
  uiRouter,
  ngSanitize
])

// services
for (const key in services) {
  app.service(key[0].toLowerCase() + key.slice(1), services[key])
}

// configs

// filters
for (const key in filters) {
  app.filter(key, filters[key])
}

// controllers
for (const key in controllers) {
  app.controller(key, controllers[key])
}

/* Directives */
/* We need to use something like register.js so our dependency injection works properly with ES6-style directives.
 http://stackoverflow.com/questions/28620479/using-es6-classes-as-angular-1-x-directives */
for (const key in directives) {
  const name = key[0].toLowerCase() + key.slice(1)
  register('app').directive(name, directives[key])
}

app.config(routing)
app.config(templateCacheConfig)