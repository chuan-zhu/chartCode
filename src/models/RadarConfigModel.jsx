import { Reducer, Effect, Subscription } from 'umi'
import { querySavewordCloudData } from '../services/chart-config'
import { initTitleConfig, initLegendConfig, initRadarConfig, initColorConfig, initTooltipConfig } from './initConfig'
const radarModel = {
    namespace: 'radarConfig',
    state: {
        title: { ...initTitleConfig },
        legend: { ...initLegendConfig },
        color: { ...initColorConfig },
        tooltip: { ...initTooltipConfig },
        radar: { ...initRadarConfig },
        indicator: [
            '销售（Sales）',
            '管理（Administration）',
            '信息技术（Information Technology）',
            '客服（Customer Support）',
            '研发（Development）',
            '市场（Marketing）'
        ],
        data:
         [
            {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '销量'
            },
            {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '库存'
            }
        ],
        // {
        //     Beijing: ['Tiananmen', 'Great Wall'],
        //     Shanghai: ['Oriental Pearl', 'The Bund'],
        //   }
    },
    reducers: {
        // 更新配置
        update(state, action) {
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
    effects: {
        // *queryData({payload},{put,call}){
        //     // const data = [{cc:2312312,dd:'sdfsdf'}]
        //     const data = yield call(querywordCloudData)
        //     console.log(data)
        //     yield put({
        //         type:'save',
        //         payload:data
        //     })
        // },
        *querySaveConfig({ payload }, { put, call }) {
            const data = yield call(querySavewordCloudData)
        }
    },
    // 用于订阅一个数据源，然后根据需要 dispatch 相应的 action
    subscriptions: {
        setup({ dispatch, history }) {
            // dispatch(action)
            return history.listen(({ pathname }, action) => {
                if (pathname == '/echart/wordCloud') {
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
export default radarModel