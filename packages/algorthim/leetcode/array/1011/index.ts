/**
 * 和 875 题做比较
 * 在这里货物是不可以分开运的，所以必须保证最大重量的那批货也能运
 * 所以初始化 l = Math.max(...weights), r = sum(weights)(一天运完)
 */
function shipWithinDays(weights: number[], D: number): number {
  // 运载能力为 k，求解运输天数
  const calcDays = (k: number): number => {
      let cur = 0
      let res = 0
      for (let weight of weights) {
          if (cur + weight <= k) {
              cur += weight
          } else {
              res++
              cur = weight
          }
      }

      // 对于最后一天
      // cur 最后都不为 0，需要 + 1
      res++
      return res
  }

  let l = Math.max(...weights), r = weights.reduce((a, b) => a + b)
  console.log(l, r)
  while (l < r) {
      const mid = l + Math.floor((r - l) / 2)
      // k 越小，days 越大
      if (calcDays(mid) <= D) {
          r = mid
      } else {
          l = mid + 1
      }
  }
  return l
}

const weights = [1,2,3,4,5,6,7,8,9,10]
console.log(shipWithinDays(weights, 5))