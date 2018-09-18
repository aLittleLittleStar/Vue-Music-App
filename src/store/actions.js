/*
* @Author: Star
* @Date:   2018-08-24 14:16:10
* @Last Modified by:   Star
* @Last Modified time: 2018-09-18 12:14:48
*/
import * as types from './mutation-types'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'
import { saveSearch, deleteSearch, clearSearch } from '@/common/js/cache'

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export const selectPlay = function ({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	if(state.mode === playMode.random) {
		let randomLsit = shuffle(list)
		commit(types.SET_PLAY_LIST, randomList)
		index = findIndex(randomList, list[index])
	} else {
		commit(types.SET_PLAY_LIST, list)
	}
	commit(types.SET_PLAY_LIST, list)
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)

}

export const randomPlay = function ({commit}, {list}) {
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	let randomLsit = shuffle(list)
	commit(types.SET_PLAY_LIST, randomList)
	commit(types.SET_CURRENT_INDEX, 0)
}

export const insertSong = function ({commit, state}, song ){
	// 返回playlist的副本，进而对副本进行操作
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex

	// 记录当前歌曲
	let currentSong = playlist[currentIndex]
	// let currentSong = playlist[currentIndex]
	// 查找当前列表中是否有待插入的歌曲，并返回其索引
	let fpIndex = findIndex(playlist, song)
	// 因为啥插入歌曲所以要加一
	currentIndex++

	//插入这首歌到当前索引的位置 
	playlist.splice(currentIndex, 0, song)
	// 如果已经包含了这首歌
	if (fpIndex > -1) {
		// 如果当前插入的序号大于列表中的序号
		if(currentIndex > fpIndex) {
			// 删除一
			playlist.splice(fpIndex, 1)
			currentIndex --
		} else {
			// 增加一
			playlist.splice(fpIndex + 1, 1)
		}
	}

	let currentSIndex = findIndex(sequenceList, currentSong) + 1

	let fsIndex = findIndex(sequenceList, song)

	sequenceList.splice(currentSIndex, 0, song)

	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}

	commit(types.SET_PLAY_LIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)

}

// 保存搜索历史

export const saveSearchHistory = function ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
// 删除一条搜索历史
export const delectSearchHistory = function ({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
// 清空搜索历史
export const clearSearchHistory = function ({commit}) {
	commit(types.SET_SEARCH_HISTORY, clearSearch())
}
