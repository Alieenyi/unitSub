import Toast from '@/components/toast';
import Notify from '@/components/notify';
import Input from '@/components/input';
import {Button, ButtonGroup} from '@/components/button';
import Radio from '@/components/radio';
import RadioGroup from '@/components/radio-group';
import Checkbox from '@/components/checkbox';
import Switch from '@/components/switch';
// import CheckboxGrop from '@/components/checkbox-group';
import Select from '@/components/select';
import Option from '@/components/option';
import Echart from '@/components/echart';
// import Upload from '@/components/upload';
// import Rate from '@/components/rate';
// import Actionsheet from '@/components/actionsheet';


import Vue from 'vue'
const components = [
    Input,
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    Checkbox,
    Switch,
    // CheckboxGrop,
    Select,
    Option,
    Echart
    // Upload,
    // Rate,
    // Actionsheet
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$UToast = Toast.install
    Vue.prototype.$UNotify = Notify.install
};

install(Vue);

