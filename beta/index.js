$(function(){
    loadDB_test();
    initSpan();
    initInputFocus();
});


function initSpan(){
    let $span = $("<span class='glyphicon glyphicon-fullscreen' id='fullScreen'></span>");
    $span.appendTo($("#design-activities > div:first-child"));

    let $zone1 = $("#design-objectives"),
        $zone2 = $("#design-tasks"),
        $zone3 = $("#design-activities");

    $span.click(function(){
        if($(this).hasClass("glyphicon-fullscreen")){
            $zone1.addClass("hidden");
            $zone2.addClass("hidden");
            $zone3.removeClass("col-md-1").addClass("fullscreen");

            $span.removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
        }
        else{
            $zone1.removeClass("hidden");
            $zone2.removeClass("hidden");
            $zone3.addClass("col-md-1").removeClass("fullscreen");

            $span.addClass("glyphicon-fullscreen").removeClass("glyphicon-resize-small");
        }
    });
}



function initInputFocus(){
    let id = "#courseTheme-themeName",
        $input = $(id);

    $input.change(function(){
        log($(this).val());
    });
}