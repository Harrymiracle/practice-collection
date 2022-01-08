/* 
 * Created: 2017/6/20.
 * author: Aaron
 * address: https://www.cnblogs.com/aaron-pan/p/7080640.html
 */
(function($, window, undefined){
    var curPage = '',   //当前页
        jumpVal = '',   //跳转到的页面
        // lists = '',     
        totals = '',    //总页数
        isTrue = false;     //是否刷新分页组件
    
    // 定义一个Page对象，扩展方法到Page的原型上
    var Page = function(opts){
        this.settings = $.extend({}, Page.defaults, opts);
        curPage = this.settings.initPage;
        totals = this.settings.totalPages;
        jumpVal = this.settings.inputVal;
        this.init();
    };
    
    // 默认配置
    Page.defaults = {
        container: '.page',
        setPos: 'body',
        totalPages: null,
        totalLists: null,
        initPage: 1,
        inputVal: 1,
        callBack: null
    };
    
    Page.prototype = {
        init: function(){ //初始化
            this.create();
        },
        create: function(){
            var _template = 
                '<div class="page">'+
                    '<span class="page_details">共'+
                        '<span class="page_num"> '+this.settings.totalLists+' </span>条记录，第'+
                        '<span class="page_current"> '+curPage+'</span>/<span class="page_size">'+this.settings.totalPages+' </span>页'+
                    '</span>'+
                    '<div class="page_to">'+
                        '<ul class="flex_parent">'+
                            '<li class="page_first flex_child">首页</li>'+
                            '<li class="page_pre page_hide flex_child">« 上一页</li>'+
                            '<li class="page_next flex_child">下一页 »</li>'+
                            '<li class="page_last flex_child">末页</li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="page_jump">'+
                        '<span>第<input type="number" min="1" class="page_jump_input" value="'+this.settings.inputVal+'">页</span>'+
                        '<input type="button" class="page_jump_btn" value="Go">'+
                    '</div>'+
                '</div>';
            $(this.settings.setPos).append(_template);
            this.refreshDom();
            this.bindEvent();
        },
        bindEvent: function(){
            var _this = this;
            var _container = $(this.settings.container);
            var _pageCur = _container.find(".page_current");
            var _pageJumpInput = _container.find(".page_jump_input");
            // lists = _this.settings.totalLists;
            totals = _this.settings.totalPages;
            //跳转首页
            _container.on("click", ".page_first", function(){
                if($.isFunction(_this.settings.callBack)){
                    curPage = 1;
                    isTrue = _this.settings.callBack(1);
                    if(isTrue){
                        _this.refreshDom();
                        _pageCur.text(1);
                        _pageJumpInput.val(curPage);
                    }
                }
            });
            //跳转上一页
            _container.on("click", ".page_pre", function(){
                if($.isFunction(_this.settings.callBack)){
                    if(curPage>1){
                        curPage = curPage-1;
                        isTrue = _this.settings.callBack(curPage);
                        if(isTrue){
                            _this.refreshDom();
                            _pageCur.text(curPage);
                            _pageJumpInput.val(curPage);
                        }
                    }
                }
            });
            //跳转下一页
            _container.on("click", ".page_next", function(){
                if($.isFunction(_this.settings.callBack)){
                    if(curPage<totals){
                        curPage = curPage+1;
                        isTrue = _this.settings.callBack(curPage);
                        if(isTrue){
                            _this.refreshDom();
                            _pageCur.text(curPage);
                            _pageJumpInput.val(curPage);
                        }
                    }
                }
            });
            //跳转末页
            _container.on("click", ".page_last", function(){
                if($.isFunction(_this.settings.callBack)){
                    curPage = totals;
                    isTrue = _this.settings.callBack(curPage);
                    if(isTrue){
                        _this.refreshDom();
                        _pageCur.text(totals);
                        _pageJumpInput.val(curPage);
                    }
                }
            });
            //Go跳转
            _container.on("click", ".page_jump_btn", function(){
                if($.isFunction(_this.settings.callBack)){
                    jumpVal = Number(_container.find("input.page_jump_input").val());
                    console.log('跳转的页数：'+jumpVal+';跳转之前的页数：'+curPage);
                    if(jumpVal >= 1 && jumpVal <= totals){
                        curPage = jumpVal;
                        isTrue = _this.settings.callBack(curPage);
                        if(isTrue){
                            _this.refreshDom();
                            _pageCur.text(curPage);
                        }
                    }else{
                        jumpVal = curPage;
                    }
                }
            });
        },
        refreshDom: function(){
            var _container = $(this.settings.container);
            _container.find("li.flex_child").removeClass("page_hide");
            if(Number(totals) == 1){
                _container.find(".page_pre").addClass("page_hide");
                _container.find(".page_next").addClass("page_hide");
            }else if(Number(totals) == 2){
                if(Number(curPage) == 1){
                    _container.find(".page_pre").addClass("page_hide");
                }else{
                    _container.find(".page_next").addClass("page_hide");
                }
            }else if(Number(curPage) == 1 && Number(totals)>2){
                _container.find(".page_pre").addClass("page_hide");
            }else if(Number(curPage) == Number(totals) && Number(totals)>2){
                _container.find(".page_next").addClass("page_hide");
            }
        }
    };
    
    var pageInit = function(opts){
        return new Page(opts);
    };
    
    window.pageInit = $.pageInit = pageInit;
    
})(jQuery, window, undefined);