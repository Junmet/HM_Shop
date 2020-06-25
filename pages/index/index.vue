<template>
	<view>
		<!-- 轮播图 -->
		<view class="home">
			<swiper :indicator-dots=true autoplay circular>
				<swiper-item v-for="(item,index) in Swipers" :key=item.id>
					<image :src="item.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<view class="nav_box" v-for="(item,index) in nav" :key="index"  @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.text}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="recommend">
			<view class="tit">推荐商品</view>
			<goods_list @goodsItemClick="goGoodsDetail" v-if="goods" :goods="goods" />
		</view>
		</view>
	</view>
</template>

<script>
	import goods_list from "../../components/goods_list/goods_list.vue"
	export default {
		data() {
			return {
				// 轮播图
				Swipers: [{
						id: 1,
						img: "../../static/img/1.jpeg"
					},
					{
						id: 2,
						img: "../../static/img/2.jpeg"
					},
					{
						id: 3,
						img: "../../static/img/3.jpeg"
					}
				],
				// 导航
				nav:[
					{
						path:"/pages/goods/goods",
						text:"黑马超市",
						icon:"iconfont icon-ziyuan"
					},
					{
						path:"/pages/contact/contact",
						text:"联系我们",
						icon:"iconfont icon-guanyuwomen"
					},
					{
						path:"/pages/pics/pics",
						text:"社区图片",
						icon:"iconfont icon-tupian"
					},
					{
						path:"/pages/videos/videos",
						text:"学习视频",
						icon:"iconfont icon-shipin"
					}
				],
				// 推荐商品数据
				goods:[]
			}
		},
		onLoad() {
			// 推荐商品数据
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(){
				const res = await this.$http({url: '/api/getgoods?pageindex=1'})
				this.goods = res.data.message
			},
			// 导航跳转
			navItemClick(data){
			uni.navigateTo({url:data})
			},
			goGoodsDetail(id){
				uni.navigateTo({
					url:"/pages/goods-detail/goods-detail?id=" + id
				})
			}
		},
		components:{
			goods_list
		}
	}
</script>

<style lang="less" scoped>
	// 轮播图
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}
	// 导航
	.nav{
		display: flex;
		text-align: center;
		justify-content: space-between;
		padding: 24rpx 24rpx;
		.nav_box{
			view{
				width:120rpx;
				height: 120rpx;
				background:#b50e03;
				border-radius: 60rpx;
				line-height: 120rpx;
				color:#fff;
				font-size: 50rpx;
			}
			.iconfont{
				margin-bottom: 24rpx;
			}
			text{
				font-size: 30rpx;
			}
		}
	} 
	// 推荐商品
	.recommend{
		background: #eee;
		overflow: hidden;
		.tit{
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #b50e03;
			letter-spacing: 40rpx;
			margin: 10rpx 0;
			background: #fff;
		}
	}
</style>
