// 配置文件 关于播放模式的设置
export const playMode = {
	// 有序播放
  sequence: 0,
  // 循环播放
  loop: 1,
  // 随机播放 
  random: 2
}

const state = {
    mode:playMode.sequence,
}
export default state
