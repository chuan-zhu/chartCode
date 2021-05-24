项目初始化使用 [Ant Design Pro]

## 项目名称 ：可视化代码生成器工具

## 项目简介 ： 
顾名思义，这是可以页面控制用来生成可视化代码的一套工具。由于工作上经常用到echarts来配置图表，网上又没有方便调节的工具，便自己开发了一套，目前开发的图表内容还很有限，主要是工作中使用频率较高的配置。当然其他图表库也很优秀，比如highcharts、AntV G2、D3，除了D3，他们的配置方式都很类似，尤其是AntV G2，衍生出的非常方便的工具都可以在官网找到。
本项目还有非常多可以优化的内容，后续也会逐步完善。

## 项目技术栈

react^17.0.0 + dva + webpack + umi^3.4.0 + echarts^5.1.0 + antd^4.14.0


## 项目运行


```
git clone --depth 1 https://github.com/chuan-zhu/chartCode.git

cd react 

npm install 

npm start 
```
#### 注意

其他命令
```
npm start:dev
npm start:no-ui
```
检查代码命令

```bash
npm run lint
```

自动修复错误命令
```bash
npm run lint:fix
```

构建命令
```
npm run build (打包，部署)

```

## 说明

>  开发环境 win10  Chrome 63.0.3239.132（正式版本） （32 位） nodejs v12.19.0

>  如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐安装yarn 运行，语法和npm稍微有点不同

```
yarn install
yarn start

```

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

## 功能一览
- [√] 项目按路由模块加载，页面配置水印
- [√] 登录，以及登录权限控制
- [√] 退出
- [√] 欢迎主页,初始化数据
- [√] 左侧菜单，正常mini切换
- [√] 页面高度flex自适应
- [√] 实时的webpack包大小预览,方便优化
- [√] 图表配置器（目前有柱图、线图、饼图、水球图、地图、词云图、雷达图）
- [√] 个人中心




