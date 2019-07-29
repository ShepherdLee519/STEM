/**
 * author: Shepherd.Lee
 * Date: 2019-07-30
 * version: 2.2.0
 * info: 学习活动相关
 * index:
 *      Zones() 
 *          > addSubActivity()
 *          > deleteSubActivity()
 *          > clear()
 *      Zone()
 *          > self()
 *          > inserBefore()
 *          > insertAfter()
 *          > deleteNode()
 *          > toSub()
 *          > getParent()
 *          > mark()
 *          > demark()
 *          > initFirstActivity()
 *          > initActivityBtnHandler()
 *          > adjustInitActivity()
 *          > resetActivityRadio()
 *      Node()
 *          > self()
 *          > bindZone()
 */

$(function(){
    _hello("design-zone");
});

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
     * addSubActivity - 添加子活动的，初始化子活动的Zone
     * deleteSubActivity - 删除某个子活动
     * clear - 清空Zone区域
     */
    this.addSubActivity = (index, nodes) => {
        let $target = $div.children(".design-act-zone").eq(index);

        $target.after(`<div class="subZones"></div>`);
        $target = $target.next();

        [...nodes].forEach((node) => {
            newzone = new Zone(node);
            newzone.toSub(index);
            $target.append(newzone.self());
        });
        zones[index].mark();
        // log(zones);
        zones[zones.length-1][index] = newzone;
    };
    this.deleteSubActivity = (index) => {
        let $subzone = $div.children(".design-act-zone").eq(index).next();
        zones[index].demark();
        zones[zones.length-1][index] = [];
        $subzone.remove();
    };
    this.clear = () => {
        this.zones = [];
        $div.html("");
    };
} 









function Zone(node){
    let nodelist = [], num = 1, parent = -1,
        activity = new Activity(),
        that = this,
        initBtn = `
            <div class="init-act">
                <button class="btn btn-default">新建活动</button>
            </div>
        `.trim(),
        $self = $(`
            <div class="panel panel-info design-act-zone">
                <div class="panel-heading">
                    <h3 class="panel-title design-act-zone-title">
                        <span>${node.nodename}</span> - 学习活动
                        <span class="badge pull-right activity-number">0</span>
                    </h3>
                </div>
                <div class="panel-body design-act-zone-content">
                    ${initBtn}
                </div>
                <div class="menu-box"></div>
            </div>
        `.trim()),
        $initActivity = $(`
            <div class="design-initActivityZone">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <h3 class="panel-title">选择活动类型</h3>
                    </div>
                    <div class="panel-body">
                        ${activity.init()}
                    </div>
                </div>
            </div>
        `.trim()),
        hasSub = `
            <div class="design-act-zone-hassub">
                <span class="glyphicon glyphicon-chevron-down"></span>
            </div>
        `.trim(),
        $heading = $self.find(".panel-heading"),
        $content = $self.find(".design-act-zone-content"),
        $number = $self.find(".activity-number");
    
    //点击面板的header部分展开/收回面板
    $heading.click(() => {
        $content.toggleClass("hidden");
        clearActivityMenu();
    });
    

    /**
     * Zone对外可见的方法
     * --------------------------------
     * self - 返回自己的DOM引用
     * inserBefore - 在指定节点前插入节点
     * insertAfter - 在指定节点后插入节点
     * deleteNode - 删除指定节点
     * 
     * toSub - 将当前Zone转为子节点的特征，修改一些样式
     * getParent - 获取当前节点的父节点index(默认-1)
     * mark - 表示当前Zone有附属子节点，修改一些样式与功能
     * demark - 取消mark状态
     * 
     * initFirstActivity - 点击新建活动后添加的第一个活动节点
     * initActivityBtnHandler - 点击新建活动后的事件处理
     * resetActivityRadio - 重置新建活动列表中的radio选项
     * 
     * addActivityNum
     */
    this.self = () => $self;
    this.insertBefore = (target) => {
        this.initActivityBtnHandler(-1, target);
        target.self().find(".menu-box").eq(0).html(this.adjustInitActivity($initActivity, -1));
        this.resetActivityRadio();//重置选项
        $initActivity.find("input[name='activity-name']").eq(0).val("");//清空活动名	
    };
    this.insertAfter = (target) => {
        this.initActivityBtnHandler(1, target);
        target.self().find(".menu-box").eq(0).html(this.adjustInitActivity($initActivity, 1));
        this.resetActivityRadio();//重置选项
        $initActivity.find("input[name='activity-name']").eq(0).val("");//清空活动名	
    };
    this.deleteNode = (target) => {
        let index = nodelist.indexOf(target);

        nodelist.splice(index, 1);
        $content.children().eq(index).remove();
        this.addActivityNum(-1);
        if(nodelist.length == 0){
            //如果节点全删除，回复新建学习活动的按钮
            $content.append(initBtn);
            this.initFirstActivity();
            num = 1;
        }
    };
    this.toSub = (parentIndex) => {
        $self.removeClass("design-act-zone").removeClass("panel-info");
        $self.addClass("design-act-subZone").addClass("panel-warning");
        this.parent = parentIndex;
    };
    this.getParent = () => this.parent;
    this.mark = () => {
        $self.children(".panel-body").after(hasSub);
        let $span = $self.find(".design-act-zone-hassub span");
        $span.click(() => {
            $self.next(".subZones").toggleClass("hidden");
            clearActivityMenu();
        });
    };
    this.demark = () => {
        let $mark = $self.find(".panel-body").next(".design-act-zone-hassub");
        $mark.remove();
    };
    //新建学习活动的按钮的click事件处理
    this.initFirstActivity = () => {
        $button = $content.find("button").eq(0);
        $button.click(() => {
            this.initActivityBtnHandler();
            this.adjustInitActivity($initActivity, 0);
            $self.find(".menu-box").eq(0).html($initActivity);
            this.resetActivityRadio();//重置选项
            $initActivity.find("input[name='activity-name']").eq(0).val("");//清空活动名
        });
    };
    //这里要立即执行该函数，实现第一次初始化的新建
    this.initFirstActivity();
    //新建学习活动/前后添加学习活动的具体时事件处理函数
    this.initActivityBtnHandler = function(pos = 0, target){
        clearActivityMenu();
        _addClass($initActivity.find(".alert"), "hidden");
        let $btn = $initActivity.find(".confirm-addActivity").eq(0);
            
        //新建活动的确认按钮点击
        $btn.click(function(){
            //pos = 0 新建/ pos = 1 insertAfter/ pos = -1 insertBefore
            const NAME = "activity-name",
                    SELECT = "activity-type-select";
            let $radiozone = $(this).parent().prev(),
                $warnMsg = $radiozone.find(".alert"),
                value = $radiozone.find(`input[name=${SELECT}]:checked`).val(),
                activityname = $radiozone.find(`input[name='${NAME}']`).val();

            //活动名称填写与活动类型选择了
            if(typeof value !== "undefined" && activityname !== ""){
                clearActivityMenu();
                _addClass($warnMsg, "hidden");

                let activityInfo = {
                    typename: activity.typemap(value),//pyramid
                    activityname: activityname//金字塔
                };

                that.addActivityNum(1);
                if(pos !== 0){
                    let index = nodelist.indexOf(target),
                        node = new Node(num++, activityInfo);
                    node.bindZone(that);
                    if(pos == 1){
                        //向后插入结点
                        nodelist.splice(index+1, 0, node);
                        $content.children().eq(index).after(node.self());
                    }else if(pos == -1){
                        //向前插入结点
                        nodelist.splice(index, 0, node);
                        $content.children().eq(index).before(node.self());
                    }
                    return false;
                }else if(pos == 0){
                    //默认值 新建节点
                    let node = new Node(num++, activityInfo);
                    node.bindZone(that);
                    nodelist.push(node);
                    $content.html("").append(node.self());
                    return false;
                }   
            }else{
                $warnMsg.removeClass("hidden");
                return;
            }
        });
    };
    //根据pos(1,-1)调整$initActivity中的panel-title的内容
    this.adjustInitActivity = ($init, pos) => {
        let $title = $init.find(".panel-title");
        if(pos == 1){
            $title.html("<b>向后添加新学习活动</b>");
        }else if(pos == -1){
            $title.html("<b>向前添加新学习活动</b>");
        }else{
            $title.html("选择活动类型");
        }
        $init.find("input[name='activity-name']").eq(0).val("");//清空活动名	
        return $init;
    };
    this.resetActivityRadio = () => {
        let radios = document.getElementsByName("activity-type-select");
        for(let radio of [...radios]){
            radio.checked = false;
        }
    };
    this.addActivityNum = (num) => {
        let num_old = Number.parseInt($number.html());
        $number.html(num_old + num);
    };
}









