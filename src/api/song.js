/*
* @Author: Star
* @Date:   2018-09-08 19:55:41
* @Last Modified by:   Star
* @Last Modified time: 2018-09-14 19:59:02
*/

import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
	const url = 'api/lyric'

	const data = Object.assign({}, commonParams, {
		songmid: mid,
		pcachetime: + new Date(),
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		g_tk: 1151954904,
		format: 'json'
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})

}

