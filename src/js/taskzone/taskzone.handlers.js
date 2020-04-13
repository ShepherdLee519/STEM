/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 04:37:16 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 03:48:58
 */

/*
 * ./js/taskzone/taskzone.handler.js
 * 
 * 学习评价部分的事件处理在此集中并异步调用
 */

import { common as $$ } from '../common/common';
import taskZoneHandler from './handlers/taskzone.tasknode';
import editTaskHandler from './handlers/taskzone.edit';
import addSubNodeHandler from './handlers/taskzone.subnode';
 
export { selectModal } from './handlers/taskzone.model';


;(function init() {
    $$.multistep([
        taskZoneHandler,
        editTaskHandler,
        addSubNodeHandler,
    ]);
})();