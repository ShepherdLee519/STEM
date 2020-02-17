
/**
 * 全局 当前正在编辑的NODE对象的引用
 * 
 * @global
 */
var NODE = null;
/**
 * 当前正在编辑的type
 * 
 * @global
 */
var edit_type_now  = null;
/**
 * 当前操作的edit区域引用
 * 
 * @global
 */
var $edit_zone_now = null;


class ActivityNode{
    static id = 0;

    constructor(type, $node, init = true){
        this.nodedata = null;
        this.type = type;
        this.$node = $node;
        this.zone = null;
        this.evidences = [];
        this.id = ++ActivityNode.id;
        init && this.init();
    }
    init(){
        let that = this;
        _run(function *(){
            let url = `./datas/activity/${that.type}.json`;
            that.nodedata = yield _request({url: url}, false);
            that.nodedata["activity"]["name"] = that.$node.find(".design-activity-name").html();
        });
    }

    set data(data){
        this.nodedata = data;
        this.evidences = data.common.evidence;
    }
    get activityname(){
        return this.$node.find(".design-activity-name").html();
    }

    /****************************************** */

    // getEvidence(){
    //     return this.zone.getEvidence();
    // }
    saveData(data){
        this.nodedata = data;
        this.$node.find(".design-activity-name").html(data["activity"]["name"]);
        this.evidences = data.common.evidence;
    }
}