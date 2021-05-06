import { message } from 'antd';
import { history } from 'umi';
import Service from '../constant/service'

const {loadPersonal,modifyMessage ,uploadPic} = Service;

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