import process from 'node:process';
import axios from 'axios';
import user from './user.js';
import task from './task.js';
import cache from "memory-cache";
import Debug from "debug";
const debug = Debug('ids:debug');
const warn = Debug('ids:warn');


export class idsError extends Error {
  constructor (code, message) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = null;
  }
}

/**
 * 获取token
 * @param {Object} options 其他参数
 *    - appId ids的应用ID
 *    - secret ids的密钥
 * @returns 获得的Token
 */
export const getToken = async (options = {}) => {
  const host = options.host || process.env.IDS_HOST;
  const appId = options.appId || process.env.IDS_APPID;
  const secret = options.secret || process.env.IDS_SECRET;
  if (!appId) {
    throw new idsError(-1, '必须的参数appId或环境变量IDS_APPID未设置.')
  }
  if (!secret) {
    throw new idsError(-1, '必须的参数secret未传入,或未设置环境变量IDS_SECRET')
  }

  const tokenCacheKey = `ids-token::${appId}::${secret}`;
  let token = cache.get(tokenCacheKey);
  if (token) {
    debug(`从cache获取token(secret:${secret})`);
    return token;
  } else {
    const res = await axios.get(`${host}/token/gateway/accessToken`, {
      headers: {
        appId: appId,
        appSecret: secret,
      },
    }).catch(e => {
      console.log(e)
    });
    if (res.data.errcode === "0") {
      debug(`获取token成功::${res.data.data}`);
      // 过期时间为7200s, 过期时间减去30s, 防止token失效
      cache.put(tokenCacheKey, res.data.data, (7200*1000-30*1000));
      return res.data.data;
    }
    warn('login出错:', res);
    throw new idsError(res.data.code, res.data.errmsg);
  }
}

export const User = user;
export const Task = task;
export default {
  getToken,
  User,
  Task,
};
