/**
 * author: Shepherd.Lee
 * Date: 2019-12-26
 * version: 2.0.0
 * info: 从DB加载数据
 *      注：保存数据至DB的相关逻辑见design.js
 * index:
 *      loadDB()
 *      loadTheme()
 *      loadQuestion()
 *      loadTasks()
 *      loadActivity()
 */


/**
 * 从localdata中读入的数据的全局保存
 * @global
 */
var DB = null;
var DB_PATH = "./db/localdata/data.json";
// var DB_PATH = "C:/STEM/localdata/data.json";

/**
 * 本地测试时候，将DB_local切换至true，读入本地数据
 */
var DB_local = false;

$(function(){
    _hello("design-load");

    //立即读入数据初始化，该js文件应在最后的位置被引入(html中)
    loadDB();
});



/**
 * 读入DB的数据
 * 并调用loadTheme等加载数据
 */
function loadDB(){
    //获取session中的userid 与 username
    let userid = sessionStorage.getItem("userid"),
        username = sessionStorage.getItem("username");
    
    while(true && !DB_local){
        if(userid != null && username != null){
            DB_PATH = `./userdata/${userid}_${username}/data.json`;
            $("#loading-aside").hide();
            LOAD_LOCK = true;
            break;
        }else{
            // alert("您的网络状态不佳！请尝试刷新！");
            setInterval(() => {
                let $span_dot = $("#loading-aside").find("span").eq(0),
                    length = $span_dot.html().length;
                $span_dot.html(".".repeat(length > 9?3:++length));
            }, 180);
            return;
        }
    }
    
    $.ajaxSetup ({ cache: false }); 
    DB = _get(DB_PATH);
    log("DB_loaded");
    // log(DB);
    $.ajaxSetup ({ cache: true }); 
    loadTheme();
    loadQuestion();
    loadTasks();
    loadActivity();
}


/**
 * 切换DB_local至true，读入本地数据
 */
function loadDB_test(){
    DB_local = true;
    $("#loading-aside").hide();
    LOAD_LOCK = true;
    loadDB();
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
    if(_isundef(DB) || _isundef(DB.theme)){
        return;
    }
    let themeData = DB.theme;
    THEME = themeData;
    _inject($("#courseTheme"));
    _withdraw(
        themeData, ["themeName"],
        _("#courseTheme-themeName") 
    );
    _withdraw(
        themeData, ["themeSituation"],
        _("#courseTheme-themeSituation")
    );
    STD.forEach((std) => {
        _withdraw(
            themeData, ["people", std],
            _(`#courseTheme-people-${std}`)
        );
    });
    let grade = _withdraw(
        themeData, "grade"
    );
    $("#courseTheme-grade").children()
        .eq(Number.parseInt(grade) - 1)
        .prop("selected", true);
    _reject();
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
    if(_isundef(DB) || _isundef(DB.question)){
        return;
    }
    let questionData = DB.question;
    QUESTION = DB.question;
    _inject($("#questionDesign-realForm"));
    _withdraw(
        questionData, "driverQuestion",
        _("#questionDesign-driverQuestion")
    );
    
    if(_isundef(questionData.coreQuestion) || !questionData.coreQuestion) return;
    STD.forEach((std) => {
        let corequestion = _withdraw(
            questionData, ["coreQuestion", std]
        ), number = corequestion.length;

        _inject($(`#questionDesign-coreQuestion-${std}`));
        if(number != 0){
            let $addBtn = _(".addCoreQuestion"),
                $edit = _(".editCoreQuestion");

            for(let i = 0; i < number; i++){
                $edit.val(corequestion[i]);
                $addBtn.click();
            }
        } 
        _reject();
    });
   
}




/**
 * 加载学习模式中的节点的数据
 */
function loadTasks(){
    if(_isundef(DB) || _isundef(DB.tasks)){
        return;
    }
    let tasksData = DB.tasks,
        nodes = tasksData.nodes;
        
    selectNodeHandler(tasksData["tasktype"]);
    nodes.forEach((node, index) => {
        if(node.next === "") return;
        TASKS.addSubNodeByHand(index, node.next.tasktype);
    });
    DATA = tasksData;
}




/**
 * 加载学习活动中的活动
 * 并将相关的节点的值通过Node.saveData()存入本地
 */
function loadActivity(){
    if(_isundef(DB) || !DB.activity || !DB.tasks) return;
    if(_isundef(ZONE)){
        log("Please Init ZONE");
        ZONE = new Zones(DATA.nodes);
        return;
    }


    let zones       = ZONE.getZones(),
        subzones    = ZONE.getSubZones();
    let prime   = DB.activity.prime,
        sub     = DB.activity.sub;

    prime.forEach((node, index) => {
        if(node.activities){
            node.activities.forEach((activity) => {
                let activityInfo = {
                    type: activity.type,
                    typename: activity.typename,
                    activityname: activity.activity.name
                };
                zones[index].pushActivity(activityInfo, activity);
            });
        }
    });

    sub.forEach((subzone, subZoneIndex) => {
        if(subzone.nodes){
        subzone.nodes.forEach((node, nodeIndex) => {
            if(node.activities){
            node.activities.forEach((activity) => {
                let activityInfo = {
                    type: activity.type,
                    typename: activity.typename,
                    activityname: activity.activity.name
                };
                subzones[subZoneIndex][nodeIndex].pushActivity(activityInfo, activity);
            });
            }//end if-node.activities
        });
        }//end if-subzone.nodes
    });
}