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
