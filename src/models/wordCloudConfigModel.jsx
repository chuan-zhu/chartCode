import {Reducer,Effect,Subscription } from 'umi'
import {querySavewordCloudData} from '../services/chart-config'
import {initTitleConfig,initLegendConfig,initGridConfig,initXAxisConfig,initYAxisConfig,initColorConfig,initTooltipConfig,initWordCloudConfig} from './initConfig'
const wordCloudConfigModel = {
    namespace:'wordCloudConfig',
    state:{
        title:{...initTitleConfig},
        legend:{...initLegendConfig},
        grid:{...initGridConfig},
        xAxis:{...initXAxisConfig},
        yAxis:{...initYAxisConfig},
        color:{...initColorConfig},
        tooltip:{...initTooltipConfig},
        wordCloud:{...initWordCloudConfig},
        data:[
            { name: "河北省", value: "111" },
            { name: "山西省", value: "222" },
            { name: "辽宁省", value: "458" },
            { name: "吉林省", value: "445" },
            { name: "黑龙江省", value: "456" },
            { name: "江苏省", value: "647" },
            { name: "浙江省", value: "189" },
            { name: "安徽省", value: "864" },
            { name: "福建省", value: "652" },
            { name: "江西省", value: "458" },
            { name: "山东省", value: "445" },
            { name: "河南省", value: "456" },
            { name: "湖北省", value: "647" },
            { name: "湖南省", value: "189" },
            { name: "广东省", value: "864" },
            { name: "海南省", value: "652" },
            { name: "四川省", value: "458" },
            { name: "贵州省", value: "445" },
            { name: "云南省", value: "456" },
            { name: "陕西省", value: "647" },
            { name: "甘肃省", value: "189" },
            { name: "青海省", value: "864" },
            { name: "台湾省", value: "652" },
            { name: "内蒙古自治区", value: "456" },
            { name: "广西壮族自治区", value: "647" },
            { name: "西藏自治区", value: "189" },
            { name: "宁夏回族自治区", value: "864" },
            { name: "新疆维吾尔自治区", value: "652" },
        ]
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
        //     const data = yield call(querywordCloudData)
        //     console.log(data)
        //     yield put({
        //         type:'save',
        //         payload:data
        //     })
        // },
        *querySaveConfig({payload},{put,call}){
            const data = yield call(querySavewordCloudData)
        }
    },
    // 用于订阅一个数据源，然后根据需要 dispatch 相应的 action
    subscriptions:{
        setup({dispatch,history}){
            // dispatch(action)
            return history.listen(({pathname},action)=>{
                if(pathname == '/echart/wordCloud'){
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
export default wordCloudConfigModel