(function(jQuery) {
  //jQuery.fn.extend将方法扩展到jQuery的原型上，实例化一个对象时，改实例就有了改方法；jQuery.extend是为了扩展jquery本身，为类添加新的方法。
  jQuery.fn.extend({
    pagination: function(totalPage, currentPage) {
      // 判断中间需要展示的页码数是从多少开始到多少结束
      $(this).children("li:not(:first,:last)").remove();
      // 获取当前页,根据当前页 计算 需要显示的页码（最多显示5个页码，假定当前的是中间一个，前后个两个，检查前后两个是否超出边界）
      var startIndex = currentPage - 2; //组件开始展示的页码
      var endIndex = currentPage + 2;  //组件结束展示的页码
      // 超出修正
      if (startIndex < 1) { //开始展示的页码小于1，即当前页小于3
        startIndex = 1; //开始页重置为1
        endIndex = startIndex + 4;  //结束页设置为 x+4（总共展示五个页码数，当前页码后面最多展示4个页码数）
      }
      if (endIndex > totalPage) { //假定展示的结束页码数大于总页码数
        endIndex = totalPage; //结束页重置为总页码数
        startIndex = (endIndex-4) > 0 ? endIndex-4 : 1; //结束页码数倒推4个页码数大于0，即开始展示的页码数为 x-4，否则重置为1
      }
      // 循环生成页码
      var $li = '';
      for (var i = startIndex; i <= endIndex; i++) {
        // 高亮当前页，生成中间展示的页码数
        if (i == currentPage) { //当前页
          $li += '<li class="active disable" data-page="' + i + '"><a href="#">' + i + '</a></li>';
        }else{ //非当前页
          $li += '<li  data-page="' + i + '"><a href="#">' + i + '</a></li>';
        }
      }
      // 生成前后可能的…
      if(startIndex>=2 && totalPage>5){
        $li = '<li class="disable"><a href="#">…</a></li>'+ $li;
      }
      if(currentPage+2<totalPage && totalPage>5){
        $li = $li + '<li class="disable"><a href="#">…</a></li>';
      }
      // 添加到ul中
      $($li).insertBefore($(this).children("li:last"));
    }
  });
})(jQuery);
