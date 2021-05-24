import { message } from 'antd';
import { history } from 'umi';
import Service from '../constant/service'

const {loadPersonal,loadPicList ,loadDetail,searchPic} = Service;

export default {
  namespace:'home',
  state:{
      todos: [4444],
      login:{}
  },
  effects:{
      *loadDetail({ payload }, { call, put }) {
          const data = yield call(loadDetail, { ...payload })
            yield put({
                type:'updateState',
                payload:{
                  detail:data||{}
                }
            })
          if (data.status === 200) {
            history.push('/picDetail')
        }
      },
      
      *loadPicList({ payload }, { call, put }) {
        const data = yield call(loadPicList, { ...payload })
          yield put({
              type:'updateState',
              payload:{
                picList:data||{}
              }
          })
      },
      *searchPic({ payload }, { call, put }) {
        const data = yield call(searchPic, { ...payload })
          yield put({
              type:'updateState',
              payload:{
                // searchPicArr: data || {}
                picList:data||{}
              }
          })
    //     if (data.status === 200) {
          
    //   }
    },

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