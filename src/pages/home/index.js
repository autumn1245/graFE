import React, { PureComponent } from 'react'
import { history } from 'umi';
import { Form, Icon, Input, Button, Layout, Breadcrumb, Menu,Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import styles from './index.less'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
import Masonry from 'react-masonry-component';
import { connect } from 'dva';
class Home extends PureComponent{
  constructor(props){
    super(props);
    this.state={

    }
  }
  renderHeader = () => {
    const { Login } = this.props
    const { status, data } = Login || {}
    const {nickname} = data ||{}
    const LoginSymbol = status === 200 ? true : false
    console.log(LoginSymbol,'LoginSymbol')
    const onSearch = value => console.log(value);
    const menu = (
      <Menu>
        <Menu.Item onClick={() => {
          // history.push('./personalPage')
          history.push({
            pathname:"/personalPage",
            params:{
                nickname
            }
          })
        }}>个人主页</Menu.Item>
      </Menu>
    );
    return (
      <Header className="header" style={{backgroundColor:'#ddd'}} >
        <div className={styles.nav} style={{display:'flex',height:'60px',justifyContent:'space-evenly'}}>
         <img style={{width:'50px',height:'50px' ,borderRadius:'50%',marginTop:'7px'}} src={require('../../assets/bjt.jpg')} alt='logo'></img>
            <Search style={{ width: '50%', marginLeft: '125px', marginTop: '16px' }} placeholder="input search text" onSearch={onSearch} enterButton />
           {!LoginSymbol?( <div onClick={() => {
            history.push('./login')
          }}>
            <a>登录</a>
          </div>) : (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {nickname}
          <DownOutlined />
          </a>
        </Dropdown>
          )}
        </div>
    </Header>
    )
  }
  clickPic = (id) => {
      //通过id查找这个图片的具体信息
    // 这里需要写一个接口
  }
  renderContent = () => {
    const data = [
      { detailid: 3, width:'100px',  pictrue: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3016291998,3594589642&fm=26&gp=0.jpg' },
      { detailid: 4, pictrue: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2267948308,1173577873&fm=26&gp=0.jpg' },
      { detailid: 5, pictrue: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3193558439,3477563873&fm=26&gp=0.jpg' },
      { detailid: 6, pictrue: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1261670732,454648216&fm=26&gp=0.jpg' },
      { detailid: 7, pictrue: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2555409660,4253693389&fm=26&gp=0.jpg' },
      { detailid: 8, pictrue: 'https://img1.baidu.com/it/u=2177311505,1938108059&fm=26&fmt=auto&gp=0.jpg' },
      {detailid:9,pictrue:'https://img2.baidu.com/it/u=1589546105,1236076347&fm=26&fmt=auto&gp=0.jpg'}
    ,
      { detailid: 13, width:'100px', pictrue: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3016291998,3594589642&fm=26&gp=0.jpg' },
      { detailid: 14, pictrue: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2267948308,1173577873&fm=26&gp=0.jpg' },
      { detailid: 15, pictrue: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3193558439,3477563873&fm=26&gp=0.jpg' },
      { detailid: 16, pictrue: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1261670732,454648216&fm=26&gp=0.jpg' },
      { detailid: 17, pictrue: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2555409660,4253693389&fm=26&gp=0.jpg' },
      { detailid: 18, pictrue: 'https://img1.baidu.com/it/u=2177311505,1938108059&fm=26&fmt=auto&gp=0.jpg' },
      ]
    let lstItem = (item, index) => {
      let rand = Math.random(1) % 3
      return (
        <div key={item.detailid}
          // className="item_left"
        >
          <div className={'item_img ' + (rand === 0 ? 'imgframe' : 'imgframe1')}>
            <img src={(item.pictrue ? item.pictrue : default_pic_1)}
              onClick = {this.clickPic()}
              alt=""/>
          </div>
        </div>
      );
    }
    return (
      <Content style={{ padding: '0 50px' }} className={styles.pubuliu}>
        <Masonry
         className={'my-gallery-class'} // default ''
         elementType={'ul'} // default 'div'
         options={{transitionDuration: 15, transitionProperty: 'width'}} // default {}
         disableImagesLoaded={false} // default false
         updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        onClick = {()=>{console.log('00')}}
        >
         {data.map(lstItem)}
    </Masonry>
      </Content>
    )
  }
  render(){
    const {form} = this.props
    //  const { getFieldDecorator } = form;\
    console.log('8765432,===', this.props)
    console.log(cookie.load('userId'))
    return(
    <Layout>
      {this.renderHeader()}
      {this.renderContent()}
  </Layout>
    )
  }
}
function mapStateToProps(state) {
  const { Login } = state.login
  return {
    Login // 在这return,上面才能获取到
  }
}
export default connect(mapStateToProps)(Form.create({ name: 'home' })(Home));