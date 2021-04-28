import { message } from 'antd';
import { history } from 'umi';
import Service from '../constant/service'

const {loadPersonal} = Service;

export default {
  namespace:'personalPage',
  state:{
    todos:[4444]
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
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return updateState(state, payload);
    },
  },
}