/*
 * author: Shepherd.Lee
 * Date: 2019-08-28
 * version: 2.0.0
 * info: 学习活动中 具体的创建不同类型的活动
 * index:
 *      clearActivityMenu()
 *      Activity()
 *          - init()
 *          - typemap()
 * 
 *          - editActivityZone()
 *          - hideEditActivityZones()
 *          - initEditActivityHandlers()
 */


/**
 * @global 当前正在编辑的type
 */
var edit_type_now  = null;
/**
 * @global 当前操作的edit区域引用
 */
var $edit_zone_now = null;
/**
 * @global 是否初始化了activity的基本handlers
 * 避免重复的进行handlers的增加
 */
var INIT_ACTIVITY_HANDLERS = false;


$(function(){
    _hello("design-activity");
});



/**
 * 将所有的菜单清空
 * 
 * 会发生在 点击取消 - 折叠菜单(zone/subnode) 等
 * 考虑点击空白处就让菜单消失
 */
function clearActivityMenu(){
    let $activitiesZone = $("#design-activities-zone");
    $activitiesZone.find(".menu-box").html("");
}


/**
 * 学习活动的活动功能对象
 * 包含新建、编辑活动的必要操作等
 */
function Activity(){
    let that = this;//自身的引用的备份
    let ActivityType = {
        "type" : [
            "pair",  "pyramid",  "jigsaw", 
            "roleplay", "game", "exp"
        ],
        "typename" : [
            "思考-配对-分享", "金字塔", "拼图策略", 
            "角色扮演", "游戏教学", "实验教学"
        ]
    };
    
    /*-----------------------------------------------------------//
     * Activity对外可见的方法
     * --------------------------------
     * init - 初始化活动类型的面板的html
     * typename - 将type与typename相互转化
     * 
     * editActivityZone - 找寻对应的editActivity菜单并显示
     * hideEditActivityZones - 隐藏所有已有的activity编辑区域
     * initEditActivityHandlers - 编辑学习活动的菜单内的相关按钮的事件初始化
     */
    //-----------------------------------------------------------//
    /**
     * @returns {String} 用于初始化学习活动的选择面板的html
     */
    this.init = () => {
        let str = "<div class='activitiy-radio-zone'>";
        str += `
        <div class="form-group">
            <label for="" class="control-label">活动名称:</label>
            <div>
                <input type="text" class="form-control" name="activity-name"
                    placeholder="学习活动的活动名">
            </div>
        </div>
        <hr />
        <label class="control-label">活动类型:</label>
        `.trim();

        [...ActivityType.type].forEach((type, index) => {
            str += `
            <div class='radio'>
                <label>
                    <input type='radio' name='activity-type-select' value="${type}">
                    ${_space(2)}${ActivityType.typename[index]}
                </label>
            </div>`.trim();
        });
        str += `
        <div class="alert alert-warning">
            <p>请选择活动类型并完善活动名称！</p>
        </div>
        </div>
        <div class='btn-group pull-right'>
            <button class='btn btn-success confirm-addActivity'">确定</button>
            <button class='btn btn-default' onclick="clearActivityMenu();">取消</button>
        </div>
        `.trim();

        return str;
    };
    /**
     * 将type与typename进行转换
     * @param {String} key
     * @returns {String} 转化后的值
     */
    this.typemap = (key) => {
        //将对应的type与typename值相互转化 pyramid - 金字塔
        let index = ActivityType.type.indexOf(key);
        if(index >= 0){
            return ActivityType.typename[index];
        }else{
            index = ActivityType.typename.indexOf(key);
            if(index >= 0){
                return ActivityType.type[index];
            }
        }
        return;
    };
    /**
     * 根据key 找寻对应的editActivity菜单并显示
     * @param {String} key - typename eg.金字塔
     * @param {String} activityName 活动的名称
     */
    this.editActivityZone = (key, activityName) => {
        let type        = that.typemap(key),
            $editZone   = $(`#design-editActivityZone-${type}`);

        that.hideEditActivityZones();
        $editZone.removeClass("hidden");
        $edit_zone_now = $editZone;

        //活动名称的input赋值
        $editZone.find(".activity-name").val(activityName); 
        edit_type_now = type;
    };
    /**
     * 将所有的editActivity菜单隐藏
     */
    this.hideEditActivityZones = () => {
        [...$(".design-editActivityZone")].forEach((editzone) => {
            _addClass($(editzone), "hidden");
        });
    };

    /**
     * 编辑学习活动的菜单内的相关按钮的事件初始化
     * 若window.INIT_ACTIVITY_HANDLERS真 不进行，即只初始化一次
     */
    this.initEditActivityHandlers = () => {
        if(window.INIT_ACTIVITY_HANDLERS) return;

        //editActivity菜单中的取消按钮的事件
        $(".design-editActivity-cancel").click(() => {
            that.hideEditActivityZones();
        });

        //editActivity菜单中的确认按钮的事件
        $(".design-editActivity-confirm").click(() => {
            if($edit_zone_now == null || edit_type_now == null){
                err("WRONG!!!!!");
                return;
            }
            saveActivityData();//保存数据
            that.hideEditActivityZones();
        });
        window.INIT_ACTIVITY_HANDLERS = true;
    };
    this.initEditActivityHandlers();//立即调用并初始化
}



/**
 * 专门负责在editActivity菜单中的确认后进行数据的保存
 * 活动类型在:edit_type_now
 * 目标区域在:$edit_zone_now
 * 目标数据:NODE.getData()
 * 
 * 保存完后 NODE.saveData();
 */
function saveActivityData(){
    let target = NODE.getData();
    _inject($edit_zone_now);
    //为了便于修改，直接通过switch选择类型，分别处理
    switch(edit_type_now){
        case "pair":
            let pair_keys = [
                ["activity", "name"],
                ["activity", "student", "think"],
                ["activity", "student", "pair"],
                ["activity", "student", "share"]
            ];
            let pair_classes = [
                ".activity-name",
                ".activity-student-think",
                ".activity-student-pair",
                ".activity-student-share"
            ];
            pair_keys.forEach((key, index) => {
                _store(
                    target, key,
                    _(pair_classes[index]).val()
                );
            });
            break;
        default:
            err("WRONG TYPE!!!!");
            return;
    }
    NODE.saveData(target);
    _reject();
}