var canvas,ctx,ys,yc;   //需要用的变量在开始先申明
canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');
canvas.width=canvas.height=400;
aaa();

function aaa(){
    var a,b,c,r,tim,max,x,y,z,p,p1,bai,tx,ty;
    ctx.fillStyle="rgb(211,211,211)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    tim=new Date().getTime()/72;    //获取现在的时间戳的七十二分之一
    
    a=1.0+Math.sin(tim/13)*0.5;
    bai=3+Math.sin(tim/17)*2;
    ys=Math.sin(a);
    yc=Math.cos(a);
    
    r=tim;
    p=[];
    for(b=0;b<3;b++){
        max=7+b*8;
        r=tim/(23+b);
        if(b==1)r=-r;
        for(a=0;a<max;a++){
            x=Math.cos(r)*(b+1)/2;
            y=Math.sin(r)*(b+1)/2;
            z=y*ys;
            y=y*yc;
            p.push([x,y,z,r+Math.PI-Math.PI/8]);
            r+=Math.PI*2/max;
        }
    }
    
    tx=canvas.width/2;
    ty=canvas.height/2+ys*100*bai-70*bai;
    p.push([0,0,0,0,1]);
    p1=[];
    
    for(a=0;a<p.length;a++){
        for(b=0;b<p1.length;b++){
            if(p[a][1]<p1[b][1]){
                for(c=p1.length-1;c>=b;c--){
                    p1[c+1]=p1[c];
                }
                p1[b]=p[a];
                break;
            }
        }
        if(b==p1.length)p1.push(p[a]);
    }
    
    for(a=0;a<p1.length;a++){
        b=p1[a];
        if(b[4]){
            ctx.fillStyle="rgb(0,0,0)";
            ctx.font=(30*bai)+"px HGP創英角ﾎﾟｯﾌﾟ体";
            b="N";
            c=ctx.measureText(b).width/2;
            ctx.fillText(b,tx-c,ty+15*bai);
        }else{
            x=b[0];
            y=b[1];
            z=Math.pow(1.2,b[2]);
            x*=z;
            y*=z;
            hito(x*170*bai+tx,y*170*bai+ty,z*bai,b[3]);
        }
    }
    requestAnimationFrame(aaa);
}

function hito(tx,ty,s,r){
    var a,b,c,p,x,y,x1,y1,maki,col1,col2,m,ude,asi;
    ctx.lineWidth=s;
    col1="rgb(244,244,244)";
    col2="rgb(0,0,0)";
    ctx.fillStyle=col1;
    x1=Math.cos(r);
    y1=Math.sin(r);
    m=[x1*9,-12,y1*9,x1*30,-6,y1*30,1,col2];
    
    ude=[];
    asi=[];
    a=r-Math.PI/2;
    for(b=0;b<2;b++){
        x1=Math.cos(a);
        y1=Math.sin(a);
        asi[b]=[x1*6,20,y1*6,x1*8,35,y1*4,3,col1];
        ude[b]=[x1*8,0,y1*8,x1*15,15,y1*15,3,col1];
        a+=Math.PI;
    }
    
    if(asi[0][2]<0){
        nmaru(asi[0]);
        nmaru(ude[0]);
    }else{
        nmaru(asi[1]);
        nmaru(ude[1]);
    }
    
    if(m[2]<0)nmaru(m);
    
    
    nmaru([0,-14,0,0,14,0,5,col1]);
    a=Math.sin(r);
    x=tx;
    y=ty-20*s*ys;
    tamago(x,y,s,0.7);
    
    a=r-0.5;
    for(b=0;b<2;b++){
        x1=Math.cos(a)*9*s;
        y1=Math.sin(a);
        a+=1;
        if(y1<0)continue;
        c=1;
        if(y1<0.2)c=y1/0.2;
        y1*=9*s*yc;
        ctx.fillStyle="rgba(0,0,0,"+c+")";
        ctx.beginPath();
        ctx.arc(tx+x1,y+y1,1.5*s,0,Math.PI*2,0);
        ctx.fill();
    }
    
    if(m[2]>=0)nmaru(m);
    if(asi[0][2]>=0){
        nmaru(asi[0]);
        nmaru(ude[0]);
    }else{
        nmaru(asi[1]);
        nmaru(ude[1]);
    }
    
    function nmaru(p){
        var a,b,r,px,py,sx,sy,sz,ex,ey,ez,w;
        sx=p[0];sy=p[1];sz=p[2];ex=p[3];ey=p[4];ez=p[5];w=p[6];
        ctx.fillStyle=p[7];
        
        sx=tx+sx*s;
        sy=ty+sy*s*ys+sz*yc*s;
        ex=tx+ex*s;
        ey=ty+ey*s*ys+ez*yc*s;
        w*=s;
        px=ex-sx;
        py=ey-sy;
        r=Math.atan2(py,px);
        px=Math.cos(r)*w;
        py=Math.sin(r)*w;
        
        ctx.beginPath();
        ctx.lineTo(sx+py,sy-px);
        ctx.lineTo(ex+py,ey-px);
        ctx.arc(ex,ey,w,r-Math.PI/2,r+Math.PI/2,0);
        ctx.lineTo(ex-py,ey+px);
        ctx.lineTo(sx-py,sy+px);
        ctx.arc(sx,sy,w,r+Math.PI/2,r-Math.PI/2,0);
        ctx.fill();
        ctx.stroke();
    }
}

function tamago(x,y,s,w){
    var a,b,x1,y1;
    
    ctx.lineWidth=s;
    b=0;
    ctx.beginPath();
    for(a=0;a<40;a++){
        x1=Math.cos(b)*15*s*w;
        y1=Math.sin(b)*15*s;
        ctx.lineTo(x+x1,y+y1);
        b+=Math.PI*2/40;
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}