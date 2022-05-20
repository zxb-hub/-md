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
      if(this._state !== PENDING) return  // 对应规范中的"状态只能由pending到fulfilled或rejected"
      this._state = REJECTED  // 变更状态

      // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
      // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
      while (this._resolveQueue.length) {
        const callback = this._resolveQueue.shift() // 取出队列中的第一个任务
        callback(value) 
      }
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
        case RULFILLED:
          fulfilledFn(this._value) //  this._value是上一个then回调return的值
          break;
        case REJECTED:
          rejectedFn(this._value)
          break
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