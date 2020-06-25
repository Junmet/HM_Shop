<template>
	<view class="pics">

		<!--  左侧菜单-->
		<scroll-view class="pics_left" scroll-y>
			<view :class="active===index?'active':''" v-for="(item,index) in Picsclassify" :key="item.id" @click="leftClickHandle(index,item.id)">{{item.title}}</view>
		</scroll-view>

		<!-- 右侧图片内容-->
		<scroll-view class="pics_right" scroll-y>
			<view class="pics_right_item" v-for="(item,index) in Data" :key="item.id">
				<image @click="preview(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<view class="pics_right_item" v-if="Data.length === 0">
				<image src="../../static/img/timg.gif" mode=""></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Picsclassify: [],
				active: 0,
				Data: []
			}
		},
		onLoad() {
			this.getPicsclassify()
		},
		methods: {
			// 左边分类数据
			async getPicsclassify() {
				let res = await this.$http({
					url: "/api/getimgcategory"
				})
				this.Picsclassify = res.data.message
				this.leftClickHandle(0, this.Picsclassify[0].id)
			},
			// 右边图片数据
			async leftClickHandle(index, id) {
				this.active = index
				let res = await this.$http({
					url: "/api/getimages/" + id
				})
				this.Data = res.data.message
			},
			// 预览图片
			preview(current) {
				const urls = this.Data.map(item => {
					return item.img_url
				})
				// console.log(urls)
				uni.previewImage({
					current,
					urls,
					loop: true
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
	}

	// #ifdef H5
	.pics {
		height: 100%;
	}

	// #endif

	// #ifdef MP-WEIXIN
	.pics {
		height: 100vh;
	}

	// #endif

	.pics {
		display: flex;

		.pics_left {
			border-right: 1rpx solid #eee;
			flex: 2;

			view {
				height: 130rpx;
				line-height: 130rpx;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-bottom: 1rpx solid #eee;
				// display: flex;
				// justify-content: center;
				// align-items: center;
			}

			.active {
				background-color: #b50e03;
				color: #fff
			}
		}

		.pics_right {
			flex: 5;
			padding: 0rpx 8rpx;

			.pics_right_item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 10rpx;
					margin: 10rpx 0rpx;
				}

				text {
					padding: 12rpx;
					font-size: 30rpx;
					color: #333;
					display: inline-block;
					border-bottom: 1rpx solid #a2a0a3;
				}
			}
		}
	}
</style>
