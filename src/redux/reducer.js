/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import { combineReducers } from 'redux'

/*
用来管理头部标题的reducer函数
 */
import storageUtils from "../utils/storageUtils"
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  
  CONFIG,
  LINE_CONFIG
} from './action-types'

import {
  title_config, legend_config, grid_config, xAxis_config, yAxis_config, color_config, tooltip_config,
  bar_config, line_config
} from './initChartConfig'

const initHeadTitle = ''

function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
      return { ...state, errorMsg }
    case RESET_USER:
      return {}
    default:
      return state
  }
}

// const barConfigObj = Object.assign(titleConfigs, legend_config,grid_config,xAxis_config,yAxis_config)
const barConfigObj = {
  title: { ...title_config },
  legend: { ...legend_config },
  grid: { ...grid_config },
  xAxis: { ...xAxis_config },
  yAxis: { ...yAxis_config },
  color: { ...color_config },
  tooltip: { ...tooltip_config },
  bar: { ...bar_config },
}
function barConfig(state = barConfigObj, action) {
  switch (action.type) {
    case CONFIG:
      return action.payload
    default:
      return state
  }
}
const lineConfigObj = {
  title: { ...title_config },
  legend: { ...legend_config },
  grid: { ...grid_config },
  xAxis: { ...xAxis_config },
  yAxis: { ...yAxis_config },
  color: { ...color_config },
  tooltip: { ...tooltip_config },
  line: { ...line_config },
}
function lineConfig(state = lineConfigObj, action) {
  switch (action.type) {
    case LINE_CONFIG:
      return action.payload
    default:
      return state
  }
 } 
/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
  headTitle,
  user,
  barConfig,
  lineConfig
})




