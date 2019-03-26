$(function(){
    console.log("hello");
    var scienceStd = [
        {
            "firstTitle" : "科学课标一",
            "childrenTitles" : [
                '科学课标1.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。', 
                '科学课标1.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字'
                + ':测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。',
                '科学课标1.3:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，', 
                '科学课标1.4'
            ]
        },
        {
            "firstTitle" : "科学课标二",
            "childrenTitles" : [
                '科学课标2.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '科学课标2.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '科学课标2.3'
            ]
        }
    ];
    var technologyStd = [
        {
            "firstTitle" : "技术课标一",
            "childrenTitles" : [
                '技术课标1.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。', 
                '技术课标1.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字'
                + ':测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。',
                '技术课标1.3:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
            ]
        },
        {
            "firstTitle" : "技术课标二",
            "childrenTitles" : [
                '技术课标2.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '技术课标2.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '技术课标2.3:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字'
            ]
        },
        {
            "firstTitle" : "技术课标三",
            "childrenTitles" : [
                '技术课标3.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '技术课标3.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '技术课标3.3:测试文字，测试文字，测试文字'
            ]
        }
    ];
    var engineeringStd = [
        {
            "firstTitle" : "工程课标一",
            "childrenTitles" : [
                '工程课标1.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。', 
                '工程课标1.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字'
                + ':测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。',
                '工程课标1.3:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '工程课标1.4:测试文字，测试文字',
                '工程课标1.5'
            ]
        },
    ];
    var mathematicsStd = [
        {
            "firstTitle" : "数学课标一",
            "childrenTitles" : [
                '数学课标1.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。', 
                '数学课标1.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字'
                + ':测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。',
                '数学课标1.3:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，', 
                '数学课标1.4'
            ]
        },
        {
            "firstTitle" : "数学课标二",
            "childrenTitles" : [
                '数学课标2.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '数学课标2.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '数学课标2.3'
            ]
        },
        {
            "firstTitle" : "数学课标三",
            "childrenTitles" : [
                '数学课标1.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。', 
                '数学课标1.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字'
                + ':测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字。',
                '数学课标1.3:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，', 
                '数学课标1.4'
            ]
        },
        {
            "firstTitle" : "数学课标四",
            "childrenTitles" : [
                '数学课标2.1:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，'
                + '测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '数学课标2.2:测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，测试文字，',
                '数学课标2.3'
            ]
        }
    ];
    (function(){
        var $science = $("#baseinfo-course-science");
        var $technology = $("#baseinfo-course-technology");
        var $engineering = $("#baseinfo-course-engineering");
        var $mathematics = $("#baseinfo-course-mathematics");

        var stds = [];
        stds.push(scienceStd, technologyStd, engineeringStd, mathematicsStd);
        stdzones = [];
        stdzones.push($science, $technology, $engineering, $mathematics);

        for(var i = 0; i < stds.length; i++){
            var ul = document.createElement("ul");
            var Std = stds[i];
            for(var index in Std){
                var li = document.createElement("li");
                $(li).append("<h4>" + Std[index]["firstTitle"] + "</h4>");
                var subul = document.createElement("ul");
                li.append(subul);
                for(var j in Std[index]["childrenTitles"]){
                    var subli = document.createElement("li");
                    $(subli).append(Std[index]["childrenTitles"][j]);
                    subul.append(subli);
                }
                ul.append(li);
            }
            stdzones[i].append(ul);
        }
    }());
});

function editTheme(){
    $name = $("#baseinfo-theme-name").val();
    $describe = $("#baseinfo-theme-describe").val();
    $people = $("#baseinfo-theme-people").val();
    $("#baseinfo-theme-name-view").val($name);
    $("#baseinfo-theme-describe-view").val($describe);
    $("#baseinfo-theme-people-view").val($people);
    $("#editTheme").modal("hide");
}

$("#baseinfo-subject-checkbox").change(function() { 
    var $checkbox = $("#baseinfo-subject-checkbox input[type=checkbox]:checked");
    var $divs = $("#courseDivs div");
    for(var i=0; i<4; i++){
        $divs.eq(i).addClass("hidden");
    }
    for(i=0; i<$checkbox.length; i++){
        var value = $checkbox.eq(i).val();
        if($divs.eq(value - 1).hasClass("hidden"))
            $divs.eq(value - 1).toggleClass("hidden");
    }
});