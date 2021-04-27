import {get, postJson, post } from './../../utils/req'
import register from '../register';
const localUrl = 'http://127.0.0.1:3080'
const Service = {
    //登录
    checkLogin(params) {
        return get(`${localUrl}/user`, params);
    },
    //注册
    register(params) {
        debugger
        return post(`${localUrl}/user/register`, params)
    },
    //初始化数据
    init(params) {
        return get(``, params)
    },
    //加载图片详情
    loadDetail(params) {
        return postJson(``, params)
    },
    //下载图片
    downLoadPic(params) {
        return postJson(``, params)
    }


}

export default Service;