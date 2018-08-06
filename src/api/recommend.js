/*
* @Author: Star
* @Date:   2018-08-05 10:28:34
* @Last Modified by:   Star
* @Last Modified time: 2018-08-05 22:49:32
*/

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js' 


export function getRecommend () {


	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})

	return jsonp(url, data, options)
}