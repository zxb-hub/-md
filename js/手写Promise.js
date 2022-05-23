class myPromise {
  constructor(executor) {
    const PENDING = 'pengding'
    const RULFILLED = 'rulfilled'
    const REJECTED = 'rejected'
    this._state = PENDING
    this._value = undefined
    this._resolveQueue = [] // 成功回调队列
    this._rejectedQueue = [] // 失败回调队列

     // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (value) => {

      const run = () => {
        if(this._state !== PENDING) return  // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._state = REJECTED  // 变更状态

        // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift() // 取出队列中的第一个任务
          callback(value) 
        }
      }
      // 利用setTimeout模拟微任务队列，也可使用 MutationObserver 模拟微任务
      setTimeout(run)
    }

    // 实现同resolve
    let _reject = (value) => {
      if(this._state !== PENDING) return    
      this._state = RULFILLED
      while(this._rejectedQueue.length) {
        const callback = this._rejectedQueue.shift()
        callback(value)
      }
    }

    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }
  
   // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  then = (resolveFn, rejectFn) => {
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    typeof resolveFn !== 'function' ? resolveFn = value => value:null
    typeof rejectFn !== 'function' ? rejectFn = reason => {
      throw new Error(reason instanceof Error ? reason.message: reason)
    }: null
    // return一个新的promise
    return new myPromise((resolve, rejected) => {
      // 把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
      const fulfilledFn = value => {
        try {
           //执行第一个(当前的)Promise的成功回调,并获取返回值
          let x = resolveFn(value)
          //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
          //这里resolve之后，就能被下一个.then()的回调获取到返回值，从而实现链式调用
          x instanceof myPromise ? x.then(resolve, rejected) : resolve(x)
        } catch (error) {
          rejected(error)
        }
        //把后续then收集的依赖都push进当前Promise的成功回调队列中(_rejectQueue), 这是为了保证顺序调用
      }
      this._resolveQueue.push(fulfilledFn)

      const rejectedFn = error => {
        try{
          let x = rejectFn(error)
          x instanceof myPromise ? x.then(resolve, rejected) : resolve(x)
        } catch (error) {
          rejected(error)
        }
      }

      switch (this._state) {
        // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
        case PENDING: 
          this._resolveQueue.push(fulfilledFn)
          this._rejectedQueue.push(rejectedFn)
          break;
          // 当状态已经变为resolve/reject时,直接执行then回调
        case RULFILLED:
          fulfilledFn(this._value) //  this._value是上一个then回调return的值
          break;
        case REJECTED:
          rejectedFn(this._value)
          break
      }
    })
  }

  // catch 方法，返回一个Promise，处理拒绝的情况
  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  // finally方法
  finally(callback) {
    return this.then(
      value => myPromise.resolve(callback()).then(() => value),             // myPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      reason => myPromise.resolve(callback()).then(() => { throw reason })  // reject同理
    )
  }

  //静态的resolve方法
  static resolve(value) {
    if(value instanceof myPromise) return value // 根据规范, 如果参数是Promise实例, 直接return这个实例
    return new myPromise(resolve => resolve(value))
  }

  //静态的reject方法
  static reject(reason) {
    return new myPromise((resolve, reject) => reject(reason))
  }

  //静态的all方法
  static all(promiseArr) {
    let index = 0
    let result = []
    return new myPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        myPromise.resolve(p).then(
          val => {
            index++
            result[i] = val
            //所有then执行后, resolve结果
            if(index === promiseArr.length) {
              resolve(result)
            }
          },
          err => {
            //有一个Promise被reject时，myPromise的状态变为reject
            reject(err)
          }
        )
      })
    })
  }

  // 静态race方法
  static race(promiseArr) {
    return new myPromise((resolve, reject) => {
      //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
      for (let p of promiseArr) {
        myPromise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
          value => {
            resolve(value)        //注意这个resolve是上边new MyPromise的
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }
}

const p1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500);
})
p1.then(res => {
    console.log(res)
    return 2
  })
  .then(res => {
    console.log(res)
    return 3
  })
  .then(res => {
    console.log(res)
  })