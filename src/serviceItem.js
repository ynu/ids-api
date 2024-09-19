import process from 'node:process';
import axios from 'axios';
import Debug from 'debug';
import {getToken} from "./index.js";

const debug = Debug('ids::debug');


/**
 * 查询服务事项配置信息
 * @param {Object} options 环境选项
 * @returns
 */
export const getConfigs = async (options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/restful/serviceItem/getConfigs`);
    const res = await axios.get(`${options.host}/coosk/restful/serviceItem/getConfigs`, {
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询事项详情列表
 * @param {Object} params 添加参数
 *    - langCountry  多语言参数，默认为zh_CN(中文)
 * @param {Object} options 环境选项
 * @returns
 */
export const getItemDetailList = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/restful/serviceItem/getItemDetailList`);
    const res = await axios.post(`${options.host}/coosk/restful/serviceItem/getItemDetailList`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 保存服务事项
 * @param {Object} params 添加参数
 *    - fieldValues  字段列表
 *    - linkedServices  关联服务id列表
 *    - isShow  是否显示详情页(1是0否)
 * @param {Object} options 环境选项
 * @returns
 */
export const saveServiceItem = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/restful/serviceItem/saveServiceItem`);
    const res = await axios.post(`${options.host}/coosk/restful/serviceItem/saveServiceItem`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询事项统计
 * @param {Object} options 环境选项
 * @returns
 */
export const count = async (options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/count`);
    const res = await axios.get(`${options.host}/coosk/sim/count`, {
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询事项有效数据字段列表
 * @param {Object} params 查询参数
 *    - langCountry  多语言参数，默认为zh_CN(中文)
 * @param {Object} options 环境选项
 * @returns
 */
export const querySimItemFields = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/querySimItemFields`);
    const res = await axios.get(`${options.host}/coosk/sim/querySimItemFields`, {
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
        params: params
    });
    return res.data;
}

/**
 * 查询事项简要信息
 * @param {Object} params 查询参数
 *    - langCountry  多语言参数，默认为zh_CN(中文)
 *    - pageSize  一次返回记录的总条数
 *    - pageNumber  查询数据的位置
 *    - itemStatus  根据事项状态查询数据。1：已上架 2：草稿 0：已下架
 *    - timestamp  根据时间戳返回时间戳以后新增、删除、变更的事项信息。（单位为毫秒）
 * @param {Object} options 环境选项
 * @returns
 */
export const querySimBriefInfo = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/querySimBriefInfo`);
    const res = await axios.post(`${options.host}/coosk/sim/querySimBriefInfo`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询事项指定信息
 * @param {Object} params 查询参数
 *    - langCountry  多语言参数，默认为zh_CN(中文)
 *    - pageSize  一次返回记录的总条数
 *    - pageNumber  查询数据的位置
 *    - itemStatus  根据事项状态查询数据。1：已上架 2：草稿 0：已下架
 *    - timestamp  根据时间戳返回时间戳以后新增、删除、变更的事项信息。（单位为毫秒）
 *    - dutyDepts  数组，根据事项责任部门查询指定部门的事项信息。部门可以为多个
 *    - serviceObjs  数组，根据事项服务对象查询指定部门的事项信息。服务对象可以为多个
 *    - columnIds  数组，事项返回数据项，不填，则返回启用状态的事项数据字段的数据 ；填入，则返回指定的数据字段的数据。返回的数据项可以为多个
 *    - timestamp  根据时间戳返回时间戳以后新增、删除、变更的事项信息。（单位为毫秒）
 * @param {Object} options 环境选项
 * @returns
 */
export const querySimPartInfo = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/querySimPartInfo`);
    const res = await axios.post(`${options.host}/coosk/sim/querySimPartInfo`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询指定事项全部信息
 * @param {Object} params 查询参数
 *    - langCountry  多语言参数，默认为zh_CN(中文)
 *    - serviceItemWid  事项id
 * @param {Object} options 环境选项
 * @returns
 */
export const simSelectByIdPost = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/simSelectByIdPost`);
    const res = await axios.post(`${options.host}/coosk/sim/simSelectByIdPost`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 一件事列表
 * @param {Object} params 查询参数
 *    - pageSize  每页数量
 *    - pageNumber  页码
 *    - isEnable  是否启用(1启用 0不启用) 默认为1
 *    - language  多语言 （zh_cn,en,ru）不填写默认为中文
 *    - userAccount  用户账号，不填写默认为游客
 *    - objectScope  用户账号所属范围 1:校内 2:校外
 * @param {Object} options 环境选项
 * @returns
 */
export const queryOneThings = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/v2/oneThings/query`);
    const res = await axios.post(`${options.host}/coosk/v2/oneThings/query`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 一件事详情
 * @param {Object} params 查询参数
 *    - language  多语言 （zh_cn,en,ru）不填写默认为中文
 *    - wid  一件事主键
 * @param {Object} options 环境选项
 * @returns
 */
export const queryOneThingsDetail = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/v2/oneThings/detail`);
    const res = await axios.post(`${options.host}/coosk/v2/oneThings/detail`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询用户授权事项
 * @param {Object} params 查询参数
 *    - pageSize  每页数量
 *    - pageNumber  页码
 *    - langCountry  多语言 （zh_cn,en,ru）不填写默认为中文
 *    - userAccount  用户账号，不填写默认为游客
 *    - objectScope  用户账号所属范围 1:校内 2:校外
 * @param {Object} options 环境选项
 * @returns
 */
export const querySimInfoForRole = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/querySimInfoForRole`);
    const res = await axios.post(`${options.host}/coosk/sim/querySimInfoForRole`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询事项授权信息接口
 * 只返回未删除的事项授权信息
 * @param {Object} params 查询参数
 *    - pageSize  每页数量
 *    - pageNumber  页码
 *    - itemIds  事项ids，根据事项id查询数据。事项id是多个值，则返回多个事项的授权信息。
 *    - timestamp  时间戳，根据时间戳返回时间戳以后新增、删除的事项信息. （单位为毫秒）
 * @param {Object} options 环境选项
 * @returns
 */
export const querySimRoleInfo = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/querySimRoleInfo`);
    const res = await axios.post(`${options.host}/coosk/sim/querySimRoleInfo`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 查询事项评价数据接口
 * @param {Object} params 查询参数
 *    - wids  要查询的事项wid列表
 * @param {Object} options 环境选项
 * @returns
 */
export const queryItemAppraise = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/coosk/sim/queryItemAppraise`);
    const res = await axios.post(`${options.host}/coosk/sim/queryItemAppraise`, {
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
    getItemDetailList,
    getConfigs,
    saveServiceItem,
    count,
    querySimItemFields,
    querySimBriefInfo,
    querySimPartInfo,
    simSelectByIdPost,
    queryOneThings,
    queryOneThingsDetail,
    querySimInfoForRole,
    querySimRoleInfo,
    queryItemAppraise,
};
