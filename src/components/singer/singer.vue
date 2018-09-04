<template>
<<<<<<< HEAD
	<div class="singer">
		<list-view :data="singers"></list-view>
=======
	<div class="singer"  ref="singer">
		<list-view @select="selectSinger" :data="singers"></list-view>
		<router-view></router-view>
>>>>>>> singer-detail
	</div>
</template>

<script>
	import { getSingerList } from '@/api/singer'
<<<<<<< HEAD
	import { ERRR_OK } from '@/api/config'
	import Singer from "@/common/js/singer"
	import ListView from  '@/base/listview/listview'
=======
	import { ERR_OK } from '@/api/config'
	import Singer from "@/common/js/singer"
	import ListView from  '@/base/listview/listview'
	import { mapMutations } from 'vuex'
>>>>>>> singer-detail

	const HOT_NAME = '热门'
	const HOT_SINGER_LEN = 10

	export default {
		data () {
			return {
				singers: []
			}
		},
		created () {
			this._getSingerList()
		},
<<<<<<< HEAD
		methods: {
			_getSingerList() {
				getSingerList().then((res) => {
					if (res.conde === ERRR_OK) {
=======

		methods: {
			selectSinger(singer) {
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if (res.code === ERR_OK) {
>>>>>>> singer-detail
						this.singers = this._nomalizeSinger(res.data.list)
						// console.log(this.singers);
					}
				})
			},
			_nomalizeSinger(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
<<<<<<< HEAD
=======

>>>>>>> singer-detail
				list.forEach( (item, index) => {
					if ( index < HOT_SINGER_LEN) {
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
					}

					const key = item.Findex
					if(!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}

					map[key].items.push(new Singer ({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				})

				// 为了得到有序列表，我们需要处理 map
				let hot = []
				let ret = []

				for (let key in map) {
					let val = map[key]
					if ( val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					}else if (val.title === HOT_NAME) {
						hot.push(val)
					}
				}

				ret.sort( (a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(ret)
<<<<<<< HEAD
			}
=======
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
>>>>>>> singer-detail
		},
		components: {
			ListView
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'
	
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
</style>