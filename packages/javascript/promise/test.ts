// import fs from 'fs'
import Promise from './index'

// function read(url) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(url, (err, data) => {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }

Promise.all([1, 2, new Promise((resolve) => setTimeout(() =>{resolve(3)}, 3000)), 4]).then(res => console.log('res', res))
