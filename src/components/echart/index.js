import Echart from './echart';

// 可有可无   这段主要是针对按需导入
const components = [
    Echart,
]
components.forEach(item => {
    item.install = function(Vue) {
        Vue.component(item.name, item);
    };
})

export default Echart;
