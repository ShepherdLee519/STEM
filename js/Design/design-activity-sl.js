/*
 * author: Shepherd.Lee
 * Date: 2019-08-31
 * version: 2.0.0
 * info: 学习活动编辑过程中读取/保存数据
 * index:
 *      keyToClass()
 *      saveActivityData()
 *      loadActivityData()
 * 
 *      saveActivity()
 */

/**
 * 学习活动 - 思考-配对-分享
 */
let pair_keys = [
    ["activity", "name"],
    ["activity", "student", "think"],
    ["activity", "student", "pair"],
    ["activity", "student", "share"],
    ["activity", "teacher", "think"],
    ["activity", "teacher", "pair"],
    ["activity", "teacher", "share"]
];

/**
 * 学习活动 - 金字塔
 */
let pyramid_keys = [
    ["activity", "name"],
    ["activity", "question"],
    ["activity", "floor", "top"],
    ["activity", "floor", "middle"],
    ["activity", "floor", "bottom"]
];

/**
 * 学习活动 - 拼图策略
 */
let jigsaw_keys = [
    ["activity", "name"],
    ["activity", "expert", "task"],
    ["activity", "expert", "student"],
    ["activity", "expert", "teacher"],
    ["activity", "former", "task"],
    ["activity", "former", "student"],
    ["activity", "former", "teacher"]
];

/**
 * 学习活动 - 角色扮演
 */
let roleplay_keys = [
    ["activity", "name"],
    ["activity", "setting"],
    ["activity", "student", "describe"],
    ["activity", "student", "show"],
    ["activity", "student", "evaluate"],
    ["activity", "teacher", "describe"],
    ["activity", "teacher", "show"],
    ["activity", "teacher", "evaluate"],
];

/**
 * 学习活动 - 游戏
 */
let game_keys = [
    ["activity", "name"],
    ["activity", "rule"],
    ["activity", "student"],
    ["activity", "teacher"],
    ["activity", "reward"],
];

/**
 * 学习活动 - 实验教学
 */
let exp_keys = [
    ["activity", "name"],
    ["activity", "step"],
    ["activity", "student"],
    ["activity", "teacher"],
    ["activity", "environment"],
];

/**
 * type类型与type_keys的映射字典
 * @global
 */
var typeKeysDict = {
    "pair"      : pair_keys,
    "pyramid"   : pyramid_keys,
    "jigsaw"    : jigsaw_keys,
    "roleplay"  : roleplay_keys,
    "game"      : game_keys,
    "exp"       : exp_keys
};

/**
 * 将["activity", "student", "think"]的数组形式转为
 * ".activity-student-think"的类名形式并返回
 * @param {Array<String>} key 
 * @returns {String}
 */
function keyToClass(key){
    return "." + key.join("-");
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
    let keys = typeKeysDict[edit_type_now];
    keys.forEach((key) => {
        _store(
            target, key,
            _(keyToClass(key)).val()
        );
    });
    NODE.saveData(target);
    _reject();
}


/**
 * 专门负责在editActivity菜单中的数据的加载
 * 活动类型在:edit_type_now
 * 目标区域在:$edit_zone_now
 * 目标数据:NODE.getData()
 */
function loadActivityData(){
    let target = NODE.getData();
    _inject($edit_zone_now);
    log(edit_type_now);
    let keys = typeKeysDict[edit_type_now];
    keys.forEach((key) => {
        _withdraw(
            target, key,
            _(keyToClass(key))
        );
    });
    _reject();
}




/**
 * 保存本地activity数据到DB
 */
function saveActivity(){
    if(_isundef(ZONE)){
        log("Please Init ZONE");
        return;
    }

    let activityData = [], 
        len = ZONE.len();
    let zones       = ZONE.getZones(),
        subzones    = ZONE.getSubZones();
    for(let i = 0; i < len; i++){
        activityData.push(zones[i].getData());
    }

    let subActivityData = [];
    for(let i = 0; i < len; i++){
        if(subzones[i] != []){
            subActivityData.push({
                index: i,
                nodes: []
            });
            subzones[i].forEach(subzone => {
                subActivityData[i].nodes.push(subzone.getData())
            });
        }
    }

    let activityFullData = {
        prime   : activityData,
        sub     : subActivityData
    };

    $.post("./db/data_save.php", {data:activityFullData, zone:"activity"}, (res) => {
        if(res) log("save activity successfully");
        else err("save activity failed");
    });
}