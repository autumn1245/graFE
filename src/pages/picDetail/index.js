import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less'

class picDetail extends PureComponent{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    const {form} = this.props
     const { getFieldDecorator } = form;
    return(
      <div>
        这里是图片的细节
        <Form>
          
        </Form>
      </div>
    )
  }
}
export default picDetail