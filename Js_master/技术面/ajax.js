/*
 * @Author: AlanGolphi
 * @Date: 2021-07-30 17:19:45
 * @LastEditTime: 2021-07-31 17:59:21
 */

/**
 * 使用 XMLHttpRequest() 进行模拟 GET 请求
 */
const XHR = new XMLHttpRequest();
XHR.open('GET', '/API/data.json', true);// true 表示异步请求函数
XHR.onreadystatechange = function () {
  if (XHR.readyState === 4) {
    if (XHR.status === 200) {
      console.log(
        JSON.parse(XHR.responseText);// 将获取的 JSON 数据解构
      )
    } else {
      console.log('其他情况');
    }
  }
}
XHR.send(null);


/**
 * 使用 XMLHttpRequest() 进行模拟 POST 请求
 */

const XHR = XMLHttpRequest();
XHR.open('POST', '/login', true);
XHR.onreadystatechange = function () {
  if (XHR.readyState === 4) {
    if (XHR.status === 200) {
      console.log(
        JSON.parse(XHR.responseText);
      )
    } else {
      console.log('missing error');
    }
  }
}

const userData = {
  userName: 'zhangsan',
  password: 'xxxxxxxx',
}

XHR.send(JSON.stringify(userData));// 将数据转换为 JSON 字符串进行网络发送