/**
 * author: Shepherd.Lee
 * Date: 2019-07-30
 * version: 2.0.0
 * info: 学习活动表单的可编辑效果 由各个view.html使用script标签导入
 */

$(function(){
    $("td").off("click").click(function(event){
        //已经有input，跳过
        if($(this).children("input").length > 0) 
            return false;
        
        let tdObj = $(this),
            preText = tdObj.html(),
            inputObj = $(`<input type="text" />`);
        
        tdObj.html("");
        inputObj
            .width(tdObj.width())
            .height(tdObj.height())
            .css({border:"0px", fontSize:"17px",font:"宋体"})
            .val(preText).appendTo(tdObj)
            .trigger("focus").trigger("select");
    
        inputObj.keyup(function(event){
            if(13 == event.which){
                //按下回车
                let text = $(this).val();
                tdObj.html(text);
            }else if(27 == event.which){
                //ESC键
                tdObj.html(preText);
            }
        });
        inputObj.click(function(){
            return false;
        });
    }); 
})