<template>
	<div class="CalendarPanel">
        <div class="titlePanel">
            <Select v-model="selectYear" size="small" class="yearSelectClass">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <div class="mouthSelectDivClass flexr" style="margin-right:-1px;" @click="clickPreMouth">
                <Icon custom="iconfont iconjiantouzuo" />
            </div>
            <Select v-model="selectMouth" size="small" class="mouthSelectClass">
                <Option v-for="item in mouthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <div class="mouthSelectDivClass flexr" style="margin-left:-1px;" @click="clickNextMouth">
                <Icon custom="iconfont iconjiantouyou" />
            </div>
        </div>
        <div class="xingqiPanel">
            <div class="xingqiPanelDiv">日</div>
            <div class="xingqiPanelDiv">一</div>
            <div class="xingqiPanelDiv">二</div>
            <div class="xingqiPanelDiv">三</div>
            <div class="xingqiPanelDiv">四</div>
            <div class="xingqiPanelDiv">五</div>
            <div class="xingqiPanelDiv">六</div>
        </div>
        <div class="dataPanel">
            <div class="datahang" :class="{datahang6week:(week6.length>0)}">
                <div class="datahangItemDiv" v-for="item in week1" :key="item.value" :class="{dateItemSelected:(currentDataItem==item.date),dateItemActivity:(item.title),dateItemToday:(todayDateItem==item.date)}" @click="clickDataItem(item)">
                    <div>{{item.name}}</div>
                    <div style="font-size:12px;margin-top:-5px;">{{item.title}}</div>
                </div>
            </div>
            <div class="datahang" :class="{datahang6week:(week6.length>0)}">
                <div class="datahangItemDiv" v-for="item in week2" :key="item.value" :class="{dateItemSelected:(currentDataItem==item.date),dateItemActivity:(item.title),dateItemToday:(todayDateItem==item.date)}" @click="clickDataItem(item)">
                    <div>{{item.name}}</div>
                    <div style="font-size:12px;margin-top:-5px;">{{item.title}}</div>
                </div>
            </div>
            <div class="datahang" :class="{datahang6week:(week6.length>0)}">
                 <div class="datahangItemDiv" v-for="item in week3" :key="item.value" :class="{dateItemSelected:(currentDataItem==item.date),dateItemActivity:(item.title),dateItemToday:(todayDateItem==item.date)}" @click="clickDataItem(item)">
                    <div>{{item.name}}</div>
                    <div style="font-size:12px;margin-top:-5px;">{{item.title}}</div>
                 </div>
            </div>
            <div class="datahang" :class="{datahang6week:(week6.length>0)}">
                <div class="datahangItemDiv" v-for="item in week4" :key="item.value" :class="{dateItemSelected:(currentDataItem==item.date),dateItemActivity:(item.title),dateItemToday:(todayDateItem==item.date)}" @click="clickDataItem(item)">
                    <div>{{item.name}}</div>
                    <div style="font-size:12px;margin-top:-5px;">{{item.title}}</div>
                </div>
            </div>
            <div class="datahang" :class="{datahang6week:(week6.length>0)}">
                <div class="datahangItemDiv" v-for="item in week5" :key="item.value" :class="{dateItemSelected:(currentDataItem==item.date),dateItemActivity:(item.title),dateItemToday:(todayDateItem==item.date)}" @click="clickDataItem(item)">
                    <div>{{item.name}}</div>
                    <div  style="font-size:12px;margin-top:-5px;">{{item.title}}</div>
                </div>
            </div>
            <div class="datahang" :class="{datahang6week:(week6.length>0)}" v-show="week6.length>0">
                <div class="datahangItemDiv" v-for="item in week6" :key="item.value" :class="{dateItemSelected:(currentDataItem==item.date),dateItemActivity:(item.title),dateItemToday:(todayDateItem==item.date)}" @click="clickDataItem(item)">
                    <div>{{item.name}}</div>
                    <div style="font-size:12px;margin-top:-5px;">{{item.title}}</div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
        name: 'Calendar',
        props:['refresh'],
		data() {
	      	return {
                  selectYear:2020,
                  selectMouth:1,
                  yearList:[],
                  mouthList:[],
                  currentDataItem:"",
                  todayDateItem:"",
                  week1:[],
                  week2:[],
                  week3:[],
                  week4:[],
                  week5:[],
                  week6:[],
                  garlList:[],
                  garlMap:{}
	     	};
	    },
	    methods:{
            clickPreMouth(){
                if(this.selectMouth==1){
                    this.selectMouth=12;
                    this.selectYear=this.selectYear-1;
                }else{
                    this.selectMouth = this.selectMouth -1;
                }
            },
            clickNextMouth(){
                if(this.selectMouth==12){
                    this.selectMouth=1;
                    this.selectYear=this.selectYear+1;
                }else{
                    this.selectMouth = this.selectMouth +1;
                }
            },
            clickDataItem(item){
                var value = item.date;
                if(value=="9999"){//空白的日子点击
                    return;
                }
                if(this.currentDataItem==value){
                     this.currentDataItem="";
                }else{
                    this.currentDataItem = value;
                }
                var title = (item.title==null?"":(item.title));
                this.$emit('on-click',this.currentDataItem,title);
            },
            getDateItem(){
                this.week1 = [];
                this.week2 = [];
                this.week3 = [];
                this.week4 = [];
                this.week5 = [];
                this.week6 = [];
                var date1 = new Date(this.selectYear,this.selectMouth,0);
                var datenum = date1.getDate();//总天数
                var date2 = new Date(this.selectYear+","+this.selectMouth+",01");
                var xingqi = date2.getDay();//第一天星期几
                
                for(var i=0;i<xingqi;i++){
                    var obj={};
                    obj.value="wu"+i;
                    obj.name=""
                    obj.date="9999";
                    this.week1.push(obj);
                }
                var num = 0;
                for(var i=1;i<=7-xingqi;i++){
                    num++;
                    var obj={};
                    obj.value=i;
                    obj.name=i;
                    obj.date=this.selectYear+"-"+this.selectMouth+"-"+i;
                    if(this.garlMap[obj.date]){
                        obj.title = this.garlMap[obj.date].title;
                    }
                    this.week1.push(obj);
                }
                var start = num+1;
                var end = num+7;
                for(var i=start;i<=end;i++){
                    num++;
                    var obj={};
                    obj.value=i;
                    obj.name=i;
                    obj.date=this.selectYear+"-"+this.selectMouth+"-"+i;
                    if(this.garlMap[obj.date]){
                        obj.title = this.garlMap[obj.date].title;
                    }
                    this.week2.push(obj);
                }
                start = num+1;
                end = num+7;
                if(end>datenum){
                    end = datenum;
                }
                for(var i=start;i<=end;i++){
                    num++;
                    var obj={};
                    obj.value=i;
                    obj.name=i;
                    obj.date=this.selectYear+"-"+this.selectMouth+"-"+i;
                    if(this.garlMap[obj.date]){
                        obj.title = this.garlMap[obj.date].title;
                    }
                    this.week3.push(obj);
                }
                start = num+1;
                end = num+7;
                if(end>datenum){
                    end = datenum;
                }
                for(var i=start;i<=end;i++){
                    num++;
                    var obj={};
                    obj.value=i;
                    obj.name=i;
                    obj.date=this.selectYear+"-"+this.selectMouth+"-"+i;
                    if(this.garlMap[obj.date]){
                        obj.title = this.garlMap[obj.date].title;
                    }
                    this.week4.push(obj);
                }
                start = num+1;
                end = num+7;
                if(end>datenum){
                    end = datenum;
                }
                for(var i=start;i<=end;i++){
                    num++;
                    var obj={};
                    obj.value=i;
                    obj.name=i;
                    obj.date=this.selectYear+"-"+this.selectMouth+"-"+i;
                    if(this.garlMap[obj.date]){
                        obj.title = this.garlMap[obj.date].title;
                    }
                    this.week5.push(obj);
                }
                //可能还有
                start = num+1;
                end = num+7;
                if(end>datenum){
                    end = datenum;
                }
                for(var i=start;i<=end;i++){
                    num++;
                    var obj={};
                    obj.value=i;
                    obj.name=i;
                    obj.date=this.selectYear+"-"+this.selectMouth+"-"+i;
                    if(this.garlMap[obj.date]){
                        obj.title = this.garlMap[obj.date].title;
                    }
                    this.week6.push(obj);
                }
            },
            getGarl(){//获取公安日历
                var paramObj={};
                paramObj.type="garl";
                this.http.get("/tzgg/getTzgg",paramObj,this.getGarlCallBack,this,false);
            },
            getGarlCallBack(data){
                this.garlList=data.data;
                this.garlMap = {};
                for(var i = 0;i<this.garlList.length;i++){
                    var obj = this.garlList[i];
                    this.garlMap[obj.time]=obj;
                }
                this.getDateItem();
            },
        },
        created(){
            var date = new Date();
            this.selectYear = date.getFullYear();
            this.selectMouth = date.getMonth() + 1;
            this.todayDateItem = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            for(var i = this.selectYear - 2;i <=this.selectYear + 2;i++){
                var obj={};
                obj.value = i;
                obj.name = i+"年";
                this.yearList.push(obj);
            }
            for(var i=1;i<=12;i++){
                var obj={};
                obj.value = i;
                obj.name = i+"月";
                this.mouthList.push(obj);
            }
            this.getGarl();
        },
        mounted(){
            
        },
        watch : {
            selectMouth:function(val) {
                this.getGarl();
         
            },
            selectYear:function(val) {
                this.getGarl();
            },
            refresh:function(val){
                this.getGarl();
            }
        }
	}
  
  
