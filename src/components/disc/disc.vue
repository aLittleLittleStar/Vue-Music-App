<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs">
			
		</music-list>
	</transition>
</template>

<script>
	import MusicList from '@/components/music-list/music-list'
	import { mapGetters } from 'vuex'
	import { ERR_OK } from '@/api/config'
	import { creatSongList } from '@/common/js/song'
	import { getSongList } from '@/api/recommend'

	export default {
		computed: {
			title() {
				return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		data() {
			return {
				songs: []
			}
		},
		created() {
			this._getSongList()

		},
		methods: {
			_getSongList() {
				if (!this.disc.dissid) {
				  this.$router.push('/recommend')
				  return
				}
				getSongList(this.disc.dissid).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.cdlist[0].songlist)
						console.log(res.cdlist[0].songlist);
						// console.log(this._normalizeSongs(res.cdlist[0].songlist))
					}
				})
			},
			_normalizeSongs (list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.id && musicData.album) {
						ret.push(creatSongList(musicData))
					}
				})
				return ret
			}
		},

		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus">
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	
	.slide-enter, .slide-leave-to
		transition: translate3d(100%, 0, 0)
</style>