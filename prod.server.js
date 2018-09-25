/*
* @Author: Star
* @Date:   2018-09-25 19:33:07
* @Last Modified by:   Star
* @Last Modified time: 2018-09-25 20:29:17
*/

var express = require('express')
var config = require('./config/index.js')
var axios = require('axios')


var port = process.env.PORT || config.build.port

var app = express()


app.get('/api/getDiscList', function (req, res) {
	let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
	axios.get(url, {
		headers: {
			referer: 'https://c.y.qq.com/',
			host: 'c.y.qq.com'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e.response)
	})
})

app.get('/api/getSongList', function (req, res) {
	var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
		host: 'c.y.qq.com'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

app.get('/api/search', function (req, res) {
	var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			host: 'c.y.qq.com'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

app.get('/api/lyric', function(req, res) {
	var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
	axios.get(url, {
		headers: {
			referer: 'https://c.y.qq.com',
			host: 'c.y.qq.com'
	},
		params: req.query
	}).then((response) => {
		var ret = response.data
		if (typeof ret === 'string') {
			// 正则 匹配
			var reg = /^\w+\(({[^()]+})\)$/
			// 
			var matches = ret.match(reg)
			if (matches) {
				ret = JSON.parse(matches[1])
			}
		}
		res.json(ret)
	}).catch((e) => {
		console.log(e)
})
})



var apiRoutes = express.Router()


app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
})
