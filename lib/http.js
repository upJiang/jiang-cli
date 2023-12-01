// 通过 axios 处理请求
const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})


/**
 * 获取项目的所有的分支
 * @returns Promise
 */
async function getBranchList() {
  return axios.get('https://api.github.com/repos/upJiang/jiang-project-template/branches')
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/upJiang/${repo}/tags`)
}

module.exports = {
  getBranchList,
  getTagList
}