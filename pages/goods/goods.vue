<template>
	<view class="goods_list">
		<goods_list v-if="goods" @goodsItemClick="goGoodsDetail" :goods="goods" />
		<view class="qing" v-if="flog">---亲！已经没有下一页了---</view>
	</view>
</template>

<script>
	import goods_list from "../../components/goods_list/goods_list.vue"
	export default {
		data() {
			return {
				pageindex: 1,
				// 获取商品数据
				goods: [],
				flog: false,
				time: null
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		// mounted() {
		// 	window.scrollTo(0, 0)
		// },
		methods: {
			// 获取商品数据
			async getGoodsList(callback) {
				const res = await this.$http({
					url: '/api/getgoods?pageindex=' + this.pageindex
				})
				this.goods = [...this.goods, ...res.data.message]
				callback && callback()
			},
			goGoodsDetail(id){
				uni.navigateTo({
					url:"/pages/goods-detail/goods-detail?id=" + id
				})
			}
		},
		components: {
			goods_list
		},
		// 页面下拉刷新
		onPullDownRefresh() {
			this.pageindex = 1,
				this.goods = [],
				this.flog = false,
				this.time = setTimeout(() => {
					this.getGoodsList(() => {
						uni.stopPullDownRefresh();
					})
				}, 500)
		},
		// 页面上拉触底钩子
		onReachBottom() {
			// let total = Math.ceil(this.goods.length/10) 
			if (this.goods.length < this.pageindex * 10) return this.flog = true
			this.pageindex++
			this.getGoodsList()
		},
		destroyed() {
			clearTimeout(this.time)
		}
	}
</script>

<style lang="less" scoped>
	.goods_list {
		background: #eee;

		.qing {
			text-align: center;
			color: #a19ea2;
		}
	}
</style>
