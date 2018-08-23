/*
* @Author: Star
* @Date:   2018-08-22 11:13:11
* @Last Modified by:   Star
* @Last Modified time: 2018-08-22 11:19:26
*/

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

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
		g_tk: 1664029744,
	})

	return jsonp(url, data, options)
}