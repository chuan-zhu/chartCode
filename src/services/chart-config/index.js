import { request } from 'umi'
// get请求
export const queryBarData = async (param={id:1}) => {
    //    调用mock数据接口
    const result = await request('/api/users', {
        method: 'get',
        params: { id: param.id },
    }).then(function (response) {
        console.log(response);
        return response
    }).catch(function (error) {
        console.log(error);
    });
    return result
}
// post请求   带参数
export const querySaveBarData = async (postData) => {
  const result =  request('/api/bar', {
      method: 'post',
      data: postData,
  }).then(function (response) {
      console.log(response);
      return response
  }).catch(function (error) {
      console.log(error);
      return error
  });
  return result
}
// post请求   带参数
export const queryDataByPost = async (postData) => {
    const result =  request('/api/v1/user', {
        method: 'post',
        data: postData,
    }).then(function (response) {
        console.log(response);
        return response
    }).catch(function (error) {
        console.log(error);
        return error
    });
    return result
}