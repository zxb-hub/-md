### Promise
  > 解决了什么问题: 异步之间存在依赖关系，需要通过层层嵌套回调来满足这种依赖，如果嵌套层数过多，可读性和可维护性都变得很差，产生所谓“回调地狱”，而Promise将回调嵌套改为链式调用，增加可读性和可维护性

  > 三种状态，**Pending（等待状态）**、**Fulfilled（执行状态）**、**Rejected（拒绝状态）**，状态变更是单向的，状态不可逆，都是从Pending到剩下两个状态，一旦状态改变就会一直保持这个状态，称为**resolved（已定型）**

  > then方法可以接收两个可选参数, 第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数
 #### 介绍
  ***观察者模式***
  > 收集依赖 -> 触发通知 -> 取出依赖执行
  > promise中，执行顺序是 then收集依赖 -> 异步触发resolve -> resolve执行依赖
  ```
    const p1 = new Promise((resolve, reject) => { // 立即执行
      setTimeout(() => { // setTimeout为宏任务，所以这一步为宏任务执行
          resolve('result')
      },
      1000);
    }) 
    // .then会进行提前依赖收集，等promise状态改变后才会在微队列中执行
    p1.then(res => console.log(res), err => console.log(err)) // 宏任务执行完成后，状态改变，会执行.then()中的微任务
  ```
  1. Promise对象接收一个回调函数，其中包含两个参数resolve和reject
  2. 创建Promise时，会立即执行这个回调函数
  3. 回调函数中使用resolve和reject将任务状态改变，分别推向.then和.catch中
  4. .then()被执行，收集失败和成功的回调，放入相应队列中
  5. setTimeout中的回调执行，将任务状态改变，.then()执行相应回调

  **Promise 新建后就会立即执行**
  ```
   let promise = new Promise(function(resolve, reject) {
     console.log('Promise');
     resolve();
   });

   promise.then(function() {
     console.log('resolved.');
   });

   console.log('Hi!');

   // Promise
   // Hi!
   // resolved

  ```
  Promise 新建后立即执行，所以首先输出的是Promise
  然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出

  > 当一个异步操作（p1）的结果返回另一个异步操作（p2）时，p2的结果将会传递给p1，也就是说p2的状态决定了p1的状态；
    如果p2的状态为padding，则p1会等待p2的状态改变；
    如果p2的状态变为resolved或rejected，那么p1的回调函数会立刻执行
  ``` 
    const p2 = new Promise(function (resolve, reject) {
      // ...
    });

    const p1 = new Promise(function (resolve, reject) {
      // ...
      resolve(p2);
    })
  ```

  ```
   const p1 = new Promise(function (resolve, reject) {
     setTimeout(() => reject(new Error('fail')), 3000)
   })

   const p2 = new Promise(function (resolve, reject) {
     setTimeout(() => resolve(p1), 1000)
   })

   p2
     .then(result => console.log(result))
     .catch(error => console.log(error))

   // Error: fail
  ```
  > p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

  ***注意：***  用resolve或reject并不会终结 Promise 的参数函数的执行
  ```
  new Promise((resolve, reject) => {
     resolve(1);
     console.log(2);
   }).then(r => {
     console.log(r);
   });
   // 2
   // 1
  ```
  调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务
  > 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外
  ```
  new Promise((resolve, reject) => {
     return resolve(1);
     // 后面的语句不会执行
     console.log(2);
   })
  ```

  #### Promise.prototype.then()
    > then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法

    ```
      getJSON("/posts.json").then(function(json) {
       return json.post;
      }).then(function(post) {
        // ...
      });
    ```
    注意，前一个回调函数可能返回的也是一个Promise对象（即有异步操作），这时候后一个回调函数就会等待该Promise对象的装填发生改变才会调用
    ```
       getJSON("/post/1.json").then(
        post => getJSON(post.commentURL)
      ).then(
        comments => console.log("resolved: ", comments),
        err => console.log("rejected: ", err)
      );
    ```
    第一个then指定的回调函数是返回一个Promise对象，这时第二个then里面指定的回调函数会等待新的Promise对象状态发生变化，根据变化执行相应操作回调

  #### Promise.prototype.catch()
  > Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数

  当Promise对象将状态改变为resolved，则会调用.then()中的回调；如果异步操作抛出错误，或者状态变为rejected，就会调用catch()

  ```
  const p = new Promise((reject, resolve) => {
    throw new Error('异常') // 抛出异常应该使用throw
    reject('进入正常')
  }) // 直接出现报错 '手动抛出异常'
  p.then(res=>{
    console.log(res)
  })
  p.catch(err=>{
    console.log(err) // '手动抛出异常'
  })
  ```

  另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获
  > 如果 Promise 状态已经变成resolved，再抛出错误是无效的 

  Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获

  Promise 对象内部报错不会影响到外部，也就是说内部有语法错误或者其他错误的话，是不会阻断外部的执行的
  ```
  const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
       // 下面一行会报错，因为x没有声明
       resolve(x + 2);
     });
   };

   someAsyncThing().then(function() {
     console.log('everything is great');
   });

   setTimeout(() => { console.log(123) }, 2000);
   // Uncaught (in promise) ReferenceError: x is not defined
   // 123
  ```

  一般会在Promise 方法最后接一个 *.catch()* 方法，这样能够捕获到前面链式里面的报错，进行处理

  同样也需要注意到，*.catch()* 方法如果写在.then() 方法前面的话，Promise 对象报错会走到.catch() ，但是如果没有报错就会走到.then() 里面，.then() 内部的报错就与上面的.catch() 无关了

  > 同理，可使用.catch() 方法处理.catch() 方法抛出的错误，灵活使用

  #### Promise.prototype.finally()
  > ***finally()*** 方法用于指定不管Promise 对象最后状态如何都会执行的操作，ES2018引入

  服务器使用Promise 处理请求， 然后使用finally 方法关掉服务器
  ```
  server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
  ```
  finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果

  > finally本质上是then方法的特例
  ```
  promise
  .finally(() => {
    // 语句
  });

  // 等同于
  promise
  .then(
    result => {
      // 语句
      return result;
    },
    error => {
      // 语句
      throw error;
    }
  );
  ```
  实现：
  > **finally** 方法总是会返回原来的值。
  ```
    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    };

    // resolve 的值是 undefined
     Promise.resolve(2).then(() => {}, () => {})

     // resolve 的值是 2
     Promise.resolve(2).finally(() => {})

     // reject 的值是 undefined
     Promise.reject(3).then(() => {}, () => {})

     // reject 的值是 3
     Promise.reject(3).finally(() => {})
  ```

  #### Promise.all()
  > **Promise.all** 方法用于将多个Promise实例，包装成一个新的Promise实例
  Promise.all 接收一个数组作为参数，数组的每一项都为一个Promise 实例，如果不是会调用**Promise.resolve** 方法，将参数转化为Promise实例，在进一步处理。
  另外，其参数可以不是数组，但是必须要有 **Iterator** 接口，且返回的每个成员都是Promise成员

  `const p = Promise.all([p1, p2, p3])`

  p的状态由p1、p2、p3决定，分为两种情况：
    1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
    2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数
  也就是说，只有p1、p2、p3全部返回fulfilled或者有一个返回rejected时，才会走到Promise.all 之后的方法

  *注意：*
    如果作为参数的Promise实例，自己定义了catch方法，那么它一旦呗rejected，并不会触发Promise.all的catch方法
    ```
      const p1 = new Promise((resolve, reject) => {
        resolve('hello');
      })
      .then(result => result)
      .catch(e => e);

      const p2 = new Promise((resolve, reject) => {
        throw new Error('报错了');
      })
      .then(result => result)
      .catch(e => e);

      Promise.all([p1, p2])
      .then(result => console.log(result))
      .catch(e => console.log(e));
      // ["hello", Error: 报错了]
    ```
    上面代码中，当p2出现报错会走到.catch处，此时Promise.all中的p2返回值变为p2.catch中的返回值，p2.catch()中并未报错，所以走到Promise.all().then()，打印出["hello", Error: 报错了]

  #### Promise.race()
  > Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例； 

  `const p = Promise.race([p1, p2, p3]);`

  > 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

  Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理

  下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
  ```
  const p = Promise.race([
     fetch('/resource-that-may-take-a-while'),
     new Promise(function (resolve, reject) {
       setTimeout(() => reject(new Error('request timeout')), 5000)
     })
   ]);

   p.then(console.log)
   .catch(console.error);
  ```
  上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

  #### Promise.allSettled()
  > ES2020引入，用来确定一组Promise是否都结束了（不管成功还是失败，Promise.all遇到失败就回退出），**Promise.allSettled()** 方法也是接收一组Promise 对象作为参数，并返回一组新的Promise 对象，只有所有的Promise 对象状态发生变更（无论fulfilled还是rejected），返回的Promise 对象才会发生状态变更

  Promise.allSettled 一旦发生状态变更，状态总是fulfilled，不会变成rejected；
  状态变为fulfilled后，他的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个Promise 对象
  ```
  const resolved = Promise.resolve(42);
  const rejected = Promise.reject(-1);

  const allSettledPromise = Promise.allSettled([resolved, rejected]);

  allSettledPromise.then(function (results) {
    console.log(results);
  });
  // [
  //    { status: 'fulfilled', value: 42 }, // 成功返回对象
  //    { status: 'rejected', reason: -1 } // 失败返回对象
  // ]

  ```

  #### Promise.any()
  > ES2021 引入Promise.all() 方法，同样接收一组Promise实例，返回一个新的Promise实例
  
  > 如果有一个变为fulfilled 状态，则包装实例会变为fulfilled 状态；如果所有的状态变为rejected 状态，则包装实例会变为rejected 状态

  Promise.any() 和Promise.race() 方法很像，只有一点不同：
  * Promise.any() 不会因为某个Promise 变成rejected状态而结束，必须等待所有参数Promise 变成rejected 状态才会结束
  
  Promise.any() 抛出的错误不是一个一般的Error 错误对象，而是AggregateError 实例，他相当于一个数组，每个成员对应一个被 rejected 的操作所抛出的错误
  ```
  // new AggregateError() extends Array

  const err = new AggregateError();
  err.push(new Error("first error"));
  err.push(new Error("second error"));
  // ...
  throw err;
  ```
  #### Promise.resolve()
  > 将现有对象转化为Promise 对象
  ```
  Promise.resolve('foo')
  // 等价于
  new Promise(resolve => resolve('foo'))

  ```
  **Promise.resolve** 方法接收的参数氛围四种情况：
  1. 参数为 *Promise* 实例
    > 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
  2. 参数为 *thenable* 对象
    > thenable对象指的是具有then方法的对象

    ```
      let thenable = {
        then: function(resolve, reject) {
          resolve(42);
        }
      };
    ```
    Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法
    上面代码中，thenable对象的then()方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then()方法指定的回调函数，输出42
  3. 参数不是具有 *then()* 方法的对象，或根本不是对象
    > 如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。

    ```
    const p = Promise.resolve('Hello');

    p.then(function (s) {
      console.log(s)
    });
    // Hello
    ```
    上面代码生成一个新的 Promise 对象的实例p;
    由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数

  4. 不带任何参数
    > Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

    所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法
    ```
    const p = Promise.resolve();

     p.then(function () {
       // ...
     });
    ```

    注意：立即**resolve()**的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时

    ```
     setTimeout(function () {
       console.log('three');
     }, 0);

     Promise.resolve().then(function () {
       console.log('two');
     });

     console.log('one');

     // one
     // two
     // three
    ```
    上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出

  #### Promise.reject()
    > Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected

    ```
    const p = Promise.reject('出错了');
     // 等同于
     const p = new Promise((resolve, reject) => reject('出错了'))

     p.then(null, function (s) {
       console.log(s)
     });
     // 出错了
    ```
    上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行

    Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数

    ```
     Promise.reject('出错了')
     .catch(e => {
       console.log(e === '出错了')
     })
     // true
    ```
    Promise.reject()方法的参数是一个字符串，后面catch()方法的参数e就是这个字符串

  #### 关于手写Promise...
  [手写Promise](../-md/js/手写Promise.js)