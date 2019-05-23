/**
 * author: Shepherd.Lee
 * Date: 2019-05-22
 * version: 2.0.0
 * info: p=design 学习设计界面的功能实现
 * index: 
 *      initPanel() > createInitPanel()
 *                  > initTaskNodes()
 *                  > initSubTaskNode()
 *      addTaskNode() - addSubTaskNode()
 *      subNodeHandlerTools() - addSubNodeHandler()
 *      editNodeHandler() - editTask()
 *      showData()
 *      Zones() - Zone() - Node()
 *      initActivities()
 *      
 */

const TASKTYPE = [
    { "task": "dbl",    "name": "基于设计的学习"  }, 
    { "task": "ibl",    "name": "基于探究的学习"  },
    { "task": "pbl",    "name": "基于问题的学习"  }, 
    { "task": "kc",     "name": "知识建构"       }, 
    { "task": "user",   "name": "自定义"         }
];//任务类型名 - 对应php/json
const PATH = "datas/design/";//节点的模板json文件保存位置
var DATA,  // 与任务环节相关的数据
    ZONE; // 学习活动整个区域的Zones对象







$(function(){
    log("Hello! - design.js");

    initPanel();//初始化添加任务的面板 - 主要是填充radio
    // showData();//有数据，则加载，并显示
});






//$(function)
function initPanel(){
    let $panelBody = $("#design-initTask-panelBody");
    createInitPanel($panelBody);//初始化建立任务的小面板(含radio)

    let $panelBtns = $panelBody.find("button"),
        btnName = ["design-confirmTaskSelectBtn", "design-cancelTaskSelectBtn"];
    $panelBtns.eq(0).attr("id", btnName[0]);
    $panelBtns.eq(1).attr("id", btnName[1]);

    let taskBtn = function(){
        //显示添加任务的弹窗的点击事件处理
        $(this).next().removeClass("hidden");
        $(this).off('click');
    };
    $("#design-initTaskBtn").click(taskBtn);//点击添加任务按钮

    //点击确定按钮
    $(`#${btnName[0]}`).click(() => {
        let value = $("input[name='design-taskSelect']:checked").val();//获取radio值

        if(typeof value === 'undefined'){
            alert("请先选择任务类型");
        }else{
            $("#design-tasksZone").removeClass("hidden");
            $("#design-initTaskZone").addClass("hidden");
            let $div = $("#design-tasksZone div:first-child");
            initTaskNodes($div, value);//新建节点
        }
    });

    //点击取消按钮
    $(`#${btnName[1]}`).click(function(){
        $("#design-initTaskZone > .panel-info").addClass("hidden");
        $("#design-initTaskBtn").click(taskBtn);//取消后，重新绑定添加任务的点击事件
    });

}//end initPanel()






//initPanel()
function createInitPanel($body){
    //在$body下建立新建面板
    TASKTYPE.forEach((value) => {
        $body.append(`
            <div class='radio'>
                <label>
                    <input type='radio' name='design-taskSelect' value=${value.task}>
                    ${value.name}
                </label>
            </div>
        `.trim());
    });//初始化radio选项
    
    $body.append(`
        <div class='btn-group'>
            <button class='btn btn-primary'>确定</button>
            <button class='btn btn-default'>取消</button>
        </div>
    `.trim());//在选项末补上确定/取消按钮
}







//initPanels()
function initTaskNodes($div, tasktype,
    isSubNode = false, parentIndex = -1){
    tasktype = tasktype.toLowerCase();
    log("The task type is: " + tasktype);
    _async();
    $.get(PATH + tasktype + ".json", (data) => {
        if(!isSubNode){
            DATA = data;//数据绑定至全局
            initActivities();//初始化学习活动面板 
        }else{
            [...data.nodes].forEach((node) => node.level = 2);
            DATA.nodes[parentIndex].next = data;
            ZONE.addSubActivities(parentIndex, data.nodes);//初始化子学习活动面板
        }

        addTaskNode($div, data, isSubNode, parentIndex);
    });
    _async();
}





//initTasksNodes() - addSubNodeHandler();
function initSubTaskNode(type, parentIndex){
    type = type.toLowerCase();
    $("#design-tasksZone").append(`<div class='col-md-4' id="subTaskZone-${parentIndex}"></div>`);
    $div = $(`#design-tasksZone > #subTaskZone-${parentIndex}`);
    initTaskNodes($div, type, true, parentIndex);
}







