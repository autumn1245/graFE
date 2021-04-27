import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less'

class anotherHome extends PureComponent{
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
        这里是别人进来的主页
      </div>
    )
  }
}
export default anotherHome