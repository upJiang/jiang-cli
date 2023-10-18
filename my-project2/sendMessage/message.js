// 发送企业微信消息
const schedule = require("node-schedule"); //定时器任务库
const axios = require("axios");

function setMessage() {
  axios
    .post(
      "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=40e3ea82-9361-464d-b177-e61707aafa9f",
      {
        msgtype: "news",
        news: {
          articles: [
            {
              title: "美居前端学习资金收款通知~",
              description: "请点击图片扫码支付学习资金20元",
              url: "https://jiang-1252717891.cos.ap-guangzhou.myqcloud.com/jiangCode.png",
              picurl:
                "https://jiang-1252717891.cos.ap-guangzhou.myqcloud.com/jiangCode.png",
            },
          ],
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

console.log("开始等待目标时刻...");
let j = schedule.scheduleJob("1 1 10 5 * *", function () {
  console.log("执行任务");
  setMessage();
});
