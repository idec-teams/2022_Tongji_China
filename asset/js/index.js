$(function () {
    var page = document.documentElement || document.body  // 兼容IE

    // 记录当前是否位于屏幕顶端
    var inTop = true;

    // 获取并更新inTop
    function getInTop() {
        inTop = (page.scrollTop == 0);
        return inTop;
    }

    // 获取元素是否在屏幕上
    function getInScreen(element) {
        var a = element.offset().top;
        var b = element.offset().top + element.height();
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
            return true;
        }
        else if (b >= $(window).scrollTop() && b < ($(window).scrollTop() + $(window).height())){
            return true;
        }
        return false;
    }

    window.onscroll = function () {
        // 鼠标下滑事件
        if (inTop == true && getInTop() == false) {
            $(".home-bg").removeClass('moveDown')
            $(".home-bg").addClass('moveUp')
        }
        // 鼠标上滑事件
        if (inTop == false && getInTop() == true) {
            $(".home-bg").addClass('moveDown')
            $(".home-bg").removeClass('moveUp')
        }

        // 元素淡入动画
        $('.home-item').each(function (index) {
            if(getInScreen($(this))&&!$(this).hasClass('my-fadeIn')){
                $(this).addClass('my-fadeIn')
            }
            if(!getInScreen($(this))&&$(this).hasClass('my-fadeIn')){
                $(this).removeClass('my-fadeIn')
            }
        })
    }
})