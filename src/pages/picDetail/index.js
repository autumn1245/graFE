import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox,Card,Layout } from 'antd';
import styles from './index.less'
import { connect } from 'dva';
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;
import {
  StarOutlined 
} from '@ant-design/icons';
class picDetail extends PureComponent{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    const {form} = this.props
    const { getFieldDecorator } = form;
    // const HeartSvg = () => (
    //   <svg width="2em" height="2em" fill="currentColor" viewBox="0 0 1024 1024">
    //     <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    //   </svg>
    // );
    // const HeartIcon = props => <Icon component={HeartSvg} {...props} />;
    const onSearch = value => console.log(value);
    return (
      <Layout>
      <Header className="header" style={{backgroundColor:'#ddd'}} >
          <div className={styles.nav} style={{display:'flex',height:'60px',justifyContent:'space-evenly'}}>
           <img style={{width:'50px',height:'50px' ,borderRadius:'50%',marginTop:'10px'}} src={require('../../assets/bjt.jpg')} alt='logo'></img>
              <Search style={{ width: '50%', marginLeft: '125px', marginTop: '16px' }} placeholder="input search text" onSearch={onSearch} enterButton />
              <div onClick={() => {
                history.push('./login')
              }}><a>登录</a></div>
          </div>
        </Header>
        <Content>
        <div className={styles.all}>
        <div className={styles.leftPic}>
          {/* <img className={styles.imgstyles} src={require('./../../assets/1.jpg')} ></img> */}
          <img className={styles.imgstyles} src = {require('./../../assets/back.jpg')} ></img>
          
        </div>
        <div className={styles.rightDet}>
          <div className={styles.rightTit}>
            <div className={styles.tittleDet}>图片title</div>
            {/* <StarOutlined /> */}
            {/* <HeartIcon onClick = {()=>{console.log('点击收藏')}} style={{ color: '#DDD',float:'right' }} /> */}
          </div>
          <div className={styles.rightCard}>
            <Card className = {styles.cardstyle}>
              <div>图片作者：</div>
              <div>图片大小：</div>
              <div>图片分类：</div>
              <div>图片描述：</div>
            </Card>
            <div className={styles.download}>
              <Button type='primary' style={{ width: '160px', height: '40px' }}>收藏</Button>
              <Button type='primary' style={{ width: '160px', height:'40px'}}>下载原图</Button>
            </div>

          </div>
          
        </div>
      </div>

        </Content>
        </Layout>
     
    )
  }
}
// export default picDetail
export default connect(({ picDetail }) => ({ picDetail }))(Form.create({ name: 'picDetail' })(picDetail));
