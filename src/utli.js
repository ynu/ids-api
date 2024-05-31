// import CryptoJS from 'crypto-js';
// import process from 'node:process';
//
// /**
//  * 获得签名后的对象
//  * @param {Object} params 参数对象
//  * @param {Object} options 其它参数
//  * @returns
//  */
// export function getSignObject(paramss, options) {
//   const params = {
//     token: paramss.token,
//     timeStamp: paramss.timeStamp,
//     randomStr: paramss.randomStr,
//     uid: paramss.uid,
//     loginRst: paramss.loginRst,
//   }
//   // 获得公钥
//   const public_key = options.public_key || process.env.EPAY_PUBLIC_KEY;
//   // 获得合作伙伴ID号
//   // params.partner_id = options.partner_id || process.env.EPAY_PARTNER_ID;
//   // 随机生成的字符串，用于计算签名
//   // params.randomStr = "randomStr";
//   // // 时间戳，用于计算签名
//   // params.timeStamp = new Date().getTime();
//   // 获取参数的键数组，并排序
//   const sortedKeys = Object.values(params).sort();
//   let encodedPairs = []
//   // 创建URL编码的键值对字符串数组
//   sortedKeys.map(key => {
//     const encodedKey = encodeURIComponent(key);
//     const encodedValue = encodeURIComponent(params[key]);
//     // 排除空的签名字段，否则签名校验无法通过
//     if (encodedValue !== '' && encodedValue !== null && encodedValue !== undefined) {
//       encodedPairs.push(`${encodedValue}`)
//     }
//   });
//   // 用&符号连接编码后的字符串
//   // const paramsStr = encodedPairs.join("");
//   const paramsStr = sortedKeys.join("");
//   // 获得签名, 加密方式为HAMC-SHA1
//   params.sign = CryptoJS.HmacSHA1(paramsStr, "18F99D4FA0EZZ5MGWXZX").toString();
//   // 返回新的参数对象
//   return params
// }
