/**
 * author: Shepherd.Lee
 * Date: 2019-09-09
 * version: 2.0.0
 * info: 学习活动相关
 */

const TASKTYPE = [
    {  "task": "dbl"  ,    "name": "基于设计的学习"  }, 
    {  "task": "ibl"  ,    "name": "基于探究的学习"  },
    {  "task": "pbl"  ,    "name": "基于问题的学习"  }, 
    {  "task": "kc"   ,    "name": "知识建构"        }, 
    {  "task": "user" ,    "name": "自定义"          }
];//任务类型名 - 对应php/json

var TASKS, TASKZONE, INIT, 
    DATA,  // 与任务环节相关的数据
    ZONE;   // 学习活动整个区域的Zones对象


$(function(){
    _hello("design");
    INIT = new Init();
    TASKS = new Task(); 
    TASKZONE = new TaskZone();

    initToggles();//切换菜单的效果 - 见design-animation.js
});


    