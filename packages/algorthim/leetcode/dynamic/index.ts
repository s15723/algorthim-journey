// /**
//  * 0-1 背包问题
//  * 状态：F(n,C) 考虑将 n 个物品放进容量为 C 的背包，使得价值最大
//  * 用 [0...index] 的物品，填充容积为 c 的背包的最大价值
//  */
// // 记忆化搜索
// const knapsack01 = (w: number[], v: number[], C: number) => {
//   if (w.length !== v.length) {
//     throw new Error('长度不一致')
//   }

//   const n = w.length
//   const memo: number[][] = []
//   for (let i = 0; i < n; i++) {
//     const row = []
//     for (let j = 0; j <= C; j++) {
//       row.push(-1)
//     }
//     memo.push(row)
//   }

//   // 状态：考虑 [0...index] 的物品，填充容积为 c 的背包的最大价值
//   const calcBestVal = (w: number[], v: number[], index: number, c: number) => {
//     if (index < 0 || c <= 0) {
//       return 0
//     }
//     // memo[index][c] 考虑 [0...index]，填充容积为 c 的背包的最大价值
//     if (memo[index][c] !== -1) {
//       return memo[index][c]
//     }

//     let res = calcBestVal(w, v, index - 1, c)
//     if (w[index] <= c) {
//       res = Math.max(res, v[index] + calcBestVal(w, v, index - 1, c - w[index]))
//       memo[index][c] = res
//     }

//     return res
//   }

//   return calcBestVal(w, v, n - 1, C)
// }

// console.log(knapsack01([1, 2, 3], [6, 10, 12], 5))

// // 动态规划
// const knapsack01Dynamic = (w: number[], v: number[], C: number) => {
//   if (w.length !== v.length) {
//     throw new Error('长度不一致')
//   }

//   const n = w.length
//   const memo: number[][] = []
//   for (let i = 0; i < n; i++) {
//     const row = []
//     for (let j = 0; j <= C; j++) {
//       row.push(-1)
//     }
//     memo.push(row)
//   }

//   for (let k = 0; k <= C; k++) {
//       memo[0][k] = (k >= w[0]) ? v[0] : 0
//   }

//   for (let i = 1; i < n; i++) {
//       for (let j = 0; j <= C; j++) {
//           memo[i][j] = memo[i-1][j]
//           if (j >= w[i]) {
//               memo[i][j] = Math.max(memo[i][j], v[i] + memo[i-1][j - w[i]])
//           }
//       }
//   }

//   return memo[n-1][C]
// }

// console.log(knapsack01Dynamic([1, 2, 3], [6, 10, 12], 5))
const func1 = x => x + 10
const func2 = x => x * 10
const func3 = x => x / 10

var obj = {x: 3}

function compose1(...funcs) {
  if (funcs.length === 0) {
    return args => args
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => {
    return b(a(...args))
  })
}

compose1(func1, func2, func3)(obj.x)
