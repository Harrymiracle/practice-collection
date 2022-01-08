webpackJsonp([5],{

/***/ 175:
/***/ (function(module, exports) {

	"use strict";

	/**
	 * [description] 监听滚动  2016-12-21
	 * @param  {[type]} window) {                                      let isToBottom [description]
	 * @param  {[type]} _init   :             function(params,callback) {                              let self [description]
	 * @return {[type]}         [description]
	 */
	var scroll = function (window) {
	  var isToBottom = false,
	      isMoved = false;
	  var scrollBottom = function scrollBottom(params, callback) {
	    this.extend(this.params, params);
	    this._init(params, callback);
	  };
	  scrollBottom.prototype = {
	    params: {
	      listren: true,
	      distance: 40
	    },
	    _init: function _init(params, callback) {
	      var self = this;
	      if (self.params.listen) {
	        document.body.addEventListener("touchmove", function (e) {
	          self.scroll(callback);
	        });
	        document.body.addEventListener("touchend", function (e) {
	          self.scroll(callback);
	        });
	      }
	      window.onscroll = function () {
	        self.scroll(callback);
	      };
	    },
	    scroll: function scroll(callback) {
	      var self = this;
	      var clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
	      var scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
	      var scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;

	      if (scrollHeight - scrollTop - self.params.distance <= window.innerHeight) {
	        isToBottom = true;
	        if (isToBottom) {
	          callback({
	            "scrollTop": scrollTop,
	            "isToBottom": true
	          });
	        }
	      } else {
	        isToBottom = false;
	        callback({
	          "scrollTop": scrollTop,
	          "isToBottom": false
	        });
	      }
	    },
	    extend: function extend(a, b) {
	      for (var key in b) {
	        if (b.hasOwnProperty(key)) {
	          a[key] = b[key];
	        }
	      }
	      return a;
	    }
	  };
	  return scrollBottom;
	}(window);
	module.exports = scroll;

/***/ })

});