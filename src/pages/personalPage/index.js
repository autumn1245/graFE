import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'dva';

import styles from './index.less'

class PersonalPage extends PureComponent{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount() {
    console.log('vcomponentDidMount======',this.props)
    const { dispatch } = this.props
    console.log(this.props, 'props=====')
    const value = { nickname: 'cuihua' }
    dispatch({
      type: 'personalPage/loadPersonal',
      payload: value,
    });
  }

  render(){
    const {form} = this.props
    //  const { getFieldDecorator } = form;s
    return(
      <div>
        <div style={{ background: '#ECECEC', padding: '30px',display:'flex',justifyContent:'space-around' }}>
          <Card title="Card title" bordered={false} extra={<a href="#">More</a>} style={{ width: 666 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
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
export default connect()(Form.create({ name: 'personalPage' })(PersonalPage));
