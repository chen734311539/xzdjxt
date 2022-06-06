<template>
			<div class="audio_component">
				<audio :src="src" ref="audio"></audio>
				<div class="audio-box">
					<span class="time-font">
						{{second/60 > 9 ? parseInt(second/60) : '0'+parseInt(second/60) }}:{{second%60 >= 10 ? parseInt(second%60) : '0'+parseInt(second%60)}}
					</span>
				    <!-- <el-progress :percentage="progressing_audio" status="success" :stroke-width="4"  class="progress"></el-progress> -->
					<Progress :percent="progressing_audio" :hide-info="true" :stroke-width="4" class="progress" stroke-color="#19be6b"/>
				    <!-- <img :src="audioPlayShow ? imgA : imgB" class="rong-circle-control" @click="controlAudio()" /> -->
					<Icon  v-show="audioPlayShow" custom="iconfont iconbofang1" class="audio_icon" @click="controlAudio()"/>
					<Icon  v-show="!audioPlayShow" custom="iconfont iconzanting" class="audio_icon" @click="controlAudio()"/>
				</div>
			</div>
</template>
<script>
	export default {
		name: 'Audio',
		props:['src'],
		data() {
	      	return {
		        'progressing_audio' :0,
		        'audioPlayShow' : true,
		        "timer" : "" ,
		        "length-music" : 0 , 
		        'second' : 0
	     	};
	    },
	    methods:{
	    	controlAudio : function (){
				let audio0 = this.$refs.audio;
				let leng = audio0.duration;
				if ( this.audioPlayShow ){
						if (this.progressing_audio >= 100 ) {
						this.second = 0 ;
						this.progressing_audio = 0; 
						}
						audio0.play() ; 
						this.audioPlayShow = false ;
						this.timer = setInterval( () => {
						this.progressing_audio = (this.progressing_audio/100 + 0.1/leng)*100 ;
						this.second = this.second + 0.1 ; 
						if (this.progressing_audio >= 100 ) {
								clearInterval(this.timer);
								this.audioPlayShow = true ;
						}
			　　　　　}, 100)     		 	 
				} else {
						audio0.pause()
						this.audioPlayShow = true ;
						clearInterval(this.timer);
				}
	    	}
	    }
	}
  
  
</script>

<style scoped>
.audio_component{
	position: relative;
	float:left;
}
.audio_icon {
	margin-left : 10px ; 
	border-radius : 50% ; 
	margin-top: 12px;
	position:absolute;
	right:11px;
	cursor: pointer;
	color: white;
}
.time-font{
	margin-top:17px;
	font-size:3.8px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:5.4px;
	float:left ;
	margin-left : 10px ;
	
}
.audio-box {
	position: relative;
	height : 45px ; 
	width : 245px ; 
	padding :3.2px 4.8px ; 
	margin:6.4px;
	background:rgba(51,51,51,1);
	box-shadow:0px 14px 30px 0px rgba(154,159,182,0.1);
	border-radius:3px;
}
.progress{
	margin-top:10px;
	margin-left:6px;
	float:left;
	width:150px;
}
</style>