/*
* @Author: Star
* @Date:   2018-09-14 21:14:42
* @Last Modified by:   Star
* @Last Modified time: 2018-09-15 16:01:39
*/
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

export function getTopList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		needNewCode: 1,
		platform: 'h5'
	})
	
	return jsonp(url, data, options)
}

export function getMusicList(topid) {
	const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg"

	const data = Object.assign({}, commonParams, {
		topid,
		needNewCode: 1,
		uin: 0,
		tpl: 3,
		page: 'detail',
		type: 'top',
		platform: 'h5'
	})
	
	return jsonp(url, data, options)
}