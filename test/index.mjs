import assert from 'assert';
import cache from 'memory-cache';
import { idsUserById, ids_grouped_users, ids_get_mobile_phone } from '../index.mjs';

const { ESOP_APPID, ESOP_TOKEN, TEST_USER_ID, TEST_USER_PHONE } = process.env;
const options = {
  appid: ESOP_APPID,
  accessToken: ESOP_TOKEN,
}

describe('ids-api 测试', function() {
  after(() => cache.clear());
  this.timeout(100000);
  it('idsUserById', async () => {
    const res = await idsUserById(TEST_USER_ID, options);
    assert.equal(res.USERID, TEST_USER_ID);
  });

  it('ids_grouped_users', async () => {
    const res = await ids_grouped_users(TEST_USER_ID, options);
    assert.ok(res);
  });
  it('ids_get_mobile_phone', async () => {
    const res = await ids_get_mobile_phone(TEST_USER_ID, options);
    assert.equal(res, TEST_USER_PHONE);
  });
});
