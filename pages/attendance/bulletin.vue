<template>
	<view class="bulletin ">
		<image class="img_index "
			src="http://ev20.oss-cn-hangzhou.aliyuncs.com/%E6%99%BA%E6%85%A7%E5%BD%A9%E4%BA%91/zhcy_index.png"
			mode="aspectFit"></image>
		<view class="u-m-t-60 u-m-b-40 u-font-40">
			<text class="">今日考勤记录(晚查寝)</text>
		</view>
		<view class="u-m-b-30">
			<text class="">{{ time }}</text>
		</view>
		<transition name="fade">
			<view class="box " v-if="tableList.length>0">
				<u-table class="u-m-t-0 " @change="change">
					<u-tr>
						<u-th width="130rpx">寝室</u-th>
						<u-th width="200rpx">学号</u-th>
						<u-th width="140rpx">姓名</u-th>
						<u-th>原因</u-th>
					</u-tr>
					<u-tr v-for="item in tableList" :key="item.id">
						<template v-if="item">
							<u-td width="130rpx">{{ item.room_name }}</u-td>
							<u-td width="200rpx">{{ item.student }}</u-td>
							<u-td width="140rpx" :class="item.is_active ? 'is_active' : ''">{{ item.student_name }}
							</u-td>
							<u-td>{{ item.reason }}</u-td>
						</template>
					</u-tr>
				</u-table>
			</view>
		</transition>
	</view>
</template>

<script>
	import {
		format_date
	} from '@/common/js/common.js'
	export default {
		data() {
			return {
				tableList: [],
				loading: true,
				time: '2021-08-25'
			};
		},
		onLoad: function(option) {
			let that = this
			this.$u.api.school_attendance_student_disciplinary().then(res => {
				var list = res.data;
				var active_list = []
				var classname = this.vuex_user.grade
				console.log(classname)
				for (var i in list) {
					var obj = list[i]
					if (obj.classname == classname) {
						obj.is_active = true // 页面改变颜色
						active_list.unshift(obj)
						list[i] = false
					}
				}
				for (var i in active_list) {
					list.unshift(active_list[i])
				}
				this.loading = false
				if (res.data.length <= 0) return;
				this.$data.tableList = list
			});
			this.$data.time = format_date(new Date(), "yyyy-MM-dd");
		}
	};
</script>
<style lang="scss">
	.box {
		min-height: 400rpx;
	}

	.bulletin {
		text-align: center;
		padding: 0 20rpx;
	}

	.img_index {
		height: 100rpx;
		margin-top: 50rpx;
	}

	.t-td {
		width: 80rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.is_active {
		color: red !important;
	}
</style>
