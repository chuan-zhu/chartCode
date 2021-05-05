import { Reducer, Effect, Subscription } from 'umi'
import { querySaveBarData } from '../services/chart-config'
const articleModel = {
    namespace: 'articleList',
    state: {
        list: [
            {
                href: 'https://www.jianshu.com/p/5c1346bb2fb3',
                title: `Chrome进程`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['Chrome', '进程'],
                content: 'Chrome 进程架构：包含1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程',
            },
            {
                href: 'https://www.jianshu.com/p/cf1094f1d77b',
                title: `TCP协议中的三次握手和四次挥手`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['TCP协议', '三次握手', '四次挥手'],
                content: 'TCP 提供面向有连接的通信传输。面向有连接是指在数据通信开始之前先做好两端之间的准备工作。'
            },
            {
                href: 'https://www.jianshu.com/p/626f83108233',
                title: `浏览器的垃圾回收机制`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['浏览器', '垃圾回收'],
                content: '不论什么类型的垃圾回收器，它们都有一套共同的执行流程。 第一步是标记空间中活动对象和非活动对象。 第二步是回收非活动对象所占据的内存。第三步是做内存整理。最后一步需要整理这些内存碎片。'
            },
            {
                href: 'https://www.jianshu.com/p/2a155fc906d0',
                title: `TCP协议`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['TCP协议', ' IP', 'UDP'],
                content: 'IP 负责把数据包送达目的主机。UDP 负责把数据包送达具体应用（可能会丢包)。而 TCP 保证了数据完整地传输，它的连接可分为三个阶段：建立连接、传输数据和断开连接。'
            },
            {
                href: 'https://www.jianshu.com/p/49e83687c6dc',
                title: `地址栏输入URL到页面展示的过程`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['地址栏', 'IPC','三次握手', '四次挥手','渲染'],
                content: '1、用户输入关键词，地址栏判断是搜索内容还是url地址。 如果是搜索内容，会使用浏览器默认搜索引擎加上搜索内容合成url；如果是域名会加上协议（如https）合成完整的url。 2、然后按下回车。浏览器进程通过IPC（进程间通信）把url传给网络进程（网络进程接收到url才发起真正的网络请求）。 3、网络进程接收到url后，先查找有没有缓存...'
            },
            {
                href: 'https://www.jianshu.com/p/722dccced4da',
                title: `块级作用域的理解`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['变量提升', '块级作用域', '执行上下文','词法环境','栈结构'],
                content: '块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了'
            },
            {
                href: 'https://www.jianshu.com/p/1f96283b5f8a',
                title: `作用域链和闭包 `,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['作用域链', '词法作用域', '闭包','回收'],
                content: '在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。'
            },
            {
                href: 'https://www.jianshu.com/p/00c7bbb2f543',
                title: `CSS 实现水平垂直居中的方式`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['`CSS', '水平垂直居中'],
                content: '实现方式分为两类：1、已知元素的宽高确定 2、元素宽高不定（常问）'
            },
            {
                href: 'https://www.jianshu.com/p/88835774b0a4',
                title: `ES6 promise理解`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['Promise ', '异步编程', '状态'],
                content: '从语法上Promise 是一个构造函数；从功能上promise 对象用来封装一个异步操作并可以获取其结果'
            },
            {
                href: 'https://www.jianshu.com/p/86b53c59ee5d',
                title: `js中解决异步编程的方案`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: [ '异步编程','回调函数', '事件监听','promise','async/await'],
                content: 'js中解决异步编程的方案目前有四种'
            },
            {
                href: 'https://www.jianshu.com/p/2010d021cfd8',
                title: `JS8种数据类型`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['js ', '数据类型'],
                content: 'JS数据类型分为两类原始数据类型和引用数据类型'
            },
            {
                href: 'https://www.jianshu.com/p/086192204434',
                title: `webpack基础配置总结`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: ['webpack'],
                content: 'webpack五个核心概念（入口Entry、输出Output、Loader、插件Plugins、模式(Mode）'
            },
        ],
        projectList:[
            {
                title:'图表配置',
                description:['Antd','umi','Dva','react','echarts']
            },
            {
                title:'艺术品电商WebApp',
                description:['Vant-UI','Swiper','Vue','webpack']
            },
            {
                title:'小程序',
                description:['WXML']
            }
        ]
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
        //     const data = yield call(querybarData)
        //     console.log(data)
        //     yield put({
        //         type:'save',
        //         payload:data
        //     })
        // },
        *querySaveConfig({ payload }, { put, call }) {
            const data = yield call(querySaveBarData)
        }
    },
    // 用于订阅一个数据源，然后根据需要 dispatch 相应的 action
    subscriptions: {
        setup({ dispatch, history }) {
            // dispatch(action)
            return history.listen(({ pathname }, action) => {
                if (pathname == '/PersonCenter') {
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
export default articleModel