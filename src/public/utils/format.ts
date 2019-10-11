/**
 * 格式化日期
 * @param str 日期字符串
 * @param fmt 日期格式 YYYY-MM-DD hh:mm:ss
*/
export function formatDate(str: string | number, fmt?: string) {
    const date = new Date(str)
    const o: any = {
        'Y+': date.getFullYear(), // 年份
        'M+': date.getMonth() + 1, // 月份
        'D+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(Y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
}

/**
 * 字符串转对象
 * @param str 
 */
export function formatStyleObjToStr(obj: { [key: string]: any }, fmt?: string) {
    let str = JSON.stringify(obj);
    str = str.replace(/[\{\}\"]/g, '');
    str = str.replace(/,/g, ';');
    str = str.replace(/([A-Z])/g, function(m) {
        return '-' + m.toLowerCase()
    });
    return str;
}