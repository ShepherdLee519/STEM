/*
 * author: Shepherd.Lee
 * Date: 2019 - 08 - 27
 * info: 学习活动相关
 * index:
 *      Node()
 *          > self()
 *          > bindZone()
 * 
 *          > resetToggle()
 * 
 *          > saveData()
 *          > saveActivityName()
 *          > getData()
 */


/**
 * 全局 当前正在编辑的NODE对象的引用
 * @global
 */
var NODE = null;

$(function(){
    _hello("design-node");
});


/**
 * 一个学习活动的节点对象
 * @param {Number} num - 节点的编号，暂废
 * @param {Object} activityInfo - 或有Zone对象传给Node来新建
 * 
 *  activityInfo格式如下：
 *  activityInfo = {
 *      type: value, //pyramid
 *      typename: activity.typemap(value),//金字塔
 *      activityname: activityname//具体的活动名
 *  }
 */
function Node(num, activityInfo){
    let nodedata = null, //自身的存储数据
        that     = this, //该Node的this引用的备份
        zone     = null; //父节点 - 区域zone的引用
    
    //node相关的html - 不包含编辑框
    let $self = $(`
        <div class="design-act-node-wrapper">
        <span class="glyphicon glyphicon-triangle-top insertbefore-node"
            title="向前添加新活动节点"></span>
        <div class="panel panel-default design-act-node">

            <div class="panel-heading">
                <img src="image/activities/${activityInfo.type}-icon.png" 
                    class="pull-left design-act-node-icon">
                <h3 class="panel-title design-act-node-title">
                    学习活动${num}</h3>
                <span class="glyphicon glyphicon-remove pull-right" 
                    title="删除活动节点"></span>
            </div>

            <div class="panel-body design-act-node-content">
                <div class="col-sm-12 panel-content">
                    <label class="design-activity-name"></label>
                    <button class="btn btn-danger edit-activity-btn pull-right">
                        编辑
                        <span class="glyphicon glyphicon-edit"></span>
                    </button>
                </div>
                <br />
                <div class="menu-box"></div>
            </div>

        </div>
        <span class="glyphicon glyphicon-triangle-bottom insertafter-node"
            title="向后添加新活动节点"></span>
        </div>
        `.trim()),

        //箭头与删除图标
        $before = $self.find(".insertbefore-node"),
        $after  = $self.find(".insertafter-node"),
        $delete = $self.find(".glyphicon-remove"),

        //几个区域与元素
        $heading        = $self.find(".panel-heading"),
        $body           = $self.find(".panel-body"),
        $title          = $self.find(".design-act-node-title"),
        $activityName   = $self.find(".design-activity-name"),//活动的自定义名字
        $edit           = $self.find(".edit-activity-btn");
    
    //根据type初始化data
    nodedata = _get(`./datas/activity/${activityInfo.type}.json`);

    //根据typename修改title以及设置activityName
    if(!_isundef(activityInfo)){
        $title.html(`<b>${activityInfo.typename}</b>`);
        $activityName.html(activityInfo.activityname);
    }

    //插入、删除的click响应后，将节点本身的引用传给Zone，再由Zone处理
    $before.click(() => {this.resetToggle(); zone.insertBefore(this);});
    $after.click(() => {this.resetToggle(); zone.insertAfter(this);});
    $delete.click(() => zone.deleteNode(this));

    //点击heading的折叠效果
    $heading.click(() => {
        $body.toggleClass("hidden");
        $heading.parent().toggleClass("panel-default").toggleClass("panel-toggle");

        if($body.hasClass("hidden")){
            $title.html(`<b>${activityInfo.typename}</b> - ${activityInfo.activityname}`);
        }else{
            $title.html(`<b>${activityInfo.typename}</b>`);
        }
    });

    //点击编辑按钮的事件
    $edit.click(() => {
        NODE = that;//全局的NODE对象保留当前正在进行编辑的Node对象的引用

        if(zone != null){
            let activity = zone.activity();//获取父亲Zone里的activity对象进行调用
            activity.editActivityZone(activityInfo.typename, activityInfo.activityname);
        }
        return false;
    });
    

    /*-----------------------------------------------------------//
     * Node对外可见的方法
     * --------------------------
     * self - 返回自己的DOM引用
     * bindZone - 传入Zone的js对象引用，绑定至Node的zone变量
     * 
     * resetToggle - 将可能收缩的面板先还原
     * 
     * saveData - 保存nodedata
     * getData - 获取nodedata
     */
    //-----------------------------------------------------------//
    /**
     * 返回该Node对应的的jQuery对象的引用
     * @returns {Object}
     */
    this.self = () => $self;
    /**
     * 传入父区域的Zone引用绑定至本地的zone
     * @param {Object} that_zone
     */
    this.bindZone = (that_zone) => zone = that_zone;


    /**
     * 将收缩的面板进行还原
     */
    this.resetToggle = () => {
        _removeClass($body, "hidden");
        _removeClass($heading.parent(), "panel-toggle");
        _addClass($heading.parent(), "panel-default");
        $title.html(`<b>${activityInfo.typename}</b>`);
    };


    /**
     * 编辑完成后调用，将最新的数据保存至本地nodedata
     * @param {Object} data
     */
    this.saveData = (data) => {
        nodedata = data;
        that.saveActivityName();
    };
    /**
     * 将nodedata中的activity-name的值存在本地的$activityName中
     */
    this.saveActivityName = () => {
        $activityName.html(nodedata["activity"]["name"]);
        activityInfo["activityname"] = nodedata["activity"]["name"];
    };
    /**
     * 返回自身的nodedata
     * @returns {Object}
     */
    this.getData = () => nodedata;

}