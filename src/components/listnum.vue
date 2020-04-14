<template>
	<div class="detial"> 
	<MHeader :back="true" >列表优化</MHeader>
		 <div class="VirtualList cont" :style="{height: windowH +'px', width:windowW+'px'}">
			   <VirtualList :listData="data" :itemSize="60"/>
		  </div>
	</div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import VirtualList from '../base/VirtualList.vue'
let d = [];
for (let i = 0; i < 100000; i++) {
  d.push({ id: i, value: i });
}
export default {
	name: 'app',
	data() {
	    return {
	      data: d
		  
	    };
	  },
	  computed:{
		  windowW(){
			  return document.documentElement.clientWidth
		  },
		  windowH(){
			   return document.documentElement.clientHeight-40
		  }
	  },
	components: {
		VirtualList,
		MHeader
	}
};
	
	
</script>

<style>
	.detial{
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #fff;
	    z-index: 100;
	}
	.cont{
		padding-top: 40px;
	}
	.VirtualList{
			display: flex;
			justify-content: center;
			width: 80%;
			height: 90%;
		}
</style>
