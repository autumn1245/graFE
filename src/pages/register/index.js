import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, Calendar } from 'antd';
import styles from './index.less';
import { history } from 'umi';
import { connect } from 'dva';
import Ajax from '../../utils/request';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goLogin = () => {
    history.push('/login');
  };
  handleOk = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'register/register',
          payload: values,
        });
      } else {
        return null;
      }
    });
  };

  // componentDidMount() {
  //   Ajax.jsonp({url: '/user/aaa'}).then(res => console.log(res)).catch(err => console.error(err));
  // }

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.allBody}>
        <div className={styles.formStyle}>
          {/* <div className='formStyle'> */}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
                // initialValue: 'wyr',
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
                // initialValue: 'wyrpassword',
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your name!' }],
                // initialValue: 'wyrnickname',
              })(
                <Input
                  prefix={
                    <Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="name"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('sex', {
                rules: [{ required: true, message: 'Please input your sex!' }],
                initialValue: '',
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="sex"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('description', {
                rules: [
                  { required: true, message: 'Please input your description!' },
                ],
                initialValue: '',
              })(
                <Input
                  prefix={
                    <Icon
                      type="highlight"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder="description"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('region', {
                rules: [
                  { required: true, message: 'Please input your region!' },
                ],
                // initialValue: '',
              })(
                <Input
                  prefix={
                    <Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="region"
                />,
              )}
            </Form.Item>
            {/* <Form.Item>
              {getFieldDecorator('birth', {
                rules: [
                  { required: true, message: 'Please input your birth!' },
                ],
              })(
                <Calendar  onPanelChange={this.onPanelChange} />
              )}
            </Form.Item> */}
            <Form.Item>
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)} */}
              <a
                className="login-form-forgot"
                href=""
                style={{ float: 'right' }}
              >
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
                onClick={this.handleOk}
              >
                Register
              </Button>
              Or{' '}
              <a href="" onClick={this.goLogin}>
                Login now!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

// export default Form.create({name:'register'})(Register);
export default connect()(Form.create({ name: 'register' })(Register));
