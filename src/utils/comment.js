
// 防抖动
export const debounce = (fn,delay = 500) => {
    let timer = null;
    return function(){        
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,args);
        },delay)
    }
}