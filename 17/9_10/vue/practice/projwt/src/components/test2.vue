<template>
	<div id="app3" v-if="data">
		<div  @click="show('citys')" class="el_dress">222</div>
		<citys-picker :city="data" :init-value="defaultVal" @confirm="confirm" ref="citys"></citys-picker>
	</div>
</template>

<script>
	import CitysPicker from 'vue-citys-picker'
	import CityData from './CityData.json'
	export default {
	  components: {
	    CitysPicker
	  },
	  data () {
	    return {
	      data: CityData,
	      defaultVal: [{
	        name: '天津',
	        value: '120000'
	      }, {
	        name: '天津市',
	        value: '120100'
	      }, {
	        name: '北辰区',
	        value: '120113'
	      }]
	    }
	  },
	  methods: {
	    confirm (values) {
	      console.log(values)
	      var texts = ""
	      $.each(values, function(index,item) {
	      	if(index == 0){
	      		texts += item.name
	      	}else{
	      		texts += '-'+item.name
	      	}
			console.log(texts)
	      });
	      $('.el_dress').text(texts)
	    },
	    show (name) {
	      this.$refs[name].open()
	    }
	  }
	}
</script>
<style>
	@import url("../assets/css/vue-citys-picker.css");
</style>