/**
 * utility function
 * @type {{}}
 */
const util = {}

/**
 * /school/detail/1 => school_detail_id
 * /subject/1/reply => subject_id_reply
 * @param api
 */
util.replaceId = (api) => {
  return api.replace(/\/\d+/, '_id')
  .replace(/\//g,'_')
}

export default util
