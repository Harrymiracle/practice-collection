<template>
	<div id="app2">
		<span @click="show('address')">213123123</span>
		<CitysPicker :city="data" :init-value="defaultVal" @confirm="confirm" ref="citys"></CitysPicker>
	</div>
</template>

<script>
	require ('vue-citys-picker/dist/vue-citys-picker.css');
	import CitysPicker from 'vue-citys-picker';
	require ('vue-citys-picker/example/CityData.json');
	
	export default {
	  name: 'app2',
	  components: { CitysPicker },
	  data () {
	    return {
	      data: CityData,
	    }
	  },
	  methods: {
	    confirm (values) {
	      console.log(values)
	    },
	    show (name) {
	      this.$refs[name].open()
	    }
	  }
	}
</script>

<style>
</style>