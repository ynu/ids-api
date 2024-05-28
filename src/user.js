import process from 'node:process';
import axios from 'axios';
import Debug from 'debug';
import {getToken} from "./index.js";

const debug = Debug('webexp::debug');

/**
 * 查询用户信息
 * @param {String} userId 用户名(学工号)
 * @param {Object} options 环境选项
 * @returns
 */
export const detail = async (userId, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    debug(`${options.host}/minos-platform/user/get`)
    const res = await axios.post(`${options.host}/minos-platform/user/get`, {
        userId,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}
export default {
    detail,
};
