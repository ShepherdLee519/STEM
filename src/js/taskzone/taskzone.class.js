/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 02:59:30 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 03:32:04
 */

/*
 * ./js/taskzone/taskzone.class.js
 * 
 * 学习评价区域管理的类对象定义
 */

import { common as $$ } from '../common/common';
import { taskData, TASKTYPE } from './taskzone.data';
import './taskzone.handlers';
import { DATA } from '../saveload/saveload';
import ActivityZones, { ACTIVITYZONE } from '../activity/activity';


$$.hello('taskzone/taskzone.class');

/**
 * 学习评价区域的类\
 * 负责添加/显示task节点(含子节点)
 */
class TaskZone {
    constructor() {
        // TaskZone为单例 - 实例对象最终保存在TASKZONE
        if (typeof TaskZone.instance == 'object') {
            return TaskZone.instance;
        }

        /**
         * @typedef {Object} TaskInfo
         * @property {Object} $div div.taskZone的jQuery对象
         * @property {Number} index 该节点在其父taskZone下的序号(0开始)
         * @property {Boolean} isSubNode 是否为子任务的节点
         * @property {Number} parentIndex -1或父节点在其taskZone中的序号
         * @property {String} nodename 任务节点名 
         */
        /**
         * 对应的学习评价区域的节点容器的jquery引用
         * 
         * @type {Object}
         */
        this.$taskZone = $('#design-tasksZone');
        /**
         * {index: taskInfo} 存储主任务节点的taskInfo
         * 
         * @type {Map<Number, TaskInfo>}
         */
        this._taskInfoMap = new Map();
        /**
         * {parentIndex: {index: taskInfo}} \
         * 存储子任务节点的taskInfo
         * 
         * @type {Map<Number, Map<Number, TaskInfo>>}
         */
        this._subTaskInfoMap = new Map();
        
        // 新建的实例保存 -> 单例模式
        TaskZone.instance = this;
        return this;
    } // constructor

    /**
     * 保存taskInfo - 封装了主/子task的taskInfo保存
     * 
     * @param {TaskInfo} taskInfo 
     */
    setTaskInfo(taskInfo) {
        if ( !taskInfo.isSubNode ) {
            this._taskInfoMap.set(
                taskInfo.index,
                taskInfo
            );
        } else {
            const { parentIndex, index } = taskInfo;
            if ( $$.isundef(this._subTaskInfoMap.get(parentIndex)) ) {
                this._subTaskInfoMap.set(parentIndex, new Map());
            }
            this._subTaskInfoMap
                .get(parentIndex)
                .set(index, taskInfo);
        }
    }
    /**
     * 获取taskInfo - 封装了主/子task的taskInfo获取
     * 
     * @param {Number} index 
     * @param {Number} parentIndex = -1
     * @returns {TaskInfo}
     */
    getTaskInfo(index, parentIndex = -1) {
        return ( ~parentIndex ) ?
            this._subTaskInfoMap.get(parentIndex).get(index) :
            this._taskInfoMap.get(index);
    }
    /**
     * 获取指定的taskZone区域的jquery对象 默认是第一个(主任务节点容器)
     * 
     * @param {Number} parentIndex = -1
     * @returns {Object} 对应的.taskZone的jquery对象
     */
    getTaskZone(parentIndex = -1) {
        return ( ~parentIndex ) ?
            this.$taskZone.find('#subTaskZone-' + parentIndex):
            this.$taskZone.find('.taskZone').first();
    }
    /**
     * 获取指定index/parentIndex的node的jQuery对象
     * 
     * @param {Number} index 
     * @param {Number} parentIndex = -1 
     * @returns {Object} 对应的.node的jquery对象
     */
    getTaskNode(index, parentIndex = -1) {
        return this.getTaskZone(parentIndex)
            .find('.node').eq(index);
    }

