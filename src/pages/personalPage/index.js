import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Card ,Modal } from 'antd';
import { connect } from 'dva';

import styles from './index.less'
 
// const mapStateToProps = (state,personalPage)=>{
//   return { 
//     todos: state.todos ,
//     // dispatch:dispatch
//     personalPage

//   };
// }

class PersonalPage extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      modify: false,
      visible:true
    }
  }


  componentDidMount() {
    const { dispatch } = this.props
    console.log(this.props,'props------component')
    const value = { nickname: 'cuihua' }
    dispatch({
      type: 'personalPage/loadPersonal',
      payload: value,
    }).then(() => {
      console.log(this.props,'prop')
    })
  }

  componentDidUpdate() {
    console.log(this.props, 'props=====componentdidupdate')
    const { personalPage } = this.props
    const { modifyMessage } = personalPage||{}
    const { status } = modifyMessage ||{}
    if (status === 200) {
      this.setState({modify:false})
    }
  }

  renderMessage = () => {
    const { personalPage } = this.props
    const { Login={} } = personalPage
    const { data={} } = Login
    const {u_area,u_key,u_dis,u_name,u_nickname,u_sex}  = data
    return (
      <div style={{ background: '#ECECEC', padding: '30px',display:'flex',justifyContent:'space-around' }}>
        <Card title={`${u_nickname}`} bordered={false}
          extra={<a href="#"
            onClick={() => { this.setState({ modify: true}) }}>修改信息</a>} style={{ width: 666 }}>
          <div>
            <div className={styles.cardDeatilTop}>
              <p className={styles.detailItem}>{`关注： ${u_key}`}</p>
              <p className={styles.detailItem}>{`粉丝： ${u_key}`}</p>
            </div>
            <div className={styles.cardDeatilTop}>
                <p className={styles.detailItem}>{`name:  ${u_name}`}</p>
                <p className={styles.detailItem}>{`sex:  ${u_sex}`}</p>
                <p className={styles.detailItem}>{`area:  ${u_area}`}</p>
              </div>
            </div>
  
        </Card>
      </div>
    )
  }


  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  handleOk = (e) => {
    const { form, dispatch, personalPage } = this.props
    // this.setState({ loading: true });
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);

    const { Login: { data } } = personalPage
    const {id} = data
    e.preventDefault();
    form.validateFields((err, values) => {
      const value = { id, ...values }
      if (!err) {
        dispatch({
          type: 'personalPage/modifyMessage',
          payload: value,
        }).then((data) => {
          console.log(data,'dta=======')
          
        })
    } else {
      return null;
    }
  });

};

handleCancel = () => {
  this.setState({ visible: false });
};

  
renderChangeModel = () => {
  const { visible, loading } = this.state;
  const { personalPage,form } = this.props
  const { Login={} } = personalPage
  const { data={} } = Login
  const {u_area,u_key,u_dis,u_name,u_nickname,u_sex,u_password}  = data
    const { getFieldDecorator } = form;
    return (
      <div>
        <Modal
          visible={visible}
          title="修改个人信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}> 返回</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}> 提交 </Button>,
          ]}>
      <div className={styles.allBody}>
        <div className={styles.formStyle}>
          {/* <div className='formStyle'> */}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
                initialValue: `${u_name}`,
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
                initialValue: `${u_password}`,
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  // type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: `${u_nickname}`,
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
                initialValue: `${u_sex}`,
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
                initialValue: `${u_dis}`,
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
                initialValue: `${u_area}`,
              })(
                <Input
                  prefix={
                    <Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="region"
                />,
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
        </Modal>
      </div>
    )
  }

  render(){
    const { form } = this.props
    const{modify} = this.state
    //  const { getFieldDecorator } = form;
    return(
      <div>
        <div style={{ background: '#ECECEC', padding: '30px',display:'flex',justifyContent:'space-around' }}>
          {/* <Card title="Card title" bordered={false} extra={<a href="#">More</a>} style={{ width: 666 }}>
            <div>
              <p>{`关注：${u_key}`}</p>
              <p>{`粉丝：${u_key}`}</p>
              <div>
                <p>{`name${u_name}`}</p>
                <p>{`sex${u_sex}`}</p>
                <p>{ `area${u_area}`}</p>
              </div>
            </div>
  
          </Card> */}
          {this.renderMessage()}
          {modify? this.renderChangeModel():null}
          <Card title="上传图片"  style={{ width: 350 }}>
            <p>Card content</p>
            <Button onClick={()=>{}}>上传图片</Button>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    )
  }
}
export default connect(({ personalPage }) => ({ personalPage }))(Form.create({ name: 'personalPage' })(PersonalPage));
// export default connect(mapStateToProps)(Form.create({ name: 'personalPage' })(PersonalPage));
