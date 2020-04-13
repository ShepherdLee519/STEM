/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-19 03:35:05 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 02:10:31
 */

/*
 * ./js/taskzone/taskzone.data.js
 * 
 * 学习评价区域的任务节点相关的结构数据
 */

import dblData from '../../datas/design/dbl.json';
import iblData from '../../datas/design/ibl.json';
import kcData from '../../datas/design/kc.json';
import pblData from '../../datas/design/pbl.json';


// 保存不同类型任务节点的结构数据的字典
const taskDataMap = new Map()
    .set('dbl', dblData)
    .set('ibl', iblData)
    .set('kc', kcData)
    .set('pbl', pblData);

const taskDataProxy = new Proxy(taskDataMap, {
    get(target, key) {
        key = key.toLowerCase();
        return target.get(key);
    }
});
export { taskDataProxy as taskData };


/**
 * @constant
 * 任务类型与任务名的对象数组
 */
export const TASKTYPE = [
    {  "task": "dbl"  ,    "name": "基于设计的学习"  }, 
    {  "task": "ibl"  ,    "name": "基于探究的学习"  },
    {  "task": "pbl"  ,    "name": "基于问题的学习"  }, 
    {  "task": "kc"   ,    "name": "知识建构"        }
];