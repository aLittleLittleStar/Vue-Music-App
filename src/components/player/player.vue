<template>
	<div class="player" v-show="playlist.length>0">
		<transition name="normal"
								@enter="enter"
								@after-enter="afterEnter"
								@leave="leave"
								@after-leave="afterLeave"
		>
			<div class="normal-player" v-show="fullScreen">
				<div class="background">
					<img width="100%" height="100%" :src="currentSong.image">
				</div>
				<div class="top">
					<div class="back" @click="back">
						<i class="icon-back"></i>
					</div>
					<h1 class="title" v-html="currentSong.name"></h1>
					<h2 class="subtitle" v-html="currentSong.singer"></h2>
				</div>
				<div class="middle" 
						 @touchstart.prevent="middleTouchStart"
						 @touchmove="middleTouchMove"
						 @touchend="middleTouchEnd"
				>
					<div class="middle-l" ref="middleL">
						<div class="cd-wrapper" ref="cdWrapper">
							<div class="cd" :class="cdCls">
								<img class="image"  :src="currentSong.image">
							</div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric">{{playingLyric}}</div>
						</div>
					</div>
					<scroll class="middle-r"  ref="lyricList" 
									:data="currentLyric && currentLyric.lines">
						<div class="lyric-wrapper">
							<div v-if="currentLyric">
								<p ref="lyricLine"
									 class="text"
									 :class="{'current': currentLineNum === index}"
									 v-for="(line, index) in currentLyric.lines" 
								>
									{{line.txt}}
								</p>
							</div>
						</div>
					</scroll>
				</div>
				<div class="bottom">
					<div class="dot-wrapper">
						<div class="dot" :class="{'active':currentShow === 'cd'}"></div>
						<div class="dot" :class="{'active':currentShow === 'lyric'}"></div>
					</div>
					<div class="progress-wrapper">
						<span class="time time-l">{{format(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
						</div>
						<span class="time time-r">{{format(currentSong.duration)}}</span>
					</div>
					<div class="operators">
						<div class="icon i-left" @click="changeMode">
							<i :class="iconMode"></i>
						</div>
						<div class="icon i-left" :class="disableCls">
							<i class="icon-prev" @click="prev"></i>
						</div>
						<div class="icon i-center">
							<i @click="togglePlaying" :class="playIcon"></i>
						</div>
						<div class="icon i-right" :class="disableCls">
							<i class="icon-next" @click="next"></i>
						</div>
						<div class="icon i-right">
							<i class="icon-not-favorite"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div class="mini-player" v-show="!fullScreen" @click="open">
				<div class="icon">
					<img :class="cdCls" width="100%" height="100%" :src="currentSong.image">
				</div>
				<div class="text">
					<h2 class="name" v-html="currentSong.name"></h2>
					<p class="desc" v-html="currentSong.singer"></p>
				</div>
				<div class="control">
					<progress-circle :radius="radius" :percent="percent">
						<i :class="miniIcon" @click.stop="togglePlaying" class="icon-mini"></i>
					</progress-circle>
				</div>
				<div class="control" @click.stop="showPlaylist">
					<i class="icon-playlist"></i>
				</div>
			</div>
		</transition>
		<playlist ref="playlist"></playlist>
		<audio 
			ref="audio" 
			:src="currentSong.url"
			@canplay="ready"
			@error="error"
			@timeupdate="updateTime"
			@ended="end"
		>
		</audio>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import animations from 'create-keyframe-animation'
	import { prefixStyle } from '@/common/js/dom'
	import ProgressBar from '@/base/progress-bar/progress-bar'
	import ProgressCircle from '@/base/progress-circle/progress-circle'
	import { playMode } from '@/common/js/config'
	import { shuffle } from '@/common/js/util'
	import Lyric from 'lyric-parser'
	import Scroll from '@/base/scroll/scroll'
	import Playlist from '@/components/playlist/playlist'
	import { playerMixin } from '@/common/js/mixin'

	const transform = prefixStyle('transform')
	const transitionDuration = prefixStyle('transitionDuration')

	export default {
		mixins: [playerMixin],
		data() {
			return {
				songReady: false,
				currentTime: 0,
				radius: 32,
				currentLyric: null,
				currentLineNum: 0,
				currentShow: 'cd',
				playingLyric: ''
			}
		},
		computed: {
			cdCls() {
				return this.playing ? 'play' : 'play pause'
			},
			playIcon() {
				return this.playing ? 'icon-pause' : 'icon-play'
			},
			// // 播放模式
			iconMode() {
				return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
			},
			miniIcon() {
				return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
			},
			disableCls() {
				return this.songReady ? '' : 'disable'
			},
			percent() {
				return this.currentTime / this.currentSong.duration
			},
			...mapGetters([
				'fullScreen',
				'playlist',
				'currentSong',
				'playing',
				'currentIndex',
				"mode",
				'sequenceList'
			])
		},
		created() {
			this.touch = {}
		},
		methods: {
			back() {
				this.setFullScreen(false)
			},
			open() {
				this.setFullScreen(true)
			},
			enter(el, done) {
				const {x, y, scale} = this._getPosAndScale()

				let animation = {
					0: {
						transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
					},
					60: {
						transform: `translate3d(0, 0, 0) scale(1.1)`
					},
					100: {
						transform: `translate3d(0, 0, 0) scale(1)`
					}
				}

				animations.registerAnimation({
					name: 'move',
					animation,
					presets: {
						// 动画间隔400毫秒
						duration: 400,
						// 动画的缓动 线性的
						easing: 'linear'
					}
				})
				// 传入cdWrapper引用
				animations.runAnimation(this.$refs.cdWrapper, 'move', done)
			},
			afterEnter() {
				animations.unregisterAnimation('move')
				this.$refs.cdWrapper.style.animation = ''
			},
			leave(el, done) {
				this.$refs.cdWrapper.style.transition = 'all 0.4s'
				const {x, y, scale} = this._getPosAndScale()
				this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px,0) scale(${scale})`
				this.$refs.cdWrapper.addEventListener('transitionend', done)
			},
			afterLeave() {
				this.$refs.cdWrapper.style.transition = ''
				this.$refs.cdWrapper.style[transform] = ''
			},

			togglePlaying() {
				if(!this.songReady) {
					return 
				}
				this.setPlayingState(!this.playing)

				if(this.currentLyric) {
					this.currentLyric.togglePlay()
				}
			},

			// 歌曲播放到最后 进行播放模式的检查
			// 如果是循环播放的话
			end() {
				if(this.mode === playMode.loop) {
					this.loop()
					// 否则 调到下一首
				} else{
					this.next()
				}
			},
			// 循环播放
			loop() {
				this.$refs.audio.currentTime = 0
				this.$refs.audio.play()
				// 循环播放
				if(this.currentLyric) {
					this.currentLyric.seek(0)
				}
			},
			// 歌曲的前进和后退
			next() {
				if(!this.songReady) {
					return
				}
				if(this.playing.length === 1){
					this.loop()
				}else {
					let index = this.currentIndex + 1
					if (index === this.playlist.length) {
						index = 0
					}
					this.setCurrentIndex(index)
					if (!this.playing) {
						this.togglePlaying()
					}
				}
				this.songReady = false
			},
			prev() {
				if(!this.songReady) {
					return
				}
				if(this.playing.length === 1) {
					this.loop()
				} else {
					let index = this.currentIndex -1
					if (index === -1) {
						index = this.playlist.length - 1
					}
					this.setCurrentIndex(index)
						if (!this.playing) {
						this.togglePlaying()
					}
				}
				this.songReady = false
			},
			// 解决快速点击出现的bug
			ready() {
				this.songReady = true
				this.savePlayHistory(this.currentSong)
			},
			error() {
				this.songReady = true
			},
			updateTime(e) {
				this.currentTime = e.target.currentTime
			},
			// 对时间进行处理
			format(interval) {
				interval = interval | 0
				const minute = interval / 60 | 0
				const second = this._pad(interval % 60)
				return `${minute}:${second}`
			},
			onProgressBarChange(percent) {
				const currentTime = this.currentSong.duration * percent
				this.$refs.audio.currentTime = currentTime
				if( !this.playing ){
					this.togglePlaying()
				}
				if(this.currentLyric) {
					this.currentLyric.seek(currentTime * 1000)
				}
			},
			// // 点击切换按钮 变换图标
			// changeMode() {
			// 	const mode = (this.mode + 1) % 3
			// 	// 改变mode
			// 	this.setPlayMode(mode)
			// 	// console.log(mode);
			// 	// 修改当前播放歌曲列表
			// 	let list = null

			// 	// 随机播放
			// 	if(mode === playMode.random) {
			// 		list = shuffle(this.sequenceList)
			// 	} else {
			// 		list = this.sequenceList
			// 	}
			// 	//由于playlist 变成随机模式， currentsong 是根据 currentindex 和 playlist 
			// 	//改变的，需要保持currentindex 在随机播放列表的正确位置，以确保当前播放歌曲不变
			// 	this.resetCurrentIndex(list)
			// 	this.setPlayList(list)
			// },
			// resetCurrentIndex(list) {
			// 	let index = list.findIndex( (item) => {
			// 		return item.id === this.currentSong.id 
			// 	})
			// 	this.setCurrentIndex(index)
			// },
			getLyric() {
				this.currentSong.getLyric().then((lyric) => {
					this.currentLyric = new Lyric(lyric, this.handleLyric)
					if(this.playing) {
						this.currentLyric.play()
					}

					// console.log(this.currentLyric);
				}).catch(() => {
					// 捕捉不到歌词的时候
					this.currentLyric = null
					this.playingLyric = ''
					this.currentLineNum = 0
				})
			},
			handleLyric({lineNum, txt}) {
				this.currentLineNum = lineNum

				// 如果行数大于五行的话
				if(lineNum > 5) {
					// 前五行不滚动
					let lineEl = this.$refs.lyricLine[lineNum - 5]
					// 如果大于五行的话滚动到中间
					this.$refs.lyricList.scrollToElement(lineEl, 1000)
					// this.$refs.lyricList.scrollToElement(lineEl, 1000)

				} else {
					// 如果是五行之内的话滚动到顶部
					// this.$refs.lyricList.scrollTo(0, 0, 1000)
					this.$refs.lyricList.scrollTo(0, 0, 1000)
				}
				this.playingLyric = txt
			},
			showPlaylist() {
				this.$refs.playlist.show()
			},
			middleTouchStart(e) {
				this.touch.initiated = true
				const touch = e.touches[0]
				this.touch.startX = touch.pageX
				this.touch.statrtY = touch.pageY
			},
			middleTouchMove(e) {
				if(!this.touch.initiated) {
					return
				}

				const touch = e.touches[0]
				const deltaX = touch.pageX - this.touch.startX
				const deltaY = touch.pageY - this.touch.statrtY
				if(Math.abs(deltaY) > Math.abs(deltaX)) {
					return 
				}
				const left = this.currentShow === 'cd' ? 0 : -window.innerWidth 
				const offsetwidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))

				this.touch.percent = Math.abs(offsetwidth / window.innerWidth)

				this.$refs.lyricList.$el.style[transitionDuration] = 0
				this.$refs.middleL.style.opacity = 1 - this.touch.percent
				this.$refs.middleL.style[transitionDuration] = 0

			},
			middleTouchEnd() {
				let offsetwidth
				let opacity
				if (this.currentShow === 'cd') {
					if (this.touch.percent > 0.1) {
						offsetwidth = -window.innerWidth
						opacity = 0
						this.currentShow = 'lyric'
					}else {
						offsetwidth = 0
						opacity = 1
					}
				} else {
					// 从左向右划
					if(this.touch.percent < 0.9) {
						offsetwidth = 0
						this.currentShow = 'cd'
						opacity = 1
					} else {
						offsetwidth = -window.innerWidth
						opacity = 0
					}
				}
				const time = 300
				this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetwidth}px, 0, 0)`
				this.$refs.lyricList.$el.style[transitionDuration] = 	`${time}ms`
				this.$refs.middleL.style.opacity = opacity
				this.$refs.middleL.style[transitionDuration] = `${time}ms`
			},
			_pad(num, n =  2) {
				let len = num.toString().length
				while ( len < n ) {
					num = '0' + num
					len ++
				} 
				return num
			},
			_getPosAndScale() {
				const targetWidth = 40
				const paddingLeft = 40
				const paddingBottom = 30
				const paddingTop = 80
				const width =  window.innerWidth * 0.8
				const scale = targetWidth / width
				const x = -(window.innerWidth / 2 - paddingLeft)
				const y = window.innerHeight - paddingTop - width / 2- paddingBottom

					return {
						x,
						y,
						scale
					}
			},
 			...mapMutations({
				setFullScreen: 'SET_FULL_SCREEN',
				setPlayingState: 'SET_PLAYING_STATE',
				setCurrentIndex: 'SET_CURRENT_INDEX',
				setPlayMode: 'SET_PLAY_MODE',
				setPlayList: 'SET_PLAY_LIST'
			}),
			...mapActions([
				'savePlayHistory'
			])
		},
		watch: {
			currentSong(newSong, oldSong) {
				if (!newSong.id) {
					return 
				}
				if(newSong.id === oldSong.id) {
					return 
				}
				if(this.currentLyric) {
					this.currentLyric.stop()
				}
				// 延迟
				this.$nextTick( () => {
					// 播放音乐
					this.$refs.audio.play()
					// 歌词
					this.getLyric()
				})
			},
			playing(newPlaying) {
				const audio = this.$refs.audio
				this.$nextTick(() => {
					this.$refs.audio.play()
					newPlaying ? audio.play() : audio.pause()
				})
			}
		},
		components: {
			ProgressBar,
			ProgressCircle,
			Scroll,
			Playlist
		}
	}
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	

	.player
		.normal-player
			position: fixed
			left: 0
			right: 0
			top: 0
			bottom: 0
			z-index: 150
			background: $color-background
			.background
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				z-index: -1
				opacity: 0.6
				filter: blur(20px)
			.top
				position: relative
				margin-bottom: 25px
				.back
					position absolute
					top: 0
					left: 6px
					z-index: 50
					.icon-back
						display: block
						padding: 9px
						font-size: $font-size-large-x
						color: $color-theme
						transform: rotate(-90deg)
				.title
					width: 70%
					margin: 0 auto
					line-height: 40px
					text-align: center
					no-wrap()
					font-size: $font-size-large
					color: $color-text
				.subtitle
					line-height: 20px
					text-align: center
					font-size: $font-size-medium
					color: $color-text
			.middle
				position: fixed
				width: 100%
				top: 80px
				bottom: 170px
				white-space: nowrap
				font-size: 0
				.middle-l
					display: inline-block
					vertical-align: top
					position: relative
					width: 100%
					height: 0
					padding-top: 80%
					.cd-wrapper
						position: absolute
						left: 10%
						top: 0
						width: 80%
						height: 100%
						.cd
							width: 100%
							height: 100%
							box-sizing: border-box
							border: 10px solid rgba(255, 255, 255, 0.1)
							border-radius: 50%
							&.play
								animation: rotate 20s linear infinite
							&.pause
								animation-play-state: paused
							.image
								position: absolute
								left: 0
								top: 0
								width: 100%
								height: 100%
								border-radius: 50%
					.playing-lyric-wrapper
						width: 80%
						margin: 30px auto 0 auto
						overflow: hidden
						text-align: center
						.playing-lyric
							height: 20px
							line-height: 20px
							font-size: $font-size-medium
							color: $color-text-l
				.middle-r
					display: inline-block
					vertical-align: top
					width: 100%
					height: 100%
					overflow: hidden
					.lyric-wrapper
						width: 80%
						margin: 0 auto
						overflow: hidden
						text-align: center
						.text
							line-height: 32px
							color: $color-text-l
							font-size: $font-size-medium
							&.current
								color: $color-text
			.bottom
				position: absolute
				bottom: 50px
				width: 100%
				.dot-wrapper
					text-align: center
					font-size: 0
					.dot
						display: inline-block
						vertical-align: middle
						margin: 0 4px
						width: 8px
						height: 8px
						border-radius: 50%
						background: $color-text-l
						&.active
							width: 20px
							border-radius: 5px
							background: $color-text-ll
				.progress-wrapper
					display: flex
					align-items: center
					width: 80%
					margin: 0px auto
					padding: 10px 0
					.time
						color: $color-text
						font-size: $font-size-small
						flex: 0 0 30px
						line-height: 30px
						width: 30px
						&.time-l
							text-align: left
						&.time-r
							text-align: right
					.progress-bar-wrapper
						flex: 1
				.operators
					display: flex
					align-items: center
					.icon
						flex: 1
						color: $color-theme
						&.disable
							color: $color-theme-d
						i
							font-size: 30px
					.i-left
						text-align: right
					.i-center
						padding: 0 20px
						text-align: center
						i
							font-size: 40px
					.i-right
						text-align: left
					.icon-favorite
						color: $color-sub-theme
			&.normal-enter-active, &.normal-leave-active
				transition: all 0.4s
				.top, .bottom
					transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
			&.normal-enter, &.normal-leave-to
				opacity: 0
				.top
					transform: translate3d(0, -100px, 0)
				.bottom
					transform: translate3d(0, 100px, 0)
		.mini-player
			display: flex
			align-items: center
			position: fixed
			left: 0
			bottom: 0
			z-index: 180
			width: 100%
			height: 60px
			background: $color-highlight-background
			&.mini-enter-active, &.mini-leave-active
				transition: all 0.4s
			&.mini-enter, &.mini-leave-to
				opacity: 0
			.icon
				flex: 0 0 40px
				width: 40px
				padding: 0 10px 0 20px
				img
					border-radius: 50%
					&.play
						animation: rotate 10s linear infinite
					&.pause
						animation-play-state: paused
			.text
				display: flex
				flex-direction: column
				justify-content: center
				flex: 1
				line-height: 20px
				overflow: hidden
				.name
					margin-bottom: 2px
					no-wrap()
					font-size: $font-size-medium
					color: $color-text
				.desc
					no-wrap()
					font-size: $font-size-small
					color: $color-text-d
			.control
				flex: 0 0 30px
				width: 30px
				padding: 0 10px
				.icon-play-mini, .icon-pause-mini, .icon-playlist
					font-size: 30px
					color: $color-theme-d
				.icon-mini
					font-size: 32px
					position: absolute
					left: 0
					top: 0
					
	@keyframes rotate
		0%
			transform: rotate(0)
		100%
			transform: rotate(360deg)
</style>