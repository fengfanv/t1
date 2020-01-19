# t1 - JavaScript插件

电脑端 / 手机端 提示窗插件，对话框插件，加载过渡插件，图片提示插件

[插件演示地址](https://fengfanv.github.io/t1/demo/index.html) | [BUG反馈](https://fengfanv.github.io/t1/demo/index.html)

### 使用方法

##### 1、引入插件

```javascript
<script src="../js/t_alert.js"></script>
```

##### 2、使用alert方法

```javascript
t.alert(
  "显示内容",
  function(){
    alert("单击确定按钮执行的回调方法");
});
*回调方法选填
```

##### 3、使用confirm方法

```javascript
t.confirm(
  "显示内容",
  function(){
    alert("单击确定按钮执行的回调方法");
  },function(){
    alert("单击取消按钮执行的回调方法");
});
*回调方法选填
```

##### 4、使用loadImg加载过渡窗口方法

```javascript
t.loadImg();
```

##### 5、关闭alert、confirm、loadImg、alertImg窗口方法

```javascript
t.closeAll();
*关闭t组件打开的所有弹层
```

##### 6、显示图片弹层窗口方法

```javascript
t.alertImg({
  "imgurl":["../images/c.png"] /*图片地址*/
});
```

### 源码结构

```javascript
;(function (win) {
  //插件样式区
  var styleContent = "...";
  
  //插件程序主体方法
  var plugin = function () {
    //...
  }
  
  //插件分配插件id方法
  plugin.prototype.createNumber = function (_type) {
    //...
  }
  
  //插件提示窗方法
  plugin.prototype.alert = function (content, callback) {
    //...
  }
  
  //插件对话框方法
  plugin.prototype.confirm = function (content, callbackyes, callbackno) {
    //...
  }
  
  //alert和confirm构造器方法
  plugin.prototype.alertRender = function (content, dEvent, dlen,elementFaId) {
    //...
  }
  
  //插件加载过渡方法
  plugin.prototype.loadImg = function () {
    //...
  }
  
  //关闭本插件全部层方法
  plugin.prototype.closeAll = function () {
    //...
  }
  
  //图片提示方法
  plugin.prototype.alertImg = function (obj) {
    //...
  }
  
  //注册插件
  win["t"] = new plugin();
  
})(window);
```
