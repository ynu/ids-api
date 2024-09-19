/* eslint-disable no-undef */
import process from 'node:process';
import assert from 'assert';
import {ServiceItem} from '../src/index.js';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const { IDS_HOST, IDS_APPID, IDS_SECRET } = process.env;

assert.ok(IDS_HOST);
assert.ok(IDS_APPID)
assert.ok(IDS_SECRET)

// @ts-ignore
describe('服务事项', function() {

  it('查询服务事项配置信息', async () => {
    const res = await ServiceItem.getConfigs({ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询事项详情列表', async () => {
    const params = {
    }
    const res = await ServiceItem.getItemDetailList(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  // todo 待测试
  it('保存服务事项', async () => {
    const params = {
        fieldValues: [],
        linkedServices: [],
        isShow: 1,
    }
    const res = await ServiceItem.saveServiceItem(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询事项统计', async () => {
    const res = await ServiceItem.count({ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  it('查询事项有效数据字段列表', async () => {
    const params = {
    }
    const res = await ServiceItem.querySimItemFields(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  it('查询事项简要信息', async () => {
    const params = {
      pageSize: 100,
      pageNumber: 1,
    }
    const res = await ServiceItem.querySimBriefInfo(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询事项指定信息', async () => {
    const params = {
      pageSize: 100,
      pageNumber: 1,
    }
    const res = await ServiceItem.querySimPartInfo(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('查询指定事项全部信息', async () => {
    const params = {
      serviceItemWid: "",
    }
    const res = await ServiceItem.simSelectByIdPost(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  it('一件事列表', async () => {
    const params = {
      pageSize: 100,
      pageNumber: 0,
    }
    const res = await ServiceItem.queryOneThings(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });

  it('一件事详情', async () => {
    const params = {
      wid: "",
    }
    const res = await ServiceItem.queryOneThingsDetail(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  it('查询用户授权事项', async () => {
    const params = {
      "pageNumber": 1,
      "pageSize": 10,
      "langCountry": "zh_CN",
      "userAccount": "",
      "objectScope":1
    }
    const res = await ServiceItem.querySimInfoForRole(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  it('查询事项授权信息接口', async () => {
    const params = {
      "pageNumber": 1,
      "pageSize": 10,
      "itemIds": ["1111111","11111"],
      "timestamp": 1662358311000
    }
    const res = await ServiceItem.querySimRoleInfo(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
  it('查询事项授权信息接口', async () => {
    const params = {
      "pageNumber": 1,
      "pageSize": 10,
      "itemIds": ["1111111","11111"],
      "timestamp": 1662358311000
    }
    const res = await ServiceItem.queryItemAppraise(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
});