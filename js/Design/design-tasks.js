/**
 * author: Shepherd.Lee
 * Date: 2019-12-03
 * version: 2.0.0
 * info: 学习评价相关(原学习任务) 注，页面调整后新的选择模式逻辑在introduction下
 * index: 
 *      Init()
 *          > createInitPanel()
 *          > initTaskNodes()
 *          > initSubTaskNode()
 *          > initActivities()
 * 
 *      Task()
 *          > addTaskNode()
 *          > addSubTaskNode()
 *          > subNodeHandlerTools()
 *          > addSubNodeHandler()
 *          > addSubNodeByHand()
 *          > editNodeHandler()
 *          > editTask()
 * 
 *      TaskZone()
 *          > taskZoneHandler()
 *          > reset()
 *      
 *      initEditNodeHandler()
 *      
 *      saveData()
 */

const SIZE_FIRST = 55,
      SIZE_FIRST_STRONG = 60,
      SIZE_SECOND = 50,
      SIZE_SECOND_STRONG = 55;

const PATH = "datas/design/";//节点的模板json文件保存位置
var OPEN = false;

/**
 * @global 当前正在编辑的task对象的引用
 */
var $edit_task_now  = null;


$(function(){
    _hello("design-tasks");

    initEditNodeHandler();
});



/**
 * 新建节点等有关的事件处理类
 */
function Init(){
    let that = this;//自身引用的备份

    /**
     * 初始化 新建模式的选择面板
     * 目前只在增加二级节点选择学习模式的时候会调用
     * @param {Object} $body 选择面板的容器的引用
     */
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

    /**
     * 选择学习模式后触发，加载指定模式的数据进行初始化
     * @param {Object} $div 新建节点的父容器jQuery对象
     * @param {String} tasktype 新建学习模式的模式类型
     * @param {Boolean} isSubNode 是否为二级节点 默认false
     * @param {Number} parentIndex 指向所属的一级节点的index，默认-1
     */
    this.initTaskNodes = function($div, tasktype,
        isSubNode = false, parentIndex = -1){
        tasktype = tasktype.toLowerCase();//DBL -> dbl

        //自定义模式尚未定义，跳过
        // if(tasktype == "user"){
        //     log("Undefined user type");
        //     return;
        // }
        log("The task type is: " + tasktype);

        _async();
        $.get(PATH + tasktype + ".json", (data) => {
            if(!isSubNode){
                DATA = data;//数据绑定至全局
                that.initActivities();//初始化学习活动面板 
            }else{
                [...data.nodes].forEach((node) => node.level = 2);
                DATA.nodes[parentIndex].next = data;
                ZONE.addSubActivity(parentIndex, data.nodes);//初始化子学习活动面板
            }
            TASKS.addTaskNode($div, data, isSubNode, parentIndex);
        });
        _async();

        //重选模式
        $("#design-tasks-resetModal").off("click").click(function(){
            TASKZONE.reset();
            new Activity().hideEditActivityZones();//隐藏编辑学习活动，如果有的话
            toggleTrigger("off");//见design-animation.js
            $("#design-tasks-resetModal").addClass("hidden");
        });
    };//end initTaskNodes()

    /**
     * 选择子学习模式时候调用，为二级节点准备容器 subTaskZone
     * @param {String} type 子节点所属的模式类型 eg.DBL
     * @param {Number} parentIndex 所属一级节点的序号
     */
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

    /**
     * 利用学习模式的选择信息，初始化对应的学习活动区域
     * 所以应该在选择完确定的学习模式后调用
     */
    this.initActivities = () => {
        ZONE = new Zones(DATA.nodes);
    };
}



/**
 * 对应模式的每个具体节点的事件处理类
 * 
 * nodeInfo元数据格式参考
 * nodeInfo = {
 *     $div: $div,  index: index,
 *     isSubNode   : isSubNode, 
 *     parentIndex : parentIndex,
 *     nodes: nodes, node: node
 * };
 */
