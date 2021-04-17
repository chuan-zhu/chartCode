/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from './action-types'
import storageUtils from "../utils/storageUtils";

/*
设置头部标题的同步action
 */
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

/*
接收用户的同步action
 */
export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })

/*
退出登陆的同步action
 */
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  // 返回action对象
  return { type: RESET_USER }
}

/*
登陆的异步action
 */
export const login = (username, password) => {
  return async dispatch => {
    dispatch(showErrorMsg('a'))
  }
}




