/*
* @Author: Star
* @Date:   2018-08-24 14:17:34
* @Last Modified by:   Star
* @Last Modified time: 2018-09-25 15:19:40
*/
import { playMode } from '@/common/js/config'
import { loadSearch, loadPlay, loadFavorite } from '@/common/js/cache'

const state = {
	singer: {},
	playing: false,
	fullScreen: false,
	// 当前播放列表
	playlist: [],
	sequenceList: [],
	// 播放没事
	mode: playMode.sequence,
	currentIndex: -1,
	// 歌单对象
	disc: {},
	topList: {},
	// 搜索历史
	searchHistory: loadSearch(),
	// 播放历史
	playHistory: loadPlay(),
	// 收藏列表
	favoriteList: loadFavorite()
}

export default state