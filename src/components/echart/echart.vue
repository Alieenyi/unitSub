<template>
    <div class="u-chartsBox">
        <div class="legend" :class="[symbol,position]" v-if="!disLegend">
            <span v-for="(item,index) in legend" :key="index">
                <i :style="'background:'+ item.color +';'"></i>{{item.name}}
            </span>
        </div>
        <div class="chartsM" :id="'chartsBox_'+uuid"></div>
    </div>
</template>
<script>
import * as utils from "@/utils/comment.js"
import echarts from 'echarts'
export default {
    name:'UEchart',
    props:{
        disLegend: Boolean,     //不显示标签
        symbol:{                  //标签的图标类型 pie圆点   
            type: String,
            default: "pie"
        },
        position:{              //标签的位置  默认右上
            type: String,
            default: "posR"
        },
        type: String,                       //图表的类型  --line
        legend: Array,
        list: Array,
        xAxisName:{},                        //坐标轴名称 x
        yAxisName:{},                        //坐标轴名称 y      
        yMin:{
            type: Number,
            default: 0
        },
        yMax:{
            type: Number,
            default: 5
        },
        xMin:{
            type: Number,
            default: 0
        },
        xMax:{
            type: Number,
            default: 5
        },        
        fontRotate: {},                      //x轴字体是否要倾斜 (倾斜角度)
        smooth:Boolean,                  //折线是否平滑    
        disShadow: Boolean,              //是否有阴影（线的）    
        hasDiff: Boolean,             
        markVal:{},                      //平行线
        isHasScatter: Boolean,

        
        ishasBackground:{
            type: Boolean,
            default: true
        },
        barWidth:{
            type: Number,
            default: 20
        },  
        isStack: Boolean,   //合并到一行
        hasLine: Boolean,
        showLabel:Boolean,  //显示数值
        shapeType:{             //'polygon'矩形   'circle'圆形
            type: String,
            default: "polygon"
        },
    },
    data(){
        return {
            uuid: utils.uuid(),
            chartsObj: null,
            option:{},
            visualMap: null
        }
    },
    mounted(){
        this.initChart()
        
    },
    methods:{
        initChart(){
            this.chartsObj = echarts.init(document.getElementById('chartsBox_'+ this.uuid));
            let seriesData = [], option = {}, datachart = {};
            let tooltip = {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle:{
                        color: 'rgba(57,100,247,0.1)',
                    },
                    z:1
                },
                formatter: (params)=>{
                    if(this.type == 'line') params = params.filter(val => {return val.componentSubType =='line'})
                    let item = params[0]
                    if(params.length==1) {
                        if(item.componentSubType == 'boxplot'){
                            return '<div class="tooltip_title">'+item.name+'</div>'+
                                    '<span>最高分'+item.value[5]+'</span><br>'+
                                    '<span>中位值'+item.value[3]+'</span><br>'+
                                    '<span>最低分'+item.value[0]+'</span>'
                        }
                        if(item.componentSubType == 'scatter'){
                            return item.name+'<br><span class="tooltip_span">'+item.value[1]+'</span>分'
                        }
                    }else{
                        let spanVal = ''
                        params.forEach((every,index) => {
                            let color = every.color
                            if(color.colorStops) color = color.colorStops[0].color
                            spanVal +='<br><span><i class="tooltip_icon" style="background:'+color+'"></i>'+every.seriesName+"："+every.value+'</span>'
                        })
                        return '<span class="tooltip_title">'+item.name+'</span>'+spanVal
                    }
                },
            }
            
            switch (this.type) {
                case 'radar':
                    datachart = this.setRadar()
                    tooltip = datachart.tooltip
                    break;
                case 'line':
                    datachart = this.setLine()
                    break;
                case 'bar':
                    datachart = this.setBar()
                    break;
                case 'scatter':
                    datachart = this.setScatter()
                    break;
                case 'boxplot':
                    datachart = this.setBoxplot()
                    break;
            }
            
            option = datachart.option
            seriesData = datachart.series

            if(this.markVal && seriesData[0]) {
                let markVal = utils.isArray(this.markVal) ? this.markVal : [ this.markVal ];
                let markValData=[]
                markVal.forEach(item => {
                    let obj = utils.isObject(item) ? item : {y: item};
                    let pushObj = {}
                    if(obj.x) markValData.push({ xAxis: obj.x, name: '对比数'})
                    if(obj.y) markValData.push({ yAxis: obj.y, name: '对比数'})
                })
                seriesData[0].markLine = {
                    silent: true,
                    data: markValData,
                    symbol:"none",
                    label:{
                        show: false
                    },
                    lineStyle:{
                        color: "rgba(219,222,229,0.8)",    //#3964f9
                        width: 2,
                    },
                }
            }
            if(this.isStack){
                seriesData.forEach((item,index) => {
                    item.stack = "总量"
                })
                option.xAxis = {
                    type: 'value',
                    show:false,
                }
                option.yAxis =  {
                    type: 'category',
                    data:  this.list.map(({name}) => name),
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                }
            }
            if(this.showLabel){
                seriesData.forEach((item,index) => {
                    item.label = {
                        show: true,
                        position: 'inside',
                        color:"#fff"
                    }
                })
            }

            this.option = {
                legend: {
                    show: false,
                },
                textStyle:{
                    color: '#747e93',
                    fontSize: 16,
                },
                tooltip:{
                    backgroundColor: "#ffffff",
                    padding: 16,
                    textStyle:{
                        color:"#333333",
                        lineHeight: 30
                    },
                    extraCssText: 'box-shadow: 0 1px 10px rgba(59, 100, 168, 0.2); min-width: 160px; min-height:90px;',
                    ...tooltip,
                },
                ...option,
                series: seriesData
            };
            this.chartsObj.setOption(this.option);
            window.addEventListener("resize",() =>{
                this.chartsObj.resize();
            });

        },
        setAxis(){
            let dataAxis = this.list.map(({name}) => name)
            let fontRotate = !utils.isString(this.fontRotate)?'':
                        this.fontRotate?this.fontRotate:'45'    
            let option = {
                xAxis :  {
                    type: 'category',
                    data: dataAxis,
                    name: this.xAxisName,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {                        //分割线
                        show: true,
                        lineStyle: {
                            color: '#f5f6f8'
                        }
                    },
                    axisLabel: {
                        rotate:fontRotate,
                        // textStyle:{
                        //     color:(params,index) =>{
                        //         let itemcolor = this.list[index].color?this.list[index].color:'#747e93'
                        //         if(this.isHasScatter)
                        //             return scatterData[index].color?scatterData[index].color:itemcolor
                        //         return itemcolor
                        //     }
                        // },
                    },
                },
                yAxis: {
                    name: this.yAxisName,
                    nameGap: 30,
                    min: this.yMin,
                    max: this.yMax,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color:"#ebeef2"
                        },
                    },
                    nameTextStyle: {
                        align:'left'
                    }
                }
            }
            return option
        },
        setBar(){
            let seriesData = [],dataInfo = {} 
            let len = this.list[0].value.length
            
            let seriesItem = {
                type: 'bar',
                barWidth:this.barWidth,
                itemStyle: {
                    barBorderRadius: this.isStack?'':[18, 18, 0, 0]
                },
                showBackground: this.ishasBackground,
                backgroundStyle:{
                    color:'#f4f5f9',
                    barBorderRadius: [5, 5, 0, 0]
                },
            }
            if(this.hasDiff){
                this.list.forEach((item, index) => {
                    let spec = this.legend.filter(itemled =>{ return item.key&&item.key==itemled.key})[0]
                    if(spec){
                        let {itemcolor,color,isSign} = spec
                        item.itemcolor = itemcolor
                        item.color = isSign?color:'#747e93'
                    }
                })
            }
            if(len==1){
                this.list.forEach((item, index) => {
                    let value = item.value[0]
                    let spec = this.legend.filter(item =>{ return value<=item.max&&value>item.min})[0]
                    if(spec && !item.key){
                        let {itemcolor,color,isSign} = spec
                        item.itemcolor = itemcolor
                        item.color = isSign?color:'#747e93'
                    }
                });
            }
            for(let i=0; i<len; i++){
                dataInfo[i] = this.list.map(item => {
                    return item.value[i]
                })
                let itemStyle = {
                    ...seriesItem.itemStyle,
                    color: (params) =>{
                        let {dataIndex} = params
                        let { itemcolor, color } = this.list[dataIndex]
                        if(!color){
                            itemcolor = this.legend[i].itemcolor
                            color = this.legend[i].color
                        }
                        if(!itemcolor) itemcolor = [color, color]
                        return new this.$echarts.graphic.LinearGradient(
                            0, 0, 0, 1, 
                            [
                                {offset: 0,color: itemcolor[0]}, 
                                {offset: 1,color: itemcolor[1]}
                            ]) // 颜色渐变显示
                    }
                }
                seriesData.push({...seriesItem, itemStyle, data:dataInfo[i],name:this.legend[i].name})
            }
            
            if(this.hasLine){
                let lineLeg = this.legend.filter(item => {return item.type == 'Line'})
                for(let i=0; i<lineLeg.length; i++){
                    let itemStyle ={}
                    let lineInfo = this.list.map(item => {
                        return item.lineval[i]
                    })
                    seriesData.push({
                        type: 'line',
                        data:lineInfo,
                        name:lineLeg[i].name,
                        symbolSize:15,
                        symbol:'circle',
                        lineStyle:{
                            width:4,
                            shadowColor: 'rgba(253, 182, 40, .4)',
                            shadowBlur: 16,
                            shadowOffsetY:5,
                        },
                        itemStyle:{
                            color: lineLeg[i].color,
                            borderColor:'#fff',
                            borderWidth:5
                        }
                    })
                }
            }
            
            return { option: this.setAxis(), series: seriesData}
        },
        setLine(){
            let option, visualMap, seriesData = [],dataInfo = {} 
            let len = this.list[0].value.length  

            option = this.setAxis()

            let seriesItem = {
                type: 'line',
                symbol:'circle',
                symbolSize:15,
                smooth: this.smooth,
                itemStyle:{
                    borderColor:'#fff',
                    borderWidth:5
                },
                lineStyle:{
                    width:4,
                },
            }
            if(!this.disShadow){
                seriesItem.lineStyle.shadowBlur = 16
                seriesItem.lineStyle.shadowOffsetY = 5
            }
            for(let i=0; i<len; i++){
                dataInfo[i] = this.list.map(item => {
                    return item.value[i]
                })
                let { color , areaStyleColor } = this.legend[i]

                let itemStyle = {
                    ...seriesItem.itemStyle,
                    color: color
                }
                let isShadow= areaStyleColor?areaStyleColor:"#fff"
                let lineStyle = {
                    ...seriesItem.lineStyle,
                    shadowColor: isShadow.colorRGBA(.4)
                }
                let areaStyle = {
                    opacity:.2,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: isShadow.colorRGBA()
                    }, {
                        offset: .8,
                        color: isShadow.colorRGBA(0)
                    }])
                }
                seriesData.push({...seriesItem, itemStyle, lineStyle, areaStyle, data:dataInfo[i],name:this.legend[i].name})
            }
            
            if(this.isHasScatter){
                let scatterData = []
                this.list.forEach((item, index) => {
                    let value = item.value[0]
                    let spec = this.legend.filter(item =>{ return value<=item.max&&value>item.min})[0]
                    scatterData.push({value:'-'})
                    if(spec){
                        let {color,isSign} = spec
                        scatterData[index] = {value:value,color:color,isSign:isSign}
                    }
                });
                seriesData.push({
                    type: 'scatter',
                    data: scatterData.map(({value}) => value),
                    symbolSize:24,
                    itemStyle:{
                        color:(params) =>{
                            let {dataIndex} = params
                            return scatterData[dataIndex].color
                        },
                        opacity:1,
                        borderColor:'#fff',
                        borderWidth:6,
                    },
                    z:2,
                })
            }
            
            if(this.hasDiff){
                visualMap = {
                    type: 'piecewise',
                    show: false,
                    dimension: 0,
                    seriesIndex: 0,
                    pieces:[],
                }
                let merge = {}
                this.list.forEach((item, index) => {
                    let spec = this.legend.filter(itemled =>{ return item.key&&item.key==itemled.key})[0]
                    if(spec){
                        let {color,isSign,name} = spec
                        item.itemcolor = color
                        item.color = isSign?color:'#747e93'
                    }
                    if(!merge[item.key]){
                        merge[item.key]={
                            color: item.itemcolor,
                            gte: index-1,
                            lte: index,
                        }
                    }
                    merge[item.key].lte = index
                })
                visualMap.pieces = Object.values(merge); // list 转换成功的数据  

                option = {...option,visualMap}
            }
            
            return { option, series: seriesData}
        },
        setRadar(){
            let option, tooltip, seriesData = [], dataInfo = {};
            let len = this.list[0].value.length
            let dataAxis = this.list.map(item => {
                return {name: item.name, max: item.radarMax}
            })
            option = {
                radar:{
                    center: ['50%', '50%'],
                    radius: '60%',
                    name: {
                        textStyle: this.shapeType=='polygon'?{
                            backgroundColor: '#f3f5f7',
                            borderRadius: 32,
                            padding: [8, 16]
                        }:{}
                    },
                    splitNumber: 4,
                    shape:this.shapeType,      
                    indicator: dataAxis,
                }
            }
            tooltip = {
                formatter: (params)=>{
                    let {value, name} = params
                    let spanVal = ''
                    value.forEach((every,index) => {
                        spanVal +='<br><span>'+dataAxis[index].name+"："+every+'</span>'
                    })
                    return '<span class="tooltip_title">'+name+'</span>'+spanVal
                },
            }
            
            let seriesItem = {
                type: 'radar',
                symbolSize: 12,
                lineStyle: {
                    width: 2,
                },
                itemStyle: {
                    borderWidth: 3,
                    color: "#fff",
                }
            }
            for(let i=0; i<len; i++){
                dataInfo[i] = this.list.map(item => {
                    return item.value[i]
                })
                seriesData.push({
                    value: dataInfo[i],
                    name: this.legend[i].name,
                    lineStyle: {
                        color: this.legend[i].color
                    },
                    itemStyle: {
                        borderColor:this.legend[i].color
                    },
                    areaStyle: {
                        color: this.legend[i].color.colorRGBA(.2)
                    }
                })
            }
            
            return { option, tooltip, series: [{...seriesItem, data: seriesData}] }
        },
        setScatter(){
            let option, tooltip, seriesData = [], dataInfo = {};
            let len = this.list[0].value.length

            let dataAxis = this.list.map(({name}) => name)
            option = {
                xAxis: {
                    name: this.xAxisName,
                    max: this.xMax,
                    min: this.xMin,
                    axisTick: {
                        lineStyle:{
                            color:'#010101',
                            opacity:'.2'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#F9F9FD'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                },
                yAxis:this.setAxis().yAxis
            }
            let seriesItem = {
                type: 'scatter',
                symbolSize: 14,
                itemStyle:{
                    shadowBlur: 10,
                    shadowOffsetY: 4,
                },
                label:{
                    show: true,
                    position: "bottom",
                    color:"#191919",
                    offset:[0,5],
                    formatter:'{b}'
                }
            }

            if(this.hasDiff){
                let normal = this.legend.filter(itemled =>{ return !itemled.key})[0]
                this.list.forEach((item, index) => {
                    item.color = normal?normal.color:''
                    let spec = this.legend.filter(itemled =>{ return item.key&&item.key==itemled.key})[0]
                    if(spec){
                        let {color,isSign} = spec
                        item.itemcolor = color
                        item.color = isSign?color:'#747e93'
                    }
                })
            }
            for(let i=0; i<len; i++){
                dataInfo[i] = this.list.map(item => {
                    return item.value[i]
                })
                dataInfo[i].forEach((item,index) => {
                    let { color, itemcolor } = this.list[index]
                    if(!color){
                        color = this.legend[i].color
                        itemcolor = color
                    }
                    
                    seriesData.push({
                        value: item,
                        itemStyle: {
                            shadowColor: itemcolor.colorRGBA(.6),
                            color: itemcolor
                        },
                        name: this.list[index].name
                    })
                });
            }
            return { option, tooltip, series: [{...seriesItem, data: seriesData}] }
        },
        setBoxplot(){
            let option, tooltip, seriesData = [], dataInfo = {};
            let len = this.list[0].value.length

            let dataAxis = this.list.map(({name}) => name)
            option = this.setAxis()
            let seriesItem = {
                type: 'boxplot',
                boxWidth:[20,20],
                itemStyle:{
                    borderColor:"#cdd5dd",
                },
            }
            if(this.hasDiff){
                let normal = this.legend.filter(itemled =>{ return !itemled.key})[0]
                this.list.forEach((item, index) => {
                    item.itemcolor = normal.itemcolor
                    item.color = normal.color
                    let spec = this.legend.filter(itemled =>{ return item.key&&item.key==itemled.key})[0]
                    if(spec){
                        let {color,itemcolor,isSign} = spec
                        item.itemcolor = itemcolor
                        item.color = isSign?color:'#747e93'
                    }
                })
            }
            if(len==1){
                this.list.forEach((item, index) => {
                    let value = item.value[0][4]
                    let spec = this.legend.filter(item =>{ return value<=item.max&&value>item.min})[0]
                    if(spec && !item.key){
                        let {itemcolor,color,isSign} = spec
                        item.itemcolor = itemcolor
                        item.color = isSign?color:'#747e93'
                    }
                });
            }

            for(let i=0; i<len; i++){
                dataInfo[i] = this.list.map(item => {
                    return item.value[i]
                })
                dataInfo[i].forEach((item,index) => {
                    let { color, itemcolor } = this.list[index]
                    if(!color){
                        itemcolor = this.legend[i].itemcolor
                        color = this.legend[i].color
                    }
                    if(!itemcolor) itemcolor = [color, color]
                    seriesData.push({
                        value: item,
                        itemStyle: {
                            color:new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: itemcolor[0]},
                                    {offset: 1, color: itemcolor[1]}
                                ]
                            )
                        },
                    })
                });
            }
            return { option, tooltip, series: [{...seriesItem, data: seriesData}] }

        },
    }

}
</script>
<style lang="scss" scoped>
.u-chartsBox{
    width: 100%; height: 500px;
    position: relative;
	.legend{
		position: absolute; z-index: 2;
        font-size: 14px; 
		span{
			display: inline-block;
			color: #747e93;
		}
		&.pie span i{
			display: inline-block;
			width: 10px; height: 10px;
			border-radius: 10px;
			margin-right: 10px;
		}
		&.posR{
			top: 0;right: 0;
			span{
				margin-left: 28px;
			}
		}
		&.posL{
			top: 0;left: 40px;
			span{
				margin-right: 28px;
			}
		}
		&.col{
			span{
                margin: 0 0 10px 0;
				display: block;
			}
		}
	}
}
.chartsM{
    width: 100%; height: 100%;
}

</style>
<style>
.tooltip_title{
	font-size: 18px; color: #333;
	font-weight: bold;
	margin-bottom: 10px;
}
.tooltip_span{
	font-size: 24px;
	font-weight: bold;

}
.tooltip_icon{
	float: left;
	width: 8px; height: 8px;
	border-radius: 8px;
	margin: 10px 10px 0 0;
}
</style>