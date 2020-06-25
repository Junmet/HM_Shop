<template>
	<view class="news">
		<view @click="goDetail(item.id)" class="news_item" v-for="(item,index) in News" :key="item.id">
			<image :src="item.img_url"></image>
			<view class="news_right">
				<view class="news_title">{{item.title}}</view>
				<view class="info">
					<text>发表数据：{{item.add_time | formatDate("-")}}</text>
					<text>浏览{{item.click}}次</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				News: []
			}
		},
		filters: {
			formatDate(data, spa) {
				spa = spa || '/'
				data = new Date(data)
				let year = data.getFullYear()
				// 如果月和日是满足2位的不追加0,如果是一位的话就追加0  格式：04月-07日
				let month = (data.getMonth() + 1).toString().padStart(2, 0)
				let day = data.getDate().toString().padStart(2, 0)
				// console.log(month)
				return year + spa + month + spa + day
			}
		},
		onLoad() {
			this.getNews()
		},
		methods: {
			async getNews() {
				let res = await this.$http({
					url: "/api/getnewslist"
				})
				this.News = res.data.message
			},
			// 详情跳转
			goDetail(Dataid){
				uni.navigateTo({
					url:'/pages/news-detail/news-detail?id='+Dataid
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.news {
		.news_item {
			padding: 10rpx 20rpx;
			display: flex;
			border-bottom: 1px solid #b50e03;

			image {
				min-width: 200rpx;
				max-width: 200rpx;
				height: 150rpx;
			}

			.news_right {
				margin-left: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.news_title {
					font-size: 30rpx;
				}

				.info {
					font-size: 24rpx;

					text:nth-child(2) {
						margin-left: 30rpx;
					}
				}
			}
		}

	}
</style>