</script>

<style scoped>
.CalendarPanel{
    position: relative;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg,rgba(0, 0, 0,0.1) 0,rgba(0, 0, 0,0.7) 20%,rgba(0, 0, 0,0.7) 80%,rgba(0, 0, 0,0.1) 100%);
    padding-left: 5px;
    padding-right: 5px;
    z-index: 2;
}
.titlePanel{
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.yearSelectClass{
    width: 75px;
    margin-right: 20px;
}
.yearSelectClass >>> .ivu-select-selection{
    border: #222e46 1px solid;
}
.mouthSelectClass{
    width: 65px;
}
.mouthSelectClass >>> .ivu-select-selection{
    border: #222e46 1px solid;
}
.mouthSelectClass >>> .ivu-select-dropdown{
    height: 160px;
}
.mouthSelectDivClass{
    height: 24px;
    width: 24px;
    border: #222e46 1px solid;
    color: white;
    cursor: pointer;
}
.xingqiPanel{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: #222e46 1px solid;
}
.xingqiPanelDiv{
    height: 100%;
    width: 14.28%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    user-select: none;
}
.dataPanel{
    width: 100%;
    height: calc(100% - 30px - 30px);
}
.datahang{
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: #222e46 1px solid;
}
.datahang6week{
    height: 16.6666%;
}
.datahangItemDiv{
    height: 100%;
    width: 14.28%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
    color: white;
    user-select: none;
    cursor: pointer;
}
.dateItemActivity{
    background:red;
}
.dateItemToday{
    background:green;
}
.dateItemSelected{
    background: rgba(236, 133, 14, 1);
}
</style>