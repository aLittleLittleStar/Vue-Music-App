function getRandomInt(min, max) {
  // 向下取整 Math.floor
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  /*副本*/
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
// 节流函数
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      // 清空时间
      clearTimeout(timer)
    }
    // 延时执行
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}