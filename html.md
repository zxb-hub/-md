<!--
 * @Author: zhengxb zhengxb@hsmap.com
 * @Date: 2022-05-11 21:04:30
 * @LastEditors: zhengxb zhengxb@hsmap.com
 * @LastEditTime: 2022-05-15 23:01:51
 * @FilePath: \面试\html.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### 1、html语义化标签
> 标签有自己的含义
```
  <title>：     页面主体内容。
  <hn>：        h1~h6，分级标题，<h1> 与 <title> 协调有利于搜索引擎优化。
  <ul>：        无序列表。
  <li>：        有序列表。
  <header>：    页眉通常包括网站标志、主导航、全站链接以及搜索框。
  <nav>：       标记导航，仅对文档中重要的链接群使用。
  <main>：      页面主要内容，一个页面只能使用一次。如果是web应用，则包围其主要功能。
  <article>：   定义外部的内容，其中的内容独立于文档的其余部分。
  <section>：   定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
  <aside>：     定义其所处内容之外的内容。如侧栏、文章的一组链接、广告、友情链接、相关产品列表等。
  <footer>：    页脚，只有当父级是body时，才是整个页面的页脚。
  <small>：     呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权。
  <strong>：    和 em 标签一样，用于强调文本，但它强调的程度更强一些。
  <em>：        将其中的文本表示为强调的内容，表现为斜体。
  <mark>：      使用黄色突出显示部分文本。
  <figure>：    规定独立的流内容（图像、图表、照片、代码等等）（默认有40px左右margin）。
  <figcaption>：定义 figure 元素的标题，应该被置于 figure 元素的第一个或最后一个子元素的位置。
  <cite>：      表示所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题。
  <blockquoto>：定义块引用，块引用拥有它们自己的空间。
  <q>：         短的引述（跨浏览器问题，尽量避免使用）。
  <time>：      datetime属性遵循特定格式，如果忽略此属性，文本内容必须是合法的日期或者时间格式。
  <abbr>：      简称或缩写。
  <dfn>：       定义术语元素，与定义必须紧挨着，可以在描述列表dl元素中使用。
  <address>：   作者、相关人士或组织的联系信息（电子邮件地址、指向联系信息页的链接）。
  <del>：       移除的内容。
  <ins>：       添加的内容。
  <code>：      标记代码。
  <meter>：     定义已知范围或分数值内的标量测量。（Internet Explorer 不支持 meter 标签）
  <progress>：  定义运行中的进度（进程）。
  <dialog>:     定义对话框
```
优点：
  1. 对人：增加代码可读性，利于维护
  2. 对机器：对搜索引擎更加友好，利于seo

#### href和src的区别
  > *href* 是Hypertext Reference的缩写，表示超文本引用，用来建立元素与文档之间的链接，常用的有：link、a

  > *src* 表示引用资源，表示替代当前元素，常用在img、script、iframe上

  区别：
  1. 请求资源不同
  2. 作用结果不同，href用于确立文档与引用资源之间的联系，src用于替换当前内容
  3. 浏览器解析方式不同：
     1. 解析到href时，浏览器会并行下载，不会阻断当前进程（css建议使用link而不是@import）
     2. 解析到src时，会暂停其他资源的下载和处理，直到将资源加载、编译、执行完毕

#### link和@import的区别
> *@import* 是css提供的语法规则，只有导入样式表的作用

> *link* 是HTML提供的标签，可以加载CSS文件，还可以定义RSS、rel连接属性等

区别：

1. 加载顺序区别：link标签引入的css被同时加载（异步操作，GUI会开辟新的线程去获取资源）；@import 引入的CSS将在页面加载完毕之后被加载（同步操作，GUI遇到后会等待获取css资源回来后再继续进行渲染）

2. 兼容性区别：@import是CSS2.1之后才有的语法，IE5+才能识别；link作为HTML元素没有兼容性问题


3. DOM可控区别：使用js操作DOM时可以通过插入link标签的方式来改变样式；由于DOM方法是基于文档的，无法使用@import方法插入样式

### 2、DOCTYPE(文档类型的作用)
> DOCTYPE是HTML5中的一种标准通用标记语言的文档类型声明，他的目的是**告诉浏览器（解析器）应该以什么样（XML或XHTML）的文档类型定义来解析文档**，不同的渲染模式会影响浏览器对CSS代码或者JS脚本的解析，他必须申明在第一行

浏览器渲染页面的两种模式（可使用 *document.compatMode* 进行获取）

