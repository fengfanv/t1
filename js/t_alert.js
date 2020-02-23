//点击显示详细图片
/*
t.alertimg({
    "imgurl":["图片地址"],
    "sindex":"1",//默认打开时显示第几张图片，从1开始
})
*/



; (function (win) {
    var styleContent = ".alert_fa{" +/*alert父级*/
        "width:100%;" +
        "height:" + (window.innerHeight) + "px;" +
        "background:rgba(0,0,0,0.45);" +
        "position:fixed;" +
        "left:0px;" +
        "top:0px;" +
        "z-index:9999;" +
        "overflow:hidden;" +
        "}" +
        ".alert_phone{" +/*alert弹窗手机样式*/
        "width:88%;" +
        "background:white;" +
        "height:auto;" +
        "margin:0 auto;" +
        "opacity:0;" +
        "transition:0.1s;" +
        "}" +
        ".alert_pc{" +/*alert弹层pc样式*/
        "width:330px;" +
        "background:white;" +
        "height:auto;" +
        "margin:0 auto;" +
        "opacity:0;" +
        "transition:0.1s;" +
        "}" +
        ".alert_title{" +/*alert标题*/
        "padding-top:20px;" +
        "padding-bottom:10px;" +
        "font-size:18px;" +
        "font-weight:400;" +
        "color:#333;" +
        "line-height:27px;" +
        "text-align:center;" +
        "}" +
        ".alert_content{" +/*alert提示内容*/
        "margin:0 20px;" +
        "margin-bottom:20px;" +
        "color:#666;" +
        "text-align:center;" +
        "font-size:16px;" +
        "line-height:22.5px" +
        "}" +
        ".alert_children_button{" +/*alert按钮层*/
        "width:100%;" +
        "border-top:1px solid #d5d5d5;" +
        "*zoom:1;" +
        "}" +
        ".alert_children_button:after,.alert_children_button:before{" +/*alert按钮层清浮动1*/
        "content:'';" +
        "display:table;" +
        "}" +
        ".alert_children_button:after{" +/*alert按钮层清浮动2*/
        "clear:both;" +
        "}" +
        ".alert_button{" +/*按钮*/
        "height:44px;" +
        "line-height:44px;" +
        "font-weight:400;" +
        "text-align:center;" +
        "font-size:17px;" +
        "border:0px;" +
        "cursor:pointer;" +
        "background:white;" +
        "}" +
        ".alert_onload_fa{" +/*加载动画*/
        "width:100%;" +
        "height:" + window.innerHeight + "px;" +
        "position:fixed;" +
        "left:0px;" +
        "top:0px;" +
        "background:rgba(31,31,31,0.4);" +
        "z-index:999999;" +
        "transition:0.1s;" +
        "}" +
        ".alert_onload_content{" +
        "width:70px;" +
        "height:auto;" +
        "margin:0 auto;" +
        "margin-top:" + ((window.innerHeight / 2) - (70 / 2)) + "px;" +
        "}" +
        ".alert_onload_content>img{" +
        "display:block;" +
        "width:100%;" +
        "height:auto;" +
        "}" +
        ".alert_onload_content>p{" +
        "width:100%;" +
        "font-size:17px;" +
        "line-height:30px;" +
        "text-align:center;" +
        "color:#ccc;" +
        "}" +
        ".img_content{" +//alertImg显示图片
        "height:" + (window.innerHeight - 50) + ";" +
        "margin:0 auto;" +
        "position:relative;" +
        "overflow:hidden;" +
        "}" +
        ".img_content>img{" +
        "display:block;" +
        "width:100%;" +
        "height:auto;" +
        "}" +
        ".close_alert_img{" +
        "width: 40px;" +
        "height: 40px;" +
        "text-align: center;" +
        "line-height: 40px;" +
        "color: #bfbfbf;" +
        "cursor: pointer;" +
        "position:absolute;" +
        "right:50px;" +
        "top:15px;" +
        "}";
    var head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = styleContent;
    } else {
        style.appendChild(document.createTextNode(styleContent));
    }
    head.appendChild(style);

    var plugin = function () {
        this.elementArr = [];//存已创建的元素的id，
        this.pluginName = "t";
    }
    plugin.prototype.createNumber = function (_type) {//创建元素时分配的id
        var _this = this;
        //生成一个4位随机数
        var random = (Math.random() + "").substring(2, 6);
        var newId = _this.pluginName+"-"+_type+"-"+random;
        _this.elementArr.push(newId);
        return newId;
    }
    plugin.prototype.alert = function (content, callback) {
        var elementId = this.createNumber("alert");
        var elementButton = document.createElement('button');
        elementButton.className = 'alert_button';
        elementButton.style.width = "100%";
        elementButton.innerText = '确认';
        elementButton.onclick = function (_elementId,_callback) {
            _callback && _callback();
            document.body.removeChild(document.getElementById(_elementId));
        }.bind({},elementId,callback);
        this.alertRender(content, [elementButton], 1,elementId);
    }
    plugin.prototype.confirm = function (content, callbackyes, callbackno) {
        var elementId = this.createNumber("confirm");
        var arr = [];
        for (var i = 0; i < 2; i++) {
            var elementButton = document.createElement('button');
            elementButton.className = 'alert_button';
            elementButton.style.width = "50%";
            elementButton.style.float = "left";
            if (i == 0) {
                elementButton.style.borderRight = "1px solid #d5d5d5";
            }
            elementButton.innerText = (i == 0 ? '确认' : '取消');
            elementButton.onclick = function (_elementId,_callback) {
                _callback && _callback();
                document.body.removeChild(document.getElementById(_elementId));
            }.bind({},elementId,(i == 0 ? callbackyes : callbackno));
            arr.push(elementButton);
        }
        this.alertRender(content, arr, 2,elementId);
    }
    plugin.prototype.alertRender = function (content, dEvent, dlen,elementFaId) {//弹层渲染
        var elementFa = document.createElement('div');
        elementFa.id = elementFaId;
        elementFa.className = "alert_fa";
        var element = document.createElement('div');
        var elementId = elementFaId+"_content";//创建alert主体ID
        element.id = elementId;
        if (window.innerWidth > 750) {//pc
            element.className = "alert_pc";
        } else {//phone
            element.className = "alert_phone";
        }
        //title高 20px(padding-top)+27px(line-height)+10px(padding-bottom)
        //content高 22.5px(line-height\行)+20px(margin-bottom)
        //button高 44px(height)+1px(border);
        var elementTitle = document.createElement('div');//alert标题
        elementTitle.className = "alert_title";
        elementTitle.innerText = '提示';
        element.appendChild(elementTitle);
        var elementContent = document.createElement('div');//alert内容
        elementContent.className = 'alert_content';
        elementContent.innerText = content;
        element.appendChild(elementContent);
        var elementChildrenButton = document.createElement('div');//alertButtons
        elementChildrenButton.className = 'alert_children_button';
        for (var i = 0; i < dlen; i++) {
            elementChildrenButton.appendChild(dEvent[i]);
        }
        element.appendChild(elementChildrenButton);
        elementFa.appendChild(element);
        document.body.appendChild(elementFa);
        //动态设置高度
        window.setTimeout(function () {
            var alertfabody = document.getElementById(elementId);
            alertfabody.style.marginTop = (window.innerHeight / 2) - (alertfabody.clientHeight / 2) + 'px';
            alertfabody.style.opacity = 1;
        }, 100);
    }
    plugin.prototype.loadImg = function () {//加载动画
        var elementId = this.createNumber("loadimg");
        var elementFa = document.createElement('div');
        elementFa.id = elementId;
        elementFa.className = "alert_onload_fa";
        var elementContent = document.createElement('div');
        elementContent.className = "alert_onload_content";
        var load_img = document.createElement('img');
        load_img.src = "data:image/gif;base64,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";
        elementContent.appendChild(load_img);
        var load_p = document.createElement('p');
        load_p.innerText = "正在加载";
        elementContent.appendChild(load_p);
        elementFa.appendChild(elementContent);
        document.body.appendChild(elementFa);
    }
    plugin.prototype.closeAll = function () {//关闭全部弹层
        var _this = this;
        var elementArrLen = _this.elementArr.length;
        for(var i=0;i<elementArrLen;i++){
            if(document.getElementById(_this.elementArr[i])){
                document.body.removeChild(document.getElementById(_this.elementArr[i]));
            }
        }
        // if (document.getElementById("alertfa520")) {
        //     document.body.removeChild(document.getElementById("alertfa520"))//关闭对话框
        // }
        // if (document.getElementById("loadimg520")) {
        //     document.body.removeChild(document.getElementById("loadimg520"));//关闭加载窗
        // }
        // if (document.getElementById("alertimg520")) {
        //     document.body.removeChild(document.getElementById("alertimg520"))//关闭alertimg
        // }
    }
    //弹层显示图片
    plugin.prototype.alertImg = function (obj) {
        if (obj.imgurl != undefined && obj.imgurl.length >= 1) {
            var elementId = this.createNumber("alertimg");
            var elementFa = document.createElement('div');
            elementFa.className = "alert_onload_fa";
            elementFa.id = elementId;
            var imgContent = document.createElement('div');
            var imgContentId = elementId+"_content";//内容主体id，预留
            imgContent.id = imgContentId;
            imgContent.className = "img_content";
            var sindex = 1;
            if (obj.sindex != undefined && obj.imgurl.length >= obj.sindex && obj.sindex >= 1) {
                sindex = obj.sindex;
            }
            var iimg = new Image();
            iimg.src = obj.imgurl[sindex - 1];
            iimg.onload = function () {
                var iimgWidth = iimg.width;
                var iimgHeight = iimg.height;
                var showConHeight = window.innerHeight - (50);//显示的高
                var showConWidth = iimgWidth / iimgHeight * showConHeight;//显示的宽
                imgContent.style.width = showConWidth + "px";
                var img_a = document.createElement('img');
                img_a.src = obj.imgurl[sindex - 1];
                img_a.style.marginTop = (50 / 2) + 'px';
                imgContent.appendChild(img_a);
                elementFa.appendChild(imgContent);
                var elementClose = document.createElement('div');
                elementClose.className = 'close_alert_img';
                elementClose.innerText = '关闭';
                elementClose.onclick = function (_elementId) {
                    if (document.getElementById(_elementId)) {
                        document.body.removeChild(document.getElementById(_elementId));//关闭对话框
                    }
                }.bind({},elementId);
                elementFa.appendChild(elementClose);
                document.body.appendChild(elementFa);
            }
        } else {
            console.log("ERROE : 请放入图片地址！");
        }
    }
    win["t"] = new plugin();
})(window);
