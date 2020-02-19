/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * info: 界面的一些切换效果
 * index:
 *      initToggles()
 *      toggleTrigger()
 */

$(function(){
    _hello("design-animation");
});

function initToggles(){
    // 相关的动画效果见design-animation-style.css
    const right = "&gt;&gt;", left = "&lt;&lt;";
    let $btn1 = $("#togglebtn1");
    let zone1 = $("#design-objectives"),
        zone2 = $("#design-tasks"),
        zone3 = $("#design-activities");

    function addAnimations(type){
        zone1.addClass(`${type}-objectives`);
        zone2.addClass(`${type}-tasks`);
        zone3.addClass(`${type}-activities`);
        // log(zone1.attr("class") + " " + zone2.attr("class") + " " + zone3.attr("class"));
    }

    function removeAnimations(){
        [zone1, zone2, zone3].forEach((zone) => {
            let zone_class = $(zone).attr("class");
            zone_class = (zone_class.split(" "))[0];
            $(zone).attr("class", zone_class);
        });
        // log(zone1.attr("class") + " " + zone2.attr("class") + " " + zone3.attr("class"));
    }

    $btn1.click(function(){
        removeAnimations();
        switch($(this).attr("data-direction")){
            case "left":
                $(this).html(right);
                $(this).attr("data-direction", "right");
                addAnimations("toggleRight");
                break;
            case "right":
                $(this).html(left);
                $(this).attr("data-direction", "left");
                addAnimations("toggleLeft");
                break;
        }
    });
}






function toggleTrigger(type){
    return new Promise(function(resolve){
        let $btn1 = $("#togglebtn1"),
        direction = $btn1.attr("data-direction");
        switch(type){
            case "on":
                if(direction === "left"){
                    // $btn1.click();
                    resolve();
                }
                break;
            case "off":
                if(direction === "right"){
                    // $btn1.click();
                    resolve();
                }
                break;
        }
    }).then(() => {
        $("#togglebtn1").click();
    });
    // let $btn1 = $("#togglebtn1"),
    //     direction = $btn1.attr("data-direction");
    // switch(type){
    //     case "on":
    //         if(direction === "left"){
    //             $btn1.click();
    //         }
    //         break;
    //     case "off":
    //         if(direction === "right"){
    //             $btn1.click();
    //         }
    //         break;
    // }
}