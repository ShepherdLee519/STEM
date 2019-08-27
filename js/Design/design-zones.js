/*
 * author: Shepherd.Lee
 * Date: 2019 - 08 - 27
 * version: 2.2.0
 * info: 学习活动相关
 * index:
 *      Zones() 
 *          > getZones()
 *          > getSubZones()
 * 
 *          > addSubActivity()
 *          > deleteSubActivity()
 *          > clear()
 */


$(function(){
    _hello("design-zones");
});

/**
 * 表示整个学习活动区域的对象
 * 通过一个来自学习模型的tasknodes数组来初始化
 * 拥有一个zones数组，拥有每个zone的引用
 * @param {Array<Object>} tasknodes 
 */
function Zones(tasknodes){
    let zones   = [],  //zone对象的数组，保留了zones管辖的所有zone
        zoneNum = 0,   //zones中的zone的长度，subZone存在zones[zoneNum][]处
        that    = this,//Zones自身的this的备份
        $div    = $("#design-activities-zone");

    [...tasknodes].forEach((tasknode) => {
        let newzone = new Zone(tasknode);
        zones.push(newzone);
        $div.append(newzone.self());
    });

    //zones的最后一个元素是一个空数组，预留来存储每个zone对应的sub-zone
    zoneNum = zones.length;
    zones.push([]);
    for(let i = 0; i < zoneNum; i++) 
        zones[zoneNum].push([]);
    

    /*-----------------------------------------------------------//
     * Zones对外可见的方法
     * --------------------------------
     * getZones - 返回自身的zones变量 包含每个zone的引用
     * getSubZones - 返回自身的zones变量中最后一个元素即subZones
     * 
     * addSubActivity - 添加子活动的，初始化子活动的Zone
     * deleteSubActivity - 删除某个子活动
     * clear - 清空Zone区域
     */
    //-----------------------------------------------------------//
    /**
     * 返回自身拥有的zones数组
     * @returns {Array<Object>}
     */
    this.getZones = () => zones;
    /**
     * 获取zones中的最后一个元素，默认返回整个subZones数组
     * 或者返回第index个子数组
     * @param {Number} index -default -1 表示全部
     * @returns {Array<Object>} 返回subZones数组(全部或部分)
     */
    this.getSubZones = (index = -1) => {
        if(index >= zoneNum || index < 0){
            return zones[zoneNum];
        }else{
            return zones[zoneNum][index];
        }
    };
    /**
     * 对subtasknodes中的每个subtasknode新建一个zone
     * 并修改zones
     * @param {Number} index
     * @param {Array<Object>} subtasknodes
     */
    this.addSubActivity = (index, subtasknodes) => {
        log(index);
        let $target = $div.children(".design-act-zone").eq(index);
            subzones = that.getSubZones(index);

        $target.after(`<div class="subZones"></div>`);
        $target = $target.next();

        [...subtasknodes].forEach((subtasknode) => {
            let newzone = new Zone(subtasknode);
            newzone.toSub(index);
            $target.append(newzone.self());
            subzones.push(newzone);
        });
        zones[index].mark();
    };
    /**
     * 删除第i个子区域后，修改zones数组
     * @param {Number} index
     */
    this.deleteSubActivity = (index) => {
        let $subzone = $div.children(".design-act-zone").eq(index).next();
        zones[index].demark();
        zones[zoneNum][index] = [];
        $subzone.remove();
    };
    /**
     * 重置zones区域 清空zones数组
     */
    this.clear = () => {
        that.zones = [];
        $div.html("");
    };
}