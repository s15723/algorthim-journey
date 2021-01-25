/**
 * curry 的思想
 * 利用闭包的机制，把一些内容事先存储和处理，等到后期需要的时候拿来直接用
 */
const fn1 = (x) => x + 10
const fn2 = (x) => x * 10
const fn3 = (x) => x / 10

// const funcs = [fn1, fn2, fn1, fn3]

function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => {
        console.log(a)
        console.log(b)
        console.log(args)
        return a(b(...args))
    })
  }

  compose(fn1, fn2, fn1, fn3)(5)


