
// init guest
if (guest_data_1) {
    $("#guest").find(".am-g").empty();
    $.each(guest_data_1, function (index, array) {
        var $content;
        //console.log("5")
        $content=$('<div class="am-u-lg-1-5 am-u-md-4 am-u-sm-4">'+'<div class="li--content">'
            +'<a target="_blank" href="javascript:;">'+'<img class="am-img-thumbnail am-circle" src="'+array["avatar_src"]+'" alt="'+array["full_name"]+'"></a>'
            +'</div>'
            +'<p class="head3">'+array["full_name"]+'</p>'
            +'<p class="am-text-center li_p--content">'+array["job_title"]+'</p>'
            +'</div>');
        $("#guest").find(".am-g").append($content);
    });
}
// hide header
function hideheader(){
    var $header=$(".am-topbar.animated");
    if($header.hasClass("fadeInDown")||$header.hasClass("headroom--top")){
        $(".am-topbar.animated").addClass("fadeOutUp").removeClass("fadeInDown");
    }
}
//lazyload
function showImg($el) {
    $el.attr('src', $el.attr('data-src'));
}

var Exposure = (function () {
    var _queue = [];
    var _isBind = false;

    function one($selectors, callback) {
        _add($selectors, callback);
        _init();
    }

    function _add($selector, callback) {
        $selector.each(function () {
            $cur = $(this);
            var o = {
                el: $cur,
                cb: callback
            };
            _queue.push(o);
        });
    }

    function _init() {
        if (!_isBind) {
            _bind();
        }
        _do();
    }

    function _bind() {

        var timer = null,
            interval = 40;

        $(window).on('scroll', function (e) {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                _do();
            }, interval);
        });

        _isBind = true;
    }

    function _do() {

        var arrTmp = [];
        for (var i = 0; i < _queue.length; i++) {
            var item = _queue[i];
            if (_isShow(item.el)) {
                item.cb.call(item.el[0]);
            } else {
                arrTmp.push(item);
            }
        }

        _queue = arrTmp;
    }

    function _isShow($el) {
        var scrollH = $(document).scrollTop(),
            winH = $(window).height(),
            top = $el.offset().top;
        return  (top < winH + scrollH);
    }

    return {
        one: one
    };
})();

var $imgs = $('img');
Exposure.one($imgs, function () {
    //showImg($(this));
});
// 日程切换
$("#schedule").on("mouseenter",".tab li",function(){
    var $this= $(this);
    var $index=$this.index();
    $this.addClass("active").siblings("li").removeClass("active");
    $("#schedule").find(".guest_content .tab_content").eq($index).addClass("active").siblings(".tab_content ").removeClass("active");
});
// 报名滚动监听
if(window.scrollY>0){
    $("#header .am-topbar").css("background","#000");
}
$(window).on("scroll",function(){
    var $topbar=$("#header .am-topbar");
    var $ticket=$(".ticket--fixed");
    if(window.scrollY>0){
        $topbar.css("background","#fff");
        if(window.scrollY>950){

            $ticket.css("opacity","0.9");
        }else{

            $ticket.css("opacity","0");
        }
    }else{
        $topbar.css("background","transparent");
    }

});
// 表单验证手机
(function ($) {
    if ($.AMUI && $.AMUI.validator) {
        // 增加多个正则
        $.AMUI.validator.patterns = $.extend($.AMUI.validator.patterns, {
            colorHex: /^(#([a-fA-F0-9]{6}|[a-fA-F0-9]{3}))?$/
        });
        // 增加单个正则
        $.AMUI.validator.patterns.yourpattern = /^your$/;
        // 增加单个正则
        $.AMUI.validator.patterns.mobile = /^(13|15|18|14|17)[0-9]{9}$/;
    }
})(window.jQuery);
// 18弹窗
$("#information .guest--picture .li_shadow,#information .guest_div").on("click",function(){
    var $initname=$(this).closest(".li--content").siblings(".head3").text();

    $("#doc-modal-18").modal({closeViaDimmer: 0, width: 450});
    if($initname){
        $("#doc-select-1").val($initname).trigger("change");
    }else{
        $("#doc-select-1").val("").trigger("change");
    }
    //console.log(1)
});
// 平滑
$("#collapse-head").scrollspynav({offsetTop: 45});

$(function () {
    //首页导航部分

    $(".am-topbar-fixed-top").headroom({
        tolerance: 5,
        offset: 205,
        classes: {
            initial: "animated",
            pinned: "fadeInDown",
            unpinned: "fadeOutUp"
        }
    });
});