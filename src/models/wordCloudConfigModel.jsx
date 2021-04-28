import {Reducer,Effect,Subscription } from 'umi'
import {querySaveliquidfillData} from '../services/chart-config'
import {initTitleConfig,initLegendConfig,initGridConfig,initXAxisConfig,initYAxisConfig,initColorConfig,initTooltipConfig,initLiquidfillConfig} from './initConfig'
const liquidfillConfigModel = {
    namespace:'liquidfillConfig',
    state:{
        title:{...initTitleConfig},
        legend:{...initLegendConfig},
        grid:{...initGridConfig},
        xAxis:{...initXAxisConfig},
        yAxis:{...initYAxisConfig},
        color:{...initColorConfig},
        tooltip:{...initTooltipConfig},
        liquidfill:{...initLiquidfillConfig}
    },
    reducers:{
        // 更新配置
        update(state,action){
            return {
                ...state,
                ...action.payload
            }

        },
        save(state, action) {
            return {
              ...state,
              ...action.payload
            }
          },
        
    },
    // 这里是异步调用，里面的函数都是generate函数
    effects:{
        // *queryData({payload},{put,call}){
        //     // const data = [{cc:2312312,dd:'sdfsdf'}]
        //     const data = yield call(queryliquidfillData)
        //     console.log(data)
        //     yield put({
        //         type:'save',
        //         payload:data
        //     })
        // },
        *querySaveConfig({payload},{put,call}){
            const data = yield call(querySaveliquidfillData)
        }
    },
    // 用于订阅一个数据源，然后根据需要 dispatch 相应的 action
    subscriptions:{
        setup({dispatch,history}){
            // dispatch(action)
            return history.listen(({pathname},action)=>{
                if(pathname == '/echart/liquidfill'){
                    // 这是同步的
                    // dispatch({
                    //     type:'getList'
                    // })
                    // 这个是异步的
                    // dispatch({
                    //     type:'queryData'
                    // })
                }
            })
        }
    }
}
export default liquidfillConfigModel