function Task(){
    let that = this, //自身的this的备份
        nodeInfo_backup = null,
        $edit = $("#design-editTaskZone");

    /**
     * 新建task节点
     * @param {Object} $div 节点父容器的引用
     * @param {Object} data 学习模式的数据，需要借助其中的nodes与imagepath
     * @param {Boolean} isSubNode 是否为二级节点
     * @param {Number} parentIndex 二级节点对应的父节点的序号
     */
    this.addTaskNode = function($div, data, isSubNode, parentIndex){
        /**
         * nodes格式参考
         * "nodes":
         *     "nodename" - "imgsrc" - "taskname"
         *     "taskcontent" - "level" - "next"
         */
        let nodes       = data.nodes,
            imagePath   = data.imagepath;

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
                <span class='glyphicon glyphicon-chevron-down'
                    title="点击添加子模式"></span>
            </div>
            `.trim());
    
            let $node = $div.find(".node").eq(index),
                $span = $node.find("span.glyphicon"),
                $img  = $node.find(".img-zone img"),
                nodeInfo = {
                    $div: $div, index: index,
                    isSubNode   : isSubNode, 
                    parentIndex : parentIndex,
                    nodes: nodes, node: node
                };
            
            //处理点击箭头的效果 - 添加或显示子节点
            that.addSubNodeHandler($span, nodeInfo);
            //处理点击图片的效果 - 编辑内容
            that.editNodeHandler($img, nodeInfo);
    
            if(node.next != ""){//有二级节点
                that.addSubTaskNode(node.next.tasktype, index);
                $span.addClass("hasSubNode");
            }
        });
    };//end addTaskNode()

    /**
     * 添加二级模式的节点
     * @param {String} type 节点所属模式类型
     * @param {Number} parentIndex 节点所属父节点的序号
     */
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

    /**
     * 与新建/显示子节点有关的辅助操作整合的辅助类
     * 使用时应当先初始化一个辅助类
     * new that.subNodeHandlerTools()
     */
    this.subNodeHandlerTools = function(){
        /**
         * 是否存在index个子模式
         * @param {Number} index
         */
        this.existsSubNode = (index) => {
            let ids = [];
            [...$("#design-tasksZone > div")].forEach((node) => {
                ids.push($(node).attr("id"));
            });
            return ids.indexOf(`subTaskZone-${index}`) >= 0;
        };
        /**
         * 将所有子模式区域隐藏
         */
        this.hideSubNodes = () => {
            [...$("#design-tasksZone > div[id ^= 'subTaskZone']")].forEach((node) => {
                _addClass(node, "hidden");
            });
        };
        /**
         * 将所有当前选中(即显示的)子模式隐藏
         */
        this.hideSelected = () => {
            [...$("#design-tasksZone > div:first-child")
                .children("div.node")].forEach((node) => {
                _removeClass($(node).find(".img-zone"), "selected-parent");
                _addClass($(node).find(".node-content"), "node-wrap");
            });
        };
        /**
         * 切换子节点的效果
         * 1. 已经点开的场合 又将之关闭 - if
         * 2. 已经点开的场合， 点开了另一个子模式 - else
         * @param {Number} index 
         */
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

    /**
     * 处理点击箭头的效果 - 添加或显示子节点
     * @param {Object} $span 节点下方的箭头的jQuery对象引用
     * @param {Object} nodeInfo
     */
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


    /**
     * 根据type类型在指定的index后手动新建子模式
     * @param {Number} parentIndex 父节点的index
     * @param {String} type 节点的模式类型
     */
    this.addSubNodeByHand = (parentIndex, type) => {
        let tools = new that.subNodeHandlerTools();
        let $div = $("#design-tasksZone div:first-child");
        INIT.initSubTaskNode(type, parentIndex);
        let $node = $div.find(".node").eq(parentIndex),
            $span = $node.find("span.glyphicon");
        $span.addClass("hasSubNode");
        tools.toggleSubNode(parentIndex);
    };

    /**
     * 点击节点的图片打开编辑框
     * @param {Object} $img 图片的jQuery对象
     * @param {Object} nodeInfo
     */
    this.editNodeHandler = function($img, nodeInfo){
        let $div = nodeInfo.$div;

        $img.click(function(){
            if(nodeInfo.isSubNode){
                $div.find("img").css("width", `${SIZE_SECOND}%`);
                $(this).css("width", `${SIZE_SECOND_STRONG}%`);
            }else{
                $div.find("img").css("width", `${SIZE_FIRST}%`);
                $(this).css("width", `${SIZE_FIRST_STRONG}%`);
            }
            
            _removeClass($edit, "hidden");
            $edit.find(".panel-title label").eq(0).html(` - ${nodeInfo.node.nodename}`);          
            that.editTask($div, nodeInfo);
        });
    };

    /**
     * 编辑区域有关的事件处理
     * @param {Object} $target 当前选中的节点对象的引用
     * @param {Object} nodeInfo
     */
    this.editTask = function($target, nodeInfo){
        $edit_task_now = that;
        nodeInfo_backup = nodeInfo;

        //点击取消按钮关闭编辑区域
        $("#design-cancelTaskEditBtn").off("click").click(() => {
            if(nodeInfo.isSubNode){
                $target.find("img").css("width", `${SIZE_SECOND}%`);
            }else{
                $target.find("img").css("width", `${SIZE_FIRST}%`);
            }
            $edit.addClass("hidden");
            [...$edit.find("div.taskEvaluate")
                .find("input")].forEach((input) => {
                $(input).prop("checked", false);
            });
            return false;
        });

        //点击右上角的X关闭编辑区域
        $edit.find(".panel-title span").off("click").click(() => {
            $("#design-cancelTaskEditBtn").click();
        });

        //点击按钮确定编辑
        $("#design-confirmTaskEditBtn").off("click").click(function(e){
            e.stopPropagation();//阻止事件冒泡
            log(nodeInfo.index);
            that.saveTask(nodeInfo);
            $edit.addClass("hidden");
            return false;
        });

        that.loadTask(nodeInfo);//读入DATA中数据初始化$edit区域
    };

    /**
     * 点击编辑框 填上数据
     * 根据全局DATA中的值 DATA.nodes[index].XXX填上对应的值
     * 注意，子节点的情况下为DATA.nodes[parentIndex].next.nodes[index].XXX
     * @param {Object} nodeInfo
     */
    this.loadTask = function(nodeInfo){
        // log(`load: ${nodeInfo.index}`);
        let target = (!nodeInfo.isSubNode) ? 
            DATA.nodes[nodeInfo.index]:
            DATA.nodes[nodeInfo.parentIndex].next.nodes[nodeInfo.index];
        let editZoneId_val = ["taskName", "taskContent"];
        editZoneId_val.forEach((id) => {
            $(`#${id}`).val(target[id.toLowerCase()]);
        });

        //装填核心问题区域
        let taskcorequestion = target["taskcorequestion"];
        $("#taskCoreQuestion-ShowZone").html("");
        if(taskcorequestion && taskcorequestion.length){
            let str = "<ul class='list-group'>";
            taskcorequestion.forEach((corequestion) => {
                str += `
                    <li class="list-group-item">
                    <span class="badge badge-${coreQuestionTypeMap(corequestion.type)}">${corequestion.type}</span>
                    <span class="li-content">${corequestion.content}</span>
                    </li>
                `.trim();
            });
            str += "</ul>";
            $("#taskCoreQuestion-ShowZone").html(str);

            _addClass($("#taskCoreQuestion-AddBtn"), "hidden");
            _removeClass($("#taskCoreQuestion-BtnGroup"), "hidden");
        }else{
            _removeClass($("#taskCoreQuestion-AddBtn"), "hidden");
            _addClass($("#taskCoreQuestion-BtnGroup"), "hidden");
        }
        _removeClass($("#taskCoreQuestion-ShowZone"), "hidden");

        //装填学习证据区域
        let taskevidence = target["taskevidence"];
        [...$("#evidence-body").children()].forEach((tr, index) => {
            if(index == 0) return;
            $(tr).remove();
        });
        if(taskevidence && taskevidence.length > 0){
            let $addEvidenceBtn = $("#confirmAddEvidence"),
                $content        = $("#add-evidenceContent"),
                $coreQuestion   = $("#add-evidenceCoreQuestion"),
                $evaluate       = $("#add-evidenceEvaluate");
            
            taskevidence.forEach(evidence => {
                $content.val(evidence.content);
                $coreQuestion.val(evidence.corequestion);
                for(let option of [...$evaluate.children()]){
                    $(option).prop("selected", false);
                    if($(option).val() == evidence.evaluate){
                        $(option).prop("selected", true);
                    }
                }
                $addEvidenceBtn.click();
            });
        }
    };

    /**
     * 填充核心问题区域的函数 用于在核心问题的选择过程中的必要的面板数据恢复
     * 当flag = true 将coreQuestion的数据返回
     * @param {Boolean} flag
     */
    this.loadCoreQuestion = function(flag = false){
        let nodeInfo = nodeInfo_backup;
        let target = (!nodeInfo.isSubNode) ? 
            DATA.nodes[nodeInfo.index]:
            DATA.nodes[nodeInfo.parentIndex].next.nodes[nodeInfo.index];

        //装填核心问题区域
        let taskcorequestion = target["taskcorequestion"];
        if(flag) return taskcorequestion;

        $("#taskCoreQuestion-ShowZone").html("");
        if(taskcorequestion && taskcorequestion.length){
            let str = "<ul class='list-group'>";
            taskcorequestion.forEach((corequestion) => {
                str += `
                    <li class="list-group-item">
                    <span class="badge badge-${coreQuestionTypeMap(corequestion.type)}">${corequestion.type}</span>
                    <span class="li-content">${corequestion.content}</span>
                    </li>
                `.trim();
            });
            str += "</ul>";
            $("#taskCoreQuestion-ShowZone").html(str);

            _addClass($("#taskCoreQuestion-AddBtn"), "hidden");
            _removeClass($("#taskCoreQuestion-BtnGroup"), "hidden");
        }else{
            _removeClass($("#taskCoreQuestion-AddBtn"), "hidden");
            _addClass($("#taskCoreQuestion-BtnGroup"), "hidden");
        }
        _removeClass($("#taskCoreQuestion-ShowZone"), "hidden");
    };

    /**
     * 点击确认编辑 保存结果 将$edit区域中填写的最新内容同步至DATA
     * @param {Object} nodeInfo
     */
    this.saveTask = function(nodeInfo){
        // log(`save: ${nodeInfo.index}`);
        var target = (!nodeInfo.isSubNode) ? 
            DATA.nodes[nodeInfo.index]:
            DATA.nodes[nodeInfo.parentIndex].next.nodes[nodeInfo.index];

        let editZoneId_val = ["taskName", "taskContent"];
        editZoneId_val.forEach((id) => {
            target[id.toLowerCase()] = $(`#${id}`).val();
        });

        //核心问题的存储处理
        target["taskcorequestion"] = [];
        if($edit.find("#taskCoreQuestion-ShowZone").html() !== ""){
            [...$edit.find("#taskCoreQuestion-ShowZone").find("li")].forEach((li) => {
                let type = $(li).find("span.badge").html(),
                    content = $(li).find("span.li-content").html();
                target["taskcorequestion"].push({
                    type: type, content:content
                });
            });
        }

        //学习证据的存储处理
        target["taskevidence"] = [];
        [...$("#evidence-body").children()].forEach((tr, index) => {
            if(index == 0) return;

            _inject($(tr));
            target["taskevidence"].push({
                content: _(".evidenceContent").html(),
                corequestion: _(".evidenceCoreQuestion").html(),
                evaluate: _(".evidenceEvaluate").html()
            });
            _reject();
        });
        log(target["taskevidence"]);

        log("saveTask");
    };
}



