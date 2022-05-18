### 5、HTML5新特新
* 新增语义化标签：详见1
  <br/>
* 增强型表单：
  * input输入类型：
      输入类型| 描述|
      ---|---
      color| 用于选取颜色
      date| 从一个日期选择器中选择一个日期
      datetime| 日期选择器（UTC时间）
      datetime-local| 选择一个日期和时间（无时区）
      email|包含email地址
      month|月份选择器
      number|数值
      range|一定范围的数值输入域
      search|用于搜索域
      tel|电话号码
      time|时间选择器
      url|URL地址
      week|选择周和年
  * 新增表单元素
      表单元素| 描述|
      ---|---
      < datalist> | 元素规定输入域的选项列表，使用< input>的list属性与其id进行绑定
      < keygen> | 提供验证用户的可靠方法，标签规定用于表单的密钥对生成器字段
      < output> | 用于不同类型的输出，比如计算或者脚本输出
  * 新增表单属性
    属性| 描述|
    ---|---
    required| 要求用户输入是否可为空；Boolean
    min| 最大值
    max| 最小值
    autofocus| 页面加载后自动获取焦点；Boolean
    multiple| input元素中可选择多个值；Boolean
  <br/>
* 新增音、视频播放元素
  * audio 音频播放器
      ```
      <audio controls>
        <source src="xxx.ogg" type="audio/ogg">
        <source src="xxx.map4" type="audio/mpeg">
        您的浏览器暂不支持audio元素
      </audio>
      ```
      control 属性供添加播放、暂停和音量控件。　在< audio> 与 < audio/> 之间你需要插入浏览器不支持的< audio>元素的提示文本 。　< audio> 元素允许使用多个 < source> 元素. < source> 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件　目前, < audio>元素支持三种音频格式文件: MP3, Wav, 和 Ogg

    * video 视频播放器
      ```
      <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        您的浏览器不支持Video标签。
      </video>
      ```
      control 提供了 播放、暂停和音量控件来控制视频。
      也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法。
      同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。
      如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。
      与 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。
      video 元素支持多个source 元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）
  <br/>
* canvas绘图与SVG绘图
    两者区别：
    1. *SVG* 为使用XML描述2D图形的语言；*canvas* 通过javascript进行2d图形绘制
    2. *SVG* 是基于XML，这意味着SVG DOM中的每个元素都是可用的，可以为其添加JavaScript事件；
    3. *SVG* 中每个被绘制的图形均会被视为对象，如果*SVG* 对象的属性发生变化，那么浏览器能够自动重现图形
    4. *Canvas* 是逐像素进行渲染的，在*Canvas* 中一旦图像被渲染完成，他就不会继续得到浏览器的关注，如果位置发生变化，那么整个场景都会进行重绘，包括任何或已经被图像覆盖的对象
  <br/>
* 地理定位
    *HTML5 Geolocation* (地理位置) 用于定位用户的位置
    ```
      window.navigator.geolocation {
        getCurrentPosition: fn 用于获取当前位置数据
        watchPosition: fn 监视用户位置的变化
        clearWatch: fn 清除定位监视
      }

      获取用户位置信息
      navigator.geolocation.getCurrentPosition(
        function successCallback(pos) {// 成功获取回调
          console.log('用户定位信息获取成功')
          console.log(argument)
          console.log(pos.accuracy) // 精确度
          console.log(pos.latitude) // 纬度
          console.log(pos.longitude) // 经度
          console.log(pos.altitude) // 海拔
          console.log(pos.altitudeAcuracy) // 海拔高度的精确度
          console.log(pos.heading) // 朝向
          console.log(pos.speed) // 速度
        },
        function errorCallback(message，code) {// 错误回调
          // message：错误信息
          // code：错误代码
          console.log(code, '=== unknow_error')// 表示不包含在其他错误代码中的错误，在message中查看
          console.log(code, 'permission_denied')// 表示用户拒绝浏览器获取位置信息的请求
          console.log(code, 'position unavalablf')// 表示网络不可用，或连接不到卫星
          console.log(code, 'timeout')// 表示获取超时，必须在options中指定了timeout值时才会发生这种错误
        },
        {
          // options: 配置信息设置
          enableHeightAcuracy: Boolean，表示是否启用高精度模式，如果启用这个模式，浏览器在获取位置信息的时候会花费更多的时间
          Timeout：Number，表示浏览器需要在指定时间内获取位置信息，否则会出发错误回调
          maximunAge：string/Number，表示浏览器重新获取用户位置信息的时间间隔
        }
      )
    ```
    <br/>
