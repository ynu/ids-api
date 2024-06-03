import process from 'node:process';
import axios from 'axios';
import Debug from 'debug';
import {getToken} from "./index.js";
import {getSignObject} from "./utli.js";
import FormData from 'form-data';

const debug = Debug('ids::debug');

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

/**
 * 新建用户
 * @param {Object} params 添加参数
 *    - userId  用户名(学工号)       - userName  用户姓名                 - categoryCode  身份分类     - deptCode 所在部门
 *    - sexCode 性别               - identifyTypeId 身份证件类型 代码     - identityCode 证件号码     - phone 手机号
 *    - email 邮箱                 - speciality 专业                    - enterSchoolDate 入校年份/当前所在级
 *    - leaveSchTime 离校时间       - admissionLetter 录取通知书号        - className 班级
 *    - activateNow 是否立即激活1 是，0 否，默认 0    - initPwd 初始用户密码，使用AES+Base64编码
 *    - accountStatus 帐号状态      - lifeCycle 生命周期到期时间             - needPwdUserReset 是否需要用户重置密码
 *
 * @param {Object} options 环境选项
 * @returns
 */
export const add = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/minos-platform/user/add`);
    const res = await axios.post(`${options.host}/minos-platform/user/add`, {
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
 * 管理员修改密码
 * @param {Object} params 添加参数
 *    - userId  用户名(学工号)
 *    - userPwd 用户新密码，使用AES+Base64编码
 *    - needModifyPwd 用户需要修改密码，默认值 1 ，设置成0，如果用户密码规则达标，则无需进入完善资料再次修改密码
 * @param {Object} options 环境选项
 * @returns
 */
export const modifyPwdByManager = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/minos-platform/user/modifyPwdByManager`);
    const res = await axios.post(`${options.host}/minos-platform/user/modifyPwdByManager`, {
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
 * 用户修改密码
 * @param {Object} params 添加参数
 *    - userId  用户名(学工号)
 *    - userPwd 用户新密码，使用AES+Base64编码
 *    - userOldPwd 用户旧密码，使用AES+Base64编码
 * @param {Object} options 环境选项
 * @returns
 */
export const modifyPwdBySelf = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/authserver/user/modifyPwdBySelf`);
    const res = await axios.post(`${options.host}/authserver/user/modifyPwdBySelf`, {
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
 * 修改用户信息
 * @param {Object} params 添加参数
 *    - userId  用户名(学工号)       - userName  用户姓名                 - categoryCode  身份分类     - deptCode 所在部门
 *    - sexCode 性别               - identifyTypeId 身份证件类型 代码     - identityCode 证件号码     - phone 手机号
 *    - email 邮箱                 - speciality 专业                    - enterSchoolDate 入校年份/当前所在级
 *    - leaveSchTime 离校时间       - admissionLetter 录取通知书号        - className 班级
 *    - activateNow 是否立即激活1 是，0 否，默认 0    - initPwd 初始用户密码，使用AES+Base64编码
 *    - accountStatus 帐号状态      - lifeCycle 生命周期到期时间           - activeStatus 激活状态 0：未激活，1：已激活
 * @param {Object} options 环境选项
 * @returns
 */
export const modify = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options);
    debug(`${options.host}/minos-platform/user/modify`);
    const res = await axios.post(`${options.host}/minos-platform/user/modify`, {
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
 * 查询用户认证日志
 * @param {String} userId 用户名(学工号)
 * @param {Object} options 环境选项
 * @returns
 */
export const loginLog = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    // 签名需要token
    params.token = accessToken;
    params = getSignObject(params)
    debug(`${options.host}/minos-manager/internal/user/queryUserLoginLog`)
    const res = await axios.post(`${options.host}/minos-manager/internal/user/queryUserLoginLog`, {
        ...params,
    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
            "content-type": 'application/x-www-form-urlencoded',
        },
    });
    return res.data;
}

/**
 * 删除用户照片
 * @param {String} params 用户名(学工号)
 *   - userId       用户名(学工号)
 *   - imageType    照片类型 1 人脸，3证件照，默认为人脸
 * @param {Object} options 环境选项
 * @returns
 */
export const delUserFace = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    debug(`${options.host}/minos-platform/user/delUserFace`)
    const res = await axios.post(`${options.host}/minos-platform/user/delUserFace`, {
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
 * 查询用户照片
 * @param {String} params 用户名(学工号)
 *   - userId       用户名(学工号)
 *   - imageType    照片类型 1 人脸，3证件照，默认为人脸
 * @param {Object} options 环境选项
 * @returns
 */
export const getUserFace = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    debug(`${options.host}/minos-platform/user/getUserFace`)
    const res = await axios.post(`${options.host}/minos-platform/user/getUserFace`, {
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
 * 增加和修改照片
 * @param {String} params 用户名(学工号)
 *    - userId       用户名(学工号)
 *    - file         人脸照片不超过4M,长宽均大于500px,支持jpg/jpeg格式；头像不超过2M，长宽均小于100px,支持jpg/png格式；证件照不超过1M，支持jpg/png格式图片
 *    - imageType    1 人脸，2头像，3证件照，默认为人脸
 * @param {Object} options 环境选项
 * @returns
 */
export const addOrUpdateFace = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    // 创建一个formData对象
    const formData = new FormData();
    // Object对象转formData对象
    const paramKeys = Object.keys(params);
    paramKeys.map(key => {
        formData.append(key, params[key])
    })
    debug(`${options.host}/minos-platform/user/addOrUpdateFace`)
    const res = await axios.post(`${options.host}/minos-platform/user/addOrUpdateFace`,
        formData
    ,{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 校内机构查询
 * @param {String} params 用户名(学工号)
 *   - userId       用户名(学工号)
 *   - imageType    照片类型 1 人脸，3证件照，默认为人脸
 * @param {Object} options 环境选项
 * @returns
 */
export const orgSearch = async (options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    debug(`${options.host}/minos-platform/user/getUserFace`)
    const res = await axios.post(`${options.host}/minos-platform/user/getUserFace`, {

    },{
        headers: {
            appId: options.appId,
            accessToken: accessToken,
        },
    });
    return res.data;
}

/**
 * 身份分类查询
 * @param {String} params 用户名(学工号)
 *   - name       身份分类名称
 * @param {Object} options 环境选项
 * @returns
 */
export const categorySearch = async (params, options = {}) => {
    options.host = options.host || process.env.IDS_HOST;
    options.appId = options.appId || process.env.IDS_APPID;
    const accessToken = await getToken(options)
    debug(`${options.host}/minos-platform/category/search`)
    const res = await axios.post(`${options.host}/minos-platform/category/search`, {
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
    detail,
    add,
    modify,
    modifyPwdByManager,
    modifyPwdBySelf,
    loginLog,
    addOrUpdateFace,
    delUserFace,
    getUserFace,
    orgSearch,
    categorySearch,
};
