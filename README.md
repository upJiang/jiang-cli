本地调试：如果之前全局安装过 `jiang-cli` 的依赖，先把` nodejs\node_global` 相关的模块删除，然后执行 npm link

实现的功能：

- 通过 `jiang create <name>` 命令启动项目
- 询问用户需要选择需要下载的模板
- 远程拉取模板文件并下载到当前目录

[文档参考我的博客文章](https://blog.junfeng530.xyz/docs/%E5%89%8D%E7%AB%AF/%E5%B7%A5%E7%A8%8B%E5%8C%96/%E6%9E%84%E5%BB%BA%E8%84%9A%E6%89%8B%E6%9E%B6CLI.html)

## 发布

记得改版本号,通过各种验证后登录，然后发布即可

```
npm login

npm publish
```
