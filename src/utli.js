import crypto from 'crypto';

/**
 * 获得签名后的对象
 * @param {Object} params 参数对象
 * @returns
 */
export function getSignObject(params) {
  // 将参数按字母序升序排列
  const sortedParams = [params.token, params.timeStamp, params.randomStr, params.uid + params.loginRst].sort();
  // 拼接排序后的参数
  const paramsString = sortedParams.join('');
  // 使用SHA-1进行签名
  const hash = crypto.createHash("sha1")
  // MD5加密
  hash.update(paramsString)
  // 按16进制方式进行显示
  params.sign = hash.digest('hex');
  // console.log(hash.digest('hex'))
  // 返回新的参数对象
  return params
}