1. **CSS1Compat: 标准模式（strick mode），** 默认模式，浏览器使用W3C标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
2. **BackCompat：怪异模式（混杂模式）（Quick mode），** 浏览器使用怪异模式渲染页面，在怪异模式下，浏览器将会以一种比较宽松的向后兼容的方式呈现

### 3、常见的meta标签
> meta是文档级元数据元素，用来表示那些不能由其它 HTML 元相关元素（```<base>、<link>, <script>、<style>或 <title>```）之一表示的任何元数据。


作用：
  * 如果设置了 name属性，meta 元素提供的是文档级别的元数据，应用于整个页面。
  * 如果设置了 http-equiv属性，meta 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
  * 如果设置了 charset属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
  * 如果设置了 itemprop 属性，meta 元素提供用户定义的元数据。

> meta标签由name和content属性定义，**用来描述网页文档的属性**，比如网页作者，网页描述，关键字等，除了http固定的一些name作为共识，也可自定义name

常见的meta标签：
1. **chartset**：用来描述HTML文档的编码类型：```<meta chartset="UTF-8" />```
2. **keywords**: 页面关键字：```<meta name="keywords" content="关键字" />```
3. **description**：页面描述：```<meta name="description" content="页面描述内容" />```
4. **refresh**：页面重定向和刷新：```<meta name="refresh" content="0;url=" />```
5. **viewport**：适配移动端，可以控制视口的大小和比例：
```
  <meta name="viewport" 
    content="width=device-width, 
    initial-scale=1,
    maximun-scale=1" />
  content参数有以下几种：
    width viewport: 宽度（数值/device-width）
    height viewport: 高度（数值/device-height）
    initial-scale: 初始缩放比例
    maximun-scale：最大缩放比例
    minimu-scale：最小缩放比例
```
5. **robots**：表示爬虫对此页面的行为，应当遵守的规则
   * *all*：搜索引擎将索引此网页，并继续通过此网页的链接索引文件将被索引
   * *none*：搜索引擎将忽略此网页
   * *index*：搜索引擎索引此网页
   * *follow*：搜索引擎继续通过此网页的链接索引搜索其他的网页

6. **renderer**：用来指定双核浏览器的渲染方式，比如360浏览器，我们可以通过这个设置来指定360浏览器的渲染方式
  ```
    <meta name="renderer" content="webkit"> //默认webkit内核
    <meta name="renderer" content="ie-comp"> //默认IE兼容模式
    <meta name="renderer" content="ie-stand"> //默认IE标准模式
  ```
7. **http-equiv**：和content一起使用，前者表示要表示的元数据的*名称*，后者是元数据的*值*。==http-equiv== 所有允许的值都是特定HTTP头部的名称
```
  <!-- 禁止浏览器从本地的缓存中调取页面内容，
       设定后一旦离开网页就无法从Cache中再调出 -->
  <meta http-equiv="pragma" content="no-cache">

  <!-- 清除缓存，再访问时需要重新下载 -->
  <meta http-equiv="cache-control" content="no-cache">

  <!-- 设定网页的到期时间，一旦网页过期，必须重新从服务器获取 -->
  <meta http-equiv="expires" content="0">

  <!-- 关键字，搜索引擎使用 -->
  <meta http-equiv="keywords" content="关键字">

  <!-- 编码方式 -->
  <meta http-equiv="content-type" content="text/html;charset=utf-8">

  <!-- 几秒后自动跳转 -->
  <meta http-equiv="Refresh" content="2; URL=http://www.net.cn/">

  <!-- Set-Cookie 如果网页过期，那么存盘的cookie将被删除 -->
  <meta 
    http-equiv="Set-Cookie" 
    content="cookie value=xxx;expires=Wednesday, 20-Jun-200722:33:00 GMT; path=/">

  <!-- 兼容ie -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  1. IE=edge告诉浏览器，以当前浏览器支持的最新版本本来渲染，IE9就以IE9版本渲染
  2. chrome=1告诉浏览器，如果当前IE浏览器安装Google Chrome Frame插件，就以chrome内核来渲染页面。
```

### 4、Script 标签所放位置（defer，async）
> 浏览器渲染html文档是从上往下执行，遇到js文件会停止当前页面渲染，转而去下载文件，所以一般将js文件放在文档底部，优化首屏渲染。

优化加载js文件的方式还有defer和async将js文件转为异步加载

defer和async的区别：
  * defer会等到整个文档渲染完成之后才执行,async在加载完成之后，会暂停html的解析，转去执行js
  * defer执行脚本会按照加载顺序去执行，而async执行属于异步执行，哪个先加载完就会执行哪个

![](./img/html/async%E5%92%8Cdefer%E5%8A%A0%E8%BD%BD.awebp)


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



