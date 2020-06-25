<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item,index) in goods" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url?item.img_url:'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image>
			<view class="goods_price">
				<text>{{item.sell_price}}</text>
				<text>{{item.market_price}}</text>
			</view>
			<view class="goods_title">
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Array,
				default: {}
			}
		},
		methods:{
			navigator(id){
				this.$emit("goodsItemClick",id)
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.goods_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 15rpx;
		.goods_item {
			background: #FFFFFF;
			width: 355rpx;
			margin-bottom: 10rpx;
			padding: 15rpx;
			box-sizing: border-box;
			image {
				width: 100%;
				height: 355rpx;
				display: block;
				margin: auto;
			}
			.goods_price {
				margin: 20rpx 0rpx 0rpx 5rpx;
				text:nth-child(1) {
					color: #b50e03;
					font-size: 36rpx;
					margin-right: 15rpx;
				}
				text:nth-child(2) {
					color: #d7d6d7;
					font-size: 28rpx;
					text-decoration: line-through;
				}
			}
		}
		.goods_title {
			font-size: 28rpx;
			line-height: 55rpx;
			padding: 15rpx 0rpx 20rpx 0rpx;
		}
	}
</style>
