/**
 * author: Shepherd.Lee
 * Date: 2019-05-30
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
 *      Node()
 *          > self()
 *          > bindZone()
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
        $content = $self.find(".design-act-zone-content");
    
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
     * resetActivityRadio - 重置新建活动列表中的radio选项
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
        $self.find(".panel-body").after(hasSub);
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
            clearActivityMenu();
            _addClass($initActivity.find(".alert"), "hidden");
            let $btn = $initActivity.find(".confirm-addActivity").eq(0),
                that = this;
            $btn.click(function(){
                const NAME = "activity-type-select";
                let $radiozone = $(this).parent().prev(),
                    value = $radiozone.find(`input[name=${NAME}]:checked`).val(),
                    $warnMsg = $radiozone.find(".alert");
                if(typeof value !== "undefined"){
                    clearActivityMenu();
                    _addClass($warnMsg, "hidden");
                    log(value);
                    // TODO
                    let node = new Node(num++, activity.typemap(value));
                    node.bindZone(that);
                    nodelist.push(node);
                    $content.html("").append(node.self());
                    return false;
                }else{
                    $warnMsg.removeClass("hidden");
                    return;
                }
            });
            
            $self.find(".menu-box").eq(0).html($initActivity);
            this.resetActivityRadio();
        });
    };
    //这里要立即执行该函数，实现第一次初始化的新建
    this.initFirstActivity();
    this.resetActivityRadio = () => {
        let radios = document.getElementsByName("activity-type-select");
        for(let radio of [...radios]){
            radio.checked = false;
        }
    };
}









function Node(num, typename){
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
    
    //根据typename修改title
    if(typeof typename != "undefined"){
        $self.find(".design-act-node-title").html(`<b>${typename}</b>`);
    }
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
