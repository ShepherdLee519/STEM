/*
 * author: Shepherd.Lee
 * Date: 2019-09-14
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
    ["activity", "place"],
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
    
    //保存学习证据
    let $evidences_body = _(".activityEvidenceBody"),
        $evidences = [...$evidences_body.children()];
        
    if($evidences.length == 0){
        target.common.evidence = "";
    }else{
        target.common.evidence = [];
        for(let td of $evidences){
            target.common.evidence.push({
                content:$(td).find(".content-td").html(),
                evaluate:$(td).find(".evaluate-td").html()
            });
        }
        log(target.common.evidence);
    }

    /* 材料与工具区域的读入
    -------------------------------------------------*/
    //保存材料工具
    let $text = _(".material-text");
    target.common.material.text = $text.val();

    //保存链接资源
    let $linkBody = _(".link-body"),
        $links = [...$linkBody.children()];

    if($links.length == 0){
        target.common.material.link = "";
    }else{
        target.common.material.link = [];
        for(let link of $links){
            target.common.material.link.push({
                describe: $(link).find(".link-tr-describe").html(),
                url:$(link).find(".link-tr-url a").html()
            });
        }
    }

    //保存上传资料
    let $fileUl = _(".file-ul"),
        $files  = [...$fileUl.children()];
    
    if($files.length == 0){
        target.common.material.file = "";
    }else{
        target.common.material.file = [];
        for(let file of $files){
            target.common.material.file.push({
                path: $(file).attr("data-fullpath"),
                filename: $(file).html()
            });
        }
    }


    NODE.setMyEvidence(target.common.evidence);
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
    // log(target);
    _inject($edit_zone_now);
    log(edit_type_now);
    let keys = typeKeysDict[edit_type_now];
    keys.forEach((key) => {
        _withdraw(
            target, key,
            _(keyToClass(key))
        );
    });

    //装填学习证据
    let $evidences_body = _(".activityEvidenceBody");
    $evidences_body.html("");//先清空

    if(target.common.evidence != ""){
        let str = "";
        for(let evidence of target.common.evidence){
            str += `
            <tr>
                <td class="content-td">${evidence.content}</td>
                <td class="evaluate-td">${evidence.evaluate}</td>
            </tr>`.trim();
        }
        $evidences_body.html(str);
        // _removeClass(_(".reset-activityEvidence"), "hidden");
        // _addClass(_(".select-activityEvidence"), "hidden");
    }else{
        // _addClass(_(".reset-activityEvidence"), "hidden");
        // _removeClass(_(".select-activityEvidence"), "hidden");
    }

    /* 材料与工具区域的装填
    -------------------------------------------------*/
    //装填材料工具
    let $text = _(".material-text");
    $text.val(target.common.material.text);

    //装填链接资源
    let $linkBody = _(".link-body");
    $linkBody.html("");//先清空

    if(target.common.material.link != ""){
        let str = "";
        for(let link of target.common.material.link){
            str += `
            <tr><td class="link-tr-describe">${link.describe}</td>
                <td class="link-tr-url">
                    <a href="${link.url}" target="_blank">${link.url}</a>
                </td>
            </tr>`.trim();
        }
        $linkBody.html(str);
    }

    //装填上传资源
    let $fileUl = _(".file-ul");
    $fileUl.html("");//先清空

    if(target.common.material.file != ""){
        let str = "";
        for(let file of target.common.material.file){
            str += `
            <li class="list-group-item"
                data-fullpath=${file.path}>
                ${file.filename}
            </li>`.trim();
        }
        $fileUl.html(str);
        [...$fileUl.find("li")].forEach(li => {
            $(li).click(function(){
                let $a = $(`<a href="${$(this).attr("data-fullpath")}" download></a>`);
                $("body").eq(0).append($a);
                $a[0].click();
                log($(this).attr("data-fullpath"));
                return false;
            });
        });
    }


    _reject();
}




/**
 * 保存本地activity数据到DB
 */
function saveActivity(){
    if(DATA.length == 0){
        $.post("./db/data_save.php", {data:null, zone:"activity"}, (res) => {
            if(res) log("save activity successfully");
            else err("save activity failed");
        });
        return;
    }

    let activityFullData = getActivity();

    $.post("./db/data_save.php", {data:activityFullData, zone:"activity"}, (res) => {
        if(res) log("save activity successfully");
        else err("save activity failed");
    });
}




/**
 * 获取本地的activity的数据封装并返回
 */
function getActivity(){
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

    return activityFullData;
}