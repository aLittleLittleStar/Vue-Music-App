/*
* @Author: Star
* @Date:   2018-08-22 11:13:11
* @Last Modified by:   Star
* @Last Modified time: 2018-09-05 16:41:05
* @Last Modified time: 2018-09-03 13:54:32
*/

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

	const data = Object.assign( {}, commonParams, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pageszie: 100,
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		g_tk: 1664029744
	})

	return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

	const data = Object.assign({}, commonParams, {
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		begin: 0,
		num: 100,
		songstatus: 1,
		g_tk: 1664029744,
		singermid: singerId

	})

	return jsonp(url, data, options)
}