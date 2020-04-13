/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 03:04:32 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-28 14:37:47
 */

import { common as $$ } from "../../common/common";
import ActivityNode from "./activitynode";
import { editInfo } from "../handlers/activity.common";
import { ACTIVITYTYPE } from "../activity.data";
import { DATA } from "../../saveload/saveload";


export default class ActivityZone{
    constructor(tasknode, index, parentIndex = -1){
        this.tasknode = tasknode;
        this.index = index;
        this.parentIndex = parentIndex;
        this.nodelist = []; //该区域包含的学习活动的对象

        let $target = $("#design-activities-zone");
        //对应的zone区域的jQuery引用
        this.$div = (parentIndex == -1) ?
            $target.find(".design-act-zone").eq(index):
            $target.find(".design-act-zone").eq(parentIndex)
                .next(".subZones")
                .find(".design-act-subZone").eq(index);
        this.$number = this.$div.find(".activity-number");
        this.$init = this.$div.find(".init-act");
        this.$content = this.$div.find(".design-act-zone-content");
    }
    /**
     * 添加学习活动节点，包括新建与插入
     * 
     * @param {Object} activityInfo type/activityname 
     * @param {String} action init/load/before/after 
     * @param {Number} index = -1
     */
    addActivity(activityInfo, action = "load", index = -1){
        let 
        type = activityInfo.type,
        typename = this.activityTypeMap(type),
        $target = ~index && this.$content.find(".design-act-node-wrapper").eq(index),
        str = `
        <div class="design-act-node-wrapper" 
            data-index="${this.index}" data-parent="${this.parentIndex}">
            <span class="glyphicon glyphicon-triangle-top insert-node"
                title="向前添加新活动节点" data-type="before"></span>
            <div class="panel panel-default design-act-node" data-typename="${typename}">
                <div class="panel-heading">
                    <img src="image/activities/${type}-icon.png" 
                        class="pull-left design-act-node-icon" title="${typename}">
                    <h3 class="panel-title">
                        <b>${typename}</b></h3>
                    <span class="glyphicon glyphicon-remove pull-right remove-node" 
                        title="删除活动节点"></span>
                </div>
                <div class="panel-body design-act-node-content">
                    <div class="col-sm-12 panel-content">
                        <label class="design-activity-name">${activityInfo.activityname}</label>
                        <button class="btn btn-danger edit-activity-btn pull-right">
                            编辑
                            <span class="glyphicon glyphicon-edit"></span>
                        </button>
                    </div>
                    <br />
                    <div class="menu-box"></div>
                </div>
            </div>
            <span class="glyphicon glyphicon-triangle-bottom insert-node"
                title="向后添加新活动节点" data-type="after"></span>
        </div>
        `.trim();

        let $node = $(str),
            node = new ActivityNode(type, $node, action !== "load");
        switch(action){
            case "init"://新建学习活动
                this.$content.append($node);
                this.nodelist.push(node);
                break;
            case "load"://load时候加载学习活动
                this.$content.append($node);
                this.nodelist.push(node);
                break;
            case "before"://在index之前插入
                $target.before($node);
                this.nodelist.splice(index, 0, node);
                break;
            case "after"://在index之后插入
                $target.after($node);
                this.nodelist.splice(index + 1, 0, node);
                break;
        }
        node.zone = this;
        this.changeActivityNum(1);
    }
    /**
     * 删除某个活动节点
     * 
     * @param {Number} index
     */
    deleteActivity(index){
        this.$content.find(".design-act-node-wrapper").eq(index).remove();
        this.nodelist.splice(index, 1);
        this.changeActivityNum(-1);
    }
    /**
     * 修改右上角区域显示的节点数，将已有值与传入的参数值相加
     * 
     * @param {Number} delta 节点数的修改量
     */
    changeActivityNum(delta){
        let number = +this.$number.html() + delta;
        if(number == 0){
            $$.show(this.$init);
        }else if(number == 1){
            $$.hide(this.$init);
        }
        this.$number.html(number);
    }

    /**
     * 返回所辖的活动数据
     */
    get data(){
        let data = {
            nodename: this.tasknode.nodename,
            activities: []
        };

        this.nodelist.forEach(node => {
            data["activities"].push(node.nodedata);
        });

        return data;
    }
    /**
     * 区域所辖学习证据内容
     * 
     * @returns {Array} [evidences_nowInfo, evidences, evidences_selected]
     */
    get evidences(){
        let index = this.index, 
            parent = this.parentIndex,
            evidences = (!~parent)?
                (DATA.nodes)[index].taskevidence :
                ((DATA.nodes)[parent]).next
                    .nodes[index].taskevidence;
        if($$.isundef(evidences) || evidences === "") evidences = [];

        let evidences_selected = [],
            evidences_nowInfo = {
                activityname: editInfo.nownode.activityname,
                evidences: []
            },
            evidences_selectedInfo = [];
        for(let node of this.nodelist){
            let nodeEvidence = node.evidences;
            if(!nodeEvidence.length) continue;

            evidences_selected = evidences_selected.concat(nodeEvidence);
            if(node.activityname === editInfo.nownode.activityname){
                evidences_nowInfo.evidences = nodeEvidence;
            }else{
                evidences_selectedInfo.push({
                    id: node.id,
                    activityname: node.activityname,
                    evidences: nodeEvidence 
                });
            }
        }
        evidences = evidences.filter(evidence => {
            let flag = false;
            for(let evi of evidences_selected){
                if(evi.content === evidence.content && 
                    evi.evaluate === evidence.evaluate){
                    flag = true;
                    break;
                }
            }
            return !flag;
        });

        return [
            //当前学习证据
            evidences_nowInfo,
            //可选学习证据
            evidences,
            //已选学习证据
            evidences_selectedInfo
        ];
    }

    /**
     * 保存修改后的学习证据
     * 
     * @param {Array} 修改后该区域下的学习证据
     */
    set evidences(evidences_after){
        for(let {id, evidences} of evidences_after){
            for(let node of this.nodelist){
                if(node.id !== id) continue;
                node.evidences = evidences;
                node.nodedata.common.evidence = evidences;
                break;
            }
        }
    }

}

Object.assign(ActivityZone.prototype, {
    /**
     * type(pyramid)与typename(金字塔)的双向映射
     * 
     * @param {String} key 
     */
    activityTypeMap(key){
        if(typeof this.activityTypeMap.map != "object"){
            let map = new Map();
            for(let activity of ACTIVITYTYPE){
                map.set(activity.type, activity.typename);
                map.set(activity.typename, activity.type);
            }
            this.activityTypeMap.map = map;
        }
        return this.activityTypeMap.map.get(key);
    }
})