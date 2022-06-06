<template>
			<div class="audio_component">
				<div class="audio-box">
                    <Progress :percent="progressing_audio" :hide-info="true" :stroke-width="4" class="progress" stroke-color="#19be6b"/>
					<Icon  v-show="audioPlayShow" custom="iconfont iconbofang1" class="audio_icon" @click="controlAudio()"/>
					<Icon  v-show="!audioPlayShow" custom="iconfont iconzanting" class="audio_icon" @click="controlAudio()"/>
					<span class="time-font">
						{{second/60 > 9 ? parseInt(second/60) : '0'+parseInt(second/60) }}:{{second%60 >= 10 ? parseInt(second%60) : '0'+parseInt(second%60)}}
					</span>
				</div>
			</div>
</template>
<script>
	export default {
		name: 'Amr',
		props:['src'],
		data() {
	      	return {
		        'progressing_audio' :0,
		        'audioPlayShow' : true,
		        "timer" : "" ,
                'second' : 0,
                "amr":{}
	     	};
        },
	    methods:{
            initSoundWithUrl(){
                var BenzAMRRecorder = require('benz-amr-recorder');
                var amrplay = new BenzAMRRecorder();
                amrplay.initWithUrl(this.src);
                this.amr=amrplay;
            },
	    	controlAudio(){
				if ( this.audioPlayShow ){
					let leng = this.amr.getDuration();
						if (this.progressing_audio >= 100 ) {
						this.second = 0 ;
						this.progressing_audio = 0; 
						}
						this.amr.play();
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
						this.amr.stop();
						this.audioPlayShow = true ;
						clearInterval(this.timer);
				}
			},
		},
		created(){
			this.initSoundWithUrl();
		}
	}
  
  
</script>

<style scoped>
.audio_component{
    height: 50px;
    width: 95px;
	position: relative;
	float:left;
}
.audio_icon {
	position: absolute;
    right: 4px;
	margin-top: 13px;
	cursor: pointer;
	color: white;
}
.time-font{
	color:rgba(153,153,153,1);
	line-height:5.4px;
	float:left ;
	margin-left: 6px;
    margin-top: 3px;
}
.audio-box {
	position: relative;
	height : 50px; 
	width : 100px ; 
	background:rgba(51,51,51,1);
	box-shadow:0px 14px 30px 0px rgba(154,159,182,0.1);
	border-radius:3px;
}
.progress{
	margin-top:10px;
	margin-left:6px;
	float:left;
	width:70px;
}
</style>