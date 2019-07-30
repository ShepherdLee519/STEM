/**
 * author: Shepherd.Lee
 * Date: 2019-07-28
 * version: 2.0.0
 * info: 学习活动中 具体的创建不同类型的活动
 * index:
 *      Activity()
 *          - init()
 *          - typemap()
 *          - editActivityZone()
 *          - hideEditActivityZones()
 *          - editActivityTable()
 *          - initEditActivityHandlers()
 *      clearActivityMenu()
 */
 
$(function(){
    _hello("design-activity");
    var INIT_ACTIVITY_HANDLERS= false;
});

function Activity(){
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
    this.editActivityZone = (key, activityName) => {
        //根据key 找寻对应的editActivity菜单并显示
        let type = this.typemap(key),
            $editZone = $(`#design-editActivityZone-${type}`);
        this.hideEditActivityZones();
        $editZone.removeClass("hidden");
        //活动名称的input赋值
        $editZone.find(".editActivity-activityName").val(activityName); 
    };
    this.hideEditActivityZones = () => {
        //将所有的editActivity菜单隐藏
        [...$(".design-editActivityZone")].forEach((editzone) => {
            _addClass($(editzone), "hidden");
        });
    };
    this.editActivityTable = () => {
        $("#design-editActivityZone td").off("click").click(function(event){
            //已经有input，跳过
            if($(this).children("input").length > 0) 
                return false;
            
            let tdObj = $(this),
                preText = tdObj.html(),
                inputObj = $(`<input type="text" />`);
            
            tdObj.html("");
            inputObj
                .width(tdObj.width())
                .height(tdObj.height())
                .css({border:"0px", fontSize:"17px",font:"宋体"})
                .val(preText).appendTo(tdObj)
                .trigger("focus").trigger("select");
        
            inputObj.keyup(function(event){
                if(13 == event.which){
                    //按下回车
                    let text = $(this).val();
                    tdObj.html(text);
                }else if(27 == event.which){
                    //ESC键
                    tdObj.html(preText);
                }
            });
            inputObj.mouseout(function(event){
                let text = $(this).val();
                    tdObj.html(text);
            });
            inputObj.click(function(){
                return false;
            });
        }); 
    };
    //编辑学习活动的菜单内的相关按钮的事件初始化
    this.initEditActivityHandlers = () => {
        if(window.INIT_ACTIVITY_HANDLERS) return;
        //立即执行，初始化表单的td的点击编辑能力
        this.editActivityTable();
        //editActivity菜单中的取消按钮的事件
        $(".design-editActivity-cancel").click(() => {
            this.hideEditActivityZones();
        });
        //editActivity菜单中的确认按钮的事件
        $(".design-editActivity-confirm").click(() => {
            this.hideEditActivityZones();
        });
        //editActivity表单的清空事件
        $(".reset-editActivityTable").click(function(){
            let $table = $(this).parent().parent().parent().find("table");
            [...$table.find("td:not(:first-child)")].forEach((td) => {
                $(td).html("");
            });
        });
        window.INIT_ACTIVITY_HANDLERS = true;
    };
    this.initEditActivityHandlers();//立即调用并初始化
}






function clearActivityMenu(){
    //将所有的菜单清空
    /*
     * 会发生在 点击取消 - 折叠菜单(zone/subnode) 等
     * 考虑点击空白处就让菜单消失
     */
    let $activitiesZone = $("#design-activities-zone");
    $activitiesZone.find(".menu-box").html("");
}