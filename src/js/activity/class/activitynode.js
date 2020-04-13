/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 03:06:47 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 13:36:32
 */

import { activityDataMap } from "../activity.data";

let activityNodeId = 0;//每个活动节点的唯一标识符

export default class ActivityNode{
    constructor(type, $node, init = true){
        this.nodedata = null;
        this.type = type;
        this.$node = $node;
        this.zone = null;
        this.evidences = [];
        this.id = ++activityNodeId;
        init && this.init();
    }
    init(){
        this.nodedata = activityDataMap.get(this.type);
        this.nodedata["activity"]["name"] = this.$node.find(".design-activity-name").html();
    }

    set data(data){
        this.nodedata = data;
        this.evidences = data.common.evidence;
    }
    get activityname(){
        return this.$node.find(".design-activity-name").html();
    }

    saveData(data){
        this.nodedata = data;
        this.$node.find(".design-activity-name").html(data["activity"]["name"]);
        this.evidences = data.common.evidence;
    }
}