//initTaskNodes()
function addTaskNode($div, data, isSubNode, parentIndex){
    let nodes = data.nodes, imagePath = data.imagepath;
    // "nodes":
    //     "nodename" - "imgsrc" - "taskname"
    //     "taskcontent" - "level" - "next"
    nodes.forEach((node, index) => {
        //显示基本的节点
        $div.append(`
            <div class='node'>
                <p class='nodename'>${node.nodename}</p>
                <img title='点击以编辑/查看' src="${imagePath}${node.imgsrc}">
                <span class='glyphicon glyphicon-chevron-down'></span>
            </div>
        `.trim());

        let $node = $div.find(".node").eq(index),
            $span = $node.find("span.glyphicon"),
            $img = $node.find("img"),
            nodeInfo = {
                $div: $div, index: index,
                isSubNode: isSubNode, parentIndex: parentIndex,
                nodes: nodes, node: node
            };
        
        //处理点击箭头的效果 - 添加或显示子节点
        addSubNodeHandler($span, nodeInfo);
        //处理点击图片的效果 - 编辑内容
        editNodeHandler($img, nodeInfo);

        if(node.next != ""){
            addSubTaskNode(node.next.tasktype, index);
            $span.addClass("hasSubNode");
        }
    });
}//end addTaskNode()






//initTasksNodes() - addSubNodeHandler();
function addSubTaskNode(type, parentIndex){
    type = type.toLowerCase();
    $("#design-tasksZone").append(`<div class='col-md-4' id="subTaskZone-${parentIndex}"></div>`);
    $div = $(`#design-tasksZone > #subTaskZone-${parentIndex}`);

    let data = DATA.nodes[parentIndex].next;
    ZONE.addSubActivities(parentIndex, data.nodes);//初始化子学习活动面板
    addTaskNode($div, data, true, parentIndex);
}









//initTaskNodes() - addSubNodeHandler()
function subNodeHandlerTools(){
    this.existsSubNode = (index) => {
        let ids = [];
        [...$("#design-tasksZone > div")].forEach((node) => {
            ids.push($(node).attr("id"));
        });
        return ids.indexOf(`subTaskZone-${index}`) >= 0;
    };

    this.hideSubNodes = () => {
        [...$("#design-tasksZone > div[id ^= 'subTaskZone']")].forEach((node) => {
            _addClass(node, "hidden");
        });
    };

    this.toggleSubNode = (index) => {
        let $node = $(`#design-tasksZone > #subTaskZone-${index}`);
        if(!$node.hasClass("hidden")){
            $node.addClass("hidden");
        }else{
            this.hideSubNodes();
            $node.removeClass("hidden");
        }
    };
}







//initTaskNodes()
function addSubNodeHandler($span, nodeInfo){
    let tools = new subNodeHandlerTools();

    $span.click(function(){
        //点击箭头，添加二级节点, 如果是子节点，跳过
        if(nodeInfo.isSubNode) return;
    
        //已存在该结点的二级节点 - 警告
        if(tools.existsSubNode(nodeInfo.index)){
            tools.toggleSubNode(nodeInfo.index);
            return;
        }
    
        //复制并准备二级节点菜单的容器
        nodeInfo.$div.find(".design-initSubTaskZone").remove();
        let $initsubzone = $(".design-initSubTaskZone").clone();
        $initsubzone.toggleClass("hidden").insertBefore($(this));
    
        //初始化该菜单
        $body = $initsubzone.find(".panel-body");
        createInitPanel($body);
        let $bodyBtns = $body.find("button");
        $bodyBtns.eq(0).attr("id", "design-confirmSubTaskSelectBtn");
        $bodyBtns.eq(1).attr("id", "design-cancelSubTaskSelectBtn");
    
        $("#design-confirmSubTaskSelectBtn").click(function(){
            let val = $body.find("input[type='radio'][name='design-taskSelect']:checked").val();
            if(typeof val == "undefined"){
                alert("您没有选择子节点类型!");
                return;
            }
            tools.hideSubNodes();
            initSubTaskNode(val, nodeInfo.index);
            $span.addClass("hasSubNode");

            $("#design-cancelSubTaskSelectBtn").click();
        });//确认添加二级节点
    
        $("#design-cancelSubTaskSelectBtn").click(() => {
            $initsubzone.toggleClass("hidden");
        });//关闭添加二级节点的菜单
    });
}








