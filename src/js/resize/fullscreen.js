/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-13 21:01:24 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-14 03:13:52
 */

import { zones } from './zones';

const Fullscreen = 'glyphicon-fullscreen';
const Smallscreen = 'glyphicon-resize-small';

const $span_temp = $(`
    <span class='glyphicon glyphicon-fullscreen fullscreen-btn'
        title='点击全屏化当前区域'></span>
`);

zones.forEach( (zone, index) => {
    if (index == 0) return;
    const $span = $span_temp.clone();
    $span.data('index', index);
    $span.appendTo( $(zone).find('> div:first-child'));
});


let class_backup;
$('.fullscreen-btn').click(function() {
    const $this = $(this);
    const index = $this.data('index');

    if ( $this.hasClass(Fullscreen) ) {
        zones.apply(index, $zone => {
            class_backup = $zone.attr('class');
            $zone.removeClass(class_backup).addClass('fullscreen');
        }, $zone => {
            $zone.addClass('hidden');
        });
        $this.removeClass(Fullscreen).addClass(Smallscreen);
    } else {
        zones.apply(index, $zone => {
            $zone.addClass(class_backup).removeClass('fullscreen');
        }, $zone => {
            $zone.removeClass('hidden');
        });
        $this.removeClass(Smallscreen).addClass(Fullscreen);
    }
});