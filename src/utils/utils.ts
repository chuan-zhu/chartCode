/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};
/**
 * 格式化表单内容，
 * 对于表单中输入框的内容改装成数组
 * @param {*} newFormValue 
 */
 export function formateFormData(newFormValue:object) {
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
export function deBounce(func:()=>void, wait:number) {
  let timeOut : any = null;
  return function (...args: any) {
    clearTimeout(timeOut);//一定要清除定时器
    timeOut = setTimeout(() => {
      func(...args);
    }, wait);
  };
}