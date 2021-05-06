import React, { Component } from 'react';
import styles from './index.less';
import Login from './login/index'
import Home from './home/index';
import Register from './register/index'
import { connect } from 'dva';
import {  Form } from 'antd';
import register from './register';
// import { mapActions } from 'UTILS';

class Pages extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return (
       <div>
        {/* <Login>
          登陆
        </Login> */}
        <Home/>
        {/* <Register>注册</Register> */}
       </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return { 
    todos: state.todos ,
    // dispatch:dispatch
  };
}
// const mapDispatchToProps = (dispatch)=>{
//   return mapActions(dispatch,'zhuYe',[

//   ])
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch: dispatch,
//     ...bindActionCreators(actionCreators, dispatch)
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({
//     dispatch: dispatch
//   })
// }
export default connect(mapStateToProps)(Form.create({})(Pages))
