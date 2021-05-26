import { message } from 'antd';
import { history } from 'umi';
import Service from '../constant/service'

const {loadPersonal,modifyMessage ,uploadPic,searchStarPic,searchAllOwnPic} = Service;

export default {
  namespace:'personalPage',
  state:{
    // todos:[4444]
  },
  effects:{
    *loadPersonal({ payload }, { call, put }) {
        const data = yield call(loadPersonal,{...payload})
        yield put({
          type:'updateState',
          payload:{
            Login:data||{}
          }
        })
    },
    *modifyMessage({ payload }, { call, put }) {
      const data = yield call(modifyMessage, { ...payload })
      const { status } = data
      if (status === 200) {
        message.success('修改成功！')
        // this.props.dispatch({
        //   type: 'personalPage/loadPersonal',
        //   payload: {nickname:nickName},
        // })
      }
      yield put({
        type: 'updateState',
        payload: {
          modifyMessage:data||{}
        }
      })
    },
    *uploadPic({ payload }, { call, put }) {
      const data = yield call(uploadPic,{...payload})
      yield put({
        type:'updateState',
        payload:{
          Upload:data||{}
        }
      })
      if (data.status === 200) {
        message.success('上传成功！')
        
      }
    },
    // 搜索自己收藏的图片
    *searchStarPic({ payload }, { call, put }) {
      const data = yield call(searchStarPic, { ...payload })
      yield put({
        type: 'updateState',
        payload: {
          starArray:data||{}
        }
      })
    },
    // 搜索自己发表的图片
    *searchAllOwnPic({ payload }, { call, put }) {
      const data = yield call(searchAllOwnPic, { ...payload })
      yield put({
        type: 'updateState',
        payload: {
          ownPicArray:data||{}
        }
      })
    },
  },
  reducers: {
    // updateState(state, { payload }) {
    //   return updateState(state, payload);
    // },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}