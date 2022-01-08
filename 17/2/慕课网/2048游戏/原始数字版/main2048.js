/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

var board = new Array();
var score = 0;
var hasConflicted = new Array();  //设置碰撞的数组

$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-'+i+"-"+j);  //拼字符串
            gridCell.css('top', getPosTop( i , j ) );   //初始化设置每个格子的位置
            gridCell.css('left', getPosLeft( i , j ) );
        }

    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array(); //利用循环生成一个二维数组
        hasConflicted[i] = new Array(); //利用循环生成一个碰撞的二维数组
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false; //初始化每个格子没有经过碰撞
        }
    }

    updateBoardView();

    score = 0;
}

function updateBoardView(){

    $(".number-cell").remove();   //假设已经存在number-cell，先清除所有的number-cell格子
    for( var i = 0 ; i < 4 ; i ++ )//利用循环先给各个格子赋值
        for( var j = 0 ; j < 4 ; j ++ ){ //给各个格子赋上类名和唯一的id值
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( board[i][j] == 0 ){ //如果显示层格子数字为零，宽高设置为零
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50 );
                theNumberCell.css('left',getPosLeft(i,j) + 50 );
            }
            else{   //如果显示层格子数字不为零，宽高为100，同时设置背景色和字体颜色及数字
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }

            hasConflicted[i][j] = false; //利用循环设置所有的格子未经过碰撞
        }
}

function generateOneNumber(){

    if( nospace( board ) )
        return false;

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    var times = 0;  //给计算机定义一个猜测次数
    while( times < 50 ){    //给计算机50次随机选出一个数字为零的格子的机会
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        times ++;
    }
    if( times == 50 ){  //超过50次就人工找一个数字为0的格子
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4; //方法不错

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}

$(document).keydown( function( event ){  //玩家按下键
    switch( event.keyCode ){  
        case 37: //left
            if( moveLeft() ){  //如果能向左移动
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

function isgameover(){
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert('gameover!');
}

function moveLeft(){

    if( !canMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;  //将碰撞数组对于的碰撞值设为真，防止叠加碰撞
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}