import $ from 'jquery';

$(function(){
    $('body').css({'background':'#CCC'});
    console.log('测试123');
    console.log(process.env.NODE_ENV);
})