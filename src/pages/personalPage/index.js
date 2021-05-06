import React, { PureComponent } from 'react'
import { Form, Icon, Input,Upload, Button, Card ,Modal,Select, message } from 'antd';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
import styles from './index.less'
import classify from './../../utils/classify'
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
      visible: true,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    }
  }


  componentDidMount() {
    const { dispatch } = this.props
    const resNickname = this.props.location.params.nickname
    console.log('u------nickname',resNickname)
    const value = { nickname: resNickname }
    dispatch({
      type: 'personalPage/loadPersonal',
      payload: value,
    }).then(() => {
      console.log(this.props,'prop')
    })
  }

  componentDidUpdate() {
    const { personalPage } = this.props
    const { modifyMessage } = personalPage||{}
    const { status } = modifyMessage ||{}
    if (status === 200) {
      this.setState({modify:false})
    }
  }

  renderHistory = () => {
    return (
      <div className = {styles.leftHistory}  >
      <Card title='优秀作品展示' className={styles.leftCard}  >

        </Card>
        </div>
    )
  }
  renderMessage = () => {
    const { personalPage } = this.props
    const { Login={} } = personalPage
    const { data={} } = Login
    const { u_area, u_key, u_dis, u_name, u_nickname, u_sex } = data
    
    return (
      <div>
      <div className= {styles.leftMess}  >
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
        {this.renderHistory()}
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
    const { Login: { data } } = personalPage
    const {id} = data
    e.preventDefault();
    form.validateFields((err, values) => {
      const value = { id, ...values }
      if (!err) {
        dispatch({
          type: 'personalPage/modifyMessage',
          payload: value,
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
  //对于类别的处理
  dealClassify = (param) => {
    const { catery } = classify
    let result 
   catery.forEach((it, ind) => {
      const { name, id } = it
      if (name == param) {
         result = id
      }
   })
    return result
  }
  
  submitUpload = (e) => {
    const { form, dispatch, personalPage } = this.props
    const { fileList } = this.state
    const { Login: { data } } = personalPage
    const { id } = data
   
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log(values,'value=======')
      const value = { id, ...values }
      const {title,classify:cla,des} = value
      if (!err) {
        fileList.forEach((it, index) => {
          const { response, name } = it
          
          if (response !== undefined) {
            const { sizeFinal, url ,status} = response
            const val = {
              size: sizeFinal,
              url,
              name,
              uid: id,
              title,
              des,
              style:this.dealClassify(cla)
            }
            if (status === 'error') {
              message.error('上传服务器失败！')
            } else {
              dispatch({
                type: 'personalPage/uploadPic',
                payload: val,
            })
            }
         
          }
          else {
            message.info('图片上传云服务中请稍等')
          }
        })
 
    } else {
      return null;
    }
  });
  }
  renderUpload = () => {
    const { form } = this.props
    const { getFieldDecorator } = form;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const {catery} = classify
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    
  const handleCancel = () => this.setState({ previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

    const handleChange = ({ fileList }) => { this.setState({ fileList }); console.log(fileList,'fileList===')};

  const  handleChangeSelect = (value)=> {
    console.log(`selected ${value}`);
  }
    const onchange = (e) => {
      console.log(e,'e======')
      
    }
    return (
      <div className= {styles.rightForm} >
        <Card title="上传图片" style={{ width: 400 }} >
          {/* <div className={styles.uploadCard}> */}
          <div className={styles.leftUpload}>
            <Form>
            <Form.Item label='标题'>
              {getFieldDecorator('title', {
                rules: [
                  { required: true, message: 'Please input title!' },
                ],
                initialValue: 'title',
              })(
                <Input
                  // prefix={
                  //   // <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  // }
                  placeholder="Title"
                />,
              )}
              </Form.Item>
              <Form.Item label='分类'>
              {getFieldDecorator('classify', {
                rules: [
                  { required: true, message: 'Please check your classify!' },
                ],
                initialValue: '人文',
              })(
                <Select style={{ width: 190 }} onChange={handleChangeSelect}>
                  {(catery || []).map((item, index) => {
                    const {id,text} = item
                    return ( <Option value={id}>{text}</Option>)
                  })}
              </Select>
              )}
            </Form.Item>
            <Form.Item label='描述'>
              {getFieldDecorator('des', {
                rules: [
                  { required: true, message: 'Please input description!' },
                ],
                initialValue: 'des',
              })(
                <TextArea 
                  // prefix={
                  //   // <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  // }
                  onChange = {onchange}
                  placeholder="description"
                />,
              )}
              </Form.Item>
            </Form>
            
            </div>
            <>
        <Upload
          action="http://127.0.0.1:3080/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
          </>
          {/* </div> */}
          <Button key="submit" onClick={this.submitUpload} type='primary'> 上传</Button>
          </Card>
      </div>
    )
}

  render(){
    const { form } = this.props
    const{modify} = this.state
    //  const { getFieldDecorator } = form;
    return(
      <div className= {styles.all}>
        <div className={styles.topall}>
          {this.renderMessage()}
          {modify ? this.renderChangeModel() : null}
          {this.renderUpload()}
        </div>
        <div>1234</div>
      </div>
    )
  }
}
export default connect(({ personalPage }) => ({ personalPage }))(Form.create({ name: 'personalPage' })(PersonalPage));
// export default connect(mapStateToProps)(Form.create({ name: 'personalPage' })(PersonalPage));
