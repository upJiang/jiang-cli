const nodemailer = require("nodemailer"); //发送邮件的node插件
const ejs = require("ejs"); //ejs模版引擎
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置
const schedule = require("node-schedule"); //定时器任务库
//配置项

//发送者邮箱厂家
let EmianService = "163";
//发送者邮箱账户SMTP授权码
let EamilAuth = {
  user: "j530274949@163.com",
  pass: "j530274949",
};
//发送者昵称与邮箱地址
let EmailFrom = '"江俊锋" <j530274949@163.com>';

//接收者邮箱地
let EmailTo = "530274949@qq.com";
//邮件主题
let EmailSubject = "美居前端学习资金收款通知！";

// 发动邮件
function sendMail(HtmlData) {
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, "meiju.ejs"), "utf8")
  );
  const html = template(HtmlData);

  let transporter = nodemailer.createTransport({
    service: EmianService,
    port: 465,
    secureConnection: true,
    auth: EamilAuth,
  });

  let mailOptions = {
    from: EmailFrom,
    to: EmailTo,
    subject: EmailSubject,
    html: html,
  };
  transporter.sendMail(mailOptions, (error, info = {}) => {
    if (error) {
      console.log(error);
      sendMail(HtmlData); //再次发送
    }
    console.log("邮件发送成功", info.messageId);
    console.log("静等下一次发送");
  });
}

// 聚合
function getAllDataAndSendMail() {
  // 这里可以写上一些变量，在模板上可以直接使用
  // 比如加载天气啊，生日啊啥的
  let HtmlData = {};
  sendMail(HtmlData);
}

console.log("NodeMail: 开始等待目标时刻...");
let j = schedule.scheduleJob("1 1 10 5 * *", function () {
  console.log("执行任务");
  getAllDataAndSendMail();
});
