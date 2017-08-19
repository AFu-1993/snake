(function () {
//****************************
    var $table=$("table");
    var $td=$("td");
    var $begin=$("#begin");
    var $pause=$("#pause");
    var $again=$("#again");
    var $score=$("#score span");
    var $info=$("#info");
    var $tip=$("#tip");
    var $ok=$("#ok");
    var $btn=$(".btn");
    //蛇的数据
    var $snakeHead=null;
    var snakeHeadPosition;
    var snakeHeadPositionIndex;
    var $snakeBody=[];
    var snakeBody1Position;
    var snakeBody1PositionIndex;
    var blankArea=[];
    var snakeLength=1;
    var baseWidth=$td.width()+1;
    //游戏数据
    var direction="right";
    var speed=1000;
    var moveTimer;
    var score=0;
    var foodPositionIndex;
    var foodExist=true;
    var row=$("tr").length;
    var col=$td.length/row;
    var $food=$("<div/>").addClass("snake food");


    $(document).ready(init);
    $(document).keydown(changeDirection);
    //开始
    $begin.click(begin);
    function begin() {
        if (!$snakeHead) {
            init();
        }
        setTimeout(move, 1000);
    }
    // 暂停
    $pause.click(pause);
    function pause() {
        clearTimeout(moveTimer);
    }
    // 再来
    $again.click(again);
    function again() {
        init();
    }
    // 规则
    $info.click(showInfo);
    function showInfo() {
        $tip.slideToggle(300);
    }
    $ok.click(showInfo);
    // 手机方向键
    $btn.closest(".left-btn")[0].addEventListener("touchstart", function () {
        $(this).addClass("active");
        var temp={};
        temp.preventDefault=function () {

        };
        temp.which=37;
        changeDirection(temp);
    }, false);
    $btn.closest(".right-btn")[0].addEventListener("touchstart", function () {
        $(this).addClass("active");
        var temp={};
        temp.preventDefault=function () {};
        temp.which=39;
        changeDirection(temp);
    }, false);
    $btn.closest(".top-btn")[0].addEventListener("touchstart", function (e) {
        $(this).addClass("active");
        var temp={};
        temp.preventDefault=function () {};
        temp.which=38;
        changeDirection(temp);
    }, false);
    $btn.closest(".bottom-btn")[0].addEventListener("touchstart", function () {
        $(this).addClass("active");
        var temp={};
        temp.preventDefault=function () {};
        temp.which=40;
        changeDirection(temp);
    }, false);
    $btn.closest(".mid-2")[0].addEventListener("touchstart", function () {
        $(this).addClass("active");
        var temp={};
        temp.preventDefault=function () {};
        temp.which=32;
        changeDirection(temp);
    }, false);
    for(var i=0;i<$btn.length;i++){
        $btn[i].addEventListener("touchend", function () {
            $(this).removeClass("active");
        }, false);
    }

// init 初始化全部数据
    function init() {
        $table.find(".snake").remove();
        $td=$("td");
        baseWidth=$td.width()+1;
    //   初始化数据
        //蛇的数据
         $snakeHead=null;
         snakeHeadPosition;
         snakeHeadPositionIndex;
         $snakeBody=[];
         snakeBody1Position;
         snakeBody1PositionIndex;
         blankArea=[];
         snakeLength=1;

        //游戏数据
         direction="right";
         speed=1000;
         moveTimer;
         score=0;
        $score.text(score);
         foodPositionIndex;
         foodExist=true;
        for(var i=0;i<$td.length;i++){
            blankArea.push(i);
        }
    //    创造基础元素
        $snakeHead=$("<div/>").addClass("snake snakeHead").animate({
            top:1,
            left:1+baseWidth
        },0);
        snakeHeadPosition={
            top:1,
            left:1+baseWidth
        };
        snakeHeadPositionIndex=1;
        removeNotBlank(snakeHeadPositionIndex);
        $table.append($snakeHead);

        $snakeBody.push($("<div/>").addClass("snake snakeBody").animate({
            top:1,
            left:1
        },0));
        snakeBody1Position={
            top:1,
            left:1
        };
        snakeBody1PositionIndex=0;
        removeNotBlank(snakeBody1PositionIndex);
        $table.append($snakeBody[0]);
        $table.append($food);
        showFood();
    }

//move 控制蛇的运动
    function move() {
        // var tempSnakeHeadPosition={};
        var tempSnakeHeadPositionIndex;
        var temp;
    //    方向
    //    如果
        // right
        if(direction==="right"&&(snakeHeadPosition.left+baseWidth)<=baseWidth*(col-1)+1){
            // tempSnakeHeadPosition.left=snakeHeadPosition.left+baseWidth;
            tempSnakeHeadPositionIndex=snakeHeadPositionIndex+1;
            if(!isBlank(tempSnakeHeadPositionIndex)){
                clearTimeout(moveTimer);
                return alert("gg");
            }

            $snakeHead.animate({
                left:snakeHeadPosition.left+baseWidth
            },0,function () {
                if(foodPositionIndex==snakeHeadPositionIndex){
                    temp=creatSnakeBody().animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    $table.append(temp);
                    $snakeBody.unshift(temp);
snakeBody1PositionIndex=snakeHeadPositionIndex;
foodExist=false;
                }else{
                    temp=$snakeBody.pop();
                    blankArea.push(getElemPositionIndex(temp));
                    temp.animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    $snakeBody.unshift(temp);

                }
                temp=null;
                snakeHeadPosition.left=snakeHeadPosition.left+baseWidth;
 snakeHeadPositionIndex=tempSnakeHeadPositionIndex;
 removeNotBlank(snakeHeadPositionIndex);
            });
        }




        //left
        else if(direction==="left"&&(snakeHeadPosition.left-baseWidth)>0){
            tempSnakeHeadPositionIndex=snakeHeadPositionIndex-1;
            if(!isBlank(tempSnakeHeadPositionIndex)){
                clearTimeout(moveTimer);
                return alert("gg");
            }
            $snakeHead.animate({
                left:snakeHeadPosition.left-baseWidth
            },0,function () {
                if(foodPositionIndex==snakeHeadPositionIndex){
                    temp=creatSnakeBody().animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    $table.append(temp);
                    $snakeBody.unshift(temp);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    foodExist=false;
                }else{
                    temp=$snakeBody.pop();
                    blankArea.push(getElemPositionIndex(temp));
                    temp.animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    $snakeBody.unshift(temp);
                }
                temp=null;
                snakeHeadPosition.left=snakeHeadPosition.left-baseWidth;
                snakeHeadPositionIndex=tempSnakeHeadPositionIndex;
                removeNotBlank(snakeHeadPositionIndex);
            });
        }
        //top
        else if(direction==="top"&&(snakeHeadPosition.top-baseWidth)>0){
            tempSnakeHeadPositionIndex=snakeHeadPositionIndex-col;
            if(!isBlank(tempSnakeHeadPositionIndex)){
                clearTimeout(moveTimer);
                return alert("gg");
            }
            $snakeHead.animate({
                top:snakeHeadPosition.top-baseWidth
            },0,function () {
                if(foodPositionIndex==snakeHeadPositionIndex){
                    temp=creatSnakeBody().animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    $table.append(temp);
                    $snakeBody.unshift(temp);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    foodExist=false;
                }else{
                    temp=$snakeBody.pop();
                    blankArea.push(getElemPositionIndex(temp));
                    temp.animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    $snakeBody.unshift(temp);
                }
                temp=null;
                snakeHeadPosition.top=snakeHeadPosition.top-baseWidth;
                snakeHeadPositionIndex=tempSnakeHeadPositionIndex;
                removeNotBlank(snakeHeadPositionIndex);
            });
        }
        //bottom
        else if(direction==="bottom"&&(snakeHeadPosition.top+baseWidth)<=(row-1)*baseWidth+1){
            tempSnakeHeadPositionIndex=snakeHeadPositionIndex+col;
            if(!isBlank(tempSnakeHeadPositionIndex)){
                clearTimeout(moveTimer);
                return alert("gg");
            }
            $snakeHead.animate({
                top:snakeHeadPosition.top+baseWidth
            },0,function () {
                if(foodPositionIndex==snakeHeadPositionIndex){
                    temp=creatSnakeBody().animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    $table.append(temp);
                    $snakeBody.unshift(temp);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    foodExist=false;
                }else{
                    temp=$snakeBody.pop();
                    blankArea.push(getElemPositionIndex(temp));
                    temp.animate({
                        top:snakeHeadPosition.top,
                        left:snakeHeadPosition.left
                    },0);
                    snakeBody1PositionIndex=snakeHeadPositionIndex;
                    $snakeBody.unshift(temp);
                }
                temp=null;
                snakeHeadPosition.top=snakeHeadPosition.top+baseWidth;
                snakeHeadPositionIndex=tempSnakeHeadPositionIndex;
                removeNotBlank(snakeHeadPositionIndex);
            });
        }
        //错误
        else{
            clearTimeout(moveTimer);
            return alert("游戏结束！");
        }
        if(!foodExist){
            foodExist=true;
            score++;
            $score.text(score);
            showFood();
        }
        moveTimer=setTimeout(arguments.callee,speed);

    }
//    辅助函数
    function removeNotBlank(positionIndex) {
        //从空白数组里除去非空白位置
        for(var i=0;i<blankArea.length;i++){
            if(positionIndex===blankArea[i]){
                // console.log("除去了："+blankArea[i]);
                blankArea.splice(i,1);

                return;
            }
        }
    }
    function isBlank(positionIndex) {
        for(var i=0;i<blankArea.length;i++){
            if(positionIndex===blankArea[i]){
                
                return true;
            }
        }
        return false;
    }
    function creatSnakeBody() {
        return $("<div/>").addClass("snake snakeBody");
    }
    function changeDirection(e) {

        switch (e.which){
            case 65:
            case 37:
                direction=(snakeHeadPositionIndex-1)==snakeBody1PositionIndex?direction:"left";
                e.preventDefault();
                break;
            case 87:
            case 38:
                direction=(snakeHeadPositionIndex-col)==snakeBody1PositionIndex?direction:"top";
                e.preventDefault();
                break;
            case 68:
            case 39:
                direction=(snakeHeadPositionIndex+1)==snakeBody1PositionIndex?direction:"right";
                e.preventDefault();
                break;
            case 83:
            case 40:
                direction=(snakeHeadPositionIndex+col)==snakeBody1PositionIndex?direction:"bottom";
                e.preventDefault();
                break;
            case 32:
                e.preventDefault();
                speed=speed>100?speed-100:speed;
                break;

        }
        console.log(e.which);
    }
    function getElemPositionIndex(elem) {
        var x=(Number(elem.css("left").replace("px",""))-1)/baseWidth;
        var y=(Number(elem.css("top").replace("px",""))-1)/baseWidth;
        // console.log("添加了："+(y*10+x));
        return y*10+x;
    }

//
    function showFood() {
        var  blankAreaCount=blankArea.length;
        var foodIndex=Math.floor(blankAreaCount*Math.random());
        foodIndex=foodIndex!==blankAreaCount?foodIndex:foodIndex-1;
        foodPositionIndex=blankArea[foodIndex];
        var foodTop=Math.floor(foodPositionIndex/col)*baseWidth+1;
        var foodLeft=Math.floor(foodPositionIndex%col)*baseWidth+1;
        $food.css({
            "top":foodTop+"px",
            "left":foodLeft+"px"
        });
    }















//*********************************
})();