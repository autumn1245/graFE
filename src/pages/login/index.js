import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less'
// import router from 'umi';
import { history } from 'umi';

class Login extends PureComponent{
  constructor(props){
    super(props);
    this.state={

    }
  }
  // Login(){
  //   // 先判断表单的数据是否符合规范再发请求进行校验
  //   const {dispatch} = this.props
  //   dispatch({
  //     type:''
  //   })

  // }
  goRegister = () => {
    history.push('/register');
  }
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: values,
        })
      } else {
        return null
      }
    });
  };
  render(){
    const {form} = this.props
     const { getFieldDecorator } = form;
    return(
      <div className={styles.allBody}>
        <div className={styles.formStyle}>
        {/* <div className='formStyle'> */}
        <Form onSubmit={this.handleSubmit} className="login-form" >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
           )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
          <Checkbox>Remember me</Checkbox>
         )} 
          <a className="login-form-forgot" href="" style={{float:'right'}}>
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}} onClick={this.handleOk}>
            Log in
          </Button>
          Or <a href="" onClick={this.goRegister}>register now!</a>
        </Form.Item>
      </Form>
        </div>
      </div>
    )
  }
}

export default Form.create({name:'login'})(Login);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    