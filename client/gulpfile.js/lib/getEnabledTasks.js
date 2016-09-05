var config = require('../config')
var compact = require('lodash/compact')

// Grouped by what can run in parallel
var assetTasks = ['images']
var codeTasks = ['html', 'css', 'js', 'fonts']

module.exports = function (env) {
  var jsTasks = {
    watch: 'webpack:watch',
    development: 'webpack:watch',
    production: 'webpack:production'
  }

  var matchFilter = function (task) {
    if (config.tasks[task] && task === 'js') {
      return jsTasks[env] || jsTasks.watch
    }
    return task
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  }
}
