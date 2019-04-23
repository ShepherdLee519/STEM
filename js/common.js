$(function(){
    console.log("Hello! - common.js");

    var querystring = window.location.search.substring(1);
    var pattern = /p=([a-zA-Z0-9]*)&?/g;
    pattern.exec(querystring);
    var p = RegExp.$1;
    [].forEach.call($("#top-navbar").children(), function(a){
        if($(a).hasClass("active")) $(a).removeClass("active");
    });
    $("#" + p + "-link").parent().addClass("active");

    
});