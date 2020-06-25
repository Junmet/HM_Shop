<template>
	<view class="contact">
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：13242668488 （点击拨打）</view>
			<view>公司地址：汕尾市城区城内路一整个区</view>
		</view>
		<map class="map" :scale="scale" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 经纬度
				longitude: 115.369901,
				latitude: 22.780792,
				// 缩放
				scale: 13,
				// 定位图标
				markers: [{
					longitude: 115.369901,
					latitude: 22.780792,
					iconPath: '../../static/icon/hmlogo.png',
					width: 40,
					height: 40
				}]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber:'13242668388'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.contact {
		image {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 15rpx;
			font-size: 30rpx;

			view {
				width: 750rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #eee;
			}

			view:nth-child(2) {
				border-bottom: none
			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
