/*
* @Author: Star
* @Date:   2018-09-15 17:16:23
* @Last Modified by:   Star
* @Last Modified time: 2018-09-16 19:18:49
*/
// 搜索功能
// 


import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

/**
 * jsonp 抓取热门搜索数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
 * 提供方：https://m.y.qq.com/#search
 */

export function getHotKey() {
	const  url =  'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		needNewCode: 1,
		platform: 'h5'
	})

	return jsonp(url, data, options)
}

/**
 * jsonp 抓取搜索检索数据
 * 接口：https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
 * 提供方：https://m.y.qq.com/#search
 */


export function search(query, page, zhida, perpage) {
	// const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

	const url = 'api/search'

	const data = Object.assign({}, commonParams, {

		w: query,
		p: page,
		n: perpage,
		perpage,
		zhidaqu: 1,
		catZhida: zhida ? 1 : 0,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		uin: 0,
		platform: 'h5',
		uid: 0,
		needNewCode: 1,
		remoteplace: 'txt.mqq.all'

	})

	//	return jsonp(url, data, options)

	//使用ajax请求，这里用axios
	return axios.get(url, {
		params: data
	}).then((res) => {
		//	成功返回一个Promise对象
		return Promise.resolve(res.data)
	}).catch((error) => {
		console.log(error)
	})

}