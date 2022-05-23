### WebSocket
> WebSocket 是一种在单个TCP连接上进行全双工通信的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据
> 在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接， 并进行双向数据传输
> WebSocket本质上一种计算机网络应用层的协议，用来弥补http协议在持久通信能力上的不足

WebSocket 的特点包括:
* 建立在 TCP 协议之上，服务器端的实现比较容易
* 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
* 数据格式比较轻量，性能开销小，通信高效
* 可以发送文本，也可以发送二进制数据
* 没有同源限制，客户端可以与任意服务器通信
* 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL

![webSocket协议](../../static/js/webSocket协议.awebp)

> 注意： 虽然HTTP/2也具备服务器推送功能，但HTTP/2 只能推送静态资源，无法推送指定的信息

**浏览器发送**
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```
WebSocket握手，在HTTP协议的握手请求中，会多出 `Upgrade: websocket` 和 `Connection: Upgrade` 
这个就是 WebSocket 的核心了，告诉 Apache 、 Nginx 等服务器：注意啦，我发起的请求要用 WebSocket 协议
Sec-WebSocket-Key 是一个 Base64 encode 的值，由浏览器随机生成，验证服务器是不是真的WebSocket
Sec_WebSocket-Protocol 是一个用户定义的字符串，用来区分同 URL 下，不同的服务所需要的协议
Sec-WebSocket-Version 是告诉服务器所使用的 WebSocket Draft （协议版本），在最初的时候，WebSocket 协议还在 Draft 阶段，各种奇奇怪怪的协议都有，而且还有很多期奇奇怪怪不同的东西，什么 Firefox 和 Chrome 用的不是一个版本之类的，现在确定大家都使用同一个版本

**服务器返回**
以下返回表示已经接受到请求， 成功建立 WebSocket 
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```
`Sec-WebSocket-Accept`  这个则是经过服务器确认，并且加密过后的 Sec-WebSocket-Key
`Sec-WebSocket-Protocol`  则是表示最终使用的协议

**整体过程**
首先，客户端发起http请求，经过3次握手后，建立起TCP连接；http请求里存放WebSocket支持的版本号等信息，如：Upgrade、Connection、WebSocket-Version等；
然后，服务器收到客户端的握手请求后，同样采用HTTP协议回馈数据；
最后，客户端收到连接成功的消息后，开始借助于TCP传输信道进行全双工通信。

#### 优点
* WebSocket协议一旦建议后，互相沟通所消耗的请求头是很小的
* 服务器可以向客户端推送消息了

#### 缺点
* 少部分浏览器不支持，浏览器支持的程度与方式有区别（IE10）


#### 应用场景
* 即时聊天通信
* 多玩家游戏
* 在线协同编辑/编辑
* 实时数据流的拉取与推送
* 体育/游戏实况
* 实时地图位置
* 即时Web应用程序：即时Web应用程序使用一个Web套接字在客户端显示数据，这些数据由后端服务器连续发送。在WebSocket中，数据被连续推送/传输到已经打开的同一连接中，这就是为什么WebSocket更快并提高了应用程序性能的原因。 例如在交易网站或比特币交易中，这是最不稳定的事情，它用于显示价格波动，数据被后端服务器使用Web套接字通道连续推送到客户端
* 游戏应用程序：在游戏应用程序中，你可能会注意到，服务器会持续接收数据，而不会刷新用户界面。屏幕上的用户界面会自动刷新，而且不需要建立新的连接，因此在WebSocket游戏应用程序中非常有帮助
* 聊天应用程序：聊天应用程序仅使用WebSocket建立一次连接，便能在订阅户之间交换，发布和广播消息。它重复使用相同的WebSocket连接，用于发送和接收消息以及一对一的消息传输

#### 断线重连
> 心跳就是客户端定时的给服务端发送消息，证明客户端是在线的， 如果超过一定的时间没有发送则就是离线了

**如何判断在线离线**
当客户端第一次发送请求至服务端时会携带唯一标识、以及时间戳，服务端到db或者缓存去查询改请求的唯一标识，如果不存在就存入db或者缓存中，
第二次客户端定时再次发送请求依旧携带唯一标识、以及时间戳，服务端到db或者缓存去查询改请求的唯一标识，如果存在就把上次的时间戳拿取出来，使用当前时间戳减去上次的时间，
得出的毫秒秒数判断是否大于指定的时间，若小于的话就是在线，否则就是离线；

**使用**
```
var ws = new WebSocket("ws://server_ip//websocket")
ws.onopen = function(evt) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};
    
ws.onmessage = function(evt) {
    
    
    if(event.data !== '心跳监测') { // 心跳监测判断
      console.log("Received Message:" + evt.data);
    }

    ws.close();
};
ws.onclose = function(evt) {
    console.log("Connection closed.");
}
```
**如何解决断线问题**
心跳包：
* 心跳包一般来说都是在逻辑层发送空的echo包来实现的。下一个定时器，在一定时间间隔下发送一个空包给客户端，然后客户端反馈一个同样的空包回来，服务器如果在一定时间内收不到客户端发送过来的反馈包，那就只有认定说掉线了；
* 在TCP的机制里面，本身是存在有心跳包的机制的，也就是TCP的选项：SO_KEEPALIVE。系统默认是设置的2小时的心跳频率。但是它检查不到机器断电、网线拔出、防火墙这些断线。而且逻辑层处理断线可能也不是那么好处理。一般，如果只是用于保活还是可以的

心跳检测步骤：
1. 客户端每隔一个时间间隔发生一个探测包给服务器
2. 客户端发包时启动一个超时定时器
3. 服务器端接收到检测包，应该回应一个包
4. 如果客户机收到服务器的应答包，则说明服务器正常，删除超时定时器
5. 如果客户端的超时定时器超时，依然没有收到应答包，则说明服务器挂了

```
// 前端解决方案：心跳检测
   var heartCheck = {
       timeout: 30000, //30秒发一次心跳
       timeoutObj: null,
       serverTimeoutObj: null,
       reset: function(){
           clearTimeout(this.timeoutObj);
           clearTimeout(this.serverTimeoutObj);
           return this;
       },
       start: function(){
           var self = this;
           this.timeoutObj = setTimeout(function(){
               //这里发送一个心跳，后端收到后，返回一个心跳消息，
               //onmessage拿到返回的心跳就说明连接正常
               ws.send("ping");
               console.log("ping!")

               self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                   ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
               }, self.timeout);
           }, this.timeout);
       }
   }
```