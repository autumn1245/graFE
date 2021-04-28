import { message } from 'antd';
import { history } from 'umi';
import Service from '../constant/service'

const {checkLogin} = Service;

export default {
  namespace:'login',
  state:{
    todos:[4444]
  },
  effects:{
    *login({payload},{call,put}){
        const data = yield call(checkLogin,{...payload})
        yield put({
          type:'updateState',
          payload:{
            Login:data||{}
          }
        })
      if (data.status === 200) {
        message.success('登录成功！')
        history.push('/home')
      }
    }

  },
  // reducers: {
  //   updateState(state, { payload }) {
  //     return updateState(state, payload);
  //   },
  // },
}