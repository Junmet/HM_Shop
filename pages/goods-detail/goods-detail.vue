<template>
	<view class="goods_detail" v-if="info.id">
		<swiper :indicator-dots=true autoplay circular>
			<swiper-item v-for="(item,index) in LunBoimg" :key="index">
				<image :src="item.src" mode=""></image>
			</swiper-item>
		</swiper>

		<view class="box1">
			<view class="box1_text">
				<text>￥{{info.sell_price}}</text>
				<text>￥{{info.market_price}}</text>
			</view>
			<view class="box1_title">
				{{info.title}}
			</view>
		</view>
		<view class="box2">
			<view class="box2_bga">
				<view>货号：{{info.goods_no}}</view>
				<view>库存：{{info.stock_quantity}}</view>
			</view>
		</view>
		<view class="box3">
			<view>详情介绍</view>
			<view>
				<rich-text :nodes="desc.content"></rich-text>
			</view>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				LunBoimg: [],
				info: {},
				desc: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		components: {
			uniGoodsNav
		},
		onLoad(data) {
			this.getRotationchart(data.id)
			this.getinfo(data.id)
			this.getDesc(data.id)
		},
		methods: {
			async getRotationchart(id) {
				let res = await this.$http({
					url: "/api/getthumimages/" + id
				})
				this.LunBoimg = res.data.message
			},
			// 详情参数
			async getinfo(id) {
				let res = await this.$http({
					url: "/api/goods/getinfo/" + id
				})
				this.info = res.data.message[0]
			},
			// 商品的详细介绍
			async getDesc(id) {
				let res = await this.$http({
					url: "/api/goods/getdesc/" + id
				})
				this.desc = res.data.message[0]
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				}) 
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods_detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 20rpx;

			.box1_text {
				margin-bottom: 12rpx;

				text:nth-child(1) {
					color: #b50e03;
					font-size: 38rpx;
					margin-right: 15rpx;
				}

				text:nth-child(2) {
					text-decoration: line-through;
					color: #eee;
					font-size: 30rpx;
				}
			}

			.box1_title {
				font-size: 35rpx;
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				line-height: 60rpx;
			}
		}

		.box2 {
			background-color: #eee;
			overflow: hidden;
			font-size: 35rpx;

			.box2_bga {
				height: 100rpx;
				margin: 10rpx 0rpx;
				padding: 20rpx;
				background-color: #fff;

				view:nth-child(1) {
					margin-bottom: 8rpx;
				}
			}
		}

		.box3 {
			margin-bottom: 100rpx;
			view:nth-child(1) {
				padding: 10rpx;
				border-bottom: 1rpx solid #eee;
				font-size: 35rpx;
			}

			view:nth-child(2) {
				padding: 10rpx;
				font-size: 32rpx;
				line-height: 60rpx;

			}
		}
		.goods_nav{
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
