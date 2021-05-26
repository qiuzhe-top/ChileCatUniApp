<template>
	<view class="call">

		<u-popup v-model="show" mode="center" length="80%" height="80%" border-radius="14">
			
			<radio-group @change="select_sclass()" class="class-radio-group">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
				<view class="radio-box">
						<radio :value="item" :checked="index === current" />
						{{item}}
				</view>
					</label>
			</radio-group>
			
		</u-popup>

		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script>
	import pop from '@/components/ming-pop/ming-pop.vue';

	export default {
		data() {
			return {
				show: true,
				items: ['195101','195102','195101','195102']
			}
		},
		components: {
			pop
		},
		onLoad() {},
		methods: {
			open() {
				// this.$refs.pop.show()
			}
		}
	}
</script>

<style lang="scss">
	.class-radio-group{
		display: flex;
		// align-items: center;
		justify-content: space-around;
		padding: 20rpx;
		radio{
			display: inline;
		}
		.radio-box{
			// width: 50%;
			background-color: red;
			margin: 15px;
		}
	}
</style>
