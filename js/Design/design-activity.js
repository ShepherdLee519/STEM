/**
 * author: Shepherd.Lee
 * Date: 2019-07-28
 * version: 2.0.0
 * info: 学习活动中 具体的创建不同类型的活动
 * index:
 *      Activity()
 *      clearActivityMenu()
 */
 
$(function(){
    _hello("design-activity");
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
    }
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