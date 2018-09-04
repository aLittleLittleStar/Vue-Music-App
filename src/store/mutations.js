/*
* @Author: Star
* @Date:   2018-08-24 14:17:25
* @Last Modified by:   Star
* @Last Modified time: 2018-08-25 11:45:58
*/
import * as types from './mutation-types'

const matutaions = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	}
}

export default matutaions