import Service from '../constant/service'

const {register} = Service;

export default {
  namespace:'register',
  state:{
    todos:[4444]
  },
  effects:{
    *register({payload},{call,put}){
        const data = yield call(register,{...payload})
        yield put({
          type:'updateState',
          payload:{
            register:data||{}
          }
        })
    }

  },
  // reducers: {
  //   updateState(state, { payload }) {
  //     return updateState(state, payload);
  //   },
  // },
}