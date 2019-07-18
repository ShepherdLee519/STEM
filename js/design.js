/**
 * author: Shepherd.Lee
 * Date: 2019-06-06
 * info: 学习活动相关
 */

const TASKTYPE = [
    { "task": "dbl"  ,    "name": "基于设计的学习"  }, 
    { "task": "ibl"  ,    "name": "基于探究的学习"  },
    { "task": "pbl"  ,    "name": "基于问题的学习"  }, 
    { "task": "kc"   ,    "name": "知识建构"       }, 
    { "task": "user" ,    "name": "自定义"         }
];//任务类型名 - 对应php/json
const PATH = "datas/design/";//节点的模板json文件保存位置
var TASKS, TASKZONE, INIT, 
    // TREE,  //与左侧树形控件相关
    DATA,  // 与任务环节相关的数据
    ZONE;   // 学习活动整个区域的Zones对象








$(function(){
    // $("#design-container > div").css("height", ($(window).height()) + "px");
    log("Hello! - design.js");
    INIT = new Init();
    TASKS = new Task(); TASKZONE = new TaskZone();
    // TREE = new Tree();

    initToggles();
    
    // function adjust(){
    //     let height = $("#design-tasksZone").css("height");
    //     // log(`height1: ${height1}, height2: ${height2}`);
    //     height = height.substring(0, height.length-2);
    //     if(Number.parseInt(height) > 600){
    //         $("#design-activities-zone").css("height", `${height - 20}px`)
    //     }
    // }   
    // setInterval(()=>{
    //     adjust();
    //     log("adjust");
    // }, 50);
    INIT.initPanel();//初始化添加任务的面板 - 主要是填充radio
    // showData();//有数据，则加载，并显示
});







/**
 * buttons: test-save/test-load
 */

$("#test-save").click(() => {
    // $.post("./php/design/test_tojson.php", {data:DATA}, (res) => {
    //     log("Response:" + res);
    // });
    let id = "1";
    $.post("./php/design/test_save.php", {id:id, data:DATA}, (res) => {
        log(res);
    });
});



$("#test-load").click(() => {
    // _async();
    // let path = PATH + "data.json" + "?time=" + new Date().getTime();
    // $.get(path, (data) => {
    //     DATA = data;

    // });
    // _async();
    // reset();
    _async();
    $.get("./php/design/test_load.php?id=1", (data) => {
        data = JSON.parse(data);
        data = JSON.parse(data);
        DATA = data;
    });
    _async();
    TASKZONE.showData();//加载并显示数据
    // TREE.build();
});








function initToggles(){
    const right = "&gt;&gt;", left = "&lt;&lt;";
    let btn1 = $("#togglebtn1");
        // btn2 = $("#togglebtn2"),
        // btn3 = $("#togglebtn3");
    let zone1 = $("#design-structure"),
        zone2 = $("#design-tasks"),
        zone3 = $("#design-activities");

    function addAnimations(type){
        zone1.addClass(`${type}-A`);
        zone2.addClass(`${type}-B`);
        zone3.addClass(`${type}-C`);
        // log(zone1.attr("class") + " " + zone2.attr("class") + " " + zone3.attr("class"));
    }

    function removeAnimations(){
        [zone1, zone2, zone3].forEach((zone) => {
            let zone_class = $(zone).attr("class");
            zone_class = (zone_class.split(" "))[0];
            $(zone).attr("class", zone_class);
        });
        // log(zone1.attr("class") + " " + zone2.attr("class") + " " + zone3.attr("class"));
    }

    btn1.click(function(){
        removeAnimations();
        switch($(this).attr("data-direction")){
            case "right":
                $(this).html(left);
                $(this).attr("data-direction", "left");
                addAnimations("type-1");
                break;
            case "left":
                $(this).html(right);
                $(this).attr("data-direction", "right");
                addAnimations("re-type-1");
                break;
        }
    });
}