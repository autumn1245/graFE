import {get, postJson, post ,put} from './../../utils/req'
import register from '../register';
const localUrl = 'http://127.0.0.1:3080'
const Service = {
    //登录
    checkLogin(params) {
        return get(`${localUrl}/user`, params);
    },
    //注册
    register(params) {
        return post(`${localUrl}/user/register`, params)
    },
    //初始化数据
    init(params) {
        return get(``, params)
    },
    //加载个人的详细的信息
    loadPersonal(params) {
        return get (`${localUrl}/user/find`,params)
    },
    // //修改个人信息
    // modifyMessage(params) {
    //     return put(`${localUrl}/user`,params)
    // },
    //修改个人信息
    modifyMessage(params) {
        return post(`${localUrl}/user/update`,params)
    },
    //上传图片
    uploadPic(params) {
        return post(`${localUrl}/pic/submit`,params)
    },
    //加载图片详情
    loadDetail(params) {
        return post(`${localUrl}/pic/find`, params)
    },
    //获取图片列表
    loadPicList(params) {
        return post(`${localUrl}/pic/loadlist`,params)
    },
    //收藏图片
    toStarPic(params ) {
        return post(`${localUrl}/collect`,params)
    },
    //下载图片
    downLoadPic(params) {
        return postJson(``, params)
    },
    //搜素某个类别的图片
    searchPic(params) {
        return  post(`${localUrl}/pic/search`,params)
    },
    // 查询个人发表的所有图片
    searchAllOwnPic(params) {
        return post(`${localUrl}/pic/findHistory`,params)
    },
    // 查询个人收藏的所有图片
    searchStarPic(params) {
        return  post(`${localUrl}/collect/findStar`,params)
    }
}

export default Service;