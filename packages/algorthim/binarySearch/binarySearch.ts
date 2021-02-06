const binarySearch = <T>(arr: T[], target: T): number => {
  const n = arr.length

  // 在 arr[l...r] 中寻找 target
  const findTarget = (arr: T[], target: T, l: number, r: number): number => {
    if (l > r) {
      return -1
    }

    const mid = l + Math.floor((r - l) / 2)

    if (target === arr[mid]) {
      return mid
    }
    if (target < arr[mid]) {
      return findTarget(arr, target, l, mid - 1)
    }
    return findTarget(arr, target, mid + 1, r)
  }

  return findTarget(arr, target, 0, n - 1)
}

const binarySearchNR = <T>(arr: T[], target: T): number => {
  const n = arr.length

  // 在 arr[l...r) 中寻找 target
  let l = 0,
    r = n
  while (l < r) {
    const mid = l + Math.floor((r - l) / 2)
    if (target === arr[mid]) {
      return mid
    }
    if (target > arr[mid]) {
      l = mid + 1
    } else {
      r = mid
    }
  }

  return -1
}

const arr = [1, 2, 3, 4]
console.log(binarySearch(arr, 2))
console.log(binarySearchNR(arr, 5))
