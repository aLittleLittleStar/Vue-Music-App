<template>
	<scroll 
			class="suggest"
			ref="suggest"
			:data="result" 
			:pullup="pullup"
			@scrollToEnd="searchMore"
			:beforeScroll="beforeScroll"
			@beforeScroll="listScroll"
	>
		<ul class="suggest-list">
			<li @click="selectItem(item)" class="suggest-item" v-for="item in result">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore" title=""></loading>
		</ul>
		<div class="no-result-wrapper" v-show="!hasMore && !result.length">
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
</template>

<script>
	import Scroll from '@/base/scroll/scroll'
	import Loading from '@/base/loading/loading'
	import { search } from '@/api/search'
	import { ERR_OK } from '@/api/config'
	import { createSong } from '@/common/js/song'
	import Singer from '@/common/js/singer'
	import { mapMutations, mapActions } from 'vuex'
	import noResult from '@/base/no-result/on-result'



	const TYPE_SINGER = 'singer'
	// 每一页的数量
	const perpage = 20

	export default {
		props: {
			query: {
				type: String,
				default: ''
			},
			showSinger: {
				type: Boolean,
				default: true
			},
			// 是否显示歌手
			zhida: {
				type: Boolean,
				default: true
			}
		},
		// 维护当前是第几页
		data() {
			return {
				// 当前检索页数，用于下拉加载
				page: 1,
				// 接受检索结果
				result: [],
				pullup: true,
				// 标志位。是否加载完
				hasMore: true,
				beforeScroll: true
			}
		},
		methods: {
			search() {
				this.page = 1
				this.hasMore = true
				// 第一次去搜索的时候 把scroll组件重置到顶部
				this.$refs.suggest.scrollTo(0, 0)
				search(this.query, this.page, this.showSinger, perpage).then((res) => {

					// 对用axios获取的数据改变为json格式
					let resultData = JSON.parse(res.substring(res.indexOf("{"),res.lastIndexOf("}")+1))
					// console.log(resultData);

					// console.log("==========================================");

					// 如果接收到数据的话
					if ( resultData.code === ERR_OK) {
						// console.log("hola datevid2222");
						this.result = this._getResult(resultData.data)
						// console.log(this.result);
						this._checkMore(resultData.data)
					}
				})
			},
			searchMore() {
				if ( !this.hasMore ) {
					return 
				}
				this.page++
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					let resultData = JSON.parse(res.substring(res.indexOf("{"),res.lastIndexOf("}")+1))
					// console.log("hola datevid");
					if ( resultData.code === ERR_OK) {
						// console.log(resultData.data);
						this.result = this.result.concat(this._getResult(resultData.data))
						// console.log(this.result);
						this._checkMore(resultData.data)
					}
				})
			},
			getDisplayName(item) {
				if (item.type === TYPE_SINGER) {
					return item.singername
				} else {
					return `${item.name}-${item.singer}`
				}
			},
			getIconCls(item) {
				if (item.type === TYPE_SINGER) {
					return `icon-mine`
				} else {
					return `icon-music`
				}
			},
			selectItem(item) {
				if (item.type === TYPE_SINGER) {
					const singer = new Singer({
						id: item.singermid,
						name: item.singername
					})
					this.$router.push({
						path: `/search/${singer.id}`
					})
					this.setSinger(singer)
				} else {
					this.insertSong(item)
				}
				this.$emit('select', item)
			},
			refresh() {
				this.$refs.suggest.refresh()
			},
			listScroll() {
				this.$emit('listScroll')
			},
			_checkMore(data) {
				const song = data.song
				if( !song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum ) {
					this.hasMore = false
				}
			},
			_getResult(data) {
				let ret = []
				// console.log(data);
				// 如果有这一个结果，就把结果push进去
				if (data.zhida && data.zhida.singerid) {
					// ret.push({...data.zhida, ...{type: TYPE_SINGER}})
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				if (data.song) {
					ret = ret.concat(this._normalizeSongs(data.song.list))
				}
				return ret
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.songid && musicData.albumid) {
						ret.push(createSong(musicData))
					}
				})
				return ret 
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			}),
			...mapActions([
				'insertSong'
			])
		},
		components: {
			Scroll,
			Loading,
			noResult
		},
		watch: {
			query() {
				this.search()
			}
		}
	}

</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	

	.suggest
		height: 100%
		overflow: hidden
		.suggest-list
			padding: 0 30px
			.suggest-item
				display: flex
				align-items: center
				padding-bottom: 20px
			.icon
				flex: 0 0 30px
				width: 30px
				[class^="icon-"]
					font-size: 14px
					color: $color-text-d
			.name
				flex: 1
				font-size: $font-size-medium
				color: $color-text-d
				overflow: hidden
				.text
					no-wrap()
		.no-result-wrapper
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)

</style>