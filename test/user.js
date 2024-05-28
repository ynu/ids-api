/* eslint-disable no-undef */
import process from 'node:process';
import assert from 'assert';
import {User} from '../src/index.js';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const { IDS_HOST, IDS_APPID, IDS_SECRET } = process.env;

assert.ok(IDS_HOST);
assert.ok(IDS_APPID)
assert.ok(IDS_SECRET)

// @ts-ignore
describe('User用户管理', function() {

  it('查询用户信息', async () => {
    const userId = "3140010037"
    const res = await User.detail(userId,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
});