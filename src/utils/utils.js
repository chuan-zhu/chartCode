/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
/**
 * 格式化表单内容，
 * 对于表单中输入框的内容改装成数组
 * @param {*} newFormValue 
 */
export function formateFormData(newFormValue) {
  Object.keys(newFormValue).forEach(item => {
    if (typeof (newFormValue[item]) == "string") {
      let isArr = newFormValue[item].indexOf(',')
      if (isArr != -1 && newFormValue[item]) {
        try {
          // 数字类型的改装成数组
          newFormValue[item] = JSON.parse("[" + newFormValue[item] + "]")
        } catch (e) {
          // 字符串类型的,直接拆分成数组
          newFormValue[item] = newFormValue[item].split(',')
        }
      }
    }
  })
  return newFormValue
}
/**
 * 防抖函数
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
export function deBounce(func, wait) {
  let timeOut = null;
  return function (...args) {
    clearTimeout(timeOut);//一定要清除定时器
    timeOut = setTimeout(() => {
      func(...args);
    }, wait);
  };
}



