$(function(){
    ActivityHandlerModule.init();
    
    // initActivityEvidenceHandler();
    // initActivityMaterialHandler();
});


class ActivityZones{
    constructor(tasks){
        this.zones = [];//ActivityZone对象的数组
        this.len   = 0;//zones中的ActivityZone的个数，subZone保存在zones[len][]处
        this.$div  = $("#design-activities-zone");

        //初始化学习活动区域的各个zone
        this.initZones(tasks.tasktype, tasks.nodes);
    }

    /**
     * 根据tasknodes初始化区域
     * 
     * @param {String} tasktype
     * @param {Array<Object>} nodes
     */
    initZones(tasktype, nodes){
        this.addZones(tasktype, nodes);
        nodes.forEach((tasknode, index) => {
            let newzone = new ActivityZone(tasknode, index);
            this.zones.push(newzone);
        });
        
        //zones的最后一个元素是一个空数组，预留来存储每个zone对应的subZone
        this.len = this.zones.length;
        this.zones.push([]);
        for(let i = 0; i < this.len; i++){
            this.zones[this.len].push([]);
        }
    }
    /**
     * 初始化subZones区域
     * 
     * @param {String} tasktype 
     * @param {Array<Object>} subnodes 
     * @param {Number} parentIndex 
     */
    initSubZones(tasktype, subnodes, parentIndex){
        this.addZones(tasktype, subnodes, parentIndex);
        subnodes.forEach((tasknode, index) => {
            let newzone = new ActivityZone(tasknode, index, parentIndex);
            this.zones[this.len][parentIndex].push(newzone);
        });
    }
    /**
     * 根据parentIndex 选择是普通zone还是subzone\
     * 对于subzone还要sub化以及对父zone添加mark
     * 
     * @param {String} tasktype
     * @param {Array<Object>} nodes
     * @param {Number} parentIndex = -1
     */
    addZones(tasktype, nodes, parentIndex = -1){
        let str = "";
        nodes.forEach((tasknode, index) => {
            str += (!~parentIndex) ?
                `<div class="panel panel-info design-act-zone" 
                    data-index="${index}" data-parent="-1">` :
                `<div class="panel panel-warning design-act-subZone" 
                    data-index="${index}" data-parent="${parentIndex}">`;
            str += `
            <div class="panel-heading">
                <h3 class="panel-title design-act-zone-title">
                    <img src="image/nodes/${tasktype}/${tasknode.imgsrc}" 
                        class="pull-left design-act-zone-icon" />
                    <span>${tasknode.nodename}</span> - 学习活动
                    <span class="badge pull-right activity-number">0</span>
                </h3>
            </div>
            <div class="panel-body design-act-zone-content">
                <div class="init-act">
                    <button class="btn btn-default">新建活动</button>
                </div>
            </div>
            <div class="design-act-zone-hassub hidden">
                <span class="glyphicon glyphicon-chevron-down"></span>
            </div>
            <div class="menu-box"></div>
            </div>
            `.trim();
        });
        if(!~parentIndex){
            this.$div.append(str);
        }else{
            let $target = this.$div.children(".design-act-zone").eq(parentIndex);
            _show($target.find(".design-act-zone-hassub"));
            $target.after('<div class="subZones"></div>');
            $target.next().append(str);
        }
    }   
    /**
     * 目前只可能一次删除多个zone块(且是subzones)\
     * 参数为parentIndex 值-1 清空(重置)
     * 
     * @param {Number} parentIndex = -1
     */
    deleteZones(parentIndex = -1){
        if(!~parentIndex){
            this.$div.html("");
            return;
        }
        let $target = this.$div.children(".design-act-zone").eq(parentIndex);
        _hide($target.find(".design-act-zone-hassub"));
        $target.next(".subZones").remove();
        //从zones中删除对应ActivityZone节点
        this.zones[this.len][parentIndex] = [];
    }

    /**
     * 返回activity区域整理好的所有数据
     */
    get data(){
        let activityData = [];
        for(let i = 0; i < this.len; i++){
            activityData.push(this.zones[i].data);
        }

        let subActivityData = [],
            subzones = this.zones[this.len];
        for(let i = 0; i < this.len; i++){
            subActivityData.push({
                index: i,
                nodes: []
            });
            if(subzones[i].length){
                subzones[i].forEach(subzone => {
                    subActivityData[i].nodes.push(subzone.data)
                });
            }
        }

        return {
            prime   : activityData,
            sub     : subActivityData
        };
    }
}