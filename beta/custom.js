$(function(){
    initRadios();
    initCheckboxes();
    initAddNew();
    initCreateNode();
});


function initRadios(){
    var obj = {
        "Old":{"title":"从自定义模式库中"},
        "New":{"title":"新建自定义模式" },
        "Ori":{"title":"自定义模式" }
    },
    now = "Ori";

    $("input:radio[name='customRadio']").click(() => {
        let val = $("input:radio[name='customRadio']:checked").val();
        $("#formRadios").hide();
        $(`#form${val}`).removeClass("hidden");
        $("#panelTitle").html(obj[val].title);
        $("#wrapper").removeClass("col-md-3").addClass("col-md-5");
        now = val;
    });
    $("button.confirmBtn").click(() => false);
    $("button.cancelBtn").click(() => {
        $("#formRadios").show();
        $(`#form${now}`).addClass("hidden");
        $("#panelTitle").html(obj["Ori"].title);
        $("#wrapper").removeClass("col-md-5").addClass("col-md-3");
        now = "Ori";
        $("input:radio[name='customRadio']:checked")[0].checked = false;
        return false;
    });
}


function initCheckboxes(){
    for(let i = 1; i <= 4; i++){
        $(`input[name ^= 'color-input-${i}']`).change(function(){
            clearCheckboxes(i);
            let title = $(this).parent().parent().find(".li-title p").html(),
                flag = $(this)[0].checked;
            $("#selectedModel").html(flag?title:"暂无");
        });  
    }

    function clearCheckboxes(except){
        for(let i = 1; i <= 4; i++){
            if(i == except) continue;
            else{
                $("input[name ^= 'color-input-']")[i-1].checked = false;
            }
        }
    }
}


function initAddNew(){
    var $selectedNodeZone = $("#selectedNodeZone"),
        $demo = $("#selectedNode-demo");

    $(".add-to-right").click(function(){
        let img_src = $(this).parent().parent().find("img").eq(0).attr("src"),
            title = $(this).parent().parent().find(".taskModal-nodename").html();
        
        let $newNode = $demo.clone(true);
        $newNode.removeClass("hidden")
            .find("img").eq(0).attr("src", img_src);
        $newNode.find(".taskModal-nodename").html(title);
        $newNode.appendTo($selectedNodeZone);
    });

    $(".back-to-left").click(function(){
        $(this).parent().remove();
    });
}



function initCreateNode(){
    let $trigger = $("#createNewNode"),
        $target = $("#panelNewNode");
    
    $trigger.click(() => {
        $target.removeClass("hidden");
    });

    $("#confirmCreate").click(() => {
        let name = $("#newNodeName").val();
        $("#newNodeDemo").removeClass("hidden");
        $("#newNodeDemo").find(".taskModal-nodename").html(name);
        $("#cancelCreate").click();
        $("#newNodeDemo").find(".add-to-right").click();
        
        let scrollHeight = $('#selectedNodeZone').parent().prop("scrollHeight");
        $('#selectedNodeZone').parent().animate({scrollTop:scrollHeight}, 400);
        scrollHeight = $('#selectNodeZone').parent().prop("scrollHeight");
        $('#selectNodeZone').parent().animate({scrollTop:scrollHeight}, 400);
        return false;
    });
    $("#cancelCreate").click(() => {
        $target.addClass("hidden");
        return false;
    });
}