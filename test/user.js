/* eslint-disable no-undef */
import process from 'node:process';
import assert from 'assert';
import {User} from '../src/index.js';
import fs from 'fs'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const { IDS_HOST, IDS_APPID, IDS_SECRET } = process.env;

assert.ok(IDS_HOST);
assert.ok(IDS_APPID)
assert.ok(IDS_SECRET)

// @ts-ignore
describe('User用户管理', function() {

  // todo 待测试
  it('添加用户', async () => {
    const params = {
      "userId": "",
      "userName": "用户姓名",
      "categoryCode": "身份分类",
    }
    const res = await User.add(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('修改用户信息', async () => {
    const params = {
      "userId": "test_teacher",
      "userName": "test_teacher",
      // "categoryCode": "9000001",
    }
    const res = await User.modify(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  // todo 待测试
  it('管理员修改密码', async () => {
    const params = {
      "userId": "",
      "userPwd": "",
      "needModifyPwd": "",
    }
    const res = await User.modifyPwdByManager(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  // todo 待测试
  it('用户修改密码', async () => {
    const params = {
      "userId": "",
      "userNewPwd": "",
      "userOldPwd": "",
    }
    const res = await User.modifyPwdBySelf(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询用户信息', async () => {
    const userId = ""
    const res = await User.detail(userId,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询用户认证日志', async () => {
    const params = {
      uid:"test_teacher",
      loginRst:"1",
      pageSize:"5",
      pageNumber:"1",
      randomStr:"randomStr",
      timeStamp:1658300851
    }
    const res = await User.loginLog(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('增加和修改照片', async () => {
    const params = {
      userId: "test_teacher",
      imageType: "3",
      // 创建一个文件流
      file: fs.createReadStream('C:\\\\Users\\\\MSI-NB\\\\Desktop\\\\图片素材\\\\511de01cb1f1712e2f18abbfa06bd8cd1a84c77bb0d66e6602aef61b6dd1d86c.jpg')
    }
    const res = await User.addOrUpdateFace(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('删除用户照片', async () => {
    const params = {
      userId: "test_teacher",
      imageType: "3",
    }
    const res = await User.delUserFace(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询用户照片', async () => {
    const params = {
      userId: "test_teacher",
      // imageType: "3",
    }
    const res = await User.getUserFace(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('校内机构查询', async () => {
    const res = await User.orgSearch({ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('身份分类查询', async () => {
    const res = await User.categorySearch({name:'长期往来人员'},{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
});