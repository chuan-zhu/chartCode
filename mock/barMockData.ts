import mockjs from 'mockjs'
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': mockjs.mock({
    'data|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void; }) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  
  
  // 支持自定义函数，API 参考 express@4
  'POST /api/bar': (req: any, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void;send:(args:any)=>void }) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send({message:'保存成功'});
    res.end('ok');
  },
}
//   访问 /api/users 就能得到 100条城市数据 的响应