function Node(num, activityInfo){
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
                    <div class="col-sm-12 panel-content">
                        <label class="design-activity-name"></label>
                        <button class="btn btn-danger edit-activity-btn pull-right">
                            编辑
                            <span class="glyphicon glyphicon-edit"></span>
                        </button>
                    </div>
                    <br />
                    <div class="menu-box"></div>
                </div>
            </div>
            <span class="glyphicon glyphicon-triangle-bottom insertafter-node"
                title="向后添加新活动节点"></span>
        </div>
        `.trim()),
        zone = null, //父节点 - 区域zone的引用
        //箭头与删除图标
        $before = $self.find(".insertbefore-node"),
        $after = $self.find(".insertafter-node"),
        $delete = $self.find(".glyphicon-remove"),
        //几个区域与元素
        $heading = $self.find(".panel-heading"),
        $body = $self.find(".panel-body"),
        $title = $self.find(".design-act-node-title"),
        $activityName = $self.find(".design-activity-name");
    
    //根据typename修改title
    if(typeof activityInfo != "undefined"){
        $title.html(`<b>${activityInfo.typename}</b>`);
        $activityName.html(activityInfo.activityname);
    }
    //插入、删除的click响应后，将节点本身的引用传给Zone，再由Zone处理
    $before.click(() => {
        this.resetToggle(); zone.insertBefore(this);
    });
    $after.click(() => {
        this.resetToggle(); zone.insertAfter(this);
    });
    $delete.click(() => zone.deleteNode(this));

    //点击heading的折叠效果
    $heading.click(() => {
        $body.toggleClass("hidden");
        $heading.parent().toggleClass("panel-default").toggleClass("panel-toggle");
        if($body.hasClass("hidden")){
            $title.html(`<b>${activityInfo.typename}</b> - ${activityInfo.activityname}`);
        }else{
            $title.html(`<b>${activityInfo.typename}</b>`);
        }
    });
    
    /**
     * Node对外可见的方法
     * self - 返回自己的DOM引用
     * bindZone - 传入Zone的js对象引用，绑定至Node的zone变量
     * resetToggle - 将可能收缩的面板先还原
     */
    this.self = () => $self;
    this.bindZone = (that) => zone = that;
    this.resetToggle = () => {
        _removeClass($body, "hidden");
        _removeClass($heading.parent(), "panel-toggle");
        _addClass($heading.parent(), "panel-default");
        $title.html(`<b>${activityInfo.typename}</b>`);
    };
}

