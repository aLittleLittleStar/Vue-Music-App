<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			pullup: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			}

		},
		mounted() {
			setTimeout( () => {
				this._initScroll()
			}, this.refreshDelay)
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})

				if (this.listenScroll) {
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}

				if (this.pullup) {
					// 如果有上拉刷新，就监听scrollEnd事件
					this.scroll.on('scrollEnd', () => {
						if (this.scroll.y <= this.scroll.maxScrollY + 50) {
							// 当滚动距离小于等于最大的滚动条的距 + 50 离的时候，向外传递一个scrollToEnd的事件
							this.$emit('scrollToEnd')
						}
					})
				}

				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			enable() {
				this.scroll && this. scroll.enable()
			},
			disbale() {
				this.scroll && this.scroll.disbale()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			data() {
				setTimeout( () => {
					this.refresh()
				}, this.refreshDelay)
			}
		}
	}
</script>

<style scoped lang="stylus">
	
</style>