//initTaskNodes()
function editNodeHandler($img, nodeInfo){
    let $div = nodeInfo.$div, index = nodeInfo.index,
        len = nodeInfo.nodes.length;

    $img.click(function(){
        $div.find("img").css("width", "65%");
        $(this).css("width", "75%");

        $div.find(".design-editTaskZone").remove();
        let $editzone = $(".design-editTaskZone").clone();
        $editzone.toggleClass("hidden").insertBefore($(this).next());
        $editzone.find(".panel-title label").eq(0).html(` - ${nodeInfo.node.nodename}`);

        if(index > len - 3){
            $editzone.css("top", -160 + 45 * (len-index-1) + "%");
        }

        if(Number.parseInt(nodeInfo.node.level) == 1){
            $div.find("#taskname").val(DATA.nodes[index].taskname);
            $div.find("#taskcontent").val(DATA.nodes[index].taskcontent);
        }else{
            let parentIndex = nodeInfo.parentIndex;
            $div.find("#taskname").val(DATA.nodes[parentIndex].next.nodes[index].taskname);
            $div.find("#taskcontent").val(DATA.nodes[parentIndex].next.nodes[index].taskcontent);
        }
        
        editTask($div, nodeInfo);
    });
}







//initTaskNodes() - editNodeHandler();
function editTask($target, nodeInfo){
    let $edit = $target.find(".design-editTaskZone"),
        flag = false;//是否在编辑状态

    //点击右上角的X关闭编辑区域
    $edit.find(".panel-title span").click(() => {
        $target.find("img").css("width", "65%");
        $edit.remove();
    });

    //点击编辑按钮
    $("#design-taskEditBtn").click(() => {
        $edit.find("input").removeAttr("readonly");
        $edit.find("textarea").removeAttr("readonly");
        flag = true;
        return false;
    });

    //点击确认按钮
    $("#design-confirmTaskEditBtn").click(() => {
        if(!flag){
            $edit.find(".panel-title span").click();
            return;
        }else{
            //保存编辑的内容
            let taskname = $("#taskname").val(), 
                taskcontent = $("#taskcontent").val(),
                node = nodeInfo.node,  level = node.level, 
                index = nodeInfo.index, parentIndex = nodeInfo.parentIndex;

            log(`level: ${level}, index: ${index}, parent: ${parentIndex}`);
            if(Number.parseInt(level) == 1){
                DATA.nodes[index].taskname = taskname;
                DATA.nodes[index].taskcontent = taskcontent;
            }else{
                node.taskname = taskname;
                node.taskcontent = taskcontent;
                DATA.nodes[parentIndex].next.nodes[index] = node;
            }
            $edit.find("input").attr("readonly", "readonly");
            $edit.find("textarea").attr("readonly", "readonly");
            flag = false;
            return false;
        }
    });
}






//$(function())
function showData(){
    //处理添加任务节点等
    $("#design-tasksZone").removeClass("hidden");
    $("#design-initTaskZone").addClass("hidden");
    let $div = $("#design-tasksZone div:first-child");

    initActivities();//初始化学习活动面板 
    addTaskNode($div, DATA, false, -1);

    let tools = new subNodeHandlerTools();
    tools.hideSubNodes();
}






















/*---------------------------------------------------------------------------------*/
/**
 * 学习活动区域相关
 * Zones 包含 Zone的列表 Zone由Node组成
 * Zone可能Sub化
 */

function Zones(nodes){
    let zones = [], newzone = null, 
        $div = $("#design-activities-zone");

    [...nodes].forEach((node) => {
        newzone = new Zone(node);
        zones.push(newzone);
        $div.append(newzone.self());
    });
    zones.push(new Array(zones.length).fill([]));
    
    /**
     * Zones对外可见的方法
     * addSubActivities - 添加子活动的，初始化子活动的Zone
     */
    this.addSubActivities = (index, nodes) => {
        let $target = $div.children(".design-act-zone").eq(index);

        $target.after(`<div class="subZones"></div>`);
        $target = $target.next();

        [...nodes].forEach((node) => {
            newzone = new Zone(node);
            newzone.toSub();
            $target.append(newzone.self());
        });
        zones[index].mark();
    };
} 







