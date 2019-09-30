// 兼容 滚动到底部的事件
export function scrollBottomListener(callback: Function, selector?: string) {
    const node = document.querySelector(selector);

    ((node || window) as any).onscroll = () => {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        const _target = node || document.documentElement || document.body;
        const scrollTop = window.navigator.userAgent.indexOf('AppleWebKit') > -1 ? window.pageYOffset : _target.scrollTop;
        //变量windowHeight是可视区的高度
        const windowHeight = _target.clientHeight;
        //变量scrollHeight是滚动条的总高度
        const scrollHeight = _target.scrollHeight;

        //滚动条到底部的条件
        if ((node && scrollTop >= windowHeight && scrollTop + windowHeight == scrollHeight) || (scrollTop > 0 && scrollTop + windowHeight + 1 >= scrollHeight)) {
            //写后台加载数据的函数
            callback()
        }
    };
}