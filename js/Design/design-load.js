/**
 * author: Shepherd.Lee
 * Date: 2019-08-31
 * version: 2.0.0
 * info: 从DB加载数据
 * index:
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

$(function(){
    _hello("design-load");

    loadDB();
    // loadTheme();
    // loadQuestion();
    // loadTasks();
    // loadActivity();
});



/**
 * 读入DB的数据
 * 并调用loadTheme等加载数据
 */
function loadDB(){
    $.ajaxSetup ({ cache: false }); 
    DB = _get(DB_PATH);
    // log(DB);
    $.ajaxSetup ({ cache: true }); 
    loadTheme();
    loadQuestion();
    loadTasks();
    loadActivity();
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
    let questionData = DB.question;
    QUESTION = DB.question;
    _inject($("#questionDesign-realForm"));
    _withdraw(
        questionData, "driverQuestion",
        _("#questionDesign-driverQuestion")
    );
    
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
    if(_isundef(ZONE)){
        log("Please Init ZONE");
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