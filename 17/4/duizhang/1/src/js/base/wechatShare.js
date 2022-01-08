import urlServer from 'base/ajaxurl';
const wechatShare =  {
        /**
         * [init description]  配置微信分享
         * @param  {[type]} datas [description]  后台config配置
         * @param  {[type]} title [description]  分享title
         * @param  {[type]} desc  [description]  分享描述
         * @param  {[type]} link  [description]  分享链接
         * @return {[type]}       [description]
         */
        init(datas,title,desc,link){  
            // wx.config({
            //   debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //   appId :  datas.appId, // 必填，appID公众号的唯一标识
            //   timestamp : datas.timestamp, // 必填，生成签名的时间戳
            //   nonceStr : datas.noncestr, // 必填，生成签名的随机串
            //   signature : datas.signature,// 必填，签名，见附录1
            //   jsApiList : [ 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2，如果出现permiss deline错误，就是因为这里没有配置相关接口原因
            // });
            wx.ready(function(){
                wx.onMenuShareTimeline({//分享到朋友圈
                    title: desc, // 分享标题
                    link: link, 
                    imgUrl: 'http://static.guxiansheng.cn/goods_ico/logo.jpg', // 分享图标
                });
                wx.onMenuShareAppMessage({//分享给朋友
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, //分享链接
                    imgUrl: 'http://static.guxiansheng.cn/goods_ico/logo.jpg', // 分享图标
                });
                wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, //分享链接
                    imgUrl: 'http://static.guxiansheng.cn/goods_ico/logo.jpg', // 分享图标
                });
                wx.onMenuShareQZone({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, //分享链接
                    imgUrl: 'http://static.guxiansheng.cn/goods_ico/logo.jpg', // 分享图标
                });
            });
            wx.error(function(res){
                wechatShare.init();
            }); 
        },
        /**
         * [shareCount description] 统计分享
         * @param  {[type]} member_id [description]
         * @param  {[type]} key       [description]
         * @param  {[type]} type_code [description]
         * @param  {[type]} object_id [description]
         * @return {[type]}           [description]
         */
        // shareCount(member_id, key, type_code, object_id){
        //     $.ajax({
        //             url: urlServer.ApiUrl + '/index.php?c=share&a=post&route_mark=h5',
        //             type:'get',
        //             data:{
        //               'member_id': member_id,//用户ID
        //               'key': key,//token
        //               'type_code': type_code,//
        //               'object_id': object_id  //老师ID
        //             },
        //             dataType:'jsonp',
        //             success:(data) => {
        //                 if(data.code == 1){
        //                     //console.log(data)
        //                 }else{
        //                     alert(data.message);
        //                 }
        //             },
        //         });
        // },
        /**
         * [replaceAPI description] 更改连接地址
         * @param  {[type]} api     [description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        replaceAPI(api,options){
            api = api.replace('{url}', options.url);
            api = api.replace('{title}', options.title);
            api = api.replace('{content}', options.content);
            api = api.replace('{pic}', options.pic);
            return api;
        }
};
module.exports = wechatShare;