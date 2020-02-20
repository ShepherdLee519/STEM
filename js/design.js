/**
 * author: Shepherd.Lee
 * Date: 2019-12-26
 * version: 2.0.0
 * info: 学习活动相关
 */

/**
 * @constant
 * 任务类型与任务名的对象数组
 */
const TASKTYPE = [
    {  "task": "dbl"  ,    "name": "基于设计的学习"  }, 
    {  "task": "ibl"  ,    "name": "基于探究的学习"  },
    {  "task": "pbl"  ,    "name": "基于问题的学习"  }, 
    {  "task": "kc"   ,    "name": "知识建构"        }
    // {  "task": "user" ,    "name": "自定义"          }
];//任务类型名 - 对应php/json

const ACTIVITYTYPE = [
    {type: "pair"   , typename: "思考-配对-共享"},
    {type: "pyramid", typename: "金字塔"},
    {type: "jigsaw",  typename: "拼图策略"},
    {type: "roleplay",typename: "角色扮演"},
    {type: "game",    typename: "游戏教学"},
    {type: "exp",     typename: "实验教学"}
];

var TASKZONE, //与任务相关，见design-tasks.js
    DATA,  // 与任务环节相关的数据
    ZONE;   // 学习活动整个区域的Zones对象，见design-zones.js

/**
 * 表示Load是否成功 - userid与username均正常
 * 初始为false 此时无法saveData() - design.js
 * Load 相关见design-load.js
 */
var LOAD_LOCK = false;


var SESSION_INFO = {
    local: true,
    session: false,
    userid: "",
    username: ""
};

function getSession(){
    if(SESSION_INFO.local) return false;
    else if(!SESSION_INFO.session){
        let userid = sessionStorage.getItem("userid"),
            username = sessionStorage.getItem("username");
        
        if(!userid || !username){
            SESSION_INFO.local = true;
            return false;
        }else{
            SESSION_INFO.userid = userid;
            SESSION_INFO.username = username;
            SESSION_INFO.session = true;
        }
    }
    return true;
}

$(function(){
    _hello("design");

    TASKZONE = new TaskZone();
    initToggles();//切换菜单的效果 - 见design-animation.js

    $("#saveData").click(() => {
        saveData();
        alert("保存成功！");
        // log(new Date() + "：数据保存...");
        /*---------------------------------------*/
        // saveTheme();//学习目标 - 课程主题
        // saveQuestion();//学习目标 - 问题设计
        // saveTasks();//学习评价
        // saveActivity();//学习活动
    });

});




/**
 * 一次性封装出data，通过data_save_all保存
 * ----------------------------------------
 * 分别调用了
 *      saveTheme() - 保存学习目标 - 课程主题 见design-objectives.js
 *      saveQuestion() - 保存学习目标 - 问题设计 见design-objectives.js
 *      saveTasks() - 保存学习评价 - 任务节点 见design-tasks.js
 *      saveActivity() - 保存学习活动 见design-activity-ls.js
 */
function saveData(){
    //先检查LOAD_LOCK;
    if(LOAD_LOCK == false){
        //此时userid与username存在异常，考虑网络不良
        alert("您的网络状态似乎不好");
        return false;
    }

    let tasksData, activityData;
    if(_isundef(DATA) || DATA.length == 0){
        //当为选择模式时，DATA为[]
        tasksData = null;
        activityData = null;
    }else{
        tasksData = DATA;
        if(_isundef(ZONE)){
            log("Please Init ZONE");
            return;
        }
        activityData = ZONE.data;
    }

    saveTheme();
    saveQuestion();
    log(QUESTION);

    let data = {
        theme: THEME,
        question: QUESTION,
        tasks: tasksData,
        activity: activityData
    };

    log(new Date() + "：数据保存...");
    let userid = sessionStorage.getItem("userid"),
        username = sessionStorage.getItem("username");
    
    if(userid == null || username == null){
        $.post("./db/data_save_all.php", {data:data}, (res) => {
            if(res) log("save ALL DATA successfully");
            else err("save ALL DATA failed");
        });
    }else{
        $.post("./php/data/data_save_local.php",
            {data:data, userid:userid, username:username}, 
            (res) => {
                log(data.question);
                if(res) log("save ALL DATA successfully --local");
                else err("save ALL DATA failed --local");
        });
    }
    
}
    