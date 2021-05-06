import { message } from 'antd';
import { history } from 'umi';
import cookie from 'react-cookies'
import Service from '../constant/service'

const {checkLogin} = Service;

export default {
  namespace:'login',
  state:{
    // todos:[4444]
  },
  effects:{
    *login({payload},{call,put}){
      const data = yield call(checkLogin, { ...payload })
      const {userId} = data||{}
        yield put({
          type:'updateState',
          payload:{
            Login:data||{}
          }
        })
      if (data.status === 200) {
        message.success('登录成功！')
        history.push('/home')
        cookie.save(userId,userId,{
          // path: ‘/’,
          // expires,
          maxAge: 100000, // maxAge 单位秒
          secure: true,
          httpOnly: true
        })
      }
    }

  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}