const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

export default class Promise {
  status: 'PENDING' | 'RESOLVED' | 'REJECTED'
  value: any
  reason: any
  onFulfilledList: any[]
  onRejectedList: any[]

  constructor(executor: (resolve, reject) => void) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledList = []
    this.onRejectedList = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.onFulfilledList.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedList.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // 如果是同步 resolve 的，只有第一次 then 进入时状态为 RESOLVED
  // 之后的 then 为 PENDING，因为第一次 then 会延时 resolve
  then(onFulfilled, onRejected?) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error
          }

    const nextPromise = new Promise((nextResolve, nextReject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this._resolvePromise(nextPromise, x, nextResolve, nextReject)
          } catch (error) {
            nextReject(error)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this._resolvePromise(nextPromise, x, nextResolve, nextReject)
          } catch (error) {
            nextReject(error)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        this.onFulfilledList.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              this._resolvePromise(nextPromise, x, nextResolve, nextReject)
            } catch (error) {
              nextReject(error)
            }
          }, 0)
        })
        this.onRejectedList.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              this._resolvePromise(nextPromise, x, nextResolve, nextReject)
            } catch (error) {
              nextReject(error)
            }
          }, 0)
        })
      }
    })
    return nextPromise
  }

  _resolvePromise(nextPromise, x, nextPromiseResolve, nextPromiseReject) {
    if (nextPromise === x) {
      nextPromiseReject(new TypeError('Chaining cycle detected'))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            (y) =>
              this._resolvePromise(
                nextPromise,
                y,
                nextPromiseResolve,
                nextPromiseReject
              ),
            nextPromiseReject
          )
        } else {
          nextPromiseResolve(x)
        }
      } catch (error) {
        nextPromiseReject(error)
      }
    } else {
      nextPromiseResolve(x)
    }
  }

  static all(promises: any[]) {
    return new Promise((resolve, reject) => {
      const arr: any[] = []
      let index = 0

      const processData = (key, val) => {
        index ++
        arr[key] = val
        if (index === promises.length) {
          resolve(arr)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        const current = promises[i]
        if (isPromise(current)) {
          current.then(data => processData(i, data), reject)
        } else {
          processData(i, current)
        }
      }
    })
  }
}

const isPromise = (val) => {
  if ((typeof val === 'object' && val !== null) || typeof val === 'function') {
    if (typeof val.then === 'function') {
      return true
    }
  }
  return false
}
