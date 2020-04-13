/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 00:17:00 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:06:17
 */

import { common as $$ } from "../common/common";
import { DATA } from "./data";
import { SESSION_INFO, getSession } from "./session";
import { ACTIVITYZONE } from "../activity/activity";
import { saveQuestion, saveTheme, THEME, QUESTION } from "../objectives/objectives";


export function saveData(){
    let tasksData, activityData;
    if($$.isundef(DATA) || DATA.length == 0){
        //当为选择模式时，DATA为[]
        tasksData = null;
        activityData = null;
    }else{
        tasksData = DATA;
        if($$.isundef(ACTIVITYZONE)){
            console.log("Please Init ZONE");
            return;
        }
        activityData = ACTIVITYZONE.data;
    }

    saveTheme();
    saveQuestion();
    console.log(QUESTION);

    let data = {
        theme: THEME,
        question: QUESTION,
        tasks: tasksData,
        activity: activityData
    };

    console.log(new Date() + "：数据保存...");
    console.log(data);
    let userid = sessionStorage.getItem("userid"),
        username = sessionStorage.getItem("username");
    
    if(userid == null || username == null){
        $.post("./db/data_save_all.php", {data:data}, (res) => {
            if(res) console.log("save ALL DATA successfully");
            else console.error("save ALL DATA failed");
        });
    }else{
        $.post("./php/data/data_save_local.php",
            {data:data, userid:userid, username:username}, 
            (res) => {
                console.log(data.tasks);
                if(res) console.log("save ALL DATA successfully --local");
                else console.error("save ALL DATA failed --local");
        });
    }
}