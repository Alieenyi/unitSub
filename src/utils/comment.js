
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


var lut = [];
for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}
export function uuid() {    
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

// 数组递增递减
export const getSortFun = (sortBy,order) => {
    let ordAlpah = (order == 'desc') ? '<' : '>';
    let sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

export function isArray(a) {
    return Object.prototype.toString.call(a) === "[object Array]";
}
export function isString(s) {
    return typeof s === "string";
}
export function isObject(o) {
    return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
}
export function isNumber(n) {
    return Object.prototype.toString.call(n) === "[object Number]";
}
export function isBoolean(s) {
    return typeof s === "boolean";
}

String.prototype.colorRGBA = function (opacity = 1) {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = this.toLowerCase();
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
      // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + ","+ opacity+")";
    } else {
        return color;
    }
};