/**
 * 与整个模式区域相关的事件处理的操作
 */
function TaskZone(){
    let that = this;

    /**
     * taskZone中对整个模式的处理的操作
     * 例如将整个模式/子模式删除
     */
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
            });
            
            //鼠标在删除按钮上，对整个区域增加一个红色点框的样式
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
        });//end [...$div].forEach
    };

    /**
     * 重置模式
     */
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
}



/**
 * 编辑节点区域的公共事件处理 例如evidence的调用
 * 考虑将关闭 取消等按钮事件也迁移至此
 */
function initEditNodeHandler(){
    $("#addEvidenceModal").appendTo($("body").eq(0));
    $("#editEvidenceModal").appendTo($("body").eq(0));

    let evaluates = [
        "请选择",
        "书面测试", "调查问卷", "口头汇报",
        "同行评审", "概念图"  , "观察记录",
        "制作成果", "展示绩效"
    ],
    $content_editing        = null,
    $coreQuestion_editing   = null,
    $evaluate_editing       = null;

    _inject($("#design-editTaskZone-body"));
    let $tableEvidence = _(".table-evidence"),
        $coreQuestionZone = _("#taskCoreQuestion").parent();
    _reject();

    /* 与学习证据有关的事件处理
    --------------------------------------------------------------*/
    _inject($tableEvidence);
    let $add        = _("#addEvidence"),
        $body       = _("#evidence-body"),
        $template   = _("#evidence-template"),

        //模态框相关jQuery对象
        $addModal       = $("#addEvidenceModal"),
        $editModal      = $("#editEvidenceModal"),
        $confirmAdd     = $("#confirmAddEvidence"),
        $confirmEdit    = $("#confirmEditEvidence"),
        $cancelAdd      = $("#cancelAddEvidence"),
        $cancelEdit     = $("#cancelEditEvidence");
    
    let evidenceClsName = [
        "evidenceContent", "evidenceCoreQuestion", "evidenceEvaluate"
    ];
    _reject();

    //点击开启添加学习证据的模态框
    $add.click(function(e){
        e.preventDefault();
        $addModal.modal("show");

        //与新建学习证据有关的模态框的事件处理
        _inject($addModal);
        let $showZone_origin    = $("#taskCoreQuestion-ShowZone"),
            $showZone           = _("#addEvidenceModal-showEvidences");
        
        $showZone.html("").append($showZone_origin.html());
        _reject();
        
        //清除已填写的数据
        for(let i = 0; i <= 1; i++){
            $(`#add-${evidenceClsName[i]}`).val("");
        }
        $("#add-evidenceEvaluate").find("option").eq(0).prop("selected", true);

        return false;
    });

    //确认添加学习证据
    $confirmAdd.click(function(e){
        e.preventDefault();
        let $newRow = $template.clone().removeAttr("id").removeClass("hidden");
        evidenceClsName.forEach(clsname => {
            $newRow.find(`td.${clsname}`).eq(0).html($(`#add-${clsname}`).val());
        });
        $newRow.find(".deleteEvidence").click(function(e){
            e.preventDefault();
            $(this).ancestor(3, "tr").remove();
            return false;
        });
        $newRow.find(".editEvidence").click(function(e){
            e.preventDefault();
            $("#editEvidenceModal").modal("show");

            //与编辑学习证据有关的模态框的事件处理
            _inject($editModal);
            let $showZone_origin    = $("#taskCoreQuestion-ShowZone"),
                $showZone           = _("#editEvidenceModal-showEvidences"),
                $showContent        = _("#edit-evidenceContent"),
                $showCoreQuestion   = _("#edit-evidenceCoreQuestion"),
                $showEvaluate       = _("#edit-evidenceEvaluate");
            _reject();

            _inject($(this).ancestor(3,"tr"));
            let $content        = _(".evidenceContent"),
                $coreQuestion   = _(".evidenceCoreQuestion"),
                $evaluate       = _(".evidenceEvaluate");

            $content_editing        = $content;
            $coreQuestion_editing   = $coreQuestion;
            $evaluate_editing       = $evaluate;
            _reject();

            $showZone.html("").append($showZone_origin.html());
            $showContent.val($content.html());
            $showCoreQuestion.val($coreQuestion.html());
            let evaluate_index = evaluates.indexOf($evaluate.html());
            if(evaluate_index != -1){
                $showEvaluate.find("option").eq(evaluate_index).prop("selected", true);
            }else{
                $showEvaluate.find("option").eq(0).prop("selected", true);
            }

            return false;
        });

        $body.append($newRow);
        $cancelAdd.click();
        return false;
    });

    //确认保存学习证据的编辑
    $confirmEdit.click(function(e){
        e.preventDefault();

        //与编辑学习证据有关的模态框的事件处理
        _inject($editModal);
        let $showContent        = _("#edit-evidenceContent"),
            $showCoreQuestion   = _("#edit-evidenceCoreQuestion"),
            $showEvaluate       = _("#edit-evidenceEvaluate");
        _reject();

        $content_editing.html($showContent.val());
        $coreQuestion_editing.html($showCoreQuestion.val());
        $evaluate_editing.html($showEvaluate.val());
        $cancelEdit.click();
        return false;
    });

    //关闭、取消学习证据的编辑
    $cancelEdit.click(function(e){
        e.preventDefault();
        $content_editing = null;
        $coreQuestion_editing = null;
        $evaluate_editing = null;

        $editModal.modal("hide");
        return false;
    });

    /* 与添加核心问题有关的事件处理
    --------------------------------------------------------------*/
    _inject($coreQuestionZone);
    let $addCQ      = _("#taskCoreQuestion-AddBtn"),
        $resetCQ    = _("#taskCoreQuestion-ResetBtn"),
        $supplyCQ   = _("#taskCoreQuestion-SupplyBtn"),
        $btngroupCQ = $resetCQ.parent(),

        $showCQ     = _("#taskCoreQuestion-ShowZone"),
        $selectCQ   = _("#taskCoreQuestion-SelectZone");
    _reject();

    //点击添加核心问题
    $addCQ.click(function(e){
        e.preventDefault();
        $showCQ.addClass("hidden");
        $selectCQ.removeClass("hidden");

        let str = "", 
            coreQuestions = getCoreQuestions();//见design-objectives.js

        if(coreQuestions.length === 0){
            //当前未填写核心问题
            str += `
            <p>${_space()}请先在<b>学习目标-问题设计-学科核心问题</b>中完善核心问题的内容
                ，完善后请重新点击上方"+"按钮</p>
            <button class="btn btn-danger pull-right" 
                id="taskCoreQuestion-cancelSelect">关闭</button>
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
                <button class="btn btn-danger" id="taskCoreQuestion-confirmSelect">确定</button>
                <button class="btn btn-default" id="taskCoreQuestion-cancelSelect">取消</button>
            </div>
            `.trim();
        }
        $selectCQ.html(str);

        _inject($selectCQ);
        let $confirmCQ  = _("#taskCoreQuestion-confirmSelect"),
            $cancelCQ   = _("#taskCoreQuestion-cancelSelect");
        _reject();

        //点击确认添加 将选择的核心问题组装成列表
        $confirmCQ.click(function(e){
            e.preventDefault();
            
            let values = [], types = [], str = "<ul class='list-group'>";
            let $boxes = $(this).parent().parent().find("input[type='checkbox']");

            [...$boxes].forEach(box => {
                //每一个选中的核心问题
                if($(box).is(":checked")){
                    values.push($(box).val());
                    types.push($(box).attr("data-coretype"));
                }
            });

            if(values.length === 0){
                $selectCQ.addClass("hidden");
                _removeClass($addCQ, "hidden");
                _addClass($btngroupCQ, "hidden");
                $showCQ.html("");
                return false;
            }else{
                _addClass($addCQ, "hidden");
                _removeClass($btngroupCQ, "hidden");
            }

            values.forEach((value) => {
                str += `
                <li class="list-group-item">
                <span class="badge badge-${coreQuestions[value].type}">${coreQuestions[value].typename}</span>
                <span class="li-content">${coreQuestions[value].value}</span>
                </li>
                `.trim();
            });
            str += "</ul>";
            $showCQ.html(str);
            $showCQ.removeClass("hidden");
            $selectCQ.addClass("hidden");
            return false;
        });

        //关闭核心问题的区域框
        $cancelCQ.click(function(){
            $selectCQ.addClass("hidden");
            //重新读入 恢复show区域的显示
            $edit_task_now.loadCoreQuestion();
            return false;
        });

        return false;
    });

    //重选核心问题
    $resetCQ.click(function(e){
        e.preventDefault();
        $addCQ.click();
        return false;
    });

    //补充核心问题
    $supplyCQ.click(function(e){
        e.preventDefault();
        $showCQ.addClass("hidden");
        $selectCQ.removeClass("hidden");

        let str = "", 
            selectedCQ = $edit_task_now.loadCoreQuestion(true),
            coreQuestions = getCoreQuestions(selectedCQ);//见design-objectives.js

        //填写了核心问题，组装复选框
        coreQuestions.forEach((q, index) => {
            str += `
            <label class="checkbox-inline">
                <input type="checkbox" value="${index}" ${(q.flag)?"checked":""} >
                ${q.value}${_space(2)}
                <span class="badge pull-right badge-${q.type}">${q.typename}</span>
            </label>
            <br />
            `.trim();
        });
        str += `
        <br />
        <div class="btn-group pull-right">
            <button class="btn btn-danger" id="taskCoreQuestion-confirmSupply">确定</button>
            <button class="btn btn-default" id="taskCoreQuestion-cancelSupply">取消</button>
        </div>
        `.trim();
        $selectCQ.html(str);

        _inject($selectCQ);
        let $confirmCQ  = _("#taskCoreQuestion-confirmSupply"),
            $cancelCQ   = _("#taskCoreQuestion-cancelSupply");
        _reject();

        //点击确认添加 将选择的核心问题组装成列表
        $confirmCQ.click(function(e){
            e.preventDefault();
            
            let values = [], types = [], str = "<ul class='list-group'>";
            let $boxes = $(this).parent().parent().find("input[type='checkbox']");
            [...$boxes].forEach(box => {
                //每一个选中的核心问题
                if($(box).is(":checked")){
                    values.push($(box).val());
                    types.push($(box).attr("data-coretype"));
                }
            });
            if(values.length === 0){
                $selectCQ.addClass("hidden");
                return false;
            }else{
                _addClass($addCQ, "hidden");
                _removeClass($btngroupCQ, "hidden");
            }

            values.forEach((value) => {
                str += `
                <li class="list-group-item">
                <span class="badge badge-${coreQuestions[value].type}">${coreQuestions[value].typename}</span>
                <span class="li-content">${coreQuestions[value].value}</span>
                </li>
                `.trim();
            });
            str += "</ul>";
            $showCQ.html(str);
            $showCQ.removeClass("hidden");
            $selectCQ.addClass("hidden");
            return false;
        });

        //关闭核心问题的区域框
        $cancelCQ.click(function(){
            $selectCQ.addClass("hidden");
            //重新读入 恢复show区域的显示
            $edit_task_now.loadCoreQuestion();
            return false;
        });

        return false;
    });

}




/**
 * 保存DATA数据至本地
 */
function saveTasks(){
    let postdata = (DATA.length == 0)? null:DATA;
    $.post("./db/data_save.php", {data:postdata, zone:"tasks"}, (res) => {
        if(res) log("save tasks successfully");
        else err("save tasks failed");
    });
    saveActivity();
}