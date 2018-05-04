

window.onload = function(){
    // 阻止浏览器默认事件
    document.ontouchmove = function (e){
        e.preventDefault();
    }

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
    var isEraser = false; /*默认不开启橡皮擦模式*/
    var width = 12;   /*默认normal线宽10px*/
    var color = 'black'; 
    //点击橡皮开启橡皮擦模式
    var eraser = document.getElementById('eraser').firstElementChild;
    eraser.onclick = function (e) {
        isEraser = true;
    }
    // 监听用户选择的线宽
    var penSize = document.getElementById('penSize');
    var thin = penSize.getElementsByClassName('thin')[0];
    var normal = penSize.getElementsByClassName('normal')[0];
    var big = penSize.getElementsByClassName('big')[0];

    penSize.onclick = function(){
        if(this.classList.contains('active')){
            this.classList.remove('active')
        }else{
            this.classList.add('active')
        }
    }
    
    thin.onclick = function (e){
        penSize.firstElementChild.innerHTML = thin.innerHTML;
        width = 6;
        isEraser = false;
    }
    normal.onclick = function (e){
        penSize.firstElementChild.innerHTML = normal.innerHTML;
        width = 12;
        isEraser = false;
    }
    big.onclick = function (e){
        penSize.firstElementChild.innerHTML = big.innerHTML;
        width = 18;
        isEraser = false;
    }
    // 监听用户选择的颜色
    var penColor = document.getElementById('penColor');
    var black = penColor.getElementsByClassName('black')[0];
    var red = penColor.getElementsByClassName('red')[0];
    var yellow = penColor.getElementsByClassName('yellow')[0];
    var blue = penColor.getElementsByClassName('blue')[0];

    penColor.onclick = function(){
        if(this.classList.contains('active')){
            this.classList.remove('active')
        }else{
            this.classList.add('active')
        }
    }

    black.onclick = function (e) {
        penColor.firstElementChild.className = 'placeHolder black';
        color = 'black';
    }
    red.onclick = function (e) {
        penColor.firstElementChild.className = 'placeHolder red';
        color = 'red';
    }
    yellow.onclick = function (e) {
        penColor.firstElementChild.className = 'placeHolder yellow';
        color = 'yellow';
    }

    blue.onclick = function (e) {
        penColor.firstElementChild.className = 'placeHolder blue';
        color = 'blue';
    }
    // 监听用户全部清空事件
    var clear = this.document.getElementById('clear').getElementsByClassName('placeHolder')[0];
    clear.onclick = function (e) {
        setCanvasSize();    //发现重置画板尺寸会清空
    }
    //监听下载事件
    var download = document.getElementById('download').firstElementChild;
    download.onclick = function () {
        var name = prompt('输入图片名称');
        if (name) {
            var imgData = canvas.toDataURL();
            var a = document.createElement('a');
            a.href = imgData;
            a.download = name;
            a.click();
        }
    }

    // 特性检测，检测是否触控设备
    if ('ontouchstart' in document.body) {
        canvas.ontouchstart = function (e) {
            st = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            lastX = x;
            lastY = y;
            if(isEraser){
                draw(x,y,lastX,lastY,'white',width) 
            }else {
                draw(x,y,lastX,lastY,color,width);
            }
        }
        canvas.ontouchmove = function (e) {
            if (st&&isEraser){
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                draw(x,y,lastX,lastY,"white",width); 
                lastX = x;
                lastY = y;
            }else if (st&&!isEraser){
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                draw(x,y,lastX,lastY,color,width); 
                lastX = x;
                lastY = y;
            }
        }
        canvas.outouchend = function (e) {
            st = false;
        }
    }else {
        canvas.onmousedown = function (e){
            st = true;
            var x = e.clientX;
            var y = e.clientY;
            lastX = x;
            lastY = y;
            if(isEraser){
                draw(x,y,lastX,lastY,'white',width) 
            }else {
                draw(x,y,lastX,lastY,color,width);
            }
        }
    
        canvas.onmouseup = function (e){
            st = false;
        }
    
        canvas.onmousemove = function (e){
            if (st&&isEraser){
                var x = e.clientX;
                var y = e.clientY;
                draw(x,y,lastX,lastY,"white",width); 
                lastX = x;
                lastY = y;
            }else if (st&&!isEraser){
                var x = e.clientX;
                var y = e.clientY;
                draw(x,y,lastX,lastY,color,width); 
                lastX = x;
                lastY = y;
            }
        }
    }
    
    function draw(x,y,lastX,lastY,color,width){
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, 0.5*width, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;        
        ctx.lineTo(lastX,lastY);
        ctx.stroke();
    }

}

