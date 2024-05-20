import axios from 'axios';
import Debug from 'debug';

const debug = Debug('ynu-ids:debug');
const warn = Debug('ynu-ids:warn');

/**
 * 从环境变量读取密钥等私密字段
 */
const { ESOP_APPID, ESOP_TOKEN } = process.env;
const HOST = 'https://apis.ynu.edu.cn/';

const post = async (url, data, options) => {
  const appid = options.appid || ESOP_APPID;
  const accessToken = options.accessToken || ESOP_TOKEN;
  return axios.post(url, data, {
    headers: {
      appid,
      accessToken,
    },
  });
}
/**
  * 查询ids帐号基本信息
  * @param {String} userid 帐号id
  * @returns 帐号信息
  */
export const idsUserById = async (userid, options = {}) => {
  const url = `${HOST}do/api/call/zhjbxx_tysfrz`;

  const res = await post(url, { userid }, options);
  const { errorCode, errorMsg, dataSet } = res.data;
  if (errorCode) throw {
    errorCode,
    errorMsg,
  };
  return dataSet[0];
};

/**
 * 根据用户ID，获取与此ID同组的其他帐号。
 * @param {String} userid 用户ID
 * @returns
 * 获取成功返回此ID同组的所有ID的列表；若未绑定其他帐号则返回空数组。
 * 若出现异常则返回null
 */
export const ids_grouped_users = async(userid, options = {}) => {
  const url = `${HOST}do/api/call/tzsyyh_tysfrz`;
  const res = await post(url, { userid }, options);
  const { errorCode, errorMsg, dataSet } = res.data;

  if (errorCode) throw {
    errorCode,
    errorMsg,
  };
  return dataSet;
}

/**
 * 根据用户ID获取用户已绑定的手机号（若用户设置了身份绑定，则将获取其绑定的账号的手机号）
 * @param {String} userid 用户ID
 * @returns
 * 用于的手机号码，若为绑定手机号，则返回空字符串。
 */
export const ids_get_mobile_phone = async (userid, options) => {
  // 优先由给定的帐号获取手机号
  const result1 = await idsUserById(userid, options);
  if (!result1) throw {
    errcode: 1,
    errmsg: '给定的id不存在于IDS系统中',
  };

  if (result1.TELEPHONENUMBER) {
    return result1.TELEPHONENUMBER;
  }
  // 若给定的帐号没有绑定手机号，则检查用户是否进行了身份绑定
  const result2 = await ids_grouped_users(userid, options);

  for (let i = 0; i < result2.length; i++) {
    const user = result2[i];
    if (user.USERID === userid) continue;
    if (user.TELEPHONENUMBER) {
      return user.TELEPHONENUMBER;
    }
  }
  return null;
}

export default {
  idsUserById,
  ids_grouped_users,
  ids_get_mobile_phone,
}