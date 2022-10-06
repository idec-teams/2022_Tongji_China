// 存储各导航条位置信息
var dic = new Array();
var page = document.documentElement || document.body  // 兼容IE

// 刷新导航条位置信息
function InitDic(){
  var navBarHeight = $('#nav-bar').height()
  dic.length = 0;
  $('.nav-link').each(function(index){
    var id = $(this).attr('href').substring(1)
    dic.push([id , $("#"+id)[0].offsetTop - navBarHeight])
  }
  )
}

$(function(){
    InitDic()

    // 激活当前菜单下导航条
    function awakeCurrentNav(){
      if(page.scrollTop > dic[dic.length-1][1]){
        AwakeNav(dic[dic.length-1][0])
      }
      for(var i=0 ; i<dic.length-1 ; i++){
        if(page.scrollTop>dic[i][1]&&page.scrollTop<dic[i+1][1]){
          AwakeNav(dic[i][0])
        }
      }
    }
  
    // 如果子菜单被激活，则同时激活父级菜单
    $(".my-bar-rank2").mouseover(function(){
        $(this).parent().prev().addClass('awake')
    })
    
    // 如果子菜单取消激活，则同时取消激活父级菜单
    $(".my-bar-rank2").mouseout(function(){
        if(!$(this).parent().prev().hasClass('tag')&&!$(this).siblings().hasClass('awake')&&!$(this).hasClass('awake'))
        {
          $(this).parent().prev().removeClass('awake')
        }
    })
    
    // 点击子菜单，父级菜单同时激活
    $(".my-bar-rank2").mousedown(function(){
      awakeCurrentNav()
    })
    
    // 点击一级菜单响应事件
    $(".my-bar-rank1").mousedown(function(){
      awakeCurrentNav()
    })
    
    // 清空菜单
    function clear(){
      if($(".nav-link").hasClass('awake')){
        $(".nav-link").removeClass('awake')
      }
      if($(".nav-link").hasClass('tag')){
        $(".nav-link").removeClass('tag')
      }
    }
    
    // 激活对应的导航条
    function AwakeNav(id){
      var tag = $("a[href='#"+id+"']")
      clear();
      tag.addClass('awake')
      if(tag.next().hasClass('my-nav-rank2')){
        tag.addClass('tag')
      }
      if(tag.hasClass('my-bar-rank2')){
        tag.parent().prev().addClass('tag')
        tag.parent().prev().addClass('awake')
      }
    }
    
    // 导航条浮动
    window.onscroll=function(){
        // 导航条浮动
        if(page.scrollTop+$('#nav-bar').height() > $('#text-content')[0].offsetTop){
            $('#nav-container')[0].style.paddingTop="3rem";
            $('#nav-container')[0].style.position="fixed";
        }
        else{
            $('#nav-container')[0].style.paddingTop="0rem";
            $('#nav-container')[0].style.position="absolute";
        }
        
        // 导航条跟随页面
        // 最后一条导航
        awakeCurrentNav()
    }

    // 点击链接跳转
    $(".nav-link").click(function(){
        var id = $(this).attr('href').substring(1)
        $('body,html').animate({
            scrollTop:$('#'+id)[0].offsetTop-$('#nav-bar').height()+10
        },500);
        AwakeNav(id)
    }
    )
})

$(window).resize(function() {  
  InitDic()
});