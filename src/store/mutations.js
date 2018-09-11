/*
* @Author: Star
* @Date:   2018-08-24 14:17:25
* @Last Modified by:   Star
* @Last Modified time: 2018-09-07 13:49:08
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
	}
}
export default mutations