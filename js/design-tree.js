/**
 * author: Shepherd.Lee
 * Date: 2019-05-30
 * info: 学习结构
 * index:
 *      Tree()
 */

function Tree(){
    let that = this, 
        $div = $("#design-structureZone");

    let //私有方法
    getName = () => {
        let type = DATA.tasktype.toLowerCase();
        for(let obj of TASKTYPE){
            if(obj.task == type) return obj.name;
        }
        return "结构";
    },
    id = (node, index, parentIndex = -1) => {
        if(Number.parseInt(node.level) == 1){
            return `collapse-p${index}`;
        }else{
            return `collapse-p${parentIndex}-c${index}`;
        }
    },
    title = (node, index) => {
        if(Number.parseInt(node.level) == 1){
            return `任务${index+1}: <span class="tree-nodename">${node.nodename}</span>`;
        }else{
            return `子任务${index+1}: <span class="tree-nodename">${node.nodename}</span>`;
        }
    },
    panelType = (id) => {
        if(id.indexOf("-c") >= 0){
            return "panel-warning tree-panel-sub";
        }else if(id.indexOf("-p") >= 0){
            return "panel-info tree-panel-node";
        }else{
            return "panel-default tree-panel-root";
        }
    };



    /**
     * 对外可见方法
     */
    this.makeTree = (collapseId, title, collapseSubBody = "") => {
        //collapseId: collapse-p0-c2
        //title: 任务1: 需求分析
        let template = `
        <div class="panel ${panelType(collapseId)}">
            <div class="panel-heading tree-heading">
                <h4 class="panel-title tree-title">
                    <a data-toggle="collapse" data-parent="#accordion" 
                        href="#${collapseId}">
                        ${title}</a>
                </h4>
            </div>
            <div id="${collapseId}" class="panel-collapse collapse tree-collapse">
                <div class="panel-body tree-body">
                    ${collapseSubBody}
                </div>
            </div>
        </div>`.trim();
        return template;
    };

    this.clear = () => $div.html("");

    this.build = function(){
        that.clear();
        let nodes = DATA.nodes, 
            nodename = getName(),
            str = "";
        [...nodes].forEach((node, index) => {
            if(node.next == ""){
                str += that.makeTree(
                    id(node, index), 
                    title(node, index)
                );
            }else{
                let substr = "";
                [...node.next.nodes].forEach((sub, num) => {
                    substr += that.makeTree(
                        id(sub, num, index),
                        title(sub, num)
                    );
                });
                str += that.makeTree(
                    id(node, index),
                    title(node, index),
                    substr
                );
            }//end else
        });
        $div.append(that.makeTree(
            "collapse-root", nodename, str
        ));
        $div.find("#collapse-root").addClass("in");
    };

}
