$(function () {
    //轮播
    var guidePage = $('#guidePage');
    $('#guidePage').flexslider({
        slideshow: false,
        animationLoop: false,
        before: function () {}, // Callback: function(slider) - 每次滚动开始前的回调
        end: function () {
            console.log("------------------");
            location.href = "../index.html";
        }
    });
    //当轮播到最后一页，再想滑动，直接跳转到首页
})