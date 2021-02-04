/**
 * 生成有n个元素的随机数组,每个元素的随机范围为[rangeL, rangeR]
 */
export function generateRandomArray(n: number, rangeL: number, rangeR: number) {
  if (rangeL > rangeR) {
    throw new Error('rangeL must less than rangeR')
  }

  const arr: number[] = []

  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1) + rangeL)
  }

  return arr
}

export function generateNearlyOrderedArray(n: number, swapTimes: number) {
  const arr: number[] = []
  for (let i = 0; i < n; i++) {
    arr[i] = i
  }
  for (let i = 0; i < swapTimes; i++) {
    const a = Math.floor(Math.random() * n)
    const b = Math.floor(Math.random() * n)
    swap(arr, a, b)
  }

  return arr
}

export function generateOrderedArray(n: number) {
  return generateNearlyOrderedArray(n, 0)
}

export function generateInversedArray(n: number) {
  return generateOrderedArray(n).reverse()
}

export function printArray<T>(arr: T[]) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

export function swap<T>(arr: T[], i: number, j: number) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

export function isSorted<T>(arr: T[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }

  return true
}

export function testSort<T>(
  sortName: string,
  sortMethod: (arr: T[]) => void,
  arr: T[]
) {
  const startTime = Date.now()

  sortMethod(arr)

  const endTime = Date.now()

  if (!isSorted(arr)) {
    throw new Error(`${sortName}写错了`)
  }

  console.log(`${sortName}: ${(endTime - startTime) / 1000}s`)
}

// 生成一个针对快排每次递归中的数组，中间值都是最小值的数组
export function generateSpecialArray(n: number) {
  // 生成一个数组，使 arr[(l+r)/2] 为数组中的最小值
  const generateArr = (arr: number[], l: number, r: number, minVal: number) => {
    if (l > r) return
    // 如果 l === r，还是需要给 mid 赋值

    const mid = l + Math.floor((r - l) / 2)
    arr[mid] = minVal
    // 交换 arr[l] 和 arr[mid]
    swap(arr, l, mid)
    // 生成一个数组，使 arr[l+1...r] 中的最中间的值为最小值
    generateArr(arr, l + 1, r, minVal + 1)
    // 还原 arr[l] 和 arr[mid]
    // 回溯
    swap(arr, l, mid)
  }

  const arr: number[] = []
  generateArr(arr, 0, n - 1, 0)

  return arr
}

console.log(generateSpecialArray(10))
