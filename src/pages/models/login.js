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
      const { data: datTemp } = data || {}
      const {userId,nickname} = datTemp||{}
        yield put({
          type:'updateState',
          payload:{
            Login:data||{}
          }
        })
      // console.log(userId,'userid,',data)
      localStorage.setItem('userId', userId)
      localStorage.setItem('userName',nickname)
      if (data.status === 200) {
        message.success('登录成功！')
        history.push('/home')
        // cookie.save(userId,userId,{
        //   // path: ‘/’,
        //   // expires,
        //   maxAge: 100000, // maxAge 单位秒
        //   secure: true,
        //   httpOnly: true
        // })
       
      }
      else {
        message.error('登录失败，请检查用户名密码重新登陆！')
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