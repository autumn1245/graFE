import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd';
import styles from './index.less'
// import router from 'umi';
import { connect } from 'dva';
import { history } from 'umi';

class Login extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      Login: {},
      modify:false
    } 
  }
  // Login(){
  //   // 先判断表单的数据是否符合规范再发请求进行校验
  //   const {dispatch} = this.props
  //   dispatch({
  //     type:''
  //   })

  // }
  componentDidMount() {
    const { Login } = this.props
    const { data } = Login||{}
    const { text } = data ||{}
    this.setState({Login:text})
  }
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

  renderModal = () => {
    
    const { modify } = this.state
    const handOk = () => {
      
    }
    const handleCancel = () => {
      this.setState({modify:false})
    }
    return (
      <Modal
      // visible={modify}
      title="修改密码"
      onOk={handOk}
      onCancel={handleCancel}
      // footer={[
      //   <Button key="back" onClick={this.handleCancel}> 返回</Button>,
      //   <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}> 提交 </Button>,
      //   ]}
      >
  <div className={styles.allBody}>
    <div className={styles.formStyle}>
      {/* <div className='formStyle'> */}
      <Form onSubmit={this.handleModify} className="modify-form">
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your new passsword!' },
            ],
            // initialValue: `${u_name}`,
          })(
            <Input
              prefix={
                <Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="password"
            />,
          )}
              </Form.Item>
              <Form.Item>
          {getFieldDecorator('rePassword', {
            rules: [
              { required: true, message: 'Please repeat input your new passsword!' },
            ],
            // initialValue: `${u_name}`,
          })(
            <Input
              prefix={
                <Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="rePassword"
            />,
          )}
              </Form.Item>
            </Form>
          </div>
          </div>

      </Modal>
    )
  }
  forgotPas = () => {
    this.setState({modify:true})
  }
  render() {  
    const { form } = this.props
    const {modify} = this.state
     const { getFieldDecorator } = form;
    return(
      <div className={styles.allBody}>
        <div className={styles.formStyle}>
        {/* <div className='formStyle'> */}
        <Form onSubmit={this.handleSubmit} className="login-form" >
        <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="nickname"
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
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
          <Checkbox>Remember me</Checkbox>
         )}  */}
              {/* <a className="login-form-forgot" href="" style={{ float: 'right' }} onClick={this.forgotPas} >
            Forgot password
          </a> */}
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}} onClick={this.handleOk}>
            Log in
          </Button>
          Or <a href="" onClick={this.goRegister}>register now!</a>
        </Form.Item>
          </Form>
          {modify?this.renderModal():null}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { Login } = state.login
  return {
    Login // 在这return,上面才能获取到
  }
}

export default connect(mapStateToProps)(Form.create({ name: 'login' })(Login))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    