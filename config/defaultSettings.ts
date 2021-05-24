import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  "navTheme": "light",
  "primaryColor": "#1890ff",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": true,
  "title": "可视化代码生成工具",
  "pwa": false,
  "iconfontUrl": "",
  "menu": {
    "locale": true
  },
  "headerHeight": 48,
  "footerRender": false,
  "splitMenus": false,
}

export default Settings;
