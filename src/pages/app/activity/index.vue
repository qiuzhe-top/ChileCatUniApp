<template>
	<view class="">
		<view class="img">
			<u-image width="100%"  mode="widthFix"  border-radius="4"  :src="url"></u-image>
		</view>
		<view class="title u-m-t-40">
			<view class="u-font-xl u-m-b-10 u-font-weight-bold">活动推荐</view>
			<view class="u-font-sm u-type-info">为你整理推荐近期热门活动</view>
		</view>
		
		<view class="box-list u-m-t-20 u-p-b-50 u-flex u-flex-wrap u-row-around">
			<view class="item u-m-t-30" v-for="item in list" v-bind:key="item.id" @click="to_page(item.id)">
				<u-badge size="default" type="success" :count="item.state"></u-badge>
				<u-image width="100%"  mode="widthFix" border-radius="4" :src="item.url"></u-image>
				<view class="title u-m-t-10 u-font-sm u-font-weight-bold">
					{{item.title}}
				</view>
				<text class="u-font-xs block u-m-t-20 u-type-info">
					{{item.types}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
			
		data(){
			return{
				url:'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313190800.png',
				list:[
					{
						'url':'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210312163542.png',
						'title':'3.12文明劝导活动',
						'type':'思想成长',
					},{
						'url':'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210312163640.png',
						'title':'食堂志愿者',
						'type':'思想成长',
					},{
						'url':'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210312163708.png',
						'title':'宣传部摄影培训',
						'type':'课外技巧',
					},{
						'url':'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210312163733.png',
						'title':'宣传部通讯稿培训',
						'type':'技能特长',
					},
				]
			}
		},
		onLoad() {
			this.$api.user.activeity().then(res=>{
				this.list = res.data.data
			})
		},
		methods:{
			to_page(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/app/activity/details?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding: 20rpx 20rpx 0 20rpx;
	}
	.img{
		height: auto;
		box-shadow: #e8e8e8 1px 1px 10px;
	}

	.box-list{
		.item{
			position: relative;
			width: 48%;
			box-shadow: #e8e8e8 1px 1px 10px;
			padding: 6px;
			.title{
				color: $uni-text-color;
			}
		}
	}
</style>
