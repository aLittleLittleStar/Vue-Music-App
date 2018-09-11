/*
* @Author: Star
* @Date:   2018-08-24 14:16:10
* @Last Modified by:   Star
* @Last Modified time: 2018-09-07 21:45:19
*/
import * as types from './mutation-types'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'

function findIndex(list, song) {
	return list.findIndex(() => {
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