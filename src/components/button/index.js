import Button from './button';
import ButtonGroup from '../button/button-group';

// 可有可无   这段主要是针对按需导入
const components = [
    Button,
    ButtonGroup
]
components.forEach(item => {
    item.install = function(Vue) {
        Vue.component(item.name, item);
    };
})

export { Button,ButtonGroup};
