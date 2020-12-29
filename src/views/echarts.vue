<template>
    <div class="view">
        <u-echart type="line" 
                :list="list" :legend="legend" :markVal="3.5"
                xAxisName="负担值" yAxisName="负担" fontRotate smooth hasDiff isHasScatter
        ></u-echart>
        <u-echart type="line" 
                :list="list1" :legend="legend1" :markVal="3.5"
                xAxisName="负担值" yAxisName="负担" fontRotate smooth
        ></u-echart>
        <u-echart type="bar" 
                :list="list2" :legend="legend2" :markVal='2' hasDiff
        ></u-echart>
        <u-echart type="bar" 
                :list="list3" :legend="legend3"
        ></u-echart>
        <u-echart type="bar" 
                :list="list4" :legend="legend4" :markVal='2' hasLine 
        ></u-echart>
        <u-echart type="bar" 
                :list="list5" :legend="legend5" isStack showLabel
        ></u-echart>
        <u-echart type="radar" 
                :list="list6" :legend="legend6"
        ></u-echart>
        <u-echart type="radar" 
                :list="list6" :legend="legend6" shapeType='circle'
        ></u-echart> 
        <u-echart type="scatter" 
                :list="list7" :legend="legend7" hasDiff
                :yMax='100' :xMax='0.24' :yMin='80' :xMin='0.04' :markVal="88"
        ></u-echart>
        <u-echart type="scatter" 
                :list="list7" :legend="legend7" hasDiff
                :yMax='100' :xMax='0.24' :yMin='80' :xMin='0.04' :markVal="{y:88,x:0.14}"
        ></u-echart>
        <u-echart type="boxplot" :yMax='100' hasDiff :markVal="[39,97]"
                :list="list8" :legend="legend8"
        ></u-echart>
    </div>
</template>
<script>
export default {
    name: 'echarts',
    data(){
        return {
            legend:[
                {name:'学校创新发展',key:1,color:'#fdb628',areaStyleColor:"#fdb628"},
                {name:'教师专业能力',key:2,color:'#6374f7'},
                {name:'需关注',min:0,max:2,color:'#ff7b12'},
            ],
            list:[
                {name:"学生特质",key:1, value:[4]},
                {name:"教师行为",key:1, value:[2.5]},
                {name:"领导风格",key:1, value:[2]},
                {name:"学校环境",key:1, value:[1]},
                {name:"师德修养",key:2, value:[3.5]},
                {name:"学生特质3",key:2, value:[4]},
                {name:"学生特质4",key:2, value:[4.6]},
            ],
            legend1:[
                {name:'学校创新发展',color:'#fdb628',areaStyleColor:"#fdb628"},
                {name:'教师专业能力',color:'#6374f7',areaStyleColor:"#6374f7"},
            ],
            list1:[
                {name:"学生特质",value:[4,2.2]},
                {name:"教师行为", value:[2.5,3.2]},
                {name:"领导风格", value:[2,4.2]},
                {name:"学校环境", value:[1,2]},
                {name:"师德修养", value:[3.5,2]},
                {name:"学生特质3", value:[4,2]},
                {name:"学生特质4", value:[4.6,2]},
            ],
            legend2:[
                {name:'钱塘新区',key:1,color:'#4ca0ff',itemcolor:['#0078ff','#4ca0ff'],isSign: true},
                {name:'评价内容',min:2,max:5,color:'#00cd86',itemcolor:['#23c5a2','#2dd681']},
                {name:'低分评价内容',min:0,max:2,color:'#ff7b12',itemcolor:['#ff7b12','#ff9600'],isSign: true},
            ],
            list2:[
                {name:"钱塘新区",key:1,value:[4]},
                {name:"学生特质",value:[4]},
                {name:"教师行为",value:[2.5]},
                {name:"领导风格",value:[1]},
            ],
            legend3:[
                {name:'小学',color:'#00cd86',itemcolor:['#23c5a2','#2dd681']},
                {name:'初中',color:'#4ca0ff',itemcolor:['#0078ff','#4ca0ff']},
            ],
            list3:[
                {name:"学校创新发展",value:[4,3]},
                {name:"教师专业能力",value:[2,3]},
                {name:"学生综合素质发展",value:[0,3]},
            ],
            legend4:[
                {name:'得分率',color:'#4ca0ff',itemcolor:['#0078ff','#4ca0ff']},
                {name:'区分度',type:'Line',color:'#00cd86'},
            ],
            list4:[
                {name:"2018年",value:[4],lineval:[3]},
                {name:"2019年",value:[3],lineval:[2]},
                {name:"2020年",value:[2.5],lineval:[1]},
            ],
            legend5:[
                {name:'3小时以上',color:'#4ca0ff'},
                {name:'2-3小时',color:'#00cd86'},
                {name:'1-2小时',color:'#ff7b12'},
                {name:'1小时以下',color:'#7F9BFB'},
            ],
            list5:[
                {name:"前进中学",value:[20,30,40,10]},
                {name:"义蓬中学",value:[20,30,20,30]},
                {name:"行为中学",value:[10,10,40,40]},
            ],
            legend6:[
                {name:'小学',color:'#fdb628'},
                {name:'初中',color:'#6374f7'},
            ],
            list6:[
                {name:"学生特质",radarMax:5,value:[4,4]},
                {name:"教师行为",radarMax:5,value:[2.5,3]},
                {name:"领导风格",radarMax:5,value:[2,4.9]},
            ],
            legend7:[
                {name:'钱塘新区',key:1,color:'#fdb628'},
                {name:'学校',key:2,color:'#6374f7'},
            ],
            list7:[
                {name:"钱塘新区",key:1,value:[[0.14,88]]},
                {name:"学生特质",key:2,value:[[0.1,98]]},
                {name:"教师行为",key:2,value:[[0.15,98]]},
                {name:"领导风格",key:2,value:[[0.2,98]]},
            ],
            
            legend8:[
                {name:'钱塘新区',key:1,color:'#00cd86',itemcolor:['#2dd681','#23c5a2']},
                {name:'高于钱塘新区',min:98,max:100,color:'#3594ff',itemcolor:['#4799ff','#5063f6']},
                {name:'低于钱塘新区',min:0,max:98,color:'#fdb628',itemcolor:['#ffc600','#ff9000']},
            ],
            list8:[
                {name:"钱塘新区",key:1,value:[[39, 60, 70, 80, 97]]},
                {name:"第三中学",value:[[39, 60, 70, 80, 87]]},
                {name:"学生特质",value:[[39, 60, 70, 80, 100]]},
                {name:"教师行为",value:[[39, 60, 70, 80, 97]]},
                {name:"领导风格",value:[[39, 60, 70, 80, 97]]},
            ],
        }
    },
}
</script>