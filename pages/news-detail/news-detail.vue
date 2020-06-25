<template>
	<view class="news_detail" v-if="detailsData.id">
		<view class="news_item">
			<text>{{detailsData.title}}</text>
			<view class="info">
				<text>发表时间：{{detailsData.add_time | formatDate("-")}}</text>
				<text>浏览{{detailsData.click}}次</text>
			</view>
			<view class="content">
				<rich-text :nodes="detailsData.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailsData: {},
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
		onLoad(data) {
			this.getdetailsData(data.id)
		},
		methods: {
			async getdetailsData(id) {
				let res = await this.$http({
					url: "/api/getnew/" + id
				})
				this.detailsData = res.data.message[0]
			}
		}
	}
</script>

<style lang="less" scoped>
	.news_detail {
		width: 750rpx;
		.news_item{
			font-size: 30rpx;
			padding: 0 20rpx;
			>text{
				font-size: 32rpx;
				text-align: center;
				display: block;
				margin: 20rpx 0rpx;
			}
			.info{
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
			}
		}
	}
</style>
