/*
* @Author: Star
* @Date:   2018-08-05 10:28:34
* @Last Modified by:   Star
* @Last Modified time: 2018-09-14 20:21:12
*/

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'
import axios from 'axios'


export function getRecommend () {

	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})

	return jsonp(url, data, options)

}

export function getDiscList() {
	// const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
	const url = '/api/getDiscList'

	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		rnd: Math.random(),
		format: 'json'
	})

	return axios.get(url, {
	  params: data
	}).then((res) => {
	  return Promise.resolve(res.data)
	})
}


// 获取歌单列表
export function getSongList (disstid) {
	const url = '/api/getSongList'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		format: 'json',
		notice: 0,
		needNewCode: 1,
		new_format: 1,
		pic: 500,
		disstid: disstid,
		type: 1,
		json: 1,
		utf8: 1,
		onlysong: 0,
		picmid: 1,
		nosign: 1,
		song_begin: 0,
		platform: 'h5',
		song_num: 100,
		_: +new Date()
	})


	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}