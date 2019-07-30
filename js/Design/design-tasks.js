/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * info: 学习评价相关(原学习任务) 注，页面调整后新的选择模式逻辑在introduction下
 * index: 
 *      Init()
 *          > createInitPanel()
 *          > initTaskNodes()
 *          > initSubTaskNode()
 *          > initActivities()
 *      Task()
 *          > addTaskNode()
 *          > addSubTaskNode()
 *          > subNodeHandlerTools()
 *          > addSubNodeHandler()
 *          > editNodeHandler()
 *          > editTask()
 *      TaskZone()
 *          > taskZoneHandler()
 *          > reset()
 *          > showData()
 */

// nodeInfo元数据格式参考
// nodeInfo = {
//     $div: $div,  
//     index: index,
//     isSubNode: isSubNode, 
//     parentIndex: parentIndex,
//     nodes: nodes, 
//     node: node
// };

const SIZE_FIRST = 55,
      SIZE_FIRST_STRONG = 60,
      SIZE_SECOND = 50,
      SIZE_SECOND_STRONG = 55;

var OPEN = false;

$(function(){
    _hello("design-tasks");

    //重选模式
    $("#design-tasks-resetModal").click(function(){
        TASKZONE.reset();
        toggleTrigger("off");//见design-animation.js
        $("#design-tasks-resetModal").addClass("hidden");
    });
})


function Init(){
    let that = this;

    this.createInitPanel = function($body){
        //在$body下建立新建面板 - 用在新建子节点时候
        TASKTYPE.forEach((value) => {
            $body.append(`
                <div class='radio'>
                    <label>
                        ${_space(4)}
                        <input type='radio' name='design-taskSelect' value=${value.task}>
                        ${value.name}
                    </label>
                </div>
            `.trim());
        });//初始化radio选项
        
        $body.append(`
            <div class='btn-group pull-right'>
                <button class='btn btn-primary'>确定</button>
                <button class='btn btn-default'>取消</button>
            </div>
        `.trim());//在选项末补上确定/取消按钮
    };//end createInitPanel()

    this.initTaskNodes = function($div, tasktype,
        isSubNode = false, parentIndex = -1){
        tasktype = tasktype.toLowerCase();
        if(tasktype == "user"){
            log("Undefined user type");
            return;
        }
        log("The task type is: " + tasktype);
        _async();
        $.get(PATH + tasktype + ".json", (data) => {
            if(!isSubNode){
                DATA = data;//数据绑定至全局
                // TREE.build();
                that.initActivities();//初始化学习活动面板 
            }else{
                [...data.nodes].forEach((node) => node.level = 2);
                DATA.nodes[parentIndex].next = data;
                // TREE.build();
                ZONE.addSubActivity(parentIndex, data.nodes);//初始化子学习活动面板
            }
            TASKS.addTaskNode($div, data, isSubNode, parentIndex);
        });
        _async();
    };//end initTaskNodes()

    this.initSubTaskNode = function(type, parentIndex){
        type = type.toLowerCase();
        let $clone = $("#design-tasksZone > div:first-child").clone(true);
        $clone.children("div").remove();
        $clone.attr("id", `subTaskZone-${parentIndex}`).
                attr("data-parent", parentIndex);
        _removeClass($clone, "first-level");
        $("#design-tasksZone").append($clone);
        TASKZONE.taskZoneHandler();
    
        _removeClass($("#design-tasksZone div.first-level"), "first-level");
        $div = $(`#design-tasksZone > #subTaskZone-${parentIndex}`);
        that.initTaskNodes($div, type, true, parentIndex);
    };//end initSubTaskNode()

    this.initActivities = () => {
        ZONE = new Zones(DATA.nodes);
    };
}










function Task(){
    let that = this;

    this.addTaskNode = function($div, data, isSubNode, parentIndex){
        let nodes = data.nodes, imagePath = data.imagepath;
        // "nodes":
        //     "nodename" - "imgsrc" - "taskname"
        //     "taskcontent" - "level" - "next"
        nodes.forEach((node, index) => {
            //显示基本的节点
            $div.append(`
                <div class='node'>
                    <div class="node-content node-wrap">
                        <p class='nodename'>${node.nodename}</p>
                        <div class="img-zone">
                            <img title='点击以编辑/查看' src="${imagePath}${node.imgsrc}">
                        </div>
                    </div>
                    <span class='glyphicon glyphicon-chevron-down'></span>
                </div>
            `.trim());
    
            let $node = $div.find(".node").eq(index),
                $span = $node.find("span.glyphicon"),
                $img = $node.find(".img-zone img"),
                nodeInfo = {
                    $div: $div, index: index,
                    isSubNode: isSubNode, parentIndex: parentIndex,
                    nodes: nodes, node: node
                };
            
            //处理点击箭头的效果 - 添加或显示子节点
            that.addSubNodeHandler($span, nodeInfo);
            //处理点击图片的效果 - 编辑内容
            that.editNodeHandler($img, nodeInfo);
    
            if(node.next != ""){
                that.addSubTaskNode(node.next.tasktype, index);
                $span.addClass("hasSubNode");
            }
        });
    };//end addTaskNode()

    this.addSubTaskNode = function(type, parentIndex){
        type = type.toLowerCase();
        
        let $clone = $("#design-tasksZone > div:first-child").clone(true);
        $clone.children("div").remove();
        $clone.attr("id", `subTaskZone-${parentIndex}`)
            .attr("data-parent", parentIndex);
        _removeClass($clone, "first-level");
        $("#design-tasksZone").append($clone);
        TASKZONE.taskZoneHandler();
    
        $div = $(`#design-tasksZone > #subTaskZone-${parentIndex}`);
        let data = DATA.nodes[parentIndex].next;
        ZONE.addSubActivity(parentIndex, data.nodes);//初始化子学习活动面板
        that.addTaskNode($div, data, true, parentIndex);
    };

    this.subNodeHandlerTools = function(){
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

        this.hideSelected = () => {
            [...$("#design-tasksZone > div:first-child")
                    .children("div.node")].forEach((node) => {
                    _removeClass($(node).find(".img-zone"), "selected-parent");
                    _addClass($(node).find(".node-content"), "node-wrap");
            });
        }
    
        this.toggleSubNode = (index) => {
            this.hideSelected();
            let $node = $(`#design-tasksZone > #subTaskZone-${index}`);
            if(!$node.hasClass("hidden")){
                _addClass($("#design-tasksZone > div:first-child"), "first-level");
                $node.addClass("hidden");
            }else{
                this.hideSubNodes();
                _removeClass($("#design-tasksZone > div:first-child"), "first-level");
                $node.removeClass("hidden");
                let $parentNode = $("#design-tasksZone > div:first-child")
                    .children("div.node").eq(index).find(".img-zone");
                _addClass($parentNode, "selected-parent");
                _removeClass($parentNode.parent(), "node-wrap");
            }
        };
    };

    this.addSubNodeHandler = function($span, nodeInfo){
        let tools = new that.subNodeHandlerTools();
        $span.click(function(){
            //点击箭头，添加二级节点, 如果是子节点，跳过
            if(nodeInfo.isSubNode) return;
        
            //已存在该结点的二级节点 - 显示/隐藏
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
            INIT.createInitPanel($body);
            let $bodyBtns = $body.find("button");
            $bodyBtns.eq(0).attr("id", "design-confirmSubTaskSelectBtn")
                .removeClass("btn-primary").addClass("btn-warning");
            $bodyBtns.eq(1).attr("id", "design-cancelSubTaskSelectBtn");
        
            $("#design-confirmSubTaskSelectBtn").click(function(){
                let val = $body.find("input[type='radio'][name='design-taskSelect']:checked").val();
                if(typeof val == "undefined"){
                    alert("您没有选择子节点类型!");
                    return;
                }
                _removeClass(nodeInfo.$div.find(".node").find(".img-zone"), ("selected-parent"));
                _addClass(nodeInfo.$div.find(".node-content"), "node-wrap");
                tools.hideSubNodes();
                INIT.initSubTaskNode(val, nodeInfo.index);
                $span.addClass("hasSubNode");
                let $node_imgzone = nodeInfo.$div.find(".node").eq(nodeInfo.index)
                    .find(".img-zone");
                $node_imgzone.addClass("selected-parent");
                $node_imgzone.parent().removeClass("node-wrap");
    
                $("#design-cancelSubTaskSelectBtn").click();
            });//确认添加二级节点
        
            $("#design-cancelSubTaskSelectBtn").click(() => {
                $initsubzone.toggleClass("hidden");
            });//关闭添加二级节点的菜单
        });
    };

    this.editNodeHandler = function($img, nodeInfo){
        let $div = nodeInfo.$div, index = nodeInfo.index,
            len = nodeInfo.nodes.length;
        $img.click(function(){
            if(nodeInfo.isSubNode){
                $div.find("img").css("width", `${SIZE_SECOND}%`);
                $(this).css("width", `${SIZE_SECOND_STRONG}%`);
            }else{
                $div.find("img").css("width", `${SIZE_FIRST}%`);
                $(this).css("width", `${SIZE_FIRST_STRONG}%`);
            }
            
    
            let $editzone = $("#design-editTaskZone");
            _removeClass($editzone, "hidden");
            $editzone.find(".panel-title label").eq(0).html(` - ${nodeInfo.node.nodename}`);
    
            if(Number.parseInt(nodeInfo.node.level) == 1){
                $div.find("#taskname").val(DATA.nodes[index].taskname);
                $div.find("#taskcontent").val(DATA.nodes[index].taskcontent);
            }else{
                let parentIndex = nodeInfo.parentIndex;
                $div.find("#taskname").val(DATA.nodes[parentIndex].next.nodes[index].taskname);
                $div.find("#taskcontent").val(DATA.nodes[parentIndex].next.nodes[index].taskcontent);
            }
            
            that.editTask($div, nodeInfo);
        });
    };

    this.editTask = function($target, nodeInfo){
        let $edit = $("#design-editTaskZone");
    
        //点击右上角的X关闭编辑区域
        $edit.find(".panel-title span").click(() => {
            if(nodeInfo.isSubNode){
                $target.find("img").css("width", `${SIZE_SECOND}%`);
            }else{
                $target.find("img").css("width", `${SIZE_FIRST}%`);
            }
            $edit.addClass("hidden");
        });
    
        //点击核心问题的按钮，添加对应的核心问题
        $("#taskCoreQuestion-AddBtn").click(function(e){
            e.preventDefault();
            let $show = $("#taskCoreQuestion-ShowZone"),
                $select = $("#taskCoreQuestion-SelectZone");
            $show.addClass("hidden");
            $select.removeClass("hidden");

            let str = "", 
                coreQuestions = getCoreQuestions();//见design-objectives.js

            if(coreQuestions.length === 0){
                //当前未填写核心问题
                str += `
                    <p>${_space()}请先在<b>学习目标-问题设计-学科核心问题</b>中完善核心问题的内容
                        ，完善后请重新点击上方"+"按钮</p>
                    <button class="btn btn-danger pull-right" id="taskCoreQuestion-cancelSelect">
                        关闭</button>
                `.trim();
            }else{
                //填写了核心问题，组装复选框
                coreQuestions.forEach((q, index) => {
                    str += `
                        <label class="checkbox-inline">
                            <input type="checkbox" value="${index}">
                            ${q.value}${_space(2)}
                            <span class="badge pull-right badge-${q.type}">${q.typename}</span>
                        </label>
                        <br />
                    `.trim();
                });
                str += `
                    <br />
                    <div class="btn-group pull-right">
                        <button class="btn btn-default" id="taskCoreQuestion-confirmSelect">
                            确定</button>
                        <button class="btn btn-danger" id="taskCoreQuestion-cancelSelect">
                            关闭</button>
                    </div>
                `.trim();
            }
            $select.html(str);

            //点击确认添加 将选择的核心问题组装成列表
            $("#taskCoreQuestion-confirmSelect").click(function(){
                e.preventDefault();
                let values = [], types = [], str = "<ul class='list-group'>";
                let $boxes = $(this).parent().parent().find("input[type='checkbox']");
                [...$boxes].forEach(box => {
                    if($(box).is(":checked")){
                        values.push($(box).val());
                        types.push($(box).attr("data-coretype"));
                    }
                });
                if(values.length === 0){
                    $select.addClass("hidden");
                    return false;
                }
                values.forEach((value) => {
                    str += `
                        <li class="list-group-item">
                        <span class="badge badge-${coreQuestions[value].type}">
                            ${coreQuestions[value].typename}</span>
                        ${coreQuestions[value].value}</li>
                    `.trim();
                });
                str += "</ul>";
                $show.html(str);
                $show.removeClass("hidden");
                $select.addClass("hidden");
                return false;
            });

            //关闭核心问题的区域框
            $("#taskCoreQuestion-cancelSelect").click(function(){
                $select.addClass("hidden");
                return false;
            });

            return false;
        });

        $("#design-confirmTaskEditBtn").click(function(e){
            $edit.addClass("hidden");
            // log(DATA);
            return false;
        });
    }
}










function TaskZone(){
    let that = this;

    this.taskZoneHandler = function(){
        $div = $("#design-tasksZone").children();
        [...$div].forEach((zone, index, tasks) => {
            $delelteSpan = $(zone).find(".delete-task").eq(0);
            $delelteSpan.off("click").click(() => {
                if(index == 0){
                    that.reset();//删除一级，重置全部
                    //可能的警示框
                    return;
                }

                //如果作为子节点
                let parentIndex = Number.parseInt($(zone).attr("data-parent")),
                    id = $(zone).attr("id");
                
                //将父节点的selected-parent样式删除
                $("#design-tasksZone div:first-child div.node .img-zone.selected-parent")
                    .removeClass("selected-parent").parent().addClass("node-wrap");
                //从DATA中删除
                DATA.nodes[parentIndex].next = "";
                //从taskZone中删除
                $(`#${id}`).remove();
                $(tasks[0]).addClass("first-level");
                $(tasks[0]).find(".node").eq(parentIndex)
                    .find("span").removeClass("hasSubNode");
                //从学习任务中删除
                ZONE.deleteSubActivity(parentIndex);
                // TREE.build();
            });
            [...$("#design-tasksZone .delete-task")].forEach((deleteBtn, index) => {
                let $target = $("#design-tasksZone div.taskZone").eq(index);
                $(deleteBtn).off("hover").hover(function(){
                    _addClass($target, "hover");
                    if(index >= 1){
                        $("#design-tasksZone .taskZone:first-child").removeClass("hover");
                    }
                }, function(){
                    _removeClass($target, "hover");
                });
            });
        });
    };

    this.reset = function(){
        //重置DATA、 学习活动与任务区域
        DATA = [];//重置DATA
        ZONE.clear();//重置学习活动
    
        //重置任务区域
        _addClass($("#design-tasksZone"), "hidden");
        resetIntroduction();
        _addClass($("#design-tasks-resetModal"),"hidden");
        let $divs = $("#design-tasksZone").children("div.taskZone");
        _addClass($divs.eq(0), "first-level");
        let deleteSpan = `
            <span class="glyphicon glyphicon-remove pull-right delete-task" 
                title="删除任务环节"></span>
        `.trim();
        $divs.eq(0).html(deleteSpan);
        [...$divs].forEach((div, index) => {
            if(index == 0) return;
            $(div).remove();
        });
    };

    this.showData = () => {
        //处理添加任务节点等
        $("#design-tasksZone").removeClass("hidden");
        let $div = $("#design-tasksZone div:first-child");
    
        INIT.initActivities();//初始化学习活动面板 
        TASKS.addTaskNode($div, DATA, false, -1);
    
        let tools = new TASKS.subNodeHandlerTools();
        tools.hideSubNodes();
    };
}