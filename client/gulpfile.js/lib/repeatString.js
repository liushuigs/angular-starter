module.exports = function (pattern, number) {
  var string = ''
  for (var i = 0; i < number; i++) {
    string += pattern
  }
  return string
}
