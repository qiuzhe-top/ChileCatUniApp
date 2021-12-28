<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 20:16:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\school_attendance\knowing_people.vue
-->
<template>
	<view class="people">
		<People @record="record" ref="people" :is_continuous="true" :is_custom_rule="false"  :rule_codename_store='"00007"' :init_people_store="'dorm_student_room_info'"></People>
		
		<view class="button-sp-area">
			<button type="mini" class="sub-button" v-on:tap="showTree">
				卫生扣分
				<text v-show="score != 0">（-{{ score }}）</text>
			</button>
			<view class="button-sp-area"><button type="mini" class="sub-button" v-on:tap="submint">提交</button></view>
		</view>
		
		<view  class="simpie_tag u-flex u-row-center u-col-center u-flex-wrap ">
			<u-tag v-for="(item,index) in form_simple_list" :key="item.id" 
					:text="item" type="info" closeable 
					:show="true" @close="delete_points(item,index)" />
		</view>
		
		<tki-tree
			ref="tkitree"
			:multiple="true"
			:range="dorm_point_rules"
			rangeKey="name"
			@confirm="treeConfirm"
			@cancel="treeCancel"
		></tki-tree>
	</view>
</template>

<script>
import People from './component/people.vue';
export default {
	components: {
		People
	},
	data() {
		return {
			// 待提交列表
			form_list:[],
			// 待提交列表 简易标题展示
			form_simple_list:[],
			// 寝室分数
			score: 0,
			// 寝室卫生扣分规则 id name
			dorm_point_rules: [],
		};
	},
	onLoad: function(option) {
		this.$store.dispatch('school_attendance_rule', {
			codename: "00006"
		}).then(res => {
			
				var rule_list = {}
				res.data.forEach(e => {
					e.name = e.name + " -" + e.score
					if (e.parent_id) {
						// 子规则
						e['showChild'] = true
						rule_list[e.parent_id]['children'].push(e)
					} else {
						if (!rule_list[e.id]) {
							rule_list[e.id] = e.id
						}
						e['show'] = true
						rule_list[e.id] = e
						// rule_list[e.id]['id'] = e.id
						// rule_list[e.id]['name'] = e.name
						// rule_list[e.id]['parent_id'] = e.parent_id
						// rule_list[e.id]['score'] = e.score
						if (!rule_list[e.id]['children']) {
							rule_list[e.id]['children'] = []
							// console.log(rule_list[e.id]['children'])

						}
					}
				})
				// console.log(rule_list)
				for(var i in rule_list){
					this.dorm_point_rules.push(rule_list[i])
				
				}
				
			
		})
	},		
	// onBackPress(e){
	// 	console.log("关闭?")
	// 	return this.$refs.people.is_onBackPress(e)
	// },
	methods: {
		
		
		// 个人违纪添加
		record(){
			var user_obj = this.$refs.people.user_obj
			// var form = this.$refs.people.form
			if (user_obj.reason != undefined && user_obj.reason.length!=0) {
				this.$data.form_list.push({
					reason:user_obj.reason,
					user_id:user_obj.user_id,
					reason_is_custom:false,
					status:0,
				})
				this.form_simple_list.push(user_obj.name+' '+user_obj.reason)
				user_obj.status = '0';
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				});
				this.$refs.people.init_user_obj()
			} else {
				uni.showToast({
					title: '添加失败，原因为空',
					icon: 'none'
				});
			}
		},
		// 发送请求
		submint() {
			uni.showLoading({
				title: '加载中'
			});
			this.$u.api.school_attendance_submit_health( {
				task_id: this.vuex_task.id,
				records: this.form_list,
				room_id: this.vuex_room_now.id, 
			}).then(res => {
				uni.showToast({
					title:"提交成功",
					duration: 6000
				});
				// uni.navigateBack({
				// 	delta: 1
				// });
				setTimeout(function() {
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					});
				}, 1000);
			});
		},

				// 显示树形选择器
		showTree() {
			this.$refs.tkitree._show();
		},
			// 确定回调事件
		treeConfirm(e) {
			e.forEach(res=>{
				var data = {
					"is_health_submit":true,
					"reason":res.id,
					"status":"0",
					"reason_is_custom":false
				}
				this.$data.form_list.push(data)
				this.form_simple_list.push(res.name)
			})
		},
		// 取消回调事件
		treeCancel(e) {
			console.log(e);
		},
		// 删除扣分
		delete_points(item,index){
			this.form_simple_list.splice(index,1)
			this.form_list.splice(index,1)
		}
	},

};
</script>

<style lang="scss">
.people .button-sp-area {
	margin-top: 80rpx;
}
.sub-button {
	width: 60%;
	color: #ffffff;
	background-color: #04b8fc;
}
.msg {
	display: inline-block;
	width: 100%;
	margin: 20rpx;
	color: $uni-text-color-disable;
	text-align: center;
}
.simpie_tag{
	padding: 20rpx;
	.u-tag {
		margin: 10rpx;
	}
}
</style>