function Zone(node){
    let nodelist = [], num = 1,
        initBtn = `
            <div class="init-act">
                <button class="btn btn-default">新建活动</button>
            </div>
        `.trim(),
        $self = $(`
            <div class="panel panel-info design-act-zone">
                <div class="panel-heading">
                    <h3 class="panel-title design-act-zone-title">
                        <span>${node.nodename}</span> - 学习活动</h3>
                </div>
                <div class="panel-body design-act-zone-content">
                    ${initBtn}
                </div>
            </div>
        `.trim()),
        hasSub = `
            <div class="design-act-zone-hassub">
                <span class="glyphicon glyphicon-chevron-down"></span>
            </div>
        `.trim(),
        $heading = $self.find(".panel-heading"),
        $content = $self.find(".design-act-zone-content");
    
    //点击面板的header部分展开/收回面板
    $heading.click(() => $content.toggleClass("hidden"));
    //新建学习活动的按钮的click事件处理
    let initBtnHandler = () => {
        $button = $content.find("button").eq(0);
        $button.click(() => {
            let node = new Node(num++);
            node.bindZone(this);
            nodelist.push(node);
            $content.html("").append(node.self());
            return false;
        });
    }
    initBtnHandler();

    /**
     * Zone对外可见的方法
     * self - 返回自己的DOM引用
     * inserBefore - 在指定节点前插入节点
     * insertAfter - 在指定节点后插入节点
     * deleteNode - 删除指定节点
     * toSub - 将当前Zone转为子节点的特征，修改一些样式
     * mark - 表示当前Zone有附属子节点，修改一些样式与功能
     */
    this.self = () => $self;
    this.insertBefore = (target) => {
        let index = nodelist.indexOf(target),
            node = new Node(num++);

        node.bindZone(this);
        nodelist.splice(index, 0, node);
        $content.children().eq(index).before(node.self());
    };
    this.insertAfter = (target) => {
        let index = nodelist.indexOf(target),
            node = new Node(num++);

        node.bindZone(this);
        nodelist.splice(index+1, 0, node);
        $content.children().eq(index).after(node.self());
    };
    this.deleteNode = (target) => {
        let index = nodelist.indexOf(target);

        nodelist.splice(index, 1);
        $content.children().eq(index).remove();
        if(nodelist.length == 0){
            //如果节点全删除，回复新建学习活动的按钮
            $content.append(initBtn);
            initBtnHandler();
            num = 1;
        }
    };
    this.toSub = () => {
        $self.removeClass("design-act-zone").removeClass("panel-info");
        $self.addClass("design-act-subZone").addClass("panel-warning");
    };
    this.mark = () => {
        $self.find(".panel-body").after(hasSub);
        let $span = $self.find(".design-act-zone-hassub span");
        $span.click(() => {
            $self.next(".subZones").toggleClass("hidden");
        });
    };
}






function Node(num){
    let $self = $(`
        <div class="design-act-node-wrapper">
            <span class="glyphicon glyphicon-triangle-top insertbefore-node"
                title="向前添加新活动节点"></span>
            <div class="panel panel-default design-act-node">
                <div class="panel-heading">
                    <h3 class="panel-title design-act-node-title">
                        学习活动${num}</h3>
                    <span class="glyphicon glyphicon-remove pull-right" 
                        title="删除活动节点"></span>
                </div>
                <div class="panel-body design-act-node-content">
                </div>
            </div>
            <span class="glyphicon glyphicon-triangle-bottom insertafter-node"
                title="向后添加新活动节点"></span>
        </div>
        `.trim()),
        zone = null, //父节点 - 区域zone的引用
        $before = $self.find(".insertbefore-node"),
        $after = $self.find(".insertafter-node"),
        $delete = $self.find(".glyphicon-remove");
    
    //插入、删除的click响应后，将节点本身的引用传给Zone，再由Zone处理
    $before.click(() => zone.insertBefore(this));
    $after.click(() => zone.insertAfter(this));
    $delete.click(() => zone.deleteNode(this));
    
    /**
     * Node对外可见的方法
     * self - 返回自己的DOM引用
     * bindZone - 传入Zone的js对象引用，绑定至Node的zone变量
     */
    this.self = () => $self;
    this.bindZone = (that) => zone = that;
}







function initActivities(){
    ZONE = new Zones(DATA.nodes);
}







/*------------------------------------------------------------*/
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
    _async();
    $.get("./php/design/test_load.php?id=1", (data) => {
        data = JSON.parse(data);
        data = JSON.parse(data);
        DATA = data;
    });
    _async();
    showData();//加载并显示数据
});