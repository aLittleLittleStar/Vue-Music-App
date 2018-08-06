// 引入jsonp
import originJsonp from 'jsonp'
// 对外暴露一个方法
// url 地址
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // 返回 resolve 表示成功 ， reject 表示失败
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      // 如果成功
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// data : 把 data 打拼到 url  上
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
