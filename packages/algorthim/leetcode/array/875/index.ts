/**
 * 和 1011题 做比较
 * 在这里香蕉是可以分开吃的，所以初始化 l = 1, r = Math.max(...piles)(一小时吃完最大的那堆)
 */
export function minEatingSpeed(piles: number[], H: number): number {
  // k 越小，eatTime 越大
  // 求解 <= H 的最大 eatTime 对应的最小 k
  const calcEatTime = (k: number): number => {
    let time = 0
    for (let i = 0; i < piles.length; i++) {
      time += Math.ceil(piles[i] / k)
    }
    return time
  }

  let l = 1,
    r = Math.max(...piles)
  while (l < r) {
    const mid = l + Math.floor((r - l) / 2)
    if (calcEatTime(mid) <= H) {
      r = mid
    } else {
      l = mid + 1
    }
  }
  return l
}

const arr = [30,11,23,4,20]
minEatingSpeed(arr, 5)
