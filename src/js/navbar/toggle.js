/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 00:16:14 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 02:23:52
 */

let $toggleBtn = $("#togglebtn");
const right = "&gt;&gt;", left = "&lt;&lt;";
let zone1 = $("#design-objectives"),
    zone2 = $("#design-tasks"),
    zone3 = $("#design-activities");

function addAnimations(type){
    zone1.addClass(`${type}-objectives`);
    zone2.addClass(`${type}-tasks`);
    zone3.addClass(`${type}-activities`);
}

function removeAnimations(){
    [zone1, zone2, zone3].forEach((zone) => {
        let zone_class = $(zone).attr("class");
        zone_class = (zone_class.split(" "))[0];
        $(zone).attr("class", zone_class);
    });
}

$toggleBtn.click(function(){
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


export function toggleTrigger(type){
    return new Promise(function(resolve){
        let direction = $toggleBtn.attr("data-direction");
        switch(type){
            case "on":
                if(direction === "left") resolve();
                break;
            case "off":
                if(direction === "right") resolve();
                break;
        }
    }).then(() => {
        $toggleBtn.click();
    });
}