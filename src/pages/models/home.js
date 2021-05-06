import { message } from 'antd';
import { history } from 'umi';
import Service from '../constant/service'

const {loadPersonal,modifyMessage ,uploadPic} = Service;

export default {
  namespace:'home',
  state:{
      todos: [4444],
      login:{}
  },
  effects:{
   
    
//     *uploadPic({ payload }, { call, put }) {
//       const data = yield call(uploadPic,{...payload})
//       yield put({
//         type:'updateState',
//         payload:{
//           Upload:data||{}
//         }
//       })
//   },
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