* 拖放API
    > 拖放是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。
    >拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。
    
    **拖放生命周期：**
    dragstart * 1：开始拖动 ===> drag * n :拖动中... ===> dragend * 1: 拖动结束

    **触发四个事件：**
    1. dragenter：拖动着进入
    2. dragover：拖动着悬停
    3. dragleave：拖动着离开
    4. drop：释放
   
   拖动组成：dragenter*1 - dragover*n - drop*1 或 dragenter*1 - dragover*n - dragleave*1 - drop*1

   **dataTransfer**：用于数据传递的“拖拉机”对象；在拖动源对象事件中使用.
   **dataTransfer**属性保存数据：e.dataTransfer.setData( k, v )在拖动目标对象事件中使用e.dataTransfer属性读取数据：var value = e.dataTransfer.getData( k )
  <br/>

* webWorker
    > web worker 是运行在后台的 JavaScript，不会影响页面的性能.
    
    > 当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。
    >web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。
  ```
    // 判断是否支持web worker
    if(typeof(Worker)!=="undefined"){
        // 是的! Web worker 支持!
        // 一些代码.....
    } else {
        //抱歉! Web Worker 不支持
    }

    // 创建
    var i=0;

    function timedCount(){
      i=i+1;
      postMessage(i);
      setTimeout("timedCount()",500);
    }
    timedCount();
    // 以上代码中重要的部分是 postMessage() 方法 - 它用于向 HTML 页面传回一段消息。
    // 注意：web worker 通常不用于如此简单的脚本，而是用于更耗费 CPU 资源的任务
  ```
  我们已经有了 web worker 文件，现在我们需要从 HTML 页面调用它。

  下面的代码检测是否存在 worker，如果不存在，- 它会创建一个新的 web worker 对象，然后运行 "demo_workers.js" 中的代码：
  ```
  if(typeof(w)=="undefined"){
    w=new Worker("demo_workers.js");
  }
  // 接受消息
  w.onmessage = (event)=>{
    console.log(event)
  }
  ```
  终止webworker
  ```
  w.terminate();
  ```
  注：由于 web worker 位于外部文件中，它们无法访问下列 JavaScript 对象：
    1. window 对象
    2. document 对象
    3. parent 对象 
  <br/>

* 服务器发送事件(Server-Sent Events)
  > HTML5 服务器发送事件（server-sent event）允许网页获得来自服务器的更新。

  > Server-Sent 事件指的是网页自动获取来自服务器的更新。
  以前也可能做到这一点，前提是网页不得不询问是否有可用的更新。通过服务器发送事件，更新能够自动到达。
  
  EventSource 对象用于接收服务器发送事件通知：
  ```
  let source=new EventSource("demo_sse.php");
  source.onmessage=function(event){
    document.getElementById("result").innerHTML+=event.data + "<br>";
  };

  创建一个新的 EventSource 对象，然后规定发送更新的页面的 URL（本例中是 "demo_sse.php"）
  每接收到一次更新，就会发生 onmessage 事件
  当 onmessage 事件发生时，把已接收的数据推入 id 为 "result" 的元素中
  ```
  浏览器支持
  ```
  if(typeof(EventSource)!=="undefined"){
      // 浏览器支持 Server-Sent
      // 一些代码.....
  }else{
      // 浏览器不支持 Server-Sent..
  }
  ```
  服务器端事件流的语法是非常简单的。把 "Content-Type" 报头设置为 "text/event-stream"。现在，您可以开始发送事件流了

  事件| 描述|
  ---|---
  onopen| 当通往服务器的连接被打开
  onmessage| 当接收到消息
  onerror| 当发生错误
  <br/>

* webSocket



