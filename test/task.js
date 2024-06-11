/* eslint-disable no-undef */
import process from 'node:process';
import assert from 'assert';
import {Task} from '../src/index.js';
import fs from 'fs'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const { IDS_HOST, IDS_APPID, IDS_SECRET } = process.env;

assert.ok(IDS_HOST);
assert.ok(IDS_APPID)
assert.ok(IDS_SECRET)

// @ts-ignore
describe('待办中心', function() {

  // todo 待测试
  it('推送/更新任务（申请）', async () => {
    const params = {

    }
    // params.insertModel = [{
    //     taskId: "",
    //     subject: "测试",
    //     priority: 3,
    //     taskType: 3,
    //     initiatorType: 1,
    //     initiatorId: "",
    //     processors: [
    //         {
    //             processorType: 1,
    //             processorId: "",
    //             objectScope: 1
    //         }
    //     ],
    // }]
    // params.updateModel = {}
    // params.updateModel.taskModels = [{
    //     taskId: "",
    //     processorId: "",
    //     status: "COMPLETE",
    // }]
    const res = await Task.saveOrUpdate(params,{ IDS_HOST, IDS_APPID, IDS_SECRET });
    assert.equal(res.errcode, 0)
  });
});