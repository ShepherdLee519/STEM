/**
 * author: Shepherd.Lee
 * Date: 2019-05-30
 * info: 学习任务相关
 * index: 
 *      Init()
 *          > initPanel() 
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

function Init(){
    let that = this;

    this.initPanel = function(){
        let $panelBody = $("#design-initTask-panelBody");
        that.createInitPanel($panelBody);//初始化建立任务的小面板(含radio)
    
        let $panelBtns = $panelBody.find("button"),
            btnName = ["design-confirmTaskSelectBtn", "design-cancelTaskSelectBtn"];
        $panelBtns.eq(0).attr("id", btnName[0]); $panelBtns.eq(1).attr("id", btnName[1]);
    
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
                TASKZONE.taskZoneHandler();//taskZone本身的删除等效果
                this.initTaskNodes($div, value);//新建节点
            }
        });
    
        //点击取消按钮
        $(`#${btnName[1]}`).click(function(){
            $("#design-initTaskZone > .panel-info").addClass("hidden");
            $("#design-initTaskBtn").click(taskBtn);//取消后，重新绑定添加任务的点击事件
        });
    
    };//end initPanel()

    this.createInitPanel = function($body){
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
                TREE.build();
                that.initActivities();//初始化学习活动面板 
            }else{
                [...data.nodes].forEach((node) => node.level = 2);
                DATA.nodes[parentIndex].next = data;
                TREE.build();
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
                    <p class='nodename'>${node.nodename}</p>
                    <div class="img-zone">
                        <img title='点击以编辑/查看' src="${imagePath}${node.imgsrc}">
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
            $bodyBtns.eq(0).attr("id", "design-confirmSubTaskSelectBtn");
            $bodyBtns.eq(1).attr("id", "design-cancelSubTaskSelectBtn");
        
            $("#design-confirmSubTaskSelectBtn").click(function(){
                let val = $body.find("input[type='radio'][name='design-taskSelect']:checked").val();
                if(typeof val == "undefined"){
                    alert("您没有选择子节点类型!");
                    return;
                }
                tools.hideSubNodes();
                INIT.initSubTaskNode(val, nodeInfo.index);
                $span.addClass("hasSubNode");
    
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
            $div.find("img").css("width", "65%");
            $(this).css("width", "75%");
    
            $div.find(".design-editTaskZone").remove();
            let $editzone = $(".design-editTaskZone").clone();
            $editzone.toggleClass("hidden").insertBefore($(this).parent().next());
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
            
            that.editTask($div, nodeInfo);
        });
    };

    this.editTask = function($target, nodeInfo){
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
        });
    };

    this.reset = function(){
        //重置DATA、 学习活动与任务区域
        DATA = [];//重置DATA
        ZONE.clear();//重置学习活动
        // TREE.build();
    
        //重置任务区域
        _addClass($("#design-tasksZone"), "hidden");
        _removeClass($("#design-initTaskZone"), "hidden");
        let $divs = $("#design-tasksZone").children("div.taskZone");
        _addClass($divs.eq(0), "first-level");
        $divs.eq(0).html("");
        [...$divs].forEach((div, index) => {
            if(index == 0) return;
            $(div).remove();
        });
    };

    this.showData = () => {
        //处理添加任务节点等
        $("#design-tasksZone").removeClass("hidden");
        $("#design-initTaskZone").addClass("hidden");
        let $div = $("#design-tasksZone div:first-child");
    
        INIT.initActivities();//初始化学习活动面板 
        TASKS.addTaskNode($div, DATA, false, -1);
    
        let tools = new TASKS.subNodeHandlerTools();
        tools.hideSubNodes();
    };
}