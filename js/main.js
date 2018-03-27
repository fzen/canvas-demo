

window.onload = function(){
    // 设置canvas宽高
    function setCanvasSize() {
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    // 获取canvas元素
    var canvas = document.getElementById('canvas');
    // 初始化canvas宽高
    setCanvasSize();
    // 窗口大小变化时调整canvas大小
    window.onresize = setCanvasSize;

    var st,  /*开启画笔标志位*/
        lastX,  /*上一个点的坐标*/
        lastY;

    document.onmousedown = function (e){
        st = true;
        var x = e.clientX;
        var y = e.clientY;
        lastX = x;
        lastY = y;
        draw(x,y,lastX,lastY);
    }

    document.onmouseup = function (e){
        st = false;
    }

    document.onmousemove = function (e){
        if (st){
            var x = e.clientX;
            var y = e.clientY;
            draw(x,y,lastX,lastY); 
            lastX = x;
            lastY = y;
        }
    }
    function draw(x,y,lastX,lastY){
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.moveTo(x,y);
        ctx.lineWidth = 20;        //线宽设为圆半径的2倍，圆为什么会自动变大，半径不再是10了
        ctx.lineTo(lastX,lastY);
        ctx.stroke();
    }
}

