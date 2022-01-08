var WINDOW_WIDTH = 1024;    //全局变量名用大写，更容易区别
var WINDOW_HEIGHT = 468;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//  const endTime = new Date(2017,1,5,18,47,52);    //时间是需要手动改的

  //如果设置成时钟效果就不需要下面这两行代码了，同时getCurrentShowTimeSeconds()函数需要修改
//  var endTime = new Date();   //设置成距离运行时一个小时的倒计时
//  endTime.setTime(endTime.getTime() + 3600*1000);
var curShowTimeSeconds = 0;

var balls = []; //申明一个装空小球的数组和小球的颜色
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){

    WINDOW_WIDTH = document.documentElement.clientWidth;    //做自适应,用document.body.clientWidth兼容性没那么好
    WINDOW_HEIGHT = document.documentElement.clientHeight;
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function(){
        render( context );
        update();
    },50);  //每50毫秒调用一次这两个函数
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    // var ret = endTime.getTime() - curTime.getTime();    //获取时间戳的差值
    // ret = Math.round( ret/1000 );
    // return ret >= 0 ? ret : 0;

  //此时获取系统时间的时分秒再转换成秒的和就是当前在一天内走过的秒数
    var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
    return ret;
}

function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
    var curSeconds = curShowTimeSeconds % 60;

    if( nextSeconds != curSeconds ){  //下一个50毫秒调用时的秒数和上次调用时的秒数不相等时表示需要更新显示的各个数字
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;   //更新时间，下一秒变为当前秒
    }

    updateBalls();  
    console.log(balls.length);  //打印目前在画布中的小球的数量
}

function updateBalls(){ //更新 小球

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;  //小球的x轴坐标加上x轴上的速度
        balls[i].y += balls[i].vy;  //小球的y轴坐标加上y轴上的速度
        balls[i].vy += balls[i].g;  //小球加上重力加速度
    //碰撞检测：当小球y轴上的坐标等于canvas底边坐标减去小球半径时，表示小球已经触碰到了底部
        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;  //小球的y轴上的坐标就设为canvas底边坐标减去小球半径的值
            balls[i].vy = - balls[i].vy*0.82;   //小球的重力加速度乘以负一来设为相反方向,同时设置0.82的损耗
        }
    }

    var cnt = 0;    //初始化目前在画布中的小球的数量为0
    for(var i = 0; i < balls.length; i++){  //循环遍历所有的小球
     //如果小球的圆心加半径大于零或是圆心减半径小于画布右边缘表示小球还在画布里
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){ 
     //遍历一遍过后ball[cnt]前面的全是在画布中的小球,同时后面的小球可能会和前面的有个别重复，但不管紧要，只要前面的纯粹即可
            balls[cnt++] = balls[i];
        }
    }
 //   while(balls.length > cnt){    //运用循环删除ball[cnt]后面的小球
    while(balls.length > Math.min(300,cnt)){    //此时设定最多300个小球在画布中
        balls.pop(); 
    }
}

function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){    //遍历到是1则生成一个小球
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),//任意一个小球的x,y的值
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,//-1是底数，后面一个是-1的指数，结果为4或 -4
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall );
            }
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT); //先清空之前的画布

    var hours = parseInt( curShowTimeSeconds / 3600);//计算获取时分秒
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );//按顺序绘制时分秒加冒号,必须传人绘图的上下文环境cxt
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );//此时的10是一个索引值
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){//遍历绘制每个小球
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ ){
        for(var j = 0 ; j < digit[num][i].length ; j ++ ){
             if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                cxt.closePath();

                cxt.fill();
            }
        }
           
    }
        
}

