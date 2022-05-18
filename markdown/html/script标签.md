
### 4、Script 标签所放位置（defer，async）
> 浏览器渲染html文档是从上往下执行，遇到js文件会停止当前页面渲染，转而去下载文件，所以一般将js文件放在文档底部，优化首屏渲染。

优化加载js文件的方式还有defer和async将js文件转为异步加载

defer和async的区别：
  * defer会等到整个文档渲染完成之后才执行,async在加载完成之后，会暂停html的解析，转去执行js
  * defer执行脚本会按照加载顺序去执行，而async执行属于异步执行，哪个先加载完就会执行哪个

![](./img/html/async%E5%92%8Cdefer%E5%8A%A0%E8%BD%BD.awebp)


