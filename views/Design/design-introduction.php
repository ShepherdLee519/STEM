<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * info:
 *      design.php中导入，作为第二栏
 *      学习评价部分的主要内容的html编写(文本为主)
 *      注：_space函数见helper.php
 */
?>

<p><?php _space();?>在本模块中，需要您构建STEM课程的任务模式（课程单元）。我们已经为您准备好了一些模式可供选择。</p>
    <!-- 您可以选择我们已为您准备好的模式，也可以根据您的设计风格自由定制模式。</p> -->

<p><?php _space();?>具体内容如下：</p>

<p><b>基于设计的学习：</b>学生会面对真实的劣构性问题，他们需要设计/创造一个能解决问题的产品
（如，防止水土流失的堤坝）。其特征是具有设计——再设计的循环过程。</p>

<p><b>基于探究的学习：</b>学生会在早期提出自己的问题，并展开实验或探究来获取证据得出结论。
其特征是具有教师引导的知识迁移环节。</p>

<p><b>基于问题的学习：</b>学生根据教师提出的问题情境（案例）即问题展开自主学习，解决方案的
主要形式为小组汇报，其重点是为掌握知识内容。</p>

<p><b>知识建构：</b>学生组成学生群体，对知识展开探讨，通过探究与论证建构集体认知。
其特征是学生自由发表观点，可通过协作不断改进观点。</p>
<br />

<!-- <h4>二、定制模式</h4>
<p><?//php _space();?>如果上述模式不能满足您的需求，您可以自由定制模式，跳转至定制模式界面，选择已有的任务块或
添加自定义任务块组成新任务模式，回到本页面进行模式选择。<b>任务模式选择完毕后，您可以对其进行模式嵌套，
以一种模式为主要任务环节，将其他模式嵌入某个任务块内，如知识建构模式嵌入基于问题的学习中自主学习任务块，
完成模式的嵌套。</b></p> -->


<b style="color:skyblue;font-size:110%;">下面请进行任务模式选择:</b>
<?php
    $tasks = array("dbl", "ibl", "pbl", "kc");
    $names = array("基于设计的学习", "基于探究的学习", "基于问题的学习", "知识建构");
    $number = array(5, 4, 3, 4);//每个task类型的节点数目，即图片数目
    $labels = array(
        array("需求分析", "设计方案", "评价测试", "改进设计", "汇报与反思"),
        array("自主探究", "分析解释", "迁移", "汇报与反思"),
        array("分析问题", "自主学习", "方案反思"),
        array("个人准备", "分组讨论", "深入讨论", "总结反思")
    );
?>
<ul class="list-unstyled" id="designIntro-selectModal">
    <?php  
        for($i = 0; $i < count($tasks); $i++){
            ?>
            <!-- 先显示一个radio -->
            <li>
            <div class="col-md-3">
                <div class='radio'>
                    <label>
                        <input type='radio' name='design-taskSelect' 
                            value="<?php echo $tasks[$i];?>">
                        <?php echo $names[$i];?>
                    </label>
                </div>
            </div>
            <!-- 再显示该模式的所有图片 -->
            <div class="col-md-9 row-level">
                <?php
                    for($j = 0; $j < $number[$i] && $number[$i] != 0; $j++){
                        ?>
                        <div class="col text-center">
                            <div class="img-zone" style="height:60px;">
                                <img width=60 src="<?php 
                                    $PATH = "image/nodes/";
                                    echo $PATH.strtoupper($tasks[$i]).'/'.strtoupper($tasks[$i])."-".($j+1).".png";?>">
                            </div>
                            <label>
                                <?php echo $labels[$i][$j];?>
                            </label>
                        </div>
                        <?php
                    }
                ?>
            </div>   
            </li>
            <?php
        }
    ?>
</ul>