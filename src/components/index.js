import Toast from '@/components/toast';
import Input from '@/components/input';
import Button from '@/components/button';
import ButtonGroup from '@/components/button-group';
import Radio from '@/components/radio';
// import RadioButton from '@/components/radio-button';
// import RadioGroup from '@/components/radio-group';
// import Checkbox from '@/components/checkbox';
// import CheckboxGrop from '@/components/checkbox-group';
// import Select from '@/components/select';
// import Option from '@/components/option';
// import Upload from '@/components/upload';
// import Rate from '@/components/rate';
// import Actionsheet from '@/components/actionsheet';


import Vue from 'vue'
const components = [
    Input,
    Button,
    ButtonGroup,
    Radio,
    // RadioButton,
    // RadioGroup,
    // Checkbox,
    // CheckboxGrop,
    // Select,
    // Option,
    // Upload,
    // Rate,
    // Actionsheet
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$UToast = Toast.install
};

install(Vue);

