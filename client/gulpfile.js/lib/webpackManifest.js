var path = require('path')
var fs = require('fs')

module.exports = function (publicPath, dest, filenameParam) {
  var filename = filenameParam || 'rev-manifest.json'

  return function () {
    this.plugin('done', function (stats) {
      var statsObj = stats.toJson()
      var chunks = statsObj.assetsByChunkName
      var manifest = {}

      for (var key in chunks) {
        if (!chunks.hasOwnProperty(key)) {
          continue
        }

        var originalFilename = key + '.js'
        manifest[path.join(publicPath, originalFilename)] = path.join(publicPath, chunks[key])
      }

      fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest)
      )
    })
  }
}
