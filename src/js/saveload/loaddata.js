/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-25 04:26:40 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:06:12
 */

import { common as $$ } from "../common/common";
import { DATA } from "./data";
import { ACTIVITYZONE } from "../activity/activity";
import { SESSION_INFO, getSession } from "./session";
import { selectModal, TASKZONE } from "../taskzone/taskzone";
import { THEME, QUESTION, STD } from "../objectives/objectives";

/**
 * 从localdata中读入的数据的全局保存
 * @global
 */
var DB = null;
var DB_PATH = "./db/localdata/data.json";


$(function(){
    $$.hello("design-load");

    //立即读入数据初始化，该js文件应在最后的位置被引入(html中)
    loadDB();
});



/**
 * 读入DB的数据
 * 并调用loadTheme等加载数据
 */
function loadDB(){
    //获取session中的userid 与 username
    // let userid = sessionStorage.getItem("userid"),
    //     username = sessionStorage.getItem("username");
    
    // while(true && !DB_local){
    //     if(userid != null && username != null){
    //         DB_PATH = `./userdata/${userid}_${username}/data.json`;
    //         $("#loading-aside").hide();
    //         LOAD_LOCK = true;
    //         break;
    //     }else{
    //         // alert("您的网络状态不佳！请尝试刷新！");
    //         setInterval(() => {
    //             let $span_dot = $("#loading-aside").find("span").eq(0),
    //                 length = $span_dot.html().length;
    //             $span_dot.html(".".repeat(length > 9?3:++length));
    //         }, 180);
    //         return;
    //     }
    // }
    if(getSession()){
        DB_PATH = `./userdata/${SESSION_INFO.userid}_${SESSION_INFO.username}/data.json`;
    }

    $("#loadingcover").hide();
    $.ajaxSetup ({ cache: false }); 
    DB = $$.get(DB_PATH);
    // log(DB);
    $.ajaxSetup ({ cache: true }); 
    loadTheme();
    loadQuestion();
    loadTasks();
    // loadActivity();
}


/**
 * 从DB中加载THEME数据
 * 并更新对应区域的显示内容
 * 
 * DB.theme:
 * "theme":{
        "themeName":"主题名称",
        "themeSituation":"学习情境",
        "people":{
            "science":"科学-人员 ",
            "technology":"技术-人员",
            "engineering":"工程-人员",
            "mathematics":"数学-人员"
        },
        "grade":"5"
    }
 */
function loadTheme(){
    if($$.isundef(DB) || $$.isundef(DB.theme) || DB.theme == ""){
        return;
    }
    let themeData = DB.theme;
    THEME.self = themeData;
    $$.inject($("#courseTheme"));
    $$.withdraw(
        themeData, ["themeName"],
        $$._("#courseTheme-themeName") 
    );
    $$.withdraw(
        themeData, ["themeSituation"],
        $$._("#courseTheme-themeSituation")
    );
    STD.forEach((std) => {
        $$.withdraw(
            themeData, ["people", std],
            $$._(`#courseTheme-people-${std}`)
        );
    });
    let grade = $$.withdraw(
        themeData, "grade"
    );
    $("#courseTheme-grade").children()
        .eq(Number.parseInt(grade) - 1)
        .prop("selected", true);
    $$.reject();
}



/**
 * 从DB中加载question数据
 * 并更新对应区域的内容
 * 
 * "question":{
        "driverQuestion":"驱动问题名",
        "coreQuestion":{
            "science":["科学1-1","科学1-2"],
            "technology":["技术2-1","技术2-2","技术2-3"],
            "engineering":["工程3-1"],
            "mathematics":["数学4-1","数学4-2","数学4-3","数学4-4","数学4-5"]
        }
    }
 */
function loadQuestion(){
    if($$.isundef(DB) || $$.isundef(DB.question) || DB.question == ""){
        return;
    }
    let questionData = DB.question;
    QUESTION.self = questionData;
    $$.inject($("#questionDesign-realForm"));
    $$.withdraw(
        questionData, "driverQuestion",
        $$._("#questionDesign-driverQuestion")
    );
    
    if($$.isundef(questionData.coreQuestion) || !questionData.coreQuestion) return;
    STD.forEach((std) => {
        let corequestion = $$.withdraw(
            questionData, ["coreQuestion", std]
        ), number = corequestion.length;

        $$.inject($(`#questionDesign-coreQuestion-${std}`));
        if(number != 0){
            let $addBtn = $$._(".addCoreQuestion"),
                $edit = $$._(".editCoreQuestion");

            for(let i = 0; i < number; i++){
                $edit.val(corequestion[i]);
                $addBtn.click();
            }
        } 
        $$.reject();
    });
}


/**
 * 加载学习模式中的节点的数据
 */
function loadTasks(){
    if($$.isundef(DB) || $$.isundef(DB.tasks) || DB.tasks == ""){
        return;
    }

    let tasksData = DB.tasks,
        nodes = tasksData.nodes;

    selectModal(tasksData.tasktype);
    nodes.forEach((node, index) => {
        if(node.next === "") return;
        TASKZONE.initSubTaskNodes(node.next.tasktype, index, true);
    });

    DATA.self = tasksData;
    loadActivity();
}


/**
 * 加载学习活动中的活动
 * 并将相关的节点的值通过Node.saveData()存入本地
 */
function loadActivity(){
    if($$.isundef(DB) || !DB.activity || !DB.tasks) return;
    // if(_isundef(ZONE)){
    //     log("Please Init ZONE");
    //     ZONE = new Zones(DATA.nodes);
    //     return;
    // }

    // return;
    let zones       = ACTIVITYZONE.zones,
        subzones    = ACTIVITYZONE.zones[ACTIVITYZONE.len];
    let prime   = DB.activity.prime,
        sub     = DB.activity.sub;

    prime.forEach((node, index) => {
        if(node.activities){
            node.activities.forEach((activity, i) => {
                let activityInfo = {
                    type: activity.type,
                    activityname: activity.activity.name
                };
                zones[index].addActivity(activityInfo);
                zones[index].nodelist[i].data = activity;
                // zones[index].pushActivity(activityInfo, activity);
            });
        }
    });
    sub.forEach((subzone, subZoneIndex) => {
        if(subzone.nodes){
        subzone.nodes.forEach((node, nodeIndex) => {
            if(node.activities){
            node.activities.forEach((activity, i) => {
                let activityInfo = {
                    type: activity.type,
                    activityname: activity.activity.name
                };
                subzones[subZoneIndex][nodeIndex].addActivity(activityInfo);
                subzones[subZoneIndex][nodeIndex].nodelist[i].data = activity;
            });
            }//end if-node.activities
        });
        }//end if-subzone.nodes
    });
}