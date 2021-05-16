import { Reducer, Effect, Subscription } from 'umi'
import { querySaveliquidfillData } from '../services/chart-config'
const dataSetModel = {
    // 数据集model
    namespace: 'dataSet',
    state: {
        dataSource: [
            {
                key: 0,
                name: '2020年销售情况',
                data: [{
                    key: '0',
                    name: '毛衣',
                    value: (Math.random() * 100).toFixed(0),
                },
                {
                    key: '1',
                    name: '裤子',
                    value: (Math.random() * 100).toFixed(0),
                },
                {
                    key: '2',
                    name: '羽绒服',
                    value: (Math.random() * 100).toFixed(0),
                },
                {
                    key: '3',
                    name: '帽子',
                    value: (Math.random() * 100).toFixed(0),
                },
                {
                    key: '4',
                    name: '短裙',
                    value: (Math.random() * 100).toFixed(0),
                },
                {
                    key: '5',
                    name: '风衣',
                    value: (Math.random() * 100).toFixed(0),
                }]
            }
        ],
        editTarget: 0,
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

    },
    // 用于订阅一个数据源，然后根据需要 dispatch 相应的 action
    subscriptions: {
        setup({ dispatch, history }) {
            // dispatch(action)
            return history.listen(({ pathname }, action) => {
                if (pathname == '/welcome') {
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
export default dataSetModel