<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span 
				class="dot" 
				v-for="(item, index) in dots" 
				:class="{active: currentPageIndex === index}"
			>
			</span>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import { addClass } from 'common/js/dom'
	export default {
		data () {
			return {
				dots: [],
				currentPageIndex: 0
			}
		},
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			autoPlay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 4000
			}
		},

		methods: {
			// 轮播图(sliderGroup)宽度
			_setSliderWidth (isResize) {
				// 拿到传过来的图片
				this.children = this.$refs.sliderGroup.children
				// console.log(this.children.length)

				// 拿到父元素（slider）宽度
				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth
				// 动态添加 class、width
				for (let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					// console.log(child);
					addClass(child, 'slider-item')
					
					child.style.width = sliderWidth + 'px'
					width += sliderWidth
					// console.log(width);
				}

				if (this.loop && !isResize) {
					width += 2 * sliderWidth
				}

				this.$refs.sliderGroup.style.width = width + 'px'
			},

			// 初始化轮播图
			_initSlider () {
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,	//惯性
					// 新版本 
					snap: {
						loop: this.loop,	// 循环
						threshold: 0.3,
						speed: 400		// 轮播间隔
					},
				})


				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX
					// console.log(pageIndex);
					// 循环模式下 -1 berrer-scroll 老版本可用
					// if (this.loop) {
					// 	pageIndex -= 1
					// 	console.log(pageIndex);
					// }
					this.currentPageIndex = pageIndex

					// 重置自动轮播定时器
					if (this.autoPlay) {
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			// 初始化轮播点
			_initDots () {
				this.dots = new Array(this.children.length)
				// console.log(this.children.length);
				// console.log(this.dots);
			},

			// 自动播放
			_play () {
				let pageIndex = this.currentPageIndex
				if (this.loop) {
					pageIndex += 1
					// console.log(pageIndex);
				}

				this.timer = setTimeout( () => {
					this.slider.goToPage(pageIndex, 0, 400)
				}, this.interval)
			}
		},

		mounted () {
			setTimeout(() => {
				this._setSliderWidth()
				this._initDots()
				this._initSlider()

				if (this.autoPlay) {
					this._play()
				}
				// 当窗口尺寸改变时，重新计算轮播宽度
				window.addEventListener("resize", () => {
					if (!this.slider) {
						return
					}
					this._setSliderWidth(true)
					this.slider.refresh()
				})
			}, 20)
		},

		destroyed () {
			// 良好的习惯：销毁定时器
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable'

	.slider
		min-height: 1px
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
			.slider-item
				float: left
				box-sizing: border-box
				overflow: hidden
				text-align: center
				a
					display: block
					width: 100%
					overflow: hidden
					text-decoration: none
				img
					display: block
					width: 100%
		.dots
			position: absolute
			right: 0
			left: 0
			bottom: 12px
			text-align: center
			font-size: 0
			.dot
				display: inline-block
				margin: 0 4px
				width: 8px
				height: 8px
				border-radius: 50%
				background: $color-text-l
				&.active
					width: 20px
					border-radius: 5px
					background: $color-text-ll

</style>