/*
* @Author: Star
* @Date:   2018-08-24 14:17:25
* @Last Modified by:   Star
* @Last Modified time: 2018-09-15 15:36:24
*/
import * as types from './mutation-types'

const mutations = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	},
	[types.SET_PLAYING_STATE](state, flag) {
		state.playing = flag
	},
	[types.SET_FULL_SCREEN](state, flag) {
		state.fullScreen = flag
	},
	[types.SET_PLAY_LIST](state, list) {
		state.playlist = list
	},
	[types.SET_SEQUENCE_LIST](state, list) {
		state.sequenceList = list
	},
	[types.SET_PLAY_MODE](state, mode) {
		state.mode = mode
	},
	[types.SET_CURRENT_INDEX](state, index) {
		state.currentIndex = index
	},
	[types.SET_DISC](state, disc) {
		state.disc = disc
	},
	[types.SET_TOP_LIST](state, topList) {
		state.topList = topList
	}
}
export default mutations