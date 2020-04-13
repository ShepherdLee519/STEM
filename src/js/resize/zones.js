/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-13 21:15:46 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-13 21:55:34
 */

const objectivesZone = $('#design-objectives'); // 学习目标
const tasksZone = $('#design-tasks'); // 学习评价
const activitiesZone = $('#design-activities'); // 学习活动

const zones = [objectivesZone, tasksZone, activitiesZone];

/**
 * 对zones元素应用函数的封装\
 * anotherFunc将对index以外位置的元素调用
 * 
 * @param {Number} index 
 * @param {Function} func 
 * @param {Function} anotherFunc = null 
 */
function apply(index, func, anotherFunc = null) {
	func(this[index]);
	if (anotherFunc !== null) {
		for (let i = 0; i < this.length; i++) {
			if (i != index) anotherFunc(this[i]);
		}
	}
}
zones['apply'] = apply;

export { zones };