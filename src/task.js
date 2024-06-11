import process from 'node:process';
import axios from 'axios';
import Debug from 'debug';
import {getToken} from "./index.js";

const debug = Debug('ids::debug');

/**
 * 推送/更新任务（申请）
 * @param {Object} params 添加参数
 *    - insertModel  新增信息（任务和申请）
 *    - updateModel  更新信息 （任务和申请）
 *    - isSendMsg    是否连带发送消息（0：否；1：是；不填默认否）3.6.2.Beta1开始支持
 *    - sendChannels 发消息时的通道，英文逗号分隔的通道主键字符串，isSendMsg=1时必填。3.6.2.Beta1开始支持
 *
 * @param {Object} options 环境选项
 * @returns
 */
export const saveOrUpdate = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/casp-tdc/task/saveOrUpdate`);
    const res = await axios.post(`${options.host}/casp-tdc/task/saveOrUpdate`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}
export default {
    saveOrUpdate,
};
