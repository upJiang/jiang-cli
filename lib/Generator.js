const ora = require('ora')
const inquirer = require('inquirer')
const util = require('util')
const path = require('path')
const chalk = require('chalk')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise

const { getBranchList } = require('./http')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  } 
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;

    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getBranch() {
    // 1）从远程拉取模板数据
    const branchList = await wrapLoading(getBranchList, 'waiting fetch template');

    if (!branchList) return;

    // 过滤我们需要的分支名称
    const branches = branchList.map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { branch } = await inquirer.prompt({
      name: 'branch',
      type: 'list',
      choices: branches,
      message: 'Please choose a template to create project'
    })

    // 3）return 用户选择的名称
    return branch;
  }


  // 核心创建逻辑
  // 1）获取模板（分支）名称
  // 2）下载模板到模板目录
  async create(){
    // 1）获取模板（分支）名称
    const branch = await this.getBranch()
    
    console.log(`用户选择了 ${branch} 分支`)
 
     // 3）下载分支代码
     await this.download(branch)
     
     // 4）模板使用提示
     console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
  }

    // 下载远程模板
  // 1）拼接下载地址
  // 2）调用下载方法
  async download(branch){

    // 1）拼接下载地址
    const requestUrl = `upJiang/jiang-project-template#${branch}`;

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }
}

module.exports = Generator;
