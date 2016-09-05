/**
 * truncate a text by binary length
 * @returns {Function}
 */
export default () => {
  return (str, len) => {
    if (!str) {
      return ''
    }
    const r = /[^\x00-\xff]/g
    if (str.replace(r, "mm").length <= len) {
      return str
    }
    const m = Math.floor(len / 2);
    for (let i = m; i < str.length; i++) {
      if (str.substr(0, i).replace(r, "mm").length >= len) {
        return str.substr(0, i) + "..."
      }
    }
    return str
  }
}