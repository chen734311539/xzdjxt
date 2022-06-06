<template>
    <div class="jqbbpanel">
       <LeftContentNameBar :isshowshaixuan="false" />
        <!-- <AllDeptTree @on-click="clickTree" class="jqbbpanel-treePanel" :deptListObj="deptListObj"/> -->
        <!-- hfxTreelListObj树数据 showname树中展示的名字 uniquekey树中的唯一键  isExpand是否展开 customicon自定义图标(需要在HfxTreeItem中根据customiconexample写一个css并把css名字传入) -->
        <!-- <HfxTree @on-click="clickTree" class="jqbbpanel-treePanel" :hfxTreelListObj="testlistObj" showname="deptname" uniquekey="deptno" :isExpand="false" customicon="customiconexample"/> -->
        <HfxTree @on-click="clickTree" class="jqbbpanel-treePanel" :hfxTreelListObj="deptListObj" showname="deptname" uniquekey="deptcode" :isExpand="true" customicon="customicondept"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AllDeptTree from '@/components/base/AllDeptTree'
import HfxTree from '@/components/base/HfxTree'
import LeftContentNameBar from '@/components/content/LeftContentNameBar'
export default {
  name: 'Jqbb',
  components: { AllDeptTree,LeftContentNameBar,HfxTree},
  data () {
    return {
      testlistObj:{
    "id": "5E993C2235C1408BB11A28D68722E21D",
    "deptno": "0",
    "deptname": "主控制中心",
    "indexcode": "0",
    "jkcode": "0",
    "pdeptno": "-1",
    "inserttime": "2019-01-17 11:16:03",
    "level": "0",
    "children": [
        {
            "id": "2301BB1F73D2474ABBE6CD0854BFD37E",
            "deptno": "33",
            "deptname": "浙江省",
            "indexcode": "33",
            "jkcode": "33",
            "pdeptno": "0",
            "inserttime": "2019-01-17 11:16:03",
            "level": "1",
            "children": [
                {
                    "id": "756140632D054D56B9B3F8FB9DF46506",
                    "deptno": "3304",
                    "deptname": "嘉兴市",
                    "indexcode": "3304",
                    "jkcode": "3304",
                    "pdeptno": "33",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "8B1B9FF2F85343BD9362E2C7E2562084",
                            "deptno": "33040071",
                            "deptname": "立元卡口设备2",
                            "indexcode": "33040071",
                            "jkcode": "33040071",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        },
                        {
                            "id": "9DDE7361741641358A4D22367EBFA5AD",
                            "deptno": "330411000000",
                            "deptname": "秀洲区",
                            "indexcode": "330411000000",
                            "jkcode": "330411000000",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        },
                        {
                            "id": "A147D19539FD4040AF5E374EB748996E",
                            "deptno": "33040003",
                            "deptname": "立元卡口设备",
                            "indexcode": "33040003",
                            "jkcode": "33040003",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        },
                        {
                            "id": "A3A31919FC3E496F843DCD370800CBED",
                            "deptno": "33040000002160088781",
                            "deptname": "立元卡口设备",
                            "indexcode": "33040000002160088781",
                            "jkcode": "33040000002160088781",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        },
                        {
                            "id": "B5256DF7ADF1470BA76D154741A91D85",
                            "deptno": "330499000000",
                            "deptname": "经开区",
                            "indexcode": "330499000000",
                            "jkcode": "330499000000",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3",
                            "children": [
                                {
                                    "id": "1068A9CF2D5F4584AC59D7FDD291FE22",
                                    "deptno": "19011107402160054662",
                                    "deptname": "高铁南站",
                                    "indexcode": "19011107402160054662",
                                    "jkcode": "19011107402160054662",
                                    "pdeptno": "330499000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4"
                                },
                                {
                                    "id": "471D52FA5B37492EA07F40364EEA1B35",
                                    "deptno": "19011107402160944671",
                                    "deptname": "汽车北站",
                                    "indexcode": "19011107402160944671",
                                    "jkcode": "19011107402160944671",
                                    "pdeptno": "330499000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4"
                                },
                                {
                                    "id": "472F7DAF576A423B968EF4F8FB1C1248",
                                    "deptno": "18091310012160354732",
                                    "deptname": "经开区",
                                    "indexcode": "18091310012160354732",
                                    "jkcode": "18091310012160354732",
                                    "pdeptno": "330499000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4"
                                },
                                {
                                    "id": "D1875C21CCE3473EA6AA76DC1D52048B",
                                    "deptno": "19011107402160615971",
                                    "deptname": "客运中心",
                                    "indexcode": "19011107402160615971",
                                    "jkcode": "19011107402160615971",
                                    "pdeptno": "330499000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4"
                                }
                            ]
                        },
                        {
                            "id": "D737F63D94C44DDEB95C6C9BD2DAF72F",
                            "deptno": "330402000000",
                            "deptname": "南湖区",
                            "indexcode": "330402000000",
                            "jkcode": "330402000000",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3",
                            "children": [
                                {
                                    "id": "04E1F7C308D644689269A86A43871EFB",
                                    "deptno": "330000000000000099",
                                    "deptname": "区公安局",
                                    "indexcode": "330000000000000099",
                                    "jkcode": "330000000000000099",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "03BB8897367B4C2FB27951D88339BA86",
                                            "deptno": "18122502252160050572",
                                            "deptname": "新嘉_智慧小区",
                                            "indexcode": "18122502252160050572",
                                            "jkcode": "18122502252160050572",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "0526E564B7A345B184067C4147B0AE6E",
                                            "deptno": "330000000099885690",
                                            "deptname": "南湖区学校",
                                            "indexcode": "330000000099885690",
                                            "jkcode": "330000000099885690",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "1448C87FC38F4CCF9EA28154F8DA35A3",
                                            "deptno": "33040200002160190841",
                                            "deptname": "七星政府人脸",
                                            "indexcode": "33040200002160190841",
                                            "jkcode": "33040200002160190841",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "1528D4457D6843AEBCD955924B6627CC",
                                            "deptno": "18120612182160103350",
                                            "deptname": "菜花泾",
                                            "indexcode": "18120612182160103350",
                                            "jkcode": "18120612182160103350",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "15778FD42AE64E909587F20AD27AF9BF",
                                            "deptno": "330000000028827190",
                                            "deptname": "大桥临时",
                                            "indexcode": "330000000028827190",
                                            "jkcode": "330000000028827190",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "28D4EDB0C681438A91AD1F3F57A47405",
                                            "deptno": "18102908022160216940",
                                            "deptname": "鹰眼",
                                            "indexcode": "18102908022160216940",
                                            "jkcode": "18102908022160216940",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "2CEE2F8A2014469FB0DC347C8EFF4F95",
                                            "deptno": "330000000007686790",
                                            "deptname": "勤务路线",
                                            "indexcode": "330000000007686790",
                                            "jkcode": "330000000007686790",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "0169BC27A32B495186EAB84B57B8F6E6",
                                                    "deptno": "330000000044608790",
                                                    "deptname": "勤务南湖",
                                                    "indexcode": "330000000044608790",
                                                    "jkcode": "330000000044608790",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "36074CFE5E674EFE9FEA6C3AC505FCC0",
                                                    "deptno": "330000000058878590",
                                                    "deptname": "勤务新嘉",
                                                    "indexcode": "330000000058878590",
                                                    "jkcode": "330000000058878590",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "53207D318211469388CC256A67FDACC8",
                                                    "deptno": "330000000073954690",
                                                    "deptname": "勤务余新",
                                                    "indexcode": "330000000073954690",
                                                    "jkcode": "330000000073954690",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6605F2E1F3964E44A1C5112179326588",
                                                    "deptno": "330000000013196490",
                                                    "deptname": "勤务建设",
                                                    "indexcode": "330000000013196490",
                                                    "jkcode": "330000000013196490",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "85554C93C2D6419181E998D1ADC7AB93",
                                                    "deptno": "330000000025888390",
                                                    "deptname": "勤务七星",
                                                    "indexcode": "330000000025888390",
                                                    "jkcode": "330000000025888390",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "960D537EDFDD44E4A94BD85A0E704BD4",
                                                    "deptno": "330000000009094790",
                                                    "deptname": "勤务新丰",
                                                    "indexcode": "330000000009094790",
                                                    "jkcode": "330000000009094790",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "A90DF3AACBEE4F9F85E2ED041261A180",
                                                    "deptno": "330000000056645290",
                                                    "deptname": "端午勤务",
                                                    "indexcode": "330000000056645290",
                                                    "jkcode": "330000000056645290",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "E14720CBD10D4CE49F1ABA47F133F187",
                                                    "deptno": "330000000075873090",
                                                    "deptname": "勤务大桥",
                                                    "indexcode": "330000000075873090",
                                                    "jkcode": "330000000075873090",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F20FEF9B8E474A9387929E87AD7CBB52",
                                                    "deptno": "330000000026819090",
                                                    "deptname": "勤务凤桥",
                                                    "indexcode": "330000000026819090",
                                                    "jkcode": "330000000026819090",
                                                    "pdeptno": "330000000007686790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "2E358C2A39EC4054BE6BA8F62A887C16",
                                            "deptno": "330000000043879490",
                                            "deptname": "社区视频",
                                            "indexcode": "330000000043879490",
                                            "jkcode": "330000000043879490",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "478D449BC0D945ABB9C1083AE3140930",
                                                    "deptno": "330000000073238890",
                                                    "deptname": "清河社区",
                                                    "indexcode": "330000000073238890",
                                                    "jkcode": "330000000073238890",
                                                    "pdeptno": "330000000043879490",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C7A2765CE6E74B21AADBFBF326968174",
                                                    "deptno": "330000000060521690",
                                                    "deptname": "西马桥社区",
                                                    "indexcode": "330000000060521690",
                                                    "jkcode": "330000000060521690",
                                                    "pdeptno": "330000000043879490",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "30085721D88B477BAF886CD181828A6E",
                                            "deptno": "18092708032160095082",
                                            "deptname": "凤桥凤凰绿都",
                                            "indexcode": "18092708032160095082",
                                            "jkcode": "18092708032160095082",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "36ABEEAE67384DC78536DD8C7927E3BC",
                                            "deptno": "330000000013396790",
                                            "deptname": "雪亮工程",
                                            "indexcode": "330000000013396790",
                                            "jkcode": "330000000013396790",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "3A6B99CE5E5245E7A395FB3034B199AE",
                                            "deptno": "330000000001378590",
                                            "deptname": "南湖区学校高清",
                                            "indexcode": "330000000001378590",
                                            "jkcode": "330000000001378590",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "3B61563170214B08AB13F5286555E118",
                                            "deptno": "18083109072160770199",
                                            "deptname": "南湖分局",
                                            "indexcode": "18083109072160770199",
                                            "jkcode": "18083109072160770199",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "3C66DEEA48DE44719A045DCD9EACAC55",
                                            "deptno": "180630101842029990",
                                            "deptname": "南湖指挥中心",
                                            "indexcode": "180630101842029990",
                                            "jkcode": "180630101842029990",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "3E30520564A74C27829B9619FD16145E",
                                            "deptno": "18092708032160936115",
                                            "deptname": "余新普光村",
                                            "indexcode": "18092708032160936115",
                                            "jkcode": "18092708032160936115",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "40DBCAF519214B84A3F74283B76B6636",
                                            "deptno": "18082205202160700101",
                                            "deptname": "临时人脸点位",
                                            "indexcode": "18082205202160700101",
                                            "jkcode": "18082205202160700101",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "45CD4FDB5CCC4504909C78536BBFAB09",
                                            "deptno": "18122502252160055234",
                                            "deptname": "新兴_智慧小区",
                                            "indexcode": "18122502252160055234",
                                            "jkcode": "18122502252160055234",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "49C7AD8EE03A487BB82098B9EFA7457B",
                                            "deptno": "18083109082160537897",
                                            "deptname": "企事业单位",
                                            "indexcode": "18083109082160537897",
                                            "jkcode": "18083109082160537897",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "54D2CA09DEC844D49986539AC908FCF2",
                                            "deptno": "18122502262160150134",
                                            "deptname": "新丰_智慧小区",
                                            "indexcode": "18122502262160150134",
                                            "jkcode": "18122502262160150134",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5906C364624D4EE9B7AC31CF1462D2C1",
                                            "deptno": "330000000017444790",
                                            "deptname": "电信大屏",
                                            "indexcode": "330000000017444790",
                                            "jkcode": "330000000017444790",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "592C96A4A8384239A17F08C63021505F",
                                            "deptno": "18122406052160701699",
                                            "deptname": "宗教",
                                            "indexcode": "18122406052160701699",
                                            "jkcode": "18122406052160701699",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "64731E0315E84B3FA8FCDDE366B210DA",
                                            "deptno": "330000000013454790",
                                            "deptname": "车辆控制",
                                            "indexcode": "330000000013454790",
                                            "jkcode": "330000000013454790",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "70F2CA078A4B43748548348B28DFC54B",
                                            "deptno": "330000000066802290",
                                            "deptname": "南湖区指挥中心",
                                            "indexcode": "330000000066802290",
                                            "jkcode": "330000000066802290",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "77D0CB9171434F5AA534F63F95F0BB1B",
                                            "deptno": "330000000005863690",
                                            "deptname": "南湖周边",
                                            "indexcode": "330000000005863690",
                                            "jkcode": "330000000005863690",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7DA9442048104D90BDD4E603D83668F7",
                                            "deptno": "18120410352160125362",
                                            "deptname": "南湖分局_六期",
                                            "indexcode": "18120410352160125362",
                                            "jkcode": "18120410352160125362",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7E16AA4812304FA09A2C76EABF4F46ED",
                                            "deptno": "18092701242160595125",
                                            "deptname": "智慧南湖",
                                            "indexcode": "18092701242160595125",
                                            "jkcode": "18092701242160595125",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8BA239D30DF240278C2DAA3FCE9146C2",
                                            "deptno": "330000000073354790",
                                            "deptname": "南湖周边核心区域",
                                            "indexcode": "330000000073354790",
                                            "jkcode": "330000000073354790",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "931E2F7C765B4DF8BC095F25A61B535E",
                                            "deptno": "330000000015539690",
                                            "deptname": "测试",
                                            "indexcode": "330000000015539690",
                                            "jkcode": "330000000015539690",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "C8CE122E5DD545DC9DE85FA2EC4AD6E0",
                                                    "deptno": "33000000002160832698",
                                                    "deptname": "横幅检测测试",
                                                    "indexcode": "33000000002160832698",
                                                    "jkcode": "33000000002160832698",
                                                    "pdeptno": "330000000015539690",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "99335B32E13A47758E20F23F3508AEE3",
                                            "deptno": "18122502262160413668",
                                            "deptname": "大桥_智慧小区",
                                            "indexcode": "18122502262160413668",
                                            "jkcode": "18122502262160413668",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "99451C29F2064CA3B3224F3D9A7E3929",
                                            "deptno": "18111305472160203774",
                                            "deptname": "小区",
                                            "indexcode": "18111305472160203774",
                                            "jkcode": "18111305472160203774",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9CB1083DA89C4460AF93F9A558F780B7",
                                            "deptno": "18092804372160091881",
                                            "deptname": "幸福家园",
                                            "indexcode": "18092804372160091881",
                                            "jkcode": "18092804372160091881",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9F7C996224EF445C9309E4AD3EE6CA2A",
                                            "deptno": "330000000011824590",
                                            "deptname": "南湖警备路线",
                                            "indexcode": "330000000011824590",
                                            "jkcode": "330000000011824590",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "F7DB07DAB4CB440E83798BFF03FCBCFF",
                                                    "deptno": "330000000054268790",
                                                    "deptname": "凤桥",
                                                    "indexcode": "330000000054268790",
                                                    "jkcode": "330000000054268790",
                                                    "pdeptno": "330000000011824590",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "A968E0A39F924CC1AC4141D610C87DD0",
                                            "deptno": "18122502252160250097",
                                            "deptname": "解放_智慧小区",
                                            "indexcode": "18122502252160250097",
                                            "jkcode": "18122502252160250097",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "AA4B8B0E0AA24C5DBBFD2E5A1E2A0BCA",
                                            "deptno": "330000000073273390",
                                            "deptname": "亚太路",
                                            "indexcode": "330000000073273390",
                                            "jkcode": "330000000073273390",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B16C67F43A8649D980FFB7FB28E00524",
                                            "deptno": "330000000040981090",
                                            "deptname": "七星镇政府",
                                            "indexcode": "330000000040981090",
                                            "jkcode": "330000000040981090",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B3EF37873C8B4EB7A77AE3DC7E05710B",
                                            "deptno": "18122502262160101538",
                                            "deptname": "七星_智慧小区",
                                            "indexcode": "18122502262160101538",
                                            "jkcode": "18122502262160101538",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "BC7B11BF6D194738B5B6AE736BA48EED",
                                            "deptno": "18122502262160320958",
                                            "deptname": "东栅_智慧小区",
                                            "indexcode": "18122502262160320958",
                                            "jkcode": "18122502262160320958",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "BD2F003063C844B4B4985A0F9D233F97",
                                            "deptno": "330000010069231399",
                                            "deptname": "演唱会人脸",
                                            "indexcode": "330000010069231399",
                                            "jkcode": "330000010069231399",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "D2F1637EB608401A909F9E540DA275E0",
                                                    "deptno": "330000010065748290",
                                                    "deptname": "演唱会人脸",
                                                    "indexcode": "330000010065748290",
                                                    "jkcode": "330000010065748290",
                                                    "pdeptno": "330000010069231399",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "C152E228A485478D8189D9B03A9EB7F6",
                                            "deptno": "330000000060531990",
                                            "deptname": "环区封控堵截",
                                            "indexcode": "330000000060531990",
                                            "jkcode": "330000000060531990",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "1D91E469930E455F9AC8360FCDBB1CE5",
                                                    "deptno": "330000000010197990",
                                                    "deptname": "一类",
                                                    "indexcode": "330000000010197990",
                                                    "jkcode": "330000000010197990",
                                                    "pdeptno": "330000000060531990",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "47CC63E41A1B454895DBA2A75C479D8B",
                                                    "deptno": "330000000068111490",
                                                    "deptname": "二类",
                                                    "indexcode": "330000000068111490",
                                                    "jkcode": "330000000068111490",
                                                    "pdeptno": "330000000060531990",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6780B977E6AA4965B968565C704BD112",
                                                    "deptno": "330000000063096490",
                                                    "deptname": "三类",
                                                    "indexcode": "330000000063096490",
                                                    "jkcode": "330000000063096490",
                                                    "pdeptno": "330000000060531990",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "C3024D69FB4D4BF0AE3E470DA9D2565A",
                                            "deptno": "18092708382160338049",
                                            "deptname": "七星花园",
                                            "indexcode": "18092708382160338049",
                                            "jkcode": "18092708382160338049",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CADA27BDB0CF4C32BE62C1B9F14B07BC",
                                            "deptno": "18092910512160253880",
                                            "deptname": "南湖区环境保护局",
                                            "indexcode": "18092910512160253880",
                                            "jkcode": "18092910512160253880",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CD4E1364E4344053ADBD560D3C448FD8",
                                            "deptno": "18093003242160342667",
                                            "deptname": "丽景家园",
                                            "indexcode": "18093003242160342667",
                                            "jkcode": "18093003242160342667",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D03BD2B243CB44AEAEDE10EB9C5BDB65",
                                            "deptno": "18122502252160329120",
                                            "deptname": "南湖_智慧小区",
                                            "indexcode": "18122502252160329120",
                                            "jkcode": "18122502252160329120",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D0F1FF06C54A4C5B92C3AE25913DFBD1",
                                            "deptno": "18092909122160056687",
                                            "deptname": "新湖绿都",
                                            "indexcode": "18092909122160056687",
                                            "jkcode": "18092909122160056687",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D45876486A9347A69901A0596EB2FBE9",
                                            "deptno": "18101501222160744808",
                                            "deptname": "娱乐会所",
                                            "indexcode": "18101501222160744808",
                                            "jkcode": "18101501222160744808",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D747B8215D644E77A5C87DFDCC8ED407",
                                            "deptno": "18092808352160084533",
                                            "deptname": "小普陀寺",
                                            "indexcode": "18092808352160084533",
                                            "jkcode": "18092808352160084533",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "E77A2BA054D242B89F0569B2EBFF42D7",
                                            "deptno": "18092808352160572700",
                                            "deptname": "恩爱堂",
                                            "indexcode": "18092808352160572700",
                                            "jkcode": "18092808352160572700",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "E795DB8BEB1B4ECDB435DBD4C8446ACB",
                                            "deptno": "18122502262160468946",
                                            "deptname": "余新_智慧小区",
                                            "indexcode": "18122502262160468946",
                                            "jkcode": "18122502262160468946",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "ED53CFAD9A1848A89E83EC32C7BADD58",
                                            "deptno": "18090810142160327867",
                                            "deptname": "南湖公安分局临时",
                                            "indexcode": "18090810142160327867",
                                            "jkcode": "18090810142160327867",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F46FAD08C46D485294C7352CAB8D5E4B",
                                            "deptno": "330000000051707090",
                                            "deptname": "七星中学临时",
                                            "indexcode": "330000000051707090",
                                            "jkcode": "330000000051707090",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F81ACE09B64D446EB5666C981F50F447",
                                            "deptno": "330000000083812390",
                                            "deptname": "嘉控电气",
                                            "indexcode": "330000000083812390",
                                            "jkcode": "330000000083812390",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F8CB3FA1859D45F3ACC15648C5E266EA",
                                            "deptno": "18122502252160971206",
                                            "deptname": "建设_智慧小区",
                                            "indexcode": "18122502252160971206",
                                            "jkcode": "18122502252160971206",
                                            "pdeptno": "330000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "0C26C825F3BB4EA8A287C720E228701E",
                                    "deptno": "330402590000",
                                    "deptname": "新丰派出所",
                                    "indexcode": "330402590000",
                                    "jkcode": "330402590000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "2B040FB9609C4D018A0EBDE7A51E4A4A",
                                            "deptno": "18110804122160301790",
                                            "deptname": "新丰_智慧小区",
                                            "indexcode": "18110804122160301790",
                                            "jkcode": "18110804122160301790",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "1B6D335E49C44F67B6294CDF81BB19CE",
                                                    "deptno": "18110804122160653042",
                                                    "deptname": "黄鹤小区",
                                                    "indexcode": "18110804122160653042",
                                                    "jkcode": "18110804122160653042",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1CDB0A3D909B44DFAC11E504B3ADDCD3",
                                                    "deptno": "18110804122160571505",
                                                    "deptname": "北庄东苑",
                                                    "indexcode": "18110804122160571505",
                                                    "jkcode": "18110804122160571505",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2677FC1B711742C483CA02C71D4B0AE5",
                                                    "deptno": "18110804122160493251",
                                                    "deptname": "御翠花园",
                                                    "indexcode": "18110804122160493251",
                                                    "jkcode": "18110804122160493251",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2F9ECB11164F45C0A5D452953FA26061",
                                                    "deptno": "18110804122160917567",
                                                    "deptname": "双龙景园",
                                                    "indexcode": "18110804122160917567",
                                                    "jkcode": "18110804122160917567",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3305B85F484F483388CD6C0BB5169490",
                                                    "deptno": "18110804122160471640",
                                                    "deptname": "新丰乌桥",
                                                    "indexcode": "18110804122160471640",
                                                    "jkcode": "18110804122160471640",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "523C59B6756843DF95F5414AA2385A78",
                                                    "deptno": "18110804122160582565",
                                                    "deptname": "丽景家园",
                                                    "indexcode": "18110804122160582565",
                                                    "jkcode": "18110804122160582565",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "64CD21D29E4F4EFBBCCEA480D0BC8103",
                                                    "deptno": "18110804122160917601",
                                                    "deptname": "南庄院",
                                                    "indexcode": "18110804122160917601",
                                                    "jkcode": "18110804122160917601",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "895411B8DC294E3EB30564DA05576DC3",
                                                    "deptno": "18110804122160338049",
                                                    "deptname": "东方润园",
                                                    "indexcode": "18110804122160338049",
                                                    "jkcode": "18110804122160338049",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "991C4E1D37B04506A1F2C0F271F64D1B",
                                                    "deptno": "18110804122160615519",
                                                    "deptname": "双龙景苑",
                                                    "indexcode": "18110804122160615519",
                                                    "jkcode": "18110804122160615519",
                                                    "pdeptno": "18110804122160301790",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "35D6AEB04853402690C49D06242F343B",
                                            "deptno": "18120603572160828119",
                                            "deptname": "新丰_七期",
                                            "indexcode": "18120603572160828119",
                                            "jkcode": "18120603572160828119",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4621C5A71583462CAE9F258A1BB9FA43",
                                            "deptno": "330900000077536590",
                                            "deptname": "新丰_自建三期",
                                            "indexcode": "330900000077536590",
                                            "jkcode": "330900000077536590",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4AB3F3851E2D47F689018AA86DB8F8E3",
                                            "deptno": "330900000073243290",
                                            "deptname": "新丰_自建五期",
                                            "indexcode": "330900000073243290",
                                            "jkcode": "330900000073243290",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4F0EC2E0C1F2434FA2552F31410A8FBF",
                                            "deptno": "330900000053075090",
                                            "deptname": "新丰_自建二期",
                                            "indexcode": "330900000053075090",
                                            "jkcode": "330900000053075090",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "6F719A1CFA414AC1A3FAB3B13F62C39D",
                                            "deptno": "330900000053964990",
                                            "deptname": "新丰_电信二期",
                                            "indexcode": "330900000053964990",
                                            "jkcode": "330900000053964990",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "843B7A863F904307A8240686A6052EA9",
                                            "deptno": "330900000087128290",
                                            "deptname": "新丰-学校",
                                            "indexcode": "330900000087128290",
                                            "jkcode": "330900000087128290",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8B9B0BFF8D1E4D83A3A9DC297DAE35D0",
                                            "deptno": "330900000026527590",
                                            "deptname": "新丰_自建一期",
                                            "indexcode": "330900000026527590",
                                            "jkcode": "330900000026527590",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "923B9FFD1F234B6189F6E0CBFD5F6A2C",
                                            "deptno": "18101508582160633880",
                                            "deptname": "新丰_自建六期",
                                            "indexcode": "18101508582160633880",
                                            "jkcode": "18101508582160633880",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C74C31E2033447E8B8EAAEA0D2AB188F",
                                            "deptno": "330900000081476090",
                                            "deptname": "新丰_电信一期",
                                            "indexcode": "330900000081476090",
                                            "jkcode": "330900000081476090",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "DC4947B6D6694C93A72AAD50EC3E7FF2",
                                            "deptno": "18092701192160720959",
                                            "deptname": "新丰_电信二期模改数",
                                            "indexcode": "18092701192160720959",
                                            "jkcode": "18092701192160720959",
                                            "pdeptno": "330402590000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "1D5A6776031840F2B7F820156DFAC9CC",
                                    "deptno": "330402550000",
                                    "deptname": "建设派出所",
                                    "indexcode": "330402550000",
                                    "jkcode": "330402550000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "113F6DD90F444AC08035DBAE0033E447",
                                            "deptno": "18110812402160557621",
                                            "deptname": "小区",
                                            "indexcode": "18110812402160557621",
                                            "jkcode": "18110812402160557621",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "182BB705CF7D45D5BF4E52AE42A09BBA",
                                            "deptno": "18120610352160314676",
                                            "deptname": "建设_自建六期",
                                            "indexcode": "18120610352160314676",
                                            "jkcode": "18120610352160314676",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "22478D9819834825A0DCF2664C39CE0A",
                                            "deptno": "330400000072973990",
                                            "deptname": "建设_自建一期",
                                            "indexcode": "330400000072973990",
                                            "jkcode": "330400000072973990",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "34054A8EF52F443BB7E3510D72CB6361",
                                            "deptno": "19010911402160837798",
                                            "deptname": "宗教",
                                            "indexcode": "19010911402160837798",
                                            "jkcode": "19010911402160837798",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4E1EC609786E4F39B9FAA12152C9FCD6",
                                            "deptno": "18122502312160556294",
                                            "deptname": "建设_智慧小区",
                                            "indexcode": "18122502312160556294",
                                            "jkcode": "18122502312160556294",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "06384F6071414284A7CA65B4DB8B46FF",
                                                    "deptno": "18122502312160842082",
                                                    "deptname": "秀洲公寓",
                                                    "indexcode": "18122502312160842082",
                                                    "jkcode": "18122502312160842082",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "08CB754D79E741DCA4538347243DFBD5",
                                                    "deptno": "18122502312160493888",
                                                    "deptname": "天星湖公寓北区",
                                                    "indexcode": "18122502312160493888",
                                                    "jkcode": "18122502312160493888",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "0E15DAAFA7ED4E2882AA98A5CDD77D24",
                                                    "deptno": "18122502312160528614",
                                                    "deptname": "银建公寓",
                                                    "indexcode": "18122502312160528614",
                                                    "jkcode": "18122502312160528614",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1698F8FE4DB949E686E8DD104C168293",
                                                    "deptno": "18122502312160899095",
                                                    "deptname": "土特产宿舍",
                                                    "indexcode": "18122502312160899095",
                                                    "jkcode": "18122502312160899095",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "272DFE07BBFF49F3AAAE88EC950C7038",
                                                    "deptno": "18122502312160945717",
                                                    "deptname": "欣盛公寓",
                                                    "indexcode": "18122502312160945717",
                                                    "jkcode": "18122502312160945717",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3BA9109DCC3B4FA19CE79D22D640330E",
                                                    "deptno": "18122502312160185112",
                                                    "deptname": "紫阳公寓",
                                                    "indexcode": "18122502312160185112",
                                                    "jkcode": "18122502312160185112",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8B9A874E727443F5813B123F64C0784F",
                                                    "deptno": "18122502312160498938",
                                                    "deptname": "鹿都景苑",
                                                    "indexcode": "18122502312160498938",
                                                    "jkcode": "18122502312160498938",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8BE73C8137D74187B59E001979123088",
                                                    "deptno": "18122502312160977191",
                                                    "deptname": "中兴公寓",
                                                    "indexcode": "18122502312160977191",
                                                    "jkcode": "18122502312160977191",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "99C8F5CDCFE44F42A32DEFBEB6196CFD",
                                                    "deptno": "18122502312160061787",
                                                    "deptname": "卫校宿舍",
                                                    "indexcode": "18122502312160061787",
                                                    "jkcode": "18122502312160061787",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "9D2885E2DEFE47E088761E15430387E2",
                                                    "deptno": "18122502312160067859",
                                                    "deptname": "秀城公寓",
                                                    "indexcode": "18122502312160067859",
                                                    "jkcode": "18122502312160067859",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "9F0CAE70B58B4A46A722437E590A9E2B",
                                                    "deptno": "18122502312160376831",
                                                    "deptname": "百福公寓",
                                                    "indexcode": "18122502312160376831",
                                                    "jkcode": "18122502312160376831",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B2EDC121D6BD47538D6F258A3A53092B",
                                                    "deptno": "18122502312160698768",
                                                    "deptname": "银河印象",
                                                    "indexcode": "18122502312160698768",
                                                    "jkcode": "18122502312160698768",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C366A1AC2CBE42BE8CB8D7C873D7517E",
                                                    "deptno": "18122502312160787107",
                                                    "deptname": "南杨社区",
                                                    "indexcode": "18122502312160787107",
                                                    "jkcode": "18122502312160787107",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "DBC144001C904D4CAA7DD42EA8F5B774",
                                                    "deptno": "18122502312160562990",
                                                    "deptname": "慈光公寓",
                                                    "indexcode": "18122502312160562990",
                                                    "jkcode": "18122502312160562990",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "EC336CCECF5A427FA744A230F82EC108",
                                                    "deptno": "18122502312160222162",
                                                    "deptname": "市机关政府宿舍",
                                                    "indexcode": "18122502312160222162",
                                                    "jkcode": "18122502312160222162",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F95D65862FA8402FA74C446CD197A06B",
                                                    "deptno": "18122502312160896300",
                                                    "deptname": "望湖公寓",
                                                    "indexcode": "18122502312160896300",
                                                    "jkcode": "18122502312160896300",
                                                    "pdeptno": "18122502312160556294",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "834D8BDC87DB469B913848D03F4E0CEA",
                                            "deptno": "330400000050468190",
                                            "deptname": "建设-学校",
                                            "indexcode": "330400000050468190",
                                            "jkcode": "330400000050468190",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "85E1B9A59F5D41FD985E75CF6DA40A52",
                                            "deptno": "19010512052160664671",
                                            "deptname": "烧鸡公人脸",
                                            "indexcode": "19010512052160664671",
                                            "jkcode": "19010512052160664671",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "878BB7EA4E7042509C7EB0977EF56704",
                                            "deptno": "330400000069006690",
                                            "deptname": "指挥室",
                                            "indexcode": "330400000069006690",
                                            "jkcode": "330400000069006690",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A066E993285F4FC393EB9C2C4B830F6D",
                                            "deptno": "18092708132160196889",
                                            "deptname": "建设_电信二期模改数",
                                            "indexcode": "18092708132160196889",
                                            "jkcode": "18092708132160196889",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "AE43A0DDCAB849D5818593A40F661518",
                                            "deptno": "330400000017224390",
                                            "deptname": "清真寺",
                                            "indexcode": "330400000017224390",
                                            "jkcode": "330400000017224390",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B11DCA0845D7490D99D513802E2E07D8",
                                            "deptno": "18122404352160218927",
                                            "deptname": "D1JS049姚庄路教堂",
                                            "indexcode": "18122404352160218927",
                                            "jkcode": "18122404352160218927",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "BC0B691538C54748A6733A83CA83274C",
                                            "deptno": "330400000064668690",
                                            "deptname": "建设_自建五期",
                                            "indexcode": "330400000064668690",
                                            "jkcode": "330400000064668690",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D1830021F520496483D88C39D56E2FCB",
                                            "deptno": "330400000079987890",
                                            "deptname": "建设_自建二期",
                                            "indexcode": "330400000079987890",
                                            "jkcode": "330400000079987890",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D6BCDAD649FF4C19816DA1C4A4ACFC2D",
                                            "deptno": "330400000025160490",
                                            "deptname": "建设_电信二期",
                                            "indexcode": "330400000025160490",
                                            "jkcode": "330400000025160490",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "EB58D93A58D240DFB6C9AF1FA48B38B1",
                                            "deptno": "330400000077091090",
                                            "deptname": "建设_电信一期",
                                            "indexcode": "330400000077091090",
                                            "jkcode": "330400000077091090",
                                            "pdeptno": "330402550000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "3283D0FE932E4B718FD01DD0F5BC2AA5",
                                    "deptno": "330402570000",
                                    "deptname": "东栅派出所",
                                    "indexcode": "330402570000",
                                    "jkcode": "330402570000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "3312D7605ACF4EE7A4D1C3E4CF748A67",
                                            "deptno": "330200000056448590",
                                            "deptname": "东栅_自建二期",
                                            "indexcode": "330200000056448590",
                                            "jkcode": "330200000056448590",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "35E7039ACB2A412C8E8BED90E80803F6",
                                            "deptno": "330200000028078790",
                                            "deptname": "东栅_自建三期",
                                            "indexcode": "330200000028078790",
                                            "jkcode": "330200000028078790",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "455CB38CE4824CC1B32DC2DC9C4D071E",
                                            "deptno": "330200000080173390",
                                            "deptname": "东栅-学校",
                                            "indexcode": "330200000080173390",
                                            "jkcode": "330200000080173390",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4C841E6D6CEF403485725AAFB9833BC4",
                                            "deptno": "18100711112160659645",
                                            "deptname": "网球中心",
                                            "indexcode": "18100711112160659645",
                                            "jkcode": "18100711112160659645",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5BD96414F9984DC08F834DDC6CB7E6CE",
                                            "deptno": "18101011482160487666",
                                            "deptname": "东栅1-16",
                                            "indexcode": "18101011482160487666",
                                            "jkcode": "18101011482160487666",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5F8AA92296BF4A42AAF41535FF2800CB",
                                            "deptno": "330200000077588090",
                                            "deptname": "东栅_自建一期",
                                            "indexcode": "330200000077588090",
                                            "jkcode": "330200000077588090",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "73E4B2A6AA0844F0A8F4E4D98A383B6A",
                                            "deptno": "18100708442160886273",
                                            "deptname": "东栅_电信二期模改数",
                                            "indexcode": "18100708442160886273",
                                            "jkcode": "18100708442160886273",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A3ACC738196746B3B0DCEAC758E0C028",
                                            "deptno": "330200000011188790",
                                            "deptname": "东栅_电信二期",
                                            "indexcode": "330200000011188790",
                                            "jkcode": "330200000011188790",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C47573F76DA24B12AFE0FFCE41DA1DF2",
                                            "deptno": "330200000021219890",
                                            "deptname": "东栅_电信一期",
                                            "indexcode": "330200000021219890",
                                            "jkcode": "330200000021219890",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CE1F58D76E834D10851260DD92BF9AA1",
                                            "deptno": "18122502322160823068",
                                            "deptname": "东栅_智慧小区",
                                            "indexcode": "18122502322160823068",
                                            "jkcode": "18122502322160823068",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "009CF955F0F44305B46890137DD4B5B1",
                                                    "deptno": "18122502322160259610",
                                                    "deptname": "翰林兰庭",
                                                    "indexcode": "18122502322160259610",
                                                    "jkcode": "18122502322160259610",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "00DA6DB2F3974E8D8126841CB4F34489",
                                                    "deptno": "18122502322160191050",
                                                    "deptname": "南德大院",
                                                    "indexcode": "18122502322160191050",
                                                    "jkcode": "18122502322160191050",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "0561B4C2D553460F983808A2EC01A87D",
                                                    "deptno": "18122502322160005505",
                                                    "deptname": "信源亲水湾",
                                                    "indexcode": "18122502322160005505",
                                                    "jkcode": "18122502322160005505",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1116B15622D54BC4AF2BAAB7A86CCC78",
                                                    "deptno": "18122502322160422561",
                                                    "deptname": "格林小镇",
                                                    "indexcode": "18122502322160422561",
                                                    "jkcode": "18122502322160422561",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1328008D3B6D4DB4AB0C71564B10EA20",
                                                    "deptno": "18122502322160628536",
                                                    "deptname": "皇都花苑",
                                                    "indexcode": "18122502322160628536",
                                                    "jkcode": "18122502322160628536",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "132E4964A8E24B56A9B758F555BD1515",
                                                    "deptno": "18122502322160431523",
                                                    "deptname": "广宜文苑",
                                                    "indexcode": "18122502322160431523",
                                                    "jkcode": "18122502322160431523",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "13341149BED44E9188BA8483013AB8C9",
                                                    "deptno": "18122502322160929485",
                                                    "deptname": "格兰英郡",
                                                    "indexcode": "18122502322160929485",
                                                    "jkcode": "18122502322160929485",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "13D131BBF36C496E9EE40AC81AC49306",
                                                    "deptno": "18122502322160479389",
                                                    "deptname": "宝石公馆",
                                                    "indexcode": "18122502322160479389",
                                                    "jkcode": "18122502322160479389",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "180B0D04FA544B00827A537C6F7F69D9",
                                                    "deptno": "18122502322160344420",
                                                    "deptname": "双溪一期",
                                                    "indexcode": "18122502322160344420",
                                                    "jkcode": "18122502322160344420",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "193BE5F4E2594360A3314D60BB0CB70B",
                                                    "deptno": "18122502322160084348",
                                                    "deptname": "泾水公寓3期",
                                                    "indexcode": "18122502322160084348",
                                                    "jkcode": "18122502322160084348",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2470430BA5F44420B131E62E0CEE4332",
                                                    "deptno": "18122502322160516186",
                                                    "deptname": "澳洲花园",
                                                    "indexcode": "18122502322160516186",
                                                    "jkcode": "18122502322160516186",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "273BF2BC070D468F9E7C6D33247D47A8",
                                                    "deptno": "18122502322160448749",
                                                    "deptname": "都市文涛苑",
                                                    "indexcode": "18122502322160448749",
                                                    "jkcode": "18122502322160448749",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "347BEDB669C34AF4BC5B25858B838697",
                                                    "deptno": "18122502322160251414",
                                                    "deptname": "泾水公寓1期",
                                                    "indexcode": "18122502322160251414",
                                                    "jkcode": "18122502322160251414",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3EA400ED792443AF9E652FF4160A9AD6",
                                                    "deptno": "18122502322160227707",
                                                    "deptname": "文贤苑",
                                                    "indexcode": "18122502322160227707",
                                                    "jkcode": "18122502322160227707",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "499CA890E4C54196B48FC670E037CD20",
                                                    "deptno": "18122502322160667255",
                                                    "deptname": "中山怡和园",
                                                    "indexcode": "18122502322160667255",
                                                    "jkcode": "18122502322160667255",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "4E09AA00912041E98BBE40B274C23000",
                                                    "deptno": "18122502322160670566",
                                                    "deptname": "泾水公寓2期",
                                                    "indexcode": "18122502322160670566",
                                                    "jkcode": "18122502322160670566",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "657D8035DEF9459FA64EFD31188B2258",
                                                    "deptno": "18122502322160508481",
                                                    "deptname": "信达东郡",
                                                    "indexcode": "18122502322160508481",
                                                    "jkcode": "18122502322160508481",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "76558DEE89EA484CB5FF2A571A1254A8",
                                                    "deptno": "18122502322160842311",
                                                    "deptname": "紫竹名苑",
                                                    "indexcode": "18122502322160842311",
                                                    "jkcode": "18122502322160842311",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "7D0DFA77B4224E6B8C083A01EC675753",
                                                    "deptno": "18122502322160283304",
                                                    "deptname": "铂金府邸",
                                                    "indexcode": "18122502322160283304",
                                                    "jkcode": "18122502322160283304",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "82A7DF796E594F8A8EC3B55116ED2E43",
                                                    "deptno": "18122502322160032181",
                                                    "deptname": "翠湖花园",
                                                    "indexcode": "18122502322160032181",
                                                    "jkcode": "18122502322160032181",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "844410056D98424E8E2E207CA43C2CB1",
                                                    "deptno": "18122502322160932494",
                                                    "deptname": "罗马都市",
                                                    "indexcode": "18122502322160932494",
                                                    "jkcode": "18122502322160932494",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8BF4DA0C614F43E2A05DBC172CC9218D",
                                                    "deptno": "18122502322160970863",
                                                    "deptname": "同方燕语林苑",
                                                    "indexcode": "18122502322160970863",
                                                    "jkcode": "18122502322160970863",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "93C596C88BA74E42AA1FD349C95065F9",
                                                    "deptno": "18122502322160238564",
                                                    "deptname": "中港名都",
                                                    "indexcode": "18122502322160238564",
                                                    "jkcode": "18122502322160238564",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "95F800288C5E4F369DA714F400256072",
                                                    "deptno": "18122502322160194463",
                                                    "deptname": "金都夏宫",
                                                    "indexcode": "18122502322160194463",
                                                    "jkcode": "18122502322160194463",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "9C0FB8AFA5BB4D9FA2BB8163B04C24B2",
                                                    "deptno": "18122502322160820819",
                                                    "deptname": "新世纪公寓",
                                                    "indexcode": "18122502322160820819",
                                                    "jkcode": "18122502322160820819",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "A5CEE84714AD4766A5090E042E48072E",
                                                    "deptno": "18122502322160154817",
                                                    "deptname": "双溪花园二期",
                                                    "indexcode": "18122502322160154817",
                                                    "jkcode": "18122502322160154817",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B0019ADAE08E48C483A1DE37A971EF3B",
                                                    "deptno": "18122502322160489610",
                                                    "deptname": "普罗旺斯",
                                                    "indexcode": "18122502322160489610",
                                                    "jkcode": "18122502322160489610",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B0117221AEA8448194769C730C22C49E",
                                                    "deptno": "18122502322160936630",
                                                    "deptname": "翡翠花园",
                                                    "indexcode": "18122502322160936630",
                                                    "jkcode": "18122502322160936630",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "D211348D956D4FF7B6EF561F057233AB",
                                                    "deptno": "18122502322160148945",
                                                    "deptname": "翠湖1号",
                                                    "indexcode": "18122502322160148945",
                                                    "jkcode": "18122502322160148945",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "EBDC1961F14B4A329FC819084D75F482",
                                                    "deptno": "18122502322160182636",
                                                    "deptname": "景湖花苑",
                                                    "indexcode": "18122502322160182636",
                                                    "jkcode": "18122502322160182636",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F4A74C9753D4439EA85A0D72067DECF2",
                                                    "deptno": "18122502322160294595",
                                                    "deptname": "庆丰苑",
                                                    "indexcode": "18122502322160294595",
                                                    "jkcode": "18122502322160294595",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F80475525D13477BBF335A2F01A56F56",
                                                    "deptno": "18122502322160803064",
                                                    "deptname": "人才公寓",
                                                    "indexcode": "18122502322160803064",
                                                    "jkcode": "18122502322160803064",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "FA61994E515E43B1AE1F6A91CFAAF382",
                                                    "deptno": "18122502322160683222",
                                                    "deptname": "赞成丽景苑",
                                                    "indexcode": "18122502322160683222",
                                                    "jkcode": "18122502322160683222",
                                                    "pdeptno": "18122502322160823068",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "D76D6F26F2A64863A0DEC9FA83BF042F",
                                            "deptno": "330200000062290390",
                                            "deptname": "东栅_自建五期",
                                            "indexcode": "330200000062290390",
                                            "jkcode": "330200000062290390",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "DE6D514D9F384270B3CFEECD6F24FEB2",
                                            "deptno": "18113003222160106011",
                                            "deptname": "东栅_自建六期",
                                            "indexcode": "18113003222160106011",
                                            "jkcode": "18113003222160106011",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "E771D5DB98934633961B252C6549702F",
                                            "deptno": "18101101112160105191",
                                            "deptname": "区域",
                                            "indexcode": "18101101112160105191",
                                            "jkcode": "18101101112160105191",
                                            "pdeptno": "330402570000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "54A7DB453C1E4854A66C92E6EB9E5EB0",
                                    "deptno": "330402520000",
                                    "deptname": "新嘉派出所",
                                    "indexcode": "330402520000",
                                    "jkcode": "330402520000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "00182D3FBE294D0ABD7C05B37C3AF45E",
                                            "deptno": "330600000067360590",
                                            "deptname": "新嘉_自建一期",
                                            "indexcode": "330600000067360590",
                                            "jkcode": "330600000067360590",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "41F1D12137EB423CB32DC152FD129A62",
                                            "deptno": "330600000016411290",
                                            "deptname": "新嘉-学校",
                                            "indexcode": "330600000016411290",
                                            "jkcode": "330600000016411290",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "49503ADA218C4F18B638A08578F9DD95",
                                            "deptno": "330600000031118990",
                                            "deptname": "新嘉_电信一期",
                                            "indexcode": "330600000031118990",
                                            "jkcode": "330600000031118990",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5750F932721B4D70963C74D834649C6F",
                                            "deptno": "18100409022160977931",
                                            "deptname": "新嘉_电信二期模改数",
                                            "indexcode": "18100409022160977931",
                                            "jkcode": "18100409022160977931",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7CF729BFD10A4E5C913D389E6046E8D5",
                                            "deptno": "18122502342160137413",
                                            "deptname": "新嘉_智慧小区",
                                            "indexcode": "18122502342160137413",
                                            "jkcode": "18122502342160137413",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "19E753CB08F248CBAC27F45A91518379",
                                                    "deptno": "18122502342160725935",
                                                    "deptname": "北京城二期",
                                                    "indexcode": "18122502342160725935",
                                                    "jkcode": "18122502342160725935",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "32A48745E108432A91C154D276B1DBED",
                                                    "deptno": "18122502342160525687",
                                                    "deptname": "阳明公寓",
                                                    "indexcode": "18122502342160525687",
                                                    "jkcode": "18122502342160525687",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3D05CCA4CB6B4B2B98D480427DFC4B63",
                                                    "deptno": "18122502342160746930",
                                                    "deptname": "西马桥",
                                                    "indexcode": "18122502342160746930",
                                                    "jkcode": "18122502342160746930",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "4D9D73CDD05F42BD91271765B20D729A",
                                                    "deptno": "18122502342160552644",
                                                    "deptname": "佳景苑",
                                                    "indexcode": "18122502342160552644",
                                                    "jkcode": "18122502342160552644",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "56A29965C0854E2F8878027072B81E0F",
                                                    "deptno": "18122502342160231236",
                                                    "deptname": "月河苑",
                                                    "indexcode": "18122502342160231236",
                                                    "jkcode": "18122502342160231236",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "5CAA2E0A7F4C4D31901F1833B220101E",
                                                    "deptno": "18122502342160683366",
                                                    "deptname": "杨家门",
                                                    "indexcode": "18122502342160683366",
                                                    "jkcode": "18122502342160683366",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "658F5E8EE0E240C3A9A92E8A4F4A587D",
                                                    "deptno": "18122502342160642557",
                                                    "deptname": "景帆苑二期",
                                                    "indexcode": "18122502342160642557",
                                                    "jkcode": "18122502342160642557",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "72178506FD6E4FDCA4B140273580DCE4",
                                                    "deptno": "18122502342160487987",
                                                    "deptname": "北京城一期",
                                                    "indexcode": "18122502342160487987",
                                                    "jkcode": "18122502342160487987",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8BF7334FB9E746D8B658171D725CCBE1",
                                                    "deptno": "18122502342160514269",
                                                    "deptname": "景帆苑一期",
                                                    "indexcode": "18122502342160514269",
                                                    "jkcode": "18122502342160514269",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "986D10C401FB447ABEAFA5412FC8E60D",
                                                    "deptno": "18122502342160963400",
                                                    "deptname": "风清云都",
                                                    "indexcode": "18122502342160963400",
                                                    "jkcode": "18122502342160963400",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "99D4CC5A6C6F4146855D7A81817FCE33",
                                                    "deptno": "18122502342160070054",
                                                    "deptname": "富安御园",
                                                    "indexcode": "18122502342160070054",
                                                    "jkcode": "18122502342160070054",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "AA761BBDE1164558BDC87D58844EBA82",
                                                    "deptno": "18122502342160842740",
                                                    "deptname": "怡景苑",
                                                    "indexcode": "18122502342160842740",
                                                    "jkcode": "18122502342160842740",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "AC470450247C4FF8BA2FE51186FC0D9A",
                                                    "deptno": "18122502342160738583",
                                                    "deptname": "清风阁",
                                                    "indexcode": "18122502342160738583",
                                                    "jkcode": "18122502342160738583",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B8CD3719D94E4736AF6EECD3937EF9BB",
                                                    "deptno": "18122502342160790428",
                                                    "deptname": "真诚世家",
                                                    "indexcode": "18122502342160790428",
                                                    "jkcode": "18122502342160790428",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "CB87EFF2DA1742E3A98B38A003E14FA3",
                                                    "deptno": "18122502342160969939",
                                                    "deptname": "半岛公寓",
                                                    "indexcode": "18122502342160969939",
                                                    "jkcode": "18122502342160969939",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "D8A09F994A1B443B8658AC6B5E7B488C",
                                                    "deptno": "18122502342160546776",
                                                    "deptname": "穆湖花园",
                                                    "indexcode": "18122502342160546776",
                                                    "jkcode": "18122502342160546776",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "E524F1E42FB94B4A92DB25B731A752FD",
                                                    "deptno": "18122502342160233397",
                                                    "deptname": "清华苑",
                                                    "indexcode": "18122502342160233397",
                                                    "jkcode": "18122502342160233397",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F13B33BF7CF94905A633EBF7F467EB67",
                                                    "deptno": "18122502342160116094",
                                                    "deptname": "金色恬园",
                                                    "indexcode": "18122502342160116094",
                                                    "jkcode": "18122502342160116094",
                                                    "pdeptno": "18122502342160137413",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "80C18602B42C40AEABD6E1CCFF9B7A8D",
                                            "deptno": "330600000043662990",
                                            "deptname": "新嘉_电信二期",
                                            "indexcode": "330600000043662990",
                                            "jkcode": "330600000043662990",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8DB13B5BAC034421A88EA3898D539064",
                                            "deptno": "330600000072290190",
                                            "deptname": "新嘉_自建五期",
                                            "indexcode": "330600000072290190",
                                            "jkcode": "330600000072290190",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "917ED54BAF6E40DA9F21D5A71EEEC7FE",
                                            "deptno": "18090508142160210758",
                                            "deptname": "西马桥社区",
                                            "indexcode": "18090508142160210758",
                                            "jkcode": "18090508142160210758",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "EA4C739D6FF3470AAFDB7AC2E8FE931C",
                                            "deptno": "330600000052850090",
                                            "deptname": "新嘉_自建二期",
                                            "indexcode": "330600000052850090",
                                            "jkcode": "330600000052850090",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "EF555A4B04184D479ACBA52A8FC01059",
                                            "deptno": "330600000032717790",
                                            "deptname": "国奥宾馆临时",
                                            "indexcode": "330600000032717790",
                                            "jkcode": "330600000032717790",
                                            "pdeptno": "330402520000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "58B6AD924FEA43769603468F267D62F7",
                                    "deptno": "410000000000000099",
                                    "deptname": "宗教场所",
                                    "indexcode": "410000000000000099",
                                    "jkcode": "410000000000000099",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "0981344526FB4C69BD5E16D6BAA90584",
                                            "deptno": "410000000011606090",
                                            "deptname": "普光寺2",
                                            "indexcode": "410000000011606090",
                                            "jkcode": "410000000011606090",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "0DBCEB13B83A461F9C26C8AFBD2449AA",
                                            "deptno": "410000000066250590",
                                            "deptname": "精严寺",
                                            "indexcode": "410000000066250590",
                                            "jkcode": "410000000066250590",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "15068F371746436284C1C8A2D8325322",
                                            "deptno": "410000000078452290",
                                            "deptname": "石佛寺",
                                            "indexcode": "410000000078452290",
                                            "jkcode": "410000000078452290",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "2216880232C84B6887534D392E158688",
                                            "deptno": "410000000056287290",
                                            "deptname": "黎林寺",
                                            "indexcode": "410000000056287290",
                                            "jkcode": "410000000056287290",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4097D4E98AC54B598E9E25477A9C6B32",
                                            "deptno": "410000000041082990",
                                            "deptname": "南门塘教堂",
                                            "indexcode": "410000000041082990",
                                            "jkcode": "410000000041082990",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5C1FE300D4704D9FB3C4C9ECB9D236CF",
                                            "deptno": "410000000063952890",
                                            "deptname": "大曹王寺",
                                            "indexcode": "410000000063952890",
                                            "jkcode": "410000000063952890",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "6B24EE00FCB74E1892095464465B04F4",
                                            "deptno": "410000000052628290",
                                            "deptname": "小普陀寺",
                                            "indexcode": "410000000052628290",
                                            "jkcode": "410000000052628290",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7CEF86D775A34971959801B4A9B3452E",
                                            "deptno": "410000000030035190",
                                            "deptname": "太平寺",
                                            "indexcode": "410000000030035190",
                                            "jkcode": "410000000030035190",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "94FFFFC4AEBF4979BE8F9B665CDBE6A0",
                                            "deptno": "410000000043260690",
                                            "deptname": "天主教堂",
                                            "indexcode": "410000000043260690",
                                            "jkcode": "410000000043260690",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9602A618C7D745A4A3C568A8A8E389E7",
                                            "deptno": "410000000043226690",
                                            "deptname": "嘉北塘教堂",
                                            "indexcode": "410000000043226690",
                                            "jkcode": "410000000043226690",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9614CC94141A4E7DBD0E91B4F873DA71",
                                            "deptno": "410000000003823590",
                                            "deptname": "血印寺",
                                            "indexcode": "410000000003823590",
                                            "jkcode": "410000000003823590",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A16C2AD226B147AB81C8C953C4C7C9E8",
                                            "deptno": "410000000073069890",
                                            "deptname": "冷仙亭寺",
                                            "indexcode": "410000000073069890",
                                            "jkcode": "410000000073069890",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B42C0E8CA35D46BEB0F1D80C38F0CCB8",
                                            "deptno": "410000000080226590",
                                            "deptname": "真实寺",
                                            "indexcode": "410000000080226590",
                                            "jkcode": "410000000080226590",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CED07424AD8F49C6BBBC641887760F98",
                                            "deptno": "410000000079787390",
                                            "deptname": "普光寺",
                                            "indexcode": "410000000079787390",
                                            "jkcode": "410000000079787390",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D0BC621B28A847CD9C0BD5E47704E744",
                                            "deptno": "410000000098815790",
                                            "deptname": "横港庙",
                                            "indexcode": "410000000098815790",
                                            "jkcode": "410000000098815790",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D201BA892CDB49A6AB4091851DA2B0F7",
                                            "deptno": "410000000078450290",
                                            "deptname": "小曹皇庙",
                                            "indexcode": "410000000078450290",
                                            "jkcode": "410000000078450290",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "DA163D1926EA4D88919D00991D2F05C9",
                                            "deptno": "410000000091261290",
                                            "deptname": "觉海寺",
                                            "indexcode": "410000000091261290",
                                            "jkcode": "410000000091261290",
                                            "pdeptno": "410000000000000099",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "5C614162A51E490D9629CF822115D752",
                                    "deptno": "330402630000",
                                    "deptname": "大桥派出所",
                                    "indexcode": "330402630000",
                                    "jkcode": "330402630000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "26C2FFDC328F4C4B9187EABCA426206C",
                                            "deptno": "33040200002160295577",
                                            "deptname": "南祥苑",
                                            "indexcode": "33040200002160295577",
                                            "jkcode": "33040200002160295577",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "41C882B860834C4B8C2A273E421052B6",
                                            "deptno": "330800000066458890",
                                            "deptname": "大桥_电信二期",
                                            "indexcode": "330800000066458890",
                                            "jkcode": "330800000066458890",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "45D9BF0AAFBB407189BC0A5465313A55",
                                            "deptno": "33040200002160354976",
                                            "deptname": "中和苑",
                                            "indexcode": "33040200002160354976",
                                            "jkcode": "33040200002160354976",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4C8614A294B14022B81023E72C69CA3F",
                                            "deptno": "33040200002160963919",
                                            "deptname": "夏义港绿道监控",
                                            "indexcode": "33040200002160963919",
                                            "jkcode": "33040200002160963919",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "67C515824616465D9C107E4CC13B275A",
                                            "deptno": "18122502382160319303",
                                            "deptname": "大桥_智慧小区",
                                            "indexcode": "18122502382160319303",
                                            "jkcode": "18122502382160319303",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "044C1D56F4DA4EE7B141D72CEF6CD9E5",
                                                    "deptno": "18122502382160142046",
                                                    "deptname": "湖滨花苑",
                                                    "indexcode": "18122502382160142046",
                                                    "jkcode": "18122502382160142046",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "0D3698FC99504F0CA7DE7CB9F116E05C",
                                                    "deptno": "18122502382160301279",
                                                    "deptname": "十八里花苑",
                                                    "indexcode": "18122502382160301279",
                                                    "jkcode": "18122502382160301279",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "13B3820B44984783B0BE3C0FB8907918",
                                                    "deptno": "18122502382160021960",
                                                    "deptname": "御上江南",
                                                    "indexcode": "18122502382160021960",
                                                    "jkcode": "18122502382160021960",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "24C0241817C64D75A8A779A067945C6F",
                                                    "deptno": "18122502382160697543",
                                                    "deptname": "亚太花苑",
                                                    "indexcode": "18122502382160697543",
                                                    "jkcode": "18122502382160697543",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3C7A18A4804948FD9D37D16A2D304943",
                                                    "deptno": "18122502382160846362",
                                                    "deptname": "宏润花园",
                                                    "indexcode": "18122502382160846362",
                                                    "jkcode": "18122502382160846362",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "4D427456F214439D911C16553209594F",
                                                    "deptno": "18122502382160052544",
                                                    "deptname": "中华小区",
                                                    "indexcode": "18122502382160052544",
                                                    "jkcode": "18122502382160052544",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "82B22CF99DC64458BE0000BDF055D366",
                                                    "deptno": "18122502382160227852",
                                                    "deptname": "步云花苑",
                                                    "indexcode": "18122502382160227852",
                                                    "jkcode": "18122502382160227852",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8808C75FC4244B929C10F6539B52215C",
                                                    "deptno": "18122502382160823442",
                                                    "deptname": "水马南苑",
                                                    "indexcode": "18122502382160823442",
                                                    "jkcode": "18122502382160823442",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8AC414F369F249D3806752692945346D",
                                                    "deptno": "18122502382160807079",
                                                    "deptname": "金桥名苑",
                                                    "indexcode": "18122502382160807079",
                                                    "jkcode": "18122502382160807079",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "97F982BFC77C49DD909BC62B1DB061AC",
                                                    "deptno": "18122502382160295162",
                                                    "deptname": "东方都市",
                                                    "indexcode": "18122502382160295162",
                                                    "jkcode": "18122502382160295162",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B4DA0328C87B4D108FC4293A81B772FC",
                                                    "deptno": "18122502382160509433",
                                                    "deptname": "平湖塘花苑",
                                                    "indexcode": "18122502382160509433",
                                                    "jkcode": "18122502382160509433",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C0AA7EEA58934325BF014589EEEA096D",
                                                    "deptno": "18122502382160275422",
                                                    "deptname": "好地坊",
                                                    "indexcode": "18122502382160275422",
                                                    "jkcode": "18122502382160275422",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C8172AF303D94E0D968C4DE1B08A9F9F",
                                                    "deptno": "18122502382160397313",
                                                    "deptname": "天明",
                                                    "indexcode": "18122502382160397313",
                                                    "jkcode": "18122502382160397313",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "EAC824BF1EEC43BD84C3E2BEDDCC0128",
                                                    "deptno": "18122502382160412921",
                                                    "deptname": "南祥苑1",
                                                    "indexcode": "18122502382160412921",
                                                    "jkcode": "18122502382160412921",
                                                    "pdeptno": "18122502382160319303",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "69E0B54139A748C99F09007A68C1F025",
                                            "deptno": "330800000004854790",
                                            "deptname": "大桥-学校",
                                            "indexcode": "330800000004854790",
                                            "jkcode": "330800000004854790",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "794F078D093C49F48C250D8E0115259D",
                                            "deptno": "33040200002160197454",
                                            "deptname": "煤气供应站",
                                            "indexcode": "33040200002160197454",
                                            "jkcode": "33040200002160197454",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7F2C113FBDF047639CA44A591B50731D",
                                            "deptno": "33040200002160756699",
                                            "deptname": "人才公寓",
                                            "indexcode": "33040200002160756699",
                                            "jkcode": "33040200002160756699",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7F9E48B866744D58BDCC06AA193A803F",
                                            "deptno": "18101909592160821267",
                                            "deptname": "中华村",
                                            "indexcode": "18101909592160821267",
                                            "jkcode": "18101909592160821267",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8BCBE9B6C5B24B6AB1B27C19569726F9",
                                            "deptno": "330800000077758290",
                                            "deptname": "大桥临时",
                                            "indexcode": "330800000077758290",
                                            "jkcode": "330800000077758290",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8E5D39AA90884DA1AF081F69226C739C",
                                            "deptno": "18102409112160112840",
                                            "deptname": "大桥_自建六期",
                                            "indexcode": "18102409112160112840",
                                            "jkcode": "18102409112160112840",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "980DF8D19D25470EA3F94B1A5903937E",
                                            "deptno": "33040200002160668689",
                                            "deptname": "八里花苑一期",
                                            "indexcode": "33040200002160668689",
                                            "jkcode": "33040200002160668689",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "99BAC2C2B63C46FF8182D96766A455BC",
                                            "deptno": "330800000081138790",
                                            "deptname": "大桥_自建三期",
                                            "indexcode": "330800000081138790",
                                            "jkcode": "330800000081138790",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "AE6C4650811A4A3BA28E7992B17485B9",
                                            "deptno": "33040200002160946075",
                                            "deptname": "宾馆",
                                            "indexcode": "33040200002160946075",
                                            "jkcode": "33040200002160946075",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "BEA71ED5C4EB4B73B70641B834F0F6CE",
                                            "deptno": "33040200002160076875",
                                            "deptname": "八里花苑二期",
                                            "indexcode": "33040200002160076875",
                                            "jkcode": "33040200002160076875",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C02BBC3E49234C8EB42ADA9CB56D1AE6",
                                            "deptno": "330800000020127690",
                                            "deptname": "大桥_自建五期",
                                            "indexcode": "330800000020127690",
                                            "jkcode": "330800000020127690",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D0AF9EE4A658476F9FD0BE027F3A22C8",
                                            "deptno": "18092509232160573114",
                                            "deptname": "大桥_电信二期模改数",
                                            "indexcode": "18092509232160573114",
                                            "jkcode": "18092509232160573114",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "DB471C0360BB4823874529676D08107C",
                                            "deptno": "33040200002160650545",
                                            "deptname": "建国村马家浜",
                                            "indexcode": "33040200002160650545",
                                            "jkcode": "33040200002160650545",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "EC08695C2CBA44C6A01E86D25C242747",
                                            "deptno": "18120603492160189112",
                                            "deptname": "大桥_七期",
                                            "indexcode": "18120603492160189112",
                                            "jkcode": "18120603492160189112",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F06C754B120746CB91954356BAA1F798",
                                            "deptno": "330800000016145690",
                                            "deptname": "大桥_自建二期",
                                            "indexcode": "330800000016145690",
                                            "jkcode": "330800000016145690",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F835963C5A5A45D39D7491CF78374C4A",
                                            "deptno": "330800000053012790",
                                            "deptname": "大桥_电信一期",
                                            "indexcode": "330800000053012790",
                                            "jkcode": "330800000053012790",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F98BD982850E4BB28D82F8EA7D712A78",
                                            "deptno": "33040200002160195100",
                                            "deptname": "网吧",
                                            "indexcode": "33040200002160195100",
                                            "jkcode": "33040200002160195100",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "FE550A6532EB4672A36137C6082533A6",
                                            "deptno": "330800000068882590",
                                            "deptname": "大桥_自建一期",
                                            "indexcode": "330800000068882590",
                                            "jkcode": "330800000068882590",
                                            "pdeptno": "330402630000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "5E278928000749E28256947DFB083F3F",
                                    "deptno": "33040204",
                                    "deptname": "S202检查站",
                                    "indexcode": "33040204",
                                    "jkcode": "33040204",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "76D15AD25B9143F2A17DE3E832CF04D6",
                                            "deptno": "33040204002160885069",
                                            "deptname": "S202检查站人脸",
                                            "indexcode": "33040204002160885069",
                                            "jkcode": "33040204002160885069",
                                            "pdeptno": "33040204",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "880B0A64892A4009BA4B49BE4D3CC25D",
                                    "deptno": "330402510000",
                                    "deptname": "新兴派出所",
                                    "indexcode": "330402510000",
                                    "jkcode": "330402510000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "12B24645C31745448B3845BB52D0782D",
                                            "deptno": "18122502322160323908",
                                            "deptname": "新兴_智慧小区",
                                            "indexcode": "18122502322160323908",
                                            "jkcode": "18122502322160323908",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "03D495E89C414EEB82B7E42339C9FFC5",
                                                    "deptno": "18122502322160166018",
                                                    "deptname": "吉水花园",
                                                    "indexcode": "18122502322160166018",
                                                    "jkcode": "18122502322160166018",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "0EDE2F9180E443D5B6E4DBC6B5996136",
                                                    "deptno": "18122502322160594123",
                                                    "deptname": "文纬里",
                                                    "indexcode": "18122502322160594123",
                                                    "jkcode": "18122502322160594123",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1409A7A323E8490B80AEF0A293EEE93C",
                                                    "deptno": "18122502322160496067",
                                                    "deptname": "天城园林居",
                                                    "indexcode": "18122502322160496067",
                                                    "jkcode": "18122502322160496067",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "16379558D96F48C796D28D411944AD7F",
                                                    "deptno": "18122502322160078117",
                                                    "deptname": "爱秀酒吧",
                                                    "indexcode": "18122502322160078117",
                                                    "jkcode": "18122502322160078117",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3B1DD0C8FA534E889E16CF8C64C42B32",
                                                    "deptno": "18122502322160337889",
                                                    "deptname": "东菱梅湾花园",
                                                    "indexcode": "18122502322160337889",
                                                    "jkcode": "18122502322160337889",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "54AA9D9D288A4302B5E96C84AF8134B7",
                                                    "deptno": "18122502322160190273",
                                                    "deptname": "文昌里",
                                                    "indexcode": "18122502322160190273",
                                                    "jkcode": "18122502322160190273",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "5B7DC41A6ACC40D3A8B1D7BE7B065D0F",
                                                    "deptno": "18122502322160170879",
                                                    "deptname": "松合里",
                                                    "indexcode": "18122502322160170879",
                                                    "jkcode": "18122502322160170879",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "610A16289F8A4A228A5564F8743BA2EC",
                                                    "deptno": "18122502322160233596",
                                                    "deptname": "城南花园",
                                                    "indexcode": "18122502322160233596",
                                                    "jkcode": "18122502322160233596",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6C8D72AE83C348388CEABCDADAA43FBE",
                                                    "deptno": "18122502322160623195",
                                                    "deptname": "越运里",
                                                    "indexcode": "18122502322160623195",
                                                    "jkcode": "18122502322160623195",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "7153857AFDF84109B11E86B5AD48CB02",
                                                    "deptno": "18122502322160249761",
                                                    "deptname": "越秀里",
                                                    "indexcode": "18122502322160249761",
                                                    "jkcode": "18122502322160249761",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "71E621E476F44C6C9E03F2BAC4F4651F",
                                                    "deptno": "18122502322160075644",
                                                    "deptname": "绝缘厂宿舍",
                                                    "indexcode": "18122502322160075644",
                                                    "jkcode": "18122502322160075644",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "86D5A9B43CDC4A3E88B6A859DBAF3305",
                                                    "deptno": "18122502322160477081",
                                                    "deptname": "运南社区",
                                                    "indexcode": "18122502322160477081",
                                                    "jkcode": "18122502322160477081",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "9C613F3A13564BDEA0306C373A29D2D9",
                                                    "deptno": "18122502322160090189",
                                                    "deptname": "鹤翔里",
                                                    "indexcode": "18122502322160090189",
                                                    "jkcode": "18122502322160090189",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B17F21DAA8524260A43CCCEB6C061E4D",
                                                    "deptno": "18122502322160315853",
                                                    "deptname": "王安里",
                                                    "indexcode": "18122502322160315853",
                                                    "jkcode": "18122502322160315853",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B2214EF779DE4306A4238883F6791200",
                                                    "deptno": "18122502322160119961",
                                                    "deptname": "怡南花园",
                                                    "indexcode": "18122502322160119961",
                                                    "jkcode": "18122502322160119961",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "BBDF67B114554AE79B2BE2D9CDA40733",
                                                    "deptno": "18122502322160732322",
                                                    "deptname": "文经里",
                                                    "indexcode": "18122502322160732322",
                                                    "jkcode": "18122502322160732322",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C334FEFEF275460A98271D7FAFCCAA2C",
                                                    "deptno": "18122502322160204626",
                                                    "deptname": "吉明里",
                                                    "indexcode": "18122502322160204626",
                                                    "jkcode": "18122502322160204626",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C7D6544F6D9C4374A67E384B6C8DF547",
                                                    "deptno": "18122502322160967641",
                                                    "deptname": "文秀里",
                                                    "indexcode": "18122502322160967641",
                                                    "jkcode": "18122502322160967641",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "D8B13A7135AE4920AE3F93306DF6F34F",
                                                    "deptno": "18122502322160832508",
                                                    "deptname": "文武里",
                                                    "indexcode": "18122502322160832508",
                                                    "jkcode": "18122502322160832508",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "EE441CF8719E4470975E9E83F2575518",
                                                    "deptno": "18122502322160852935",
                                                    "deptname": "三塔里",
                                                    "indexcode": "18122502322160852935",
                                                    "jkcode": "18122502322160852935",
                                                    "pdeptno": "18122502322160323908",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "3B1C9FEC87F24CD4B07C0600C729EA3B",
                                            "deptno": "18101109552160884432",
                                            "deptname": "区域",
                                            "indexcode": "18101109552160884432",
                                            "jkcode": "18101109552160884432",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "43EF56049BA6461ABD443082C8D06AA6",
                                            "deptno": "18101109422160273806",
                                            "deptname": "新兴立元",
                                            "indexcode": "18101109422160273806",
                                            "jkcode": "18101109422160273806",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5548832C6DAE4C39BFF670D3CEF84FA1",
                                            "deptno": "18082404142160030197",
                                            "deptname": "社会面视频",
                                            "indexcode": "18082404142160030197",
                                            "jkcode": "18082404142160030197",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "597FF844C157484A86EEAE6451F71330",
                                            "deptno": "330300000035585290",
                                            "deptname": "新兴_自建五期",
                                            "indexcode": "330300000035585290",
                                            "jkcode": "330300000035585290",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5BAA71DB57E040AC986DE0E625D0D7B6",
                                            "deptno": "330300000083096990",
                                            "deptname": "新兴_自建二期",
                                            "indexcode": "330300000083096990",
                                            "jkcode": "330300000083096990",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "79B5DF69EDCC41D7A2DF550452F677FE",
                                            "deptno": "330300000062610790",
                                            "deptname": "新兴_电信一期",
                                            "indexcode": "330300000062610790",
                                            "jkcode": "330300000062610790",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7EE16385A54947FBB2BC0CF406E71443",
                                            "deptno": "330300000061966490",
                                            "deptname": "新兴_电信二期",
                                            "indexcode": "330300000061966490",
                                            "jkcode": "330300000061966490",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "99A720DC41714AA9A10E36F3AAC64C65",
                                            "deptno": "330300000049348390",
                                            "deptname": "新兴_自建一期",
                                            "indexcode": "330300000049348390",
                                            "jkcode": "330300000049348390",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A993F8BB48D14822A669DEA0A38357B0",
                                            "deptno": "330300000034999890",
                                            "deptname": "新兴-学校",
                                            "indexcode": "330300000034999890",
                                            "jkcode": "330300000034999890",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CD2943BF208844CF9592B8B0EFD7D011",
                                            "deptno": "18100410272160076019",
                                            "deptname": "新兴_电信二期模改数",
                                            "indexcode": "18100410272160076019",
                                            "jkcode": "18100410272160076019",
                                            "pdeptno": "330402510000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "8E17FDCCFDBE4BE99D3B376A39E3FAE5",
                                    "deptno": "330402560000",
                                    "deptname": "解放派出所",
                                    "indexcode": "330402560000",
                                    "jkcode": "330402560000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "184554B674A743FE92788B03642F4B61",
                                            "deptno": "330500000003036090",
                                            "deptname": "解放_自建五期",
                                            "indexcode": "330500000003036090",
                                            "jkcode": "330500000003036090",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "1E3FCD53314643C599DC587B9527F9D5",
                                            "deptno": "330500000049300390",
                                            "deptname": "解放-学校",
                                            "indexcode": "330500000049300390",
                                            "jkcode": "330500000049300390",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "686806C01DDF424C820325CAEB29F971",
                                            "deptno": "18122612032160739379",
                                            "deptname": "火车站地下通道人脸",
                                            "indexcode": "18122612032160739379",
                                            "jkcode": "18122612032160739379",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "76F2A7D932D347B7922260D5A0F49EDD",
                                            "deptno": "330500000096752190",
                                            "deptname": "嘉兴火车站地下室",
                                            "indexcode": "330500000096752190",
                                            "jkcode": "330500000096752190",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7962C671F1CE44F69D0D58E316717565",
                                            "deptno": "330500000013481790",
                                            "deptname": "嘉兴火车站",
                                            "indexcode": "330500000013481790",
                                            "jkcode": "330500000013481790",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7B0FC258C89A4938BA3954364924D3ED",
                                            "deptno": "330500000024952290",
                                            "deptname": "解放_电信二期",
                                            "indexcode": "330500000024952290",
                                            "jkcode": "330500000024952290",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "87062C9BC44040B093F78737D32C31E1",
                                            "deptno": "18082311352160307039",
                                            "deptname": "解放_自建六期",
                                            "indexcode": "18082311352160307039",
                                            "jkcode": "18082311352160307039",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9AE41A3CF8DF46C6871A9CC4D54EFAE0",
                                            "deptno": "18100603552160699055",
                                            "deptname": "解放_电信二期模改数",
                                            "indexcode": "18100603552160699055",
                                            "jkcode": "18100603552160699055",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9C6D4EAF621F4928AA15EB6379C3D0FC",
                                            "deptno": "330500000011474290",
                                            "deptname": "解放_自建二期",
                                            "indexcode": "330500000011474290",
                                            "jkcode": "330500000011474290",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "ADED3079EB64445397AB833323E509C1",
                                            "deptno": "330500000052234590",
                                            "deptname": "自建三期",
                                            "indexcode": "330500000052234590",
                                            "jkcode": "330500000052234590",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B01E036312974129BDB747924DD3D5CE",
                                            "deptno": "330500000040647790",
                                            "deptname": "解放_电信一期",
                                            "indexcode": "330500000040647790",
                                            "jkcode": "330500000040647790",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C442E72B31F341D6810A32E6002FA328",
                                            "deptno": "330500000028782190",
                                            "deptname": "解放_自建一期",
                                            "indexcode": "330500000028782190",
                                            "jkcode": "330500000028782190",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C749BEEC001A4C38A3D265BA7F717946",
                                            "deptno": "18122502312160931795",
                                            "deptname": "解放_智慧小区",
                                            "indexcode": "18122502312160931795",
                                            "jkcode": "18122502312160931795",
                                            "pdeptno": "330402560000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "133E93B73C314F74B1824339256F5217",
                                                    "deptno": "18122502312160430865",
                                                    "deptname": "秋径公寓",
                                                    "indexcode": "18122502312160430865",
                                                    "jkcode": "18122502312160430865",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2525D7DA363B42CFAD3F220941E4D21A",
                                                    "deptno": "18122502312160166344",
                                                    "deptname": "城东公寓",
                                                    "indexcode": "18122502312160166344",
                                                    "jkcode": "18122502312160166344",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "259496A42B6B4FADA0C2D08A0F81F20D",
                                                    "deptno": "18122502312160298711",
                                                    "deptname": "大新弄",
                                                    "indexcode": "18122502312160298711",
                                                    "jkcode": "18122502312160298711",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2733E91CFCCA4D188D5312C4606C8604",
                                                    "deptno": "18122502312160233420",
                                                    "deptname": "蚕种场",
                                                    "indexcode": "18122502312160233420",
                                                    "jkcode": "18122502312160233420",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2BDD264B01114238AF5693E2A4859FA9",
                                                    "deptno": "18122502312160959227",
                                                    "deptname": "新虹桥花苑",
                                                    "indexcode": "18122502312160959227",
                                                    "jkcode": "18122502312160959227",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2DD7DE6BA80349DF898C8638E583F4FA",
                                                    "deptno": "18122502312160781908",
                                                    "deptname": "春波景苑",
                                                    "indexcode": "18122502312160781908",
                                                    "jkcode": "18122502312160781908",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "34C2A63633D549EE86CBB50ECDC23E07",
                                                    "deptno": "18122502312160393087",
                                                    "deptname": "彩虹公寓",
                                                    "indexcode": "18122502312160393087",
                                                    "jkcode": "18122502312160393087",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "39F469ADB15D4B4388DFE1187ABC67AE",
                                                    "deptno": "18122502312160564173",
                                                    "deptname": "凌波苑",
                                                    "indexcode": "18122502312160564173",
                                                    "jkcode": "18122502312160564173",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3A94EB823C964AB6BC549803673530A5",
                                                    "deptno": "18122502312160846487",
                                                    "deptname": "钱桥弄",
                                                    "indexcode": "18122502312160846487",
                                                    "jkcode": "18122502312160846487",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "429174F711374311980A8398EBD09094",
                                                    "deptno": "18122502312160796564",
                                                    "deptname": "明州苑小区",
                                                    "indexcode": "18122502312160796564",
                                                    "jkcode": "18122502312160796564",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6808683387EF4E57B866FAB59DA04061",
                                                    "deptno": "18122502312160947930",
                                                    "deptname": "虹桥新村",
                                                    "indexcode": "18122502312160947930",
                                                    "jkcode": "18122502312160947930",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6AB9A1368557431EB12A13274F67534B",
                                                    "deptno": "18122502312160648303",
                                                    "deptname": "徐王公寓",
                                                    "indexcode": "18122502312160648303",
                                                    "jkcode": "18122502312160648303",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6D651D8F7F684B1B869B4CFA0479197D",
                                                    "deptno": "18122502312160543462",
                                                    "deptname": "其他",
                                                    "indexcode": "18122502312160543462",
                                                    "jkcode": "18122502312160543462",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "854E90D7CC2B426DB4DEDB9CA2845EDF",
                                                    "deptno": "18122502312160164005",
                                                    "deptname": "青龙街地建宿舍",
                                                    "indexcode": "18122502312160164005",
                                                    "jkcode": "18122502312160164005",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "887CCA3747194842BCEFE6D825A98713",
                                                    "deptno": "18122502312160700019",
                                                    "deptname": "佳源都市",
                                                    "indexcode": "18122502312160700019",
                                                    "jkcode": "18122502312160700019",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "997A4E547A6544759472842FC8CE0EE9",
                                                    "deptno": "18122502312160583912",
                                                    "deptname": "紫景雅苑",
                                                    "indexcode": "18122502312160583912",
                                                    "jkcode": "18122502312160583912",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "A840665B8A024B138678C5FAB50767AC",
                                                    "deptno": "18122502312160672720",
                                                    "deptname": "外贸宿舍",
                                                    "indexcode": "18122502312160672720",
                                                    "jkcode": "18122502312160672720",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "A8BE9D2FCB54400FAC721F86BDFD11E8",
                                                    "deptno": "18122502312160333759",
                                                    "deptname": "青龙街61号",
                                                    "indexcode": "18122502312160333759",
                                                    "jkcode": "18122502312160333759",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "AAC2EC0819CC4142911FD5F81505A18B",
                                                    "deptno": "18122502312160447660",
                                                    "deptname": "教工宿舍",
                                                    "indexcode": "18122502312160447660",
                                                    "jkcode": "18122502312160447660",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B921CFB9708C4E909572313F55BDBD83",
                                                    "deptno": "18122502312160748298",
                                                    "deptname": "秀水人家",
                                                    "indexcode": "18122502312160748298",
                                                    "jkcode": "18122502312160748298",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "BA06699A1CD941BFA72C1F4B88DCE212",
                                                    "deptno": "18122502312160914747",
                                                    "deptname": "菜花泾",
                                                    "indexcode": "18122502312160914747",
                                                    "jkcode": "18122502312160914747",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C3AC2D0200A547478EB9871118B76AE3",
                                                    "deptno": "18122502312160682228",
                                                    "deptname": "中农信小区",
                                                    "indexcode": "18122502312160682228",
                                                    "jkcode": "18122502312160682228",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "CAF82E48AFBC4E2C980BE89FAE1056C3",
                                                    "deptno": "18122502312160052522",
                                                    "deptname": "冶金宿舍",
                                                    "indexcode": "18122502312160052522",
                                                    "jkcode": "18122502312160052522",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "D1971D90FB7D489BBF69243E06BE69B6",
                                                    "deptno": "18122502312160537825",
                                                    "deptname": "城东路",
                                                    "indexcode": "18122502312160537825",
                                                    "jkcode": "18122502312160537825",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "EC8F619414E84020BA9B3EA6686EA695",
                                                    "deptno": "18122502312160112644",
                                                    "deptname": "华美小区",
                                                    "indexcode": "18122502312160112644",
                                                    "jkcode": "18122502312160112644",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "ECB098D40CEA432FB7F0D0431C22AB0F",
                                                    "deptno": "18122502312160493113",
                                                    "deptname": "人民公园",
                                                    "indexcode": "18122502312160493113",
                                                    "jkcode": "18122502312160493113",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F42CEDCD33A14C40A24C7FA9136FCE26",
                                                    "deptno": "18122502312160872159",
                                                    "deptname": "虹凌阁小区",
                                                    "indexcode": "18122502312160872159",
                                                    "jkcode": "18122502312160872159",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F4383CC916394EE3A33E3C2BCA9B4C4F",
                                                    "deptno": "18122502312160202475",
                                                    "deptname": "禾东公寓",
                                                    "indexcode": "18122502312160202475",
                                                    "jkcode": "18122502312160202475",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F6F159CF8A4842A796AF9161289E4D56",
                                                    "deptno": "18122502312160094527",
                                                    "deptname": "加州长岛",
                                                    "indexcode": "18122502312160094527",
                                                    "jkcode": "18122502312160094527",
                                                    "pdeptno": "18122502312160931795",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "940AF1E7FCD9411ABF8B5A1225F08DF0",
                                    "deptno": "330402610000",
                                    "deptname": "余新派出所",
                                    "indexcode": "330402610000",
                                    "jkcode": "330402610000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "07B835C3C4DA427BA7105296FD9E71BD",
                                            "deptno": "18100808482160508321",
                                            "deptname": "余新_自建六期",
                                            "indexcode": "18100808482160508321",
                                            "jkcode": "18100808482160508321",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "088AF21729D4418CAC970F75E182A19B",
                                            "deptno": "33040001002160691560",
                                            "deptname": "新贤恬苑",
                                            "indexcode": "33040001002160691560",
                                            "jkcode": "33040001002160691560",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "18D95001C7D144C2BDE9ECD52774CDD6",
                                            "deptno": "330700000060778490",
                                            "deptname": "余新_自建二期",
                                            "indexcode": "330700000060778490",
                                            "jkcode": "330700000060778490",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4329E2C222344B26BB66C9D6B0BDC2BA",
                                            "deptno": "33040001002160770338",
                                            "deptname": "街道",
                                            "indexcode": "33040001002160770338",
                                            "jkcode": "33040001002160770338",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "445879F42E2143479E9388A1614F7AD5",
                                            "deptno": "330700000082086190",
                                            "deptname": "余新-学校",
                                            "indexcode": "330700000082086190",
                                            "jkcode": "330700000082086190",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5EE770AD178B4AC1A0413453D48D6325",
                                            "deptno": "33040001002160652590",
                                            "deptname": "新贤润苑",
                                            "indexcode": "33040001002160652590",
                                            "jkcode": "33040001002160652590",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "61B20165928A42A4B2741CA902A70B7F",
                                            "deptno": "330700000089428590",
                                            "deptname": "余新_电信一期",
                                            "indexcode": "330700000089428590",
                                            "jkcode": "330700000089428590",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "67AEF546E42D419B9F07C44D88007A7E",
                                            "deptno": "330700000023147990",
                                            "deptname": "余新_停车场",
                                            "indexcode": "330700000023147990",
                                            "jkcode": "330700000023147990",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "67C5034C9FF54E688FD94A281A3280F5",
                                            "deptno": "330700000034477090",
                                            "deptname": "余新_电信二期",
                                            "indexcode": "330700000034477090",
                                            "jkcode": "330700000034477090",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7F2A0C896C0045A5A11E0898BEA4D215",
                                            "deptno": "18092811242160313043",
                                            "deptname": "同创颐园",
                                            "indexcode": "18092811242160313043",
                                            "jkcode": "18092811242160313043",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8CB2FECD561C474EAB234127BD618905",
                                            "deptno": "33040001002160314574",
                                            "deptname": "新贤佳苑",
                                            "indexcode": "33040001002160314574",
                                            "jkcode": "33040001002160314574",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "91EB3E1F3117486EB0A5E277D00112E1",
                                            "deptno": "18092808272160072514",
                                            "deptname": "铭品别墅",
                                            "indexcode": "18092808272160072514",
                                            "jkcode": "18092808272160072514",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "94B1B63810D547939B304F3284B2A9EE",
                                            "deptno": "19010701522160478458",
                                            "deptname": "糖糖ktv",
                                            "indexcode": "19010701522160478458",
                                            "jkcode": "19010701522160478458",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A1199E7341EE473885CF80ECC45DDA66",
                                            "deptno": "18122502372160889974",
                                            "deptname": "余新_智慧小区",
                                            "indexcode": "18122502372160889974",
                                            "jkcode": "18122502372160889974",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "050076700ABC46B9A3F1A12804BE11CA",
                                                    "deptno": "18122502372160433988",
                                                    "deptname": "南江苑",
                                                    "indexcode": "18122502372160433988",
                                                    "jkcode": "18122502372160433988",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "066CE695F13642C6969ADD09C5B53496",
                                                    "deptno": "18122502372160618496",
                                                    "deptname": "至美里小区",
                                                    "indexcode": "18122502372160618496",
                                                    "jkcode": "18122502372160618496",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6",
                                                    "children": [
                                                        {
                                                            "id": "8B66CDCB7B294788AC4B3CB0660730A2",
                                                            "deptno": "18122502372160622479",
                                                            "deptname": "南江苑小区",
                                                            "indexcode": "18122502372160622479",
                                                            "jkcode": "18122502372160622479",
                                                            "pdeptno": "18122502372160618496",
                                                            "inserttime": "2019-01-17 11:16:03",
                                                            "level": "7"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "0AF27BACB4794A9ABAA4FE24D942DA22",
                                                    "deptno": "18122502372160730739",
                                                    "deptname": "禾峰乾庄",
                                                    "indexcode": "18122502372160730739",
                                                    "jkcode": "18122502372160730739",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1C33BB40FD7D4F3A9240A326C1D9E1CA",
                                                    "deptno": "18122502372160514589",
                                                    "deptname": "普光小区",
                                                    "indexcode": "18122502372160514589",
                                                    "jkcode": "18122502372160514589",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2E0706A777B44928BCB6B62A20334154",
                                                    "deptno": "18122502372160137638",
                                                    "deptname": "同创颐园小区",
                                                    "indexcode": "18122502372160137638",
                                                    "jkcode": "18122502372160137638",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "77AE6F7114D847628AF780F8B217259C",
                                                    "deptno": "18122502372160505929",
                                                    "deptname": "新贤恬苑小区",
                                                    "indexcode": "18122502372160505929",
                                                    "jkcode": "18122502372160505929",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "79AE2E0A8C7C4F9AA2630DE94D966BE7",
                                                    "deptno": "18122502372160521806",
                                                    "deptname": "世和理想",
                                                    "indexcode": "18122502372160521806",
                                                    "jkcode": "18122502372160521806",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "82B97C63C7AD4B8292B3F90771067933",
                                                    "deptno": "18122502372160619770",
                                                    "deptname": "新贤家园小区",
                                                    "indexcode": "18122502372160619770",
                                                    "jkcode": "18122502372160619770",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "A2D355575CB94567977140314964400A",
                                                    "deptno": "18122502372160974740",
                                                    "deptname": "茗品别墅",
                                                    "indexcode": "18122502372160974740",
                                                    "jkcode": "18122502372160974740",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "AC37384E986E47F99BA1ED428C46F685",
                                                    "deptno": "18122502372160042701",
                                                    "deptname": "余南小区",
                                                    "indexcode": "18122502372160042701",
                                                    "jkcode": "18122502372160042701",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "B9B1A3A187334E01833FD6D1181213EC",
                                                    "deptno": "18122502372160211114",
                                                    "deptname": "辛福家园小区",
                                                    "indexcode": "18122502372160211114",
                                                    "jkcode": "18122502372160211114",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "D7DF77EF8ABE4407BF5C3E9C5DDA31AE",
                                                    "deptno": "18122502372160321028",
                                                    "deptname": "新贤润苑小区",
                                                    "indexcode": "18122502372160321028",
                                                    "jkcode": "18122502372160321028",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "E5C8046435924421B8FAC5F3646BE372",
                                                    "deptno": "18122502372160753111",
                                                    "deptname": "香叶小区",
                                                    "indexcode": "18122502372160753111",
                                                    "jkcode": "18122502372160753111",
                                                    "pdeptno": "18122502372160889974",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "A51BFA2AEA494CDEA077CC73ABCFCA93",
                                            "deptno": "330700000038967790",
                                            "deptname": "余新_自建五期",
                                            "indexcode": "330700000038967790",
                                            "jkcode": "330700000038967790",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A69868835639415A9372DD3E8D5BC59A",
                                            "deptno": "330700000002663390",
                                            "deptname": "余新_自建三期",
                                            "indexcode": "330700000002663390",
                                            "jkcode": "330700000002663390",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CCEFA208F82641CE95B461BB0592FF17",
                                            "deptno": "330700000043997090",
                                            "deptname": "余新_自建一期",
                                            "indexcode": "330700000043997090",
                                            "jkcode": "330700000043997090",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "EDB2BEF5FA6C4C41AF849B4EE6E0CCCD",
                                            "deptno": "330700000097695190",
                                            "deptname": "电信大屏",
                                            "indexcode": "330700000097695190",
                                            "jkcode": "330700000097695190",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F3B7CA98AF0746EB89BE85D25A176CB9",
                                            "deptno": "18100708462160238834",
                                            "deptname": "余新_电信二期模改数",
                                            "indexcode": "18100708462160238834",
                                            "jkcode": "18100708462160238834",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F9F16D9D9ED84E5AB4AF470181147647",
                                            "deptno": "18092709422160629206",
                                            "deptname": "幸福家园",
                                            "indexcode": "18092709422160629206",
                                            "jkcode": "18092709422160629206",
                                            "pdeptno": "330402610000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "A74BC013F2B0418AACFD496DB20568D8",
                                    "deptno": "33040219",
                                    "deptname": "检查站",
                                    "indexcode": "33040219",
                                    "jkcode": "33040219",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "A4A804ABD246478BBCBA05CB53FEBE6B",
                                            "deptno": "33040219002160076759",
                                            "deptname": "S202检查站人脸",
                                            "indexcode": "33040219002160076759",
                                            "jkcode": "33040219002160076759",
                                            "pdeptno": "33040219",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "C10E8C0CC5064D63AC3EE378E4DF4F71",
                                    "deptno": "330402650000",
                                    "deptname": "广场派出所",
                                    "indexcode": "330402650000",
                                    "jkcode": "330402650000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "6D420D34DC584F169BB59F5A16D6ED5E",
                                            "deptno": "330000010068048590",
                                            "deptname": "卡口",
                                            "indexcode": "330000010068048590",
                                            "jkcode": "330000010068048590",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "6D5F7747F1824FBA85D820B87199AC53",
                                            "deptno": "330000010086347390",
                                            "deptname": "违停抓拍",
                                            "indexcode": "330000010086347390",
                                            "jkcode": "330000010086347390",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "79D4B027B9CD480B84FE6F16C4AC6231",
                                            "deptno": "18121512552160235612",
                                            "deptname": "体育中心安保",
                                            "indexcode": "18121512552160235612",
                                            "jkcode": "18121512552160235612",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "AB263AF760494C69996CD249CBB88231",
                                            "deptno": "330000010048276690",
                                            "deptname": "鹰眼",
                                            "indexcode": "330000010048276690",
                                            "jkcode": "330000010048276690",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B0941C81966446A598BCC9AD158F8305",
                                            "deptno": "330000010061279190",
                                            "deptname": "人脸",
                                            "indexcode": "330000010061279190",
                                            "jkcode": "330000010061279190",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CB76A66E02D54AABB894A499CA2188FF",
                                            "deptno": "18092203162160952391",
                                            "deptname": "指挥中心",
                                            "indexcode": "18092203162160952391",
                                            "jkcode": "18092203162160952391",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CE338160C4164E719D95FB5DD2F730EC",
                                            "deptno": "330000010095505390",
                                            "deptname": "治安监控",
                                            "indexcode": "330000010095505390",
                                            "jkcode": "330000010095505390",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "EA4A1AB58C684AAFAFE42E2FC25EA3CA",
                                            "deptno": "18092908482160478600",
                                            "deptname": "第二批新建",
                                            "indexcode": "18092908482160478600",
                                            "jkcode": "18092908482160478600",
                                            "pdeptno": "330402650000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "C2BD1672311B450AB82725790E7B6D3B",
                                    "deptno": "330402640000",
                                    "deptname": "七星派出所",
                                    "indexcode": "330402640000",
                                    "jkcode": "330402640000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "091E1B752E194A5EB94ACC1869BA1551",
                                            "deptno": "18101103362160310637",
                                            "deptname": "区域",
                                            "indexcode": "18101103362160310637",
                                            "jkcode": "18101103362160310637",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "183DDB74C8D34977AC59B319CF92D14F",
                                            "deptno": "18120603532160813129",
                                            "deptname": "七星_七期",
                                            "indexcode": "18120603532160813129",
                                            "jkcode": "18120603532160813129",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "3CE5DDD1FDD44E789036D9E2D26ED045",
                                            "deptno": "331100000006597890",
                                            "deptname": "七星-学校",
                                            "indexcode": "331100000006597890",
                                            "jkcode": "331100000006597890",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5A42392CEE424206ACB82DD31967A13E",
                                            "deptno": "18122502532160176217",
                                            "deptname": "七星_智慧小区",
                                            "indexcode": "18122502532160176217",
                                            "jkcode": "18122502532160176217",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "6D3BAF98C0BF4D42922FDC353E59ED14",
                                                    "deptno": "18122502532160664944",
                                                    "deptname": "汇众佳苑",
                                                    "indexcode": "18122502532160664944",
                                                    "jkcode": "18122502532160664944",
                                                    "pdeptno": "18122502532160176217",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "727851B344024A95839E8813A520AF55",
                                            "deptno": "18102601252160955372",
                                            "deptname": "七星_自建六期",
                                            "indexcode": "18102601252160955372",
                                            "jkcode": "18102601252160955372",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "786ED7A3A8654426B264D14DE1818897",
                                            "deptno": "18090609232160898974",
                                            "deptname": "嘉城绿都",
                                            "indexcode": "18090609232160898974",
                                            "jkcode": "18090609232160898974",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "87F06FA297E24437AD2D539BD4EFFEC0",
                                            "deptno": "18100708482160552232",
                                            "deptname": "七星_电信二期模改数",
                                            "indexcode": "18100708482160552232",
                                            "jkcode": "18100708482160552232",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8839DBAE03064922BC83FC6A04692CAA",
                                            "deptno": "18082207392160347079",
                                            "deptname": "清真寺临时",
                                            "indexcode": "18082207392160347079",
                                            "jkcode": "18082207392160347079",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8B13464984BE4E30BA8EA5116CC63A6E",
                                            "deptno": "331100000083990890",
                                            "deptname": "七星临时",
                                            "indexcode": "331100000083990890",
                                            "jkcode": "331100000083990890",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8B723021493F4912B45952BB6E0B80A6",
                                            "deptno": "19010205292160456075",
                                            "deptname": "测试股",
                                            "indexcode": "19010205292160456075",
                                            "jkcode": "19010205292160456075",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9096F2F146C243EC8526AFEC9BE8A0F1",
                                            "deptno": "18092703372160682237",
                                            "deptname": "嘉城绿都一杆四机",
                                            "indexcode": "18092703372160682237",
                                            "jkcode": "18092703372160682237",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A59E2880B84540F1864F6EB1ACE9A340",
                                            "deptno": "331100000077947090",
                                            "deptname": "七星_自建一期",
                                            "indexcode": "331100000077947090",
                                            "jkcode": "331100000077947090",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "ADE3B9F75D5140EAB0F7FABF76AF52E0",
                                            "deptno": "18120403592160471885",
                                            "deptname": "缓建点位",
                                            "indexcode": "18120403592160471885",
                                            "jkcode": "18120403592160471885",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "AF260FC18FF34986B9FC37BFE59FEE76",
                                            "deptno": "331100000025707890",
                                            "deptname": "七星_自建五期",
                                            "indexcode": "331100000025707890",
                                            "jkcode": "331100000025707890",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "AF73F8C5F17D4434952BEBE65A7FB041",
                                            "deptno": "331100000090345490",
                                            "deptname": "七星_自建二期",
                                            "indexcode": "331100000090345490",
                                            "jkcode": "331100000090345490",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B89485C889E149E3873F618573808FF2",
                                            "deptno": "18092708522160066627",
                                            "deptname": "七星花园",
                                            "indexcode": "18092708522160066627",
                                            "jkcode": "18092708522160066627",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "BCC17601F0EB40ECADA20F1A47E4D640",
                                            "deptno": "18092705442160382732",
                                            "deptname": "湘都公寓",
                                            "indexcode": "18092705442160382732",
                                            "jkcode": "18092705442160382732",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C6E347DA33F741EEBBE4018B3B8B33F5",
                                            "deptno": "18092505502160667619",
                                            "deptname": "湘南公寓",
                                            "indexcode": "18092505502160667619",
                                            "jkcode": "18092505502160667619",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CB6209DBB545482DB6187E267F9B85A7",
                                            "deptno": "331100000076546090",
                                            "deptname": "七星_电信一期",
                                            "indexcode": "331100000076546090",
                                            "jkcode": "331100000076546090",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CC23B76936464955BA2E7C168104BCBF",
                                            "deptno": "18082003392160993980",
                                            "deptname": "江南新家园",
                                            "indexcode": "18082003392160993980",
                                            "jkcode": "18082003392160993980",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CF9371B71F6A468B90A6EA0411C111B0",
                                            "deptno": "18092505502160115797",
                                            "deptname": "大树绿苑",
                                            "indexcode": "18092505502160115797",
                                            "jkcode": "18092505502160115797",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "CF9983B05FE8480B82D9AA6D93AEE963",
                                            "deptno": "18082003412160459882",
                                            "deptname": "三家浜社区",
                                            "indexcode": "18082003412160459882",
                                            "jkcode": "18082003412160459882",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "FDF1C608A9274FA6A86394FE25CC6295",
                                            "deptno": "331100000030619090",
                                            "deptname": "七星_电信二期",
                                            "indexcode": "331100000030619090",
                                            "jkcode": "331100000030619090",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "FE78B027A42542CF9C84627015CBFC06",
                                            "deptno": "331100000054311690",
                                            "deptname": "七星_自建三期",
                                            "indexcode": "331100000054311690",
                                            "jkcode": "331100000054311690",
                                            "pdeptno": "330402640000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "C50DE1CFAC9B4BFEB39BBD152D280D40",
                                    "deptno": "330401",
                                    "deptname": "卡口",
                                    "indexcode": "330401",
                                    "jkcode": "330401",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "2CD2364B3F484C059A223CC9AA48005A",
                                            "deptno": "33040166",
                                            "deptname": "自定义",
                                            "indexcode": "33040166",
                                            "jkcode": "33040166",
                                            "pdeptno": "330401",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "2E469DE87ECF4FF69CB9E727B569A589",
                                            "deptno": "33040102",
                                            "deptname": "老旧小区卡口",
                                            "indexcode": "33040102",
                                            "jkcode": "33040102",
                                            "pdeptno": "330401",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "33A4B5178F1D4AF9B958FE616172BF32",
                                            "deptno": "33040100002160739790",
                                            "deptname": "鹰眼",
                                            "indexcode": "33040100002160739790",
                                            "jkcode": "33040100002160739790",
                                            "pdeptno": "330401",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "59EA98FBC5E34435B02840F0D96F6B98",
                                            "deptno": "33040174",
                                            "deptname": "七一卡口",
                                            "indexcode": "33040174",
                                            "jkcode": "33040174",
                                            "pdeptno": "330401",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "A1730428041848BA93B8ECA89B01EEBB",
                                            "deptno": "33040178",
                                            "deptname": "社会面视频",
                                            "indexcode": "33040178",
                                            "jkcode": "33040178",
                                            "pdeptno": "330401",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "D1CAFB63170E49A6B6006BFE5D2386B9",
                                    "deptno": "330402620000",
                                    "deptname": "凤桥派出所",
                                    "indexcode": "330402620000",
                                    "jkcode": "330402620000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "00F88F8825C74E43A8D353B8AE0F09BD",
                                            "deptno": "331000000096178790",
                                            "deptname": "凤桥-学校",
                                            "indexcode": "331000000096178790",
                                            "jkcode": "331000000096178790",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "1CC2428DBF1A4BB9B5AE049E2E4AB0F9",
                                            "deptno": "331000000056124390",
                                            "deptname": "凤桥_自建二期",
                                            "indexcode": "331000000056124390",
                                            "jkcode": "331000000056124390",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "3386CF35D8B44569883805F76744BD45",
                                            "deptno": "331000000032589990",
                                            "deptname": "凤桥_电信一期",
                                            "indexcode": "331000000032589990",
                                            "jkcode": "331000000032589990",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "796247B0CE9C4353A176A9F0EA14B6EB",
                                            "deptno": "18092509272160395260",
                                            "deptname": "凤桥_电信二期模改数",
                                            "indexcode": "18092509272160395260",
                                            "jkcode": "18092509272160395260",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "7B69909E347948B59FE4D2D3671D3342",
                                            "deptno": "18122501502160568346",
                                            "deptname": "凤桥_智慧小区",
                                            "indexcode": "18122501502160568346",
                                            "jkcode": "18122501502160568346",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "13C6813B932B44CC8E390876C36C1423",
                                                    "deptno": "18122501502160705088",
                                                    "deptname": "凤栖桃苑",
                                                    "indexcode": "18122501502160705088",
                                                    "jkcode": "18122501502160705088",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1AD446AFBB504C57BF68237F1DD51EB9",
                                                    "deptno": "18122501502160741449",
                                                    "deptname": "凤华丽都",
                                                    "indexcode": "18122501502160741449",
                                                    "jkcode": "18122501502160741449",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3261993A8F924C6DBCB0AD7ABAAA40C4",
                                                    "deptno": "18122501502160216197",
                                                    "deptname": "祥和花苑小区",
                                                    "indexcode": "18122501502160216197",
                                                    "jkcode": "18122501502160216197",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "3EFFE45F695C4F6CB4E9A81ED7E219FE",
                                                    "deptno": "18122501502160499002",
                                                    "deptname": "凤凰花苑",
                                                    "indexcode": "18122501502160499002",
                                                    "jkcode": "18122501502160499002",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "994ABD2208EC4E379ED12EC7EB4BA48E",
                                                    "deptno": "18122501502160675195",
                                                    "deptname": "西梅家兜",
                                                    "indexcode": "18122501502160675195",
                                                    "jkcode": "18122501502160675195",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "A7B7C1F5CE2246839C0067B249F30203",
                                                    "deptno": "18122501502160407511",
                                                    "deptname": "凤南三期东门",
                                                    "indexcode": "18122501502160407511",
                                                    "jkcode": "18122501502160407511",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "AB89B39F3EE7464CB40F3ABDB93A0482",
                                                    "deptno": "18122501502160175913",
                                                    "deptname": "凤南景苑",
                                                    "indexcode": "18122501502160175913",
                                                    "jkcode": "18122501502160175913",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "AE07F4DEC3344965A29CD59E5022885D",
                                                    "deptno": "18122501502160852704",
                                                    "deptname": "凤南新村",
                                                    "indexcode": "18122501502160852704",
                                                    "jkcode": "18122501502160852704",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "BE45321F205C4F22AC23C73D8901DE92",
                                                    "deptno": "18122501502160553783",
                                                    "deptname": "桃源东湾",
                                                    "indexcode": "18122501502160553783",
                                                    "jkcode": "18122501502160553783",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "CE03CFDB9A5F47AC9336A584BAD7C9CF",
                                                    "deptno": "18122501502160540365",
                                                    "deptname": "桃源小洲",
                                                    "indexcode": "18122501502160540365",
                                                    "jkcode": "18122501502160540365",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F20B150F0E7F46B088BACCFC29698823",
                                                    "deptno": "18122501502160748041",
                                                    "deptname": "桃源林语",
                                                    "indexcode": "18122501502160748041",
                                                    "jkcode": "18122501502160748041",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F4E01EFD749B4DC7B8057599B2F3A4F5",
                                                    "deptno": "18122501502160145689",
                                                    "deptname": "凤南三期南门",
                                                    "indexcode": "18122501502160145689",
                                                    "jkcode": "18122501502160145689",
                                                    "pdeptno": "18122501502160568346",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "95C3BEF7BA5C4D1F8D08EA9D9EBEAE25",
                                            "deptno": "331000000071603890",
                                            "deptname": "凤桥_自建一期",
                                            "indexcode": "331000000071603890",
                                            "jkcode": "331000000071603890",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "9CCF9920ADC649178B3C09CAD732AA29",
                                            "deptno": "18120603552160066274",
                                            "deptname": "凤桥_七期",
                                            "indexcode": "18120603552160066274",
                                            "jkcode": "18120603552160066274",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B68C8BF3F69B404A9977CA18659965F7",
                                            "deptno": "331000000021334690",
                                            "deptname": "凤桥_自建五期",
                                            "indexcode": "331000000021334690",
                                            "jkcode": "331000000021334690",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "BED17D6CAB044A47BE58F9140616F3C8",
                                            "deptno": "331000000039142790",
                                            "deptname": "凤桥_自建三期",
                                            "indexcode": "331000000039142790",
                                            "jkcode": "331000000039142790",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C421B9B4385C4C4AA08850DFE727850C",
                                            "deptno": "18091501282160762371",
                                            "deptname": "凤桥_自建六期",
                                            "indexcode": "18091501282160762371",
                                            "jkcode": "18091501282160762371",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "C6B1E8853D054C499A441DC476272340",
                                            "deptno": "33040100002160030462",
                                            "deptname": "凤桥派出所",
                                            "indexcode": "33040100002160030462",
                                            "jkcode": "33040100002160030462",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "E14DF8ACFE984B579D30FAF127677200",
                                            "deptno": "331000000087493290",
                                            "deptname": "凤桥_电信二期",
                                            "indexcode": "331000000087493290",
                                            "jkcode": "331000000087493290",
                                            "pdeptno": "330402620000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                },
                                {
                                    "id": "D9C94CDC3B5E4D5BBD159CBF8C700022",
                                    "deptno": "330402540000",
                                    "deptname": "南湖派出所",
                                    "indexcode": "330402540000",
                                    "jkcode": "330402540000",
                                    "pdeptno": "330402000000",
                                    "inserttime": "2019-01-17 11:16:03",
                                    "level": "4",
                                    "children": [
                                        {
                                            "id": "1F0C6314FEC148E3895AE7B0E59ECF59",
                                            "deptno": "330100000076018490",
                                            "deptname": "南湖_自建一期",
                                            "indexcode": "330100000076018490",
                                            "jkcode": "330100000076018490",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "27B9EDC167F94AAA98456C2C1CC6DCB2",
                                            "deptno": "18101110502160871359",
                                            "deptname": "区域",
                                            "indexcode": "18101110502160871359",
                                            "jkcode": "18101110502160871359",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "49EF46BC2CFF4250BF0842A1F4C50031",
                                            "deptno": "18083008352160475373",
                                            "deptname": "南湖国际中国翰林博物馆",
                                            "indexcode": "18083008352160475373",
                                            "jkcode": "18083008352160475373",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "4B06F71404FD4A1FAA3C47735DBC127A",
                                            "deptno": "330100000045415690",
                                            "deptname": "指挥室",
                                            "indexcode": "330100000045415690",
                                            "jkcode": "330100000045415690",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "5B4D518D0F2A4F36893312AAF05AB1F7",
                                            "deptno": "330100000067950890",
                                            "deptname": "行政中心",
                                            "indexcode": "330100000067950890",
                                            "jkcode": "330100000067950890",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "78746ABDF3A8488CA16752299F2B0DB6",
                                            "deptno": "330100000096558390",
                                            "deptname": "南湖_电信一期",
                                            "indexcode": "330100000096558390",
                                            "jkcode": "330100000096558390",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "8E6A02E7EA884E84A10F9D9561F47409",
                                            "deptno": "18122502322160838561",
                                            "deptname": "南湖_智慧小区",
                                            "indexcode": "18122502322160838561",
                                            "jkcode": "18122502322160838561",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5",
                                            "children": [
                                                {
                                                    "id": "0404EC8D607349559DEF4BF2A11D60C4",
                                                    "deptno": "18122502322160148198",
                                                    "deptname": "烟雨苑",
                                                    "indexcode": "18122502322160148198",
                                                    "jkcode": "18122502322160148198",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "0629369D0A6B46B7B768C61B87D35A6A",
                                                    "deptno": "18122502322160120250",
                                                    "deptname": "巴黎都市路易宫",
                                                    "indexcode": "18122502322160120250",
                                                    "jkcode": "18122502322160120250",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "06EFA780DD4B4395B6DAEC8FD4B323E9",
                                                    "deptno": "18122502322160168640",
                                                    "deptname": "许安公寓",
                                                    "indexcode": "18122502322160168640",
                                                    "jkcode": "18122502322160168640",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "09FF50F811E3457BB6B4799A3F1AC272",
                                                    "deptno": "18122502322160294640",
                                                    "deptname": "翰林府邸",
                                                    "indexcode": "18122502322160294640",
                                                    "jkcode": "18122502322160294640",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "1A2027F3F5B9491F89FB79D19D9673E5",
                                                    "deptno": "18122502322160885220",
                                                    "deptname": "巴黎都市波旁宫",
                                                    "indexcode": "18122502322160885220",
                                                    "jkcode": "18122502322160885220",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "2380F88A5C5745B29057D81C29D7AF9B",
                                                    "deptno": "18122502322160092836",
                                                    "deptname": "烟湖苑",
                                                    "indexcode": "18122502322160092836",
                                                    "jkcode": "18122502322160092836",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "27DA2F2EDC5A4E7B9D735A21DD59DC20",
                                                    "deptno": "18122502322160535559",
                                                    "deptname": "新湖绿都",
                                                    "indexcode": "18122502322160535559",
                                                    "jkcode": "18122502322160535559",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "31AC4BCCC10B46EEBDCEECBAFF47B611",
                                                    "deptno": "18122502322160469372",
                                                    "deptname": "海棠苑",
                                                    "indexcode": "18122502322160469372",
                                                    "jkcode": "18122502322160469372",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "37A9CB9127E84551AF7AD609CC692A5F",
                                                    "deptno": "18122502322160222742",
                                                    "deptname": "烟波苑",
                                                    "indexcode": "18122502322160222742",
                                                    "jkcode": "18122502322160222742",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "41861B5E1ABE4032B45F30CBDC10E4BA",
                                                    "deptno": "18122502322160594274",
                                                    "deptname": "万家花园",
                                                    "indexcode": "18122502322160594274",
                                                    "jkcode": "18122502322160594274",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "5205A468BFCC4F05980EEEC71E968661",
                                                    "deptno": "18122502322160644319",
                                                    "deptname": "百盛花园",
                                                    "indexcode": "18122502322160644319",
                                                    "jkcode": "18122502322160644319",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "5B816A05587A4670AA02D470E84B5A2B",
                                                    "deptno": "18122502322160833206",
                                                    "deptname": "桂苑小区",
                                                    "indexcode": "18122502322160833206",
                                                    "jkcode": "18122502322160833206",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "6BC6F753E4A04013A2CFCFBD1B09896C",
                                                    "deptno": "18122502322160832368",
                                                    "deptname": "南溪二期",
                                                    "indexcode": "18122502322160832368",
                                                    "jkcode": "18122502322160832368",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "7E085714F7454CBDA77E1A5F0C94F882",
                                                    "deptno": "18122502322160147447",
                                                    "deptname": "长中苑",
                                                    "indexcode": "18122502322160147447",
                                                    "jkcode": "18122502322160147447",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "844E140ED4C44D8F9E11313E0BF4A11B",
                                                    "deptno": "18122502322160736583",
                                                    "deptname": "菱香坊",
                                                    "indexcode": "18122502322160736583",
                                                    "jkcode": "18122502322160736583",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8C37B5BE10FE4979BA91685BF27AC263",
                                                    "deptno": "18122502322160246359",
                                                    "deptname": "云洲苑",
                                                    "indexcode": "18122502322160246359",
                                                    "jkcode": "18122502322160246359",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "8EA739EC67764FDCA50FF8DC649CFAB7",
                                                    "deptno": "18122502322160573667",
                                                    "deptname": "三景花园",
                                                    "indexcode": "18122502322160573667",
                                                    "jkcode": "18122502322160573667",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "9228A92FAB3E4E1199665DA96FF46A07",
                                                    "deptno": "18122502322160172140",
                                                    "deptname": "南溪一期",
                                                    "indexcode": "18122502322160172140",
                                                    "jkcode": "18122502322160172140",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "92B5F70034A147C3AD280774415F7BD8",
                                                    "deptno": "18122502322160488520",
                                                    "deptname": "探花苑",
                                                    "indexcode": "18122502322160488520",
                                                    "jkcode": "18122502322160488520",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "BBD396835FDF4AB29321E1271DB8D41F",
                                                    "deptno": "18122502322160993580",
                                                    "deptname": "富安臻园",
                                                    "indexcode": "18122502322160993580",
                                                    "jkcode": "18122502322160993580",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C11BCAB38B8E4E398EF83CFF4AF868D1",
                                                    "deptno": "18122502322160187988",
                                                    "deptname": "百隆花园",
                                                    "indexcode": "18122502322160187988",
                                                    "jkcode": "18122502322160187988",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "C80C2D5671A7446BB803C5AC612D5C14",
                                                    "deptno": "18122502322160375278",
                                                    "deptname": "学仕苑",
                                                    "indexcode": "18122502322160375278",
                                                    "jkcode": "18122502322160375278",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "F4E427C830354AE3A47A7F42048C3CFA",
                                                    "deptno": "18122502322160344582",
                                                    "deptname": "农翔苑",
                                                    "indexcode": "18122502322160344582",
                                                    "jkcode": "18122502322160344582",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                },
                                                {
                                                    "id": "FF068B64D33D4D37A9573BB19B0BECF9",
                                                    "deptno": "18122502322160036547",
                                                    "deptname": "汇龙苑",
                                                    "indexcode": "18122502322160036547",
                                                    "jkcode": "18122502322160036547",
                                                    "pdeptno": "18122502322160838561",
                                                    "inserttime": "2019-01-17 11:16:03",
                                                    "level": "6"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "B5E7C2ABF3994C3E98980F0118C7EF5A",
                                            "deptno": "330100000074452590",
                                            "deptname": "南湖_自建二期",
                                            "indexcode": "330100000074452590",
                                            "jkcode": "330100000074452590",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "B84E4DD9862D49BCAB743E93DE7EBFB7",
                                            "deptno": "330100000056419990",
                                            "deptname": "南湖-学校",
                                            "indexcode": "330100000056419990",
                                            "jkcode": "330100000056419990",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "D4B2FB85F28D41D5BE87ED908C85EDA6",
                                            "deptno": "330100000096376390",
                                            "deptname": "南湖_电信二期",
                                            "indexcode": "330100000096376390",
                                            "jkcode": "330100000096376390",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "E54330760D4C40A0B2A76CFD967C6423",
                                            "deptno": "18100604272160225604",
                                            "deptname": "南湖_电信二期模改数",
                                            "indexcode": "18100604272160225604",
                                            "jkcode": "18100604272160225604",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        },
                                        {
                                            "id": "F7953C85AD9B422DB2F1A7D57EBB959F",
                                            "deptno": "330100000021790290",
                                            "deptname": "南湖_自建五期",
                                            "indexcode": "330100000021790290",
                                            "jkcode": "330100000021790290",
                                            "pdeptno": "330402540000",
                                            "inserttime": "2019-01-17 11:16:03",
                                            "level": "5"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "F205811CB51243FF902C77BF28FDC48D",
                            "deptno": "33040000002160016471",
                            "deptname": "立元卡口设备2",
                            "indexcode": "33040000002160016471",
                            "jkcode": "33040000002160016471",
                            "pdeptno": "3304",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2A5C9439E2F946B59CFE4716B9EC02EF",
            "deptno": "3309",
            "deptname": "南湖公安局",
            "indexcode": "3309",
            "jkcode": "3309",
            "pdeptno": "0",
            "inserttime": "2019-01-17 11:16:03",
            "level": "1",
            "children": [
                {
                    "id": "01300F4EFBF24BCC869A89FCE795A0E2",
                    "deptno": "33040289",
                    "deptname": "新兴派出所",
                    "indexcode": "33040289",
                    "jkcode": "33040289",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "52FA1B1C50F74465B9CF53F104E87113",
                            "deptno": "33040289002160593357",
                            "deptname": "新兴派出所执法仪",
                            "indexcode": "33040289002160593357",
                            "jkcode": "33040289002160593357",
                            "pdeptno": "33040289",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "12C19A3282E3450FA01FDC1218C66289",
                    "deptno": "33040288",
                    "deptname": "指挥中心",
                    "indexcode": "33040288",
                    "jkcode": "33040288",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "218ED2E77CCA4997B89CEAA8FDED0229",
                            "deptno": "33040288002160613739",
                            "deptname": "指挥中心执法仪",
                            "indexcode": "33040288002160613739",
                            "jkcode": "33040288002160613739",
                            "pdeptno": "33040288",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "198AE6D72588450E8D68F9D6E21EF8CC",
                    "deptno": "33040232",
                    "deptname": "新嘉派出所",
                    "indexcode": "33040232",
                    "jkcode": "33040232",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "89C9A784810B41E995E56EDD28FC241E",
                            "deptno": "33040232002160457012",
                            "deptname": "新嘉派出所执法仪",
                            "indexcode": "33040232002160457012",
                            "jkcode": "33040232002160457012",
                            "pdeptno": "33040232",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "2690386083BF4FE88D19849F3793C796",
                    "deptno": "33090000002160658733",
                    "deptname": "南湖公安局",
                    "indexcode": "33090000002160658733",
                    "jkcode": "33090000002160658733",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2"
                },
                {
                    "id": "2BC8814282334F2BB2B5DB48468D44B9",
                    "deptno": "33040233",
                    "deptname": "治安中心",
                    "indexcode": "33040233",
                    "jkcode": "33040233",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "E0AD1CD4B76E48F29450B0E42D0D2ABA",
                            "deptno": "33040233002160590890",
                            "deptname": "治安中心执法仪",
                            "indexcode": "33040233002160590890",
                            "jkcode": "33040233002160590890",
                            "pdeptno": "33040233",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "2E74F6F2CABC420D9ECC2915BB2EA944",
                    "deptno": "33040200",
                    "deptname": "七星派出所",
                    "indexcode": "33040200",
                    "jkcode": "33040200",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "7117FF20990B4233AE9A2E454EBE041C",
                            "deptno": "33040200002160344302",
                            "deptname": "七星派出所执法仪",
                            "indexcode": "33040200002160344302",
                            "jkcode": "33040200002160344302",
                            "pdeptno": "33040200",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "481F5688716E4D0591E16D25D2A8D588",
                    "deptno": "33040272",
                    "deptname": "大桥派出所",
                    "indexcode": "33040272",
                    "jkcode": "33040272",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "CEBB1F19AAEA4446AB617800C5899B47",
                            "deptno": "33040272002160393725",
                            "deptname": "大桥派出所执法仪",
                            "indexcode": "33040272002160393725",
                            "jkcode": "33040272002160393725",
                            "pdeptno": "33040272",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "4E99B8DA6D2B4427A496CFF7F0B772DD",
                    "deptno": "33040273",
                    "deptname": "南湖公安局",
                    "indexcode": "33040273",
                    "jkcode": "33040273",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "B86A3FE17EC84B04AB0E5EA4153C4BCC",
                            "deptno": "33040273002160265289",
                            "deptname": "南湖公安局执法仪",
                            "indexcode": "33040273002160265289",
                            "jkcode": "33040273002160265289",
                            "pdeptno": "33040273",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "5F815CEFA1914FCBB36FF79FA328FEA1",
                    "deptno": "33040264",
                    "deptname": "拘留所",
                    "indexcode": "33040264",
                    "jkcode": "33040264",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "3424D0D90F6D443CB3C26D89A46B8547",
                            "deptno": "33040264002160323171",
                            "deptname": "拘留所执法仪",
                            "indexcode": "33040264002160323171",
                            "jkcode": "33040264002160323171",
                            "pdeptno": "33040264",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "6033EC1D91824CC09A9BA6C0A6544048",
                    "deptno": "33040268",
                    "deptname": "余新派出所",
                    "indexcode": "33040268",
                    "jkcode": "33040268",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "5F8D0ED54E874F64A588D9163D0BC1B8",
                            "deptno": "33040268002160851861",
                            "deptname": "余新派出所执法仪",
                            "indexcode": "33040268002160851861",
                            "jkcode": "33040268002160851861",
                            "pdeptno": "33040268",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "733A39E0C1C2427085C584918355C789",
                    "deptno": "33040227",
                    "deptname": "广场派出所",
                    "indexcode": "33040227",
                    "jkcode": "33040227",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "648862F88F3D43629B1CA984B8B3F9AF",
                            "deptno": "33040227002160951859",
                            "deptname": "广场派出所执法仪",
                            "indexcode": "33040227002160951859",
                            "jkcode": "33040227002160951859",
                            "pdeptno": "33040227",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "7F37148E055448178090B39D49F40A21",
                    "deptno": "33040237",
                    "deptname": "南湖派出所",
                    "indexcode": "33040237",
                    "jkcode": "33040237",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "5E662C08642642B8B6D70A8B63C7A89D",
                            "deptno": "33040237002160876525",
                            "deptname": "南湖派出所执法仪",
                            "indexcode": "33040237002160876525",
                            "jkcode": "33040237002160876525",
                            "pdeptno": "33040237",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "9D95278EDF214C4AB977F6D5B1739CFE",
                    "deptno": "33040267",
                    "deptname": "东栅派出所",
                    "indexcode": "33040267",
                    "jkcode": "33040267",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "1D631E32A91B4977A7112AA4C50E4F9B",
                            "deptno": "33040267002160702290",
                            "deptname": "东栅派出所执法仪",
                            "indexcode": "33040267002160702290",
                            "jkcode": "33040267002160702290",
                            "pdeptno": "33040267",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "A7EE8C0CB05C47DBB22265CBD99DB249",
                    "deptno": "33040218",
                    "deptname": "解放派出所",
                    "indexcode": "33040218",
                    "jkcode": "33040218",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "FE6C663E3BAA45058061474AE347751F",
                            "deptno": "33040218002160520097",
                            "deptname": "解放派出所执法仪",
                            "indexcode": "33040218002160520097",
                            "jkcode": "33040218002160520097",
                            "pdeptno": "33040218",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "BAFDB43F0C6442D1AA6E5C964E750F71",
                    "deptno": "33040262",
                    "deptname": "新丰派出所",
                    "indexcode": "33040262",
                    "jkcode": "33040262",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "CDE60E179E054E968A1DC81F609DC5AA",
                            "deptno": "33040262002160388135",
                            "deptname": "新丰派出所执法仪",
                            "indexcode": "33040262002160388135",
                            "jkcode": "33040262002160388135",
                            "pdeptno": "33040262",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "F50F9621E6964FC99E1422F4CF29ED66",
                    "deptno": "33040236",
                    "deptname": "建设派出所",
                    "indexcode": "33040236",
                    "jkcode": "33040236",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "B1061EAB67C44C9C9D2AFE5C693B47D3",
                            "deptno": "33040236002160759614",
                            "deptname": "建设派出所执法仪",
                            "indexcode": "33040236002160759614",
                            "jkcode": "33040236002160759614",
                            "pdeptno": "33040236",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                },
                {
                    "id": "FF5AA9F74EE54A91B718A6AA4E998F51",
                    "deptno": "33040291",
                    "deptname": "凤桥派出所",
                    "indexcode": "33040291",
                    "jkcode": "33040291",
                    "pdeptno": "3309",
                    "inserttime": "2019-01-17 11:16:03",
                    "level": "2",
                    "children": [
                        {
                            "id": "6DB4B7801217430883A415F21619E2E0",
                            "deptno": "33040291002160693717",
                            "deptname": "凤桥派出所执法仪",
                            "indexcode": "33040291002160693717",
                            "jkcode": "33040291002160693717",
                            "pdeptno": "33040291",
                            "inserttime": "2019-01-17 11:16:03",
                            "level": "3"
                        }
                    ]
                }
            ]
        },
        {
            "id": "49224DE5F58E413F84EC96D754E9ED03",
            "deptno": "18082201512160868015",
            "deptname": "区域",
            "indexcode": "18082201512160868015",
            "jkcode": "18082201512160868015",
            "pdeptno": "0",
            "inserttime": "2019-01-17 11:16:03",
            "level": "1"
        }
    ]
},
    }
  },
  computed: mapState({
    currentDept: state => state.jqbb.currentDept,
    deptListObj: state => state.jqbb.allDeptListObj
  }),
  methods:{
      clickTree(data){
        this.$store.dispatch('putChildState',{"key":"jqbb","childkey":"currentDept","value":data});
      },

      getDeptTreeCallBack(data){
         this.$store.dispatch('putChildState',{"key":"jqbb","childkey":"allDeptListObj","value":data});
      },
  },
  created(){
    this.http.get("/jqbb/getJqbbDeptTree",null,this.getDeptTreeCallBack,this,false);
  }
}
</script>

<style scoped>
.jqbbpanel{
   height: 100%;
}
.jqbbpanel-treePanel{
  height: calc(100% - 70px);
  overflow:auto;
}
</style>

