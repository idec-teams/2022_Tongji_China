
// 跳转条布局变化
function changeSkipBarLayout(skipBar_selector='#skip-bar', content_selector='#text-content'){
    // 进入主内容
    var page = document.documentElement || document.body  // 兼容IE
    if(page.scrollTop+document.page_params['nav-height'] > document.page_params['content-st']){
        $(skipBar_selector)[0].style.marginTop=document.page_params['nav-height'].toString()+'px';
        $(skipBar_selector)[0].style.position="fixed";
        $(content_selector)[0].style.marginLeft="30%";

    }
    // 回到背景
    else{
        $(skipBar_selector)[0].style.marginTop='0px';
        $(skipBar_selector)[0].style.position="relative";
        $(content_selector)[0].style.marginLeft="5%";
    }
}

// 跳转条浮动效果
function attachSkipBarFlow(jq_selector){
    $(jq_selector).each(function(){
        this.onmouseover=function(e){
            e.target.firstChild.style.display="flex"
            e.target.style.color='#7F93C5'
            e.target.style.fontFamily='Gilmer'
        }
        this.onmouseleave=function(e){
            e.target.firstChild.style.display="none"
            e.target.style.color='#868686'
            e.target.style.fontFamily='Gilmer Light'
        }
    });
}

// 跳转功能
function jumpTo(jq_selector){
    // 相关参数
    skip_params = document.page_params['skip-params']
    time_interval = skip_params['time-interval']
    step = skip_params['step']
    min_step = skip_params['min-step']

    var page = document.documentElement || document.body  // 兼容IE

    target_loc = $(jq_selector)[0].offsetTop - document.page_params['nav-height'];
    step_height = (target_loc-page.scrollTop) / step;
    timer = setInterval(()=>{
        if (Math.abs(step_height) > min_step){
            page.scrollTop += step_height
            step_height = (target_loc-page.scrollTop) / step;
        }else{
            page.scrollTop = target_loc
            clearInterval(timer)
        }
    }, time_interval)
    // page.scrollTop = target_loc
}

// 鼠标活动模拟
function triggerMouseEvent(target, param){
    // Google, FireFox
    if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent(param, true, false);
        target.dispatchEvent(event);
    }
    // IE
    else if (document.createEventObject) {
        target.fireEvent(param);
    }
}

// 不同rank标题锚定获取
function initLocs(jq_selector){
    loc_arr = [];
    $(jq_selector).each(function(){
        loc_arr.push(this.offsetTop)
    })
    return loc_arr;
}

// 得到底部定位
function getRankBottom(jq_selector){
    obj = $(jq_selector).parent();
    last_one = obj[obj.length-1];
    return last_one.offsetTop + last_one.offsetHeight;
}

function attachEmphasis(title_selector, bar_selector){
    // 相关参数获取
    arr = initLocs(title_selector);
    bottom_loc = getRankBottom(title_selector);
    skip_params = document.page_params['skip-params']
    // 定位搜索
    var page = document.documentElement || document.body  // 兼容IE
    current_loc = page.scrollTop+document.page_params['nav-height'];
    var location=arr.length-1;
    for(var i=0; i<arr.length; i++){
        if (current_loc<arr[i]){
            location=i-1;
            break;
        }
    }
    // 复原
    $(bar_selector).each(function(){
        triggerMouseEvent(this, 'mouseleave')
    })
    // 再次定位
    if(location!=-1 && current_loc <= bottom_loc){
        triggerMouseEvent($(bar_selector)[location], 'mouseover')
    }
}




