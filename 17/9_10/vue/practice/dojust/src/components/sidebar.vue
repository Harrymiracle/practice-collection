<template>
  <div class="">
	<div class="cover" @click="changeCover" v-show="isShow">
	</div>
	<div class="sidebar" @click="stop" :class="{'moveSide': isShow}">
	</div>
  </div>	
</template>

<script>
	export default {
		data(){
			return {
				hasShow: false
			}
		},
		props: ['isShow'],
		computed: {
			
		},
		methods: {
			changeCover(){
				this.$emit('hid');
			},
			stop($event){
				$event.stopPropagation();
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.cover {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		box-sizing: border-box;
		transition: all 0.3s;
		z-index: 10;
		
	}
	.sidebar {
		width: 250px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background: #fff;
		z-index: 20;
		transition: transform 0.3s;
		transform: translateX(-250px);
		&.moveSide {
			transform: translateX(0);
		}
	}
	
</style>