    /**
     * 初始化 新建模式的选择面板\
     * 目前只在增加二级节点选择学习模式的时候会调用
     * 
     * @param {Object} $body 选择面板的容器的引用\
     *      - $body : $("#design-initSubTaskZone .panel-body")
     */
    initTaskPanel($body){
        if ( $$.isundef(this.initTaskPanel.panel) ) {
            let str = '';

            // 在$body下建立新建面板 - 用在新建子节点时候
            TASKTYPE.forEach(value => {
                str += `
                <div class='radio'><label>
                    ${$$.space(4)}
                    <input type='radio' name='design-taskSelect' 
                        value = ${value.task} />
                    ${value.name}
                </label></div>
                `.trim();
            }); // 初始化radio选项
            
            str += `
            <div class='btn-group pull-right'>
                <button id="confirmAddSubTask" class='btn btn-warning'>确定</button>
                <button id="cancelAddSubTask" class='btn btn-default'>取消</button>
            </div>
            `.trim(); // 在选项末补上确定/取消按钮

            this.initTaskPanel.panel = str;
        }

        $body.append(this.initTaskPanel.panel);
    } // initTaskPanel
    /**
     * 选择学习模式后触发，加载指定模式的数据进行初始化\
     * 调用于selectModel与initSubTaskNodes
     * 
     * @param {Object} $div 新建节点的父容器jQuery对象 .taskZone
     * @param {String} tasktype 新建学习模式的模式类型
     * @param {Number} parentIndex 指向所属的一级节点的index，默认-1
     */
    initTaskNodes($div, tasktype, parentIndex = -1) {
        const data = taskData[tasktype];
        
        if ( !~parentIndex ) { // 一级节点
            DATA.self = data; // 数据绑定至全局
            const activityZones = new ActivityZones(DATA);
            ACTIVITYZONE.self = activityZones; // 初始化学习活动面板
        } else { // 二级子节点
            [...data.nodes].forEach(node => node.level = 2);
            DATA.nodes[parentIndex].next = data;
            ACTIVITYZONE.initSubZones(tasktype, data.nodes, parentIndex);
        }
        
        this.addTaskNode($div, data, parentIndex);
    }
    /**
     * 选择子学习模式时候调用，为二级节点准备容器 .subTaskZone
     * 
     * @param {String} type 子节点所属的模式类型 eg.DBL
     * @param {Number} parentIndex 所属一级节点的序号
     * @param {Boolean} loading = false 表明是否是load-data调用的
     */
    initSubTaskNodes(type, parentIndex, loading = false) {
        const $clone = this.getTaskZone().clone(true);
        
        $clone.children("div").remove(); // 清空容器
        $clone // 调整样式属性
            .attr('id', `subTaskZone-${parentIndex}`)
            .attr('data-parent', parentIndex)
            .addClass('subTaskZone');
        $clone.appendTo(this.$taskZone);

        loading || this.getTaskZone().removeClass('first-level');
        loading && $$.hide($clone);
        $clone.removeClass('first-level');
        this.initTaskNodes($clone, type, parentIndex);
    }
    /**
     * 新建task节点
     * 
     * @param {Object} $div 节点父容器的引用 .taskZone
     * @param {Object} data 学习模式的数据，需要借助其中的nodes与imagepath
     * @param {Number} parentIndex 二级节点对应的父节点的序号 -1表示非二级节点
     */
    addTaskNode($div, data, parentIndex) {
        /**
         * nodes格式参考
         * "nodes":
         *     "nodename" - "imgsrc" - "taskname"
         *     "taskcontent" - "level" - "next"
         */
        const nodes       = data.nodes;
        const imagePath   = data.imagepath;
        let str = '';

        nodes.forEach( (node, index) => {
            // 显示基本的节点
            str += `
            <div class='node ${ (~parentIndex) ? 'subnode' : '' }'>
                <div class="node-content node-wrap">
                    <p class='nodename'>${node.nodename}</p>
                    <div class="img-zone">
                        <img title='点击以编辑/查看' src="${imagePath}${node.imgsrc}">
                    </div>
                </div>
                <span class='glyphicon glyphicon-chevron-down'
                    title="点击添加子模式"></span>
            </div>
            `.trim();
            
            this.setTaskInfo({
                $div: $div, 
                index: index,
                isSubNode   : parentIndex != -1, 
                parentIndex : parentIndex,
                nodename: node.nodename
            });
        });

        $div.append(str);
        (~parentIndex) && 
        this.getTaskNode(parentIndex).find('span.glyphicon')
            .addClass('hasSubNode');
    } // addTaskNode
}


// 初始化任务区域的对象并保存在TASKZONE中导出
let TASKZONE = new TaskZone();
let taskzoneProxy = $$.proxy(TASKZONE);
export { taskzoneProxy as TASKZONE };