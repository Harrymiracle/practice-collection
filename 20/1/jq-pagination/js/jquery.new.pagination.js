// 此次封装扩展成为jq实例的方法
// 参考地址：https://www.cnblogs.com/aaron-pan/p/7080640.html
// 可参考地址：https://www.cnblogs.com/Wayou/p/jquery_plugin_tutorial.html

;(function($, window, undefined) {
    var totPage = '', 
        curPage = '';

    var Pagination = function(el, opts){
        this.$el = el;
        this.defaultOpts = {
            setPostion: 'body',
            totalLists: null,   //需要和pageSize组合使用
            pageSize: 10,
            totalPage: null,    //可单独使用，不传totalLists、pageSize
            currentPage: 1,
            disabledColor: '#666',
            normalColor: '#000',
            inputVal: 1,
            callBack: null,
        }
        this.settings = $.extend({},this.defaultOpts,opts,{pageSize:1});
        totPage = this.settings.totalPage || Math.ceil(this.settings.totalLists/this.settings.pageSize);
        curPage = this.settings.currentPage;
    }

    Pagination.prototype = {
        init: function(){
            this.creatPage(totPage,curPage);
            this.bindEvent();
        },
        creatPage: function(totPage,curPage){ 
            var _this = this,
                _el = this.$el;

            // 小于1页时隐藏分页组件
            if(totPage <= 1){
                _el.hide();
                return;
            }

            // 判断中间需要展示的页码数是从多少开始到多少结束
            _el.children('li').remove();
            // 获取当前页,根据当前页 计算 需要显示的页码（最多显示5个页码，假定当前的是中间一个，前后个两个，检查前后两个是否超出边界）
            var startIndex = curPage - 2; //组件开始展示的页码
            var endIndex = curPage + 2;  //组件结束展示的页码
            // 超出修正
            if (startIndex < 1) { //开始展示的页码小于1，即当前页小于3
                startIndex = 1; //开始页重置为1
                endIndex = startIndex + 4;  //结束页设置为 x+4（总共展示五个页码数，当前页码后面最多展示4个页码数）
            }
            if (endIndex > totPage) { //假定展示的结束页码数大于总页码数
                endIndex = totPage; //结束页重置为总页码数
                startIndex = (endIndex-4) > 0 ? endIndex-4 : 1; //结束页码数倒推4个页码数大于0，即开始展示的页码数为 x-4，否则重置为1
            }

            // 生成页码
            var $li = '<li data-page="1">首页</li>';
            // 生成前面可能的…
            if(startIndex>=2 && totPage>5){
                $li += '<li class="disable"><a href="#">…</a></li>';
            }
            for (var i = startIndex; i <= endIndex; i++) {
                // 高亮当前页，生成中间展示的页码数
                if (i == curPage) { //当前页
                    $li += '<li class="active disable" data-page="' + i + '"><a href="#">' + i + '</a></li>';
                }else{ //非当前页
                    $li += '<li  data-page="' + i + '"><a href="#">' + i + '</a></li>';
                }
            }
            // 生成后面可能的…
            if(curPage+2<totPage && totPage>5){
                $li += '<li class="disable"><a href="#">…</a></li>';
            }
            $li += '<li data-page="">尾页</li>';
            // 添加到ul中
            _el.html($li);
            _this.refreshStyle();            
        },
        bindEvent: function(){
            var _this = this,
                _el = this.$el;
            var _fn = function(){
                curPage = +$(this).attr('data-page');
                _this.settings.currentPage = curPage;
                if($.isFunction(_this.settings.callBack)){
                    _this.settings.callBack(_this.settings.currentPage); //把当前页码数传出去给回调函数使用
                    _el.off('click','li',_fn);   //解绑事件
                }
            };
            _el.on('click','li',_fn);
        },
        // 处理首页、尾页按钮样式
        refreshStyle: function(){
            var _this = this,
                _el = this.$el,
                _firstLi = _el.children('li:first'),
                _lastLi = _el.children('li:last');
            if(curPage == 1){
                _firstLi.css({'color':_this.settings.disabledColor,'pointer-events':'none'});
            }else{
                _firstLi.css({'color':_this.settings.normalColor,'pointer-events':'auto'});
            }
            if(curPage == totPage){
                _lastLi.css({'color':_this.settings.disabledColor,'pointer-events':'none'});
            }else{
                _lastLi.css({'color':_this.settings.normalColor,'pointer-events':'auto'});
            }
            _lastLi.attr('data-page',totPage).end()
                   .css({'display':'-webkit-flex', 'display':'flex'});
        }
    }

    $.fn.paginationInit = function(opts){
        var pagination = new Pagination(this, opts);
        return pagination.init();
    }

  })(jQuery, window, undefined);
  