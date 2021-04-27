import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less'

class homePage extends PureComponent{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    const {form} = this.props
    //  const { getFieldDecorator } = form;s
    return(
      <div>
        这里是homePage
        
        
      </div>
    )
  }
}
export default homePage