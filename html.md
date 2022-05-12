<!--
 * @Author: zhengxb zhengxb@hsmap.com
 * @Date: 2022-05-11 21:04:30
 * @LastEditors: zhengxb zhengxb@hsmap.com
 * @LastEditTime: 2022-05-12 23:56:46
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
  * 