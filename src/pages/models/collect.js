import Service from '../constant/service'
import { message } from 'antd';
const { toStarPic } = Service

export default {
    namespace:'collect',
    state:{
      // todos:[4444]
    },
    effects:{
      *toStarPic({ payload }, { call, put }) {
            const data = yield call(toStarPic, { ...payload })
            const {text} = data ||{}
        yield put({
          type:'updateState',
          payload:{
            Upload:data||{}
          }
        })
        if (data.status === 200) {
          message.success('收藏成功！')
        }
        else  if (data.status === 204) {
            message.success(text)
          }
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