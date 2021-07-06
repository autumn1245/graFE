import React, { PureComponent } from 'react'
import { history } from 'umi';
import LazyLoad from 'react-lazyload';
import { Form, Icon, Input, Button, Layout, Breadcrumb, Menu,Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import classify from './../../utils/classify'
import styles from './index.less'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
import ImageLauout from "../components/imageLayout";


// 翻页器变量控制
let isSend = false;//是否正在发送请求
let page = 1;//当前页数
let isEnd = false; // 是否在最后一页
let imageList = [];

const createIazyLoader = (node, urls) =>{
  let current = 0;
  return num => {
    while (num--) {
      const child = node.querySelector('.img-unload');
      child.url = urls[current] || '';
      child.className = child.className.split(' ').filter(item => item !== 'img-unload').join(' ')
      current++
    }
  }
}

import { connect } from 'dva';
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      default_pic_1: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2555409660,4253693389&fm=26&gp=0.jpg'
    }
  }

  componentDidMount() {
   this.searchHomePic(page)
  }

  searchHomePic(num) {
     this.props.dispatch({
      type: 'home/loadPicList',
       payload: {
         pagesize:10,
         curpage:num
      }
    })
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
  onSearch = value => {
    const { home } = this.props
    const { searchPicArr } = home||{}
    const { data} = searchPicArr||{} 
    const temp = this.dealClassify(value)
    this.props.dispatch({
      type: 'home/searchPic',
      payload:{searchId:temp}
    })
  }

  lazyLoad(num = 0, nodes, urls = []) {

  }
  renderHeader = () => {
    const { Login } = this.props
    const { status, data } = Login || {}
    const { nickname } = data || {}
    const nickName = localStorage.getItem('userName')
    const LoginSymbol = localStorage.getItem('userId') === null ? true : false
    const menu = (
      <Menu>
        <Menu.Item onClick={() => {
          // history.push('./personalPage')
          history.push({
            pathname:"/personalPage",
            params:{
                nickname:nickName
            }
          })
        }}>个人主页</Menu.Item>
        <Menu.Item onClick={() => {
          localStorage.removeItem('userId')
          history.push('./login')
        }}>退出登录</Menu.Item>

      </Menu>
    );
    return (
      <Header className="header" style={{backgroundColor:'#ddd'}} >
        <div className={styles.nav} style={{display:'flex',height:'60px',justifyContent:'space-evenly'}}>
         <img style={{width:'50px',height:'50px' ,borderRadius:'50%',marginTop:'7px'}} src={require('../../assets/bjt.jpg')} alt='logo'></img>
            <Search style={{ width: '50%', marginLeft: '125px', marginTop: '16px' }} placeholder="input search text" onSearch={this.onSearch} enterButton />
           {LoginSymbol?( <div onClick={() => {
            history.push('./login')
          }}>
            <a>登录</a>
          </div>) : (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {nickName}
          <DownOutlined />
          </a>
        </Dropdown>
          )}
        </div>
    </Header>
    )
  }
  clickPic = (e) => {
    const detail= {detailId:e}
    this.props.dispatch({
      type: 'home/loadDetail',
      payload: detail,
    })
  }
  renderContent = () => {
    const { home } = this.props
    const { picList } = home||{}
    const { data } = picList || {}
    // 通过isSend来判断是懒加载还是搜索结果
    if (isSend === false) {
      imageList = []
    }
    data && data.rows.forEach((it) => {
      const { p_url,id,p_sid,p_uid } = it
      imageList.push({ p_url, id,p_sid,p_uid })
    })
    if (data && imageList.length >= data.allNumber) {
      isEnd = true;
    }
    setTimeout(() => {
      isSend = false;
    },200)
   

    let lstItem = (item, index) => {
      let rand = Math.random(1) % 2
      const {id,p_url} = item
      return (
        <div key={id}  onClick = {()=>this.clickPic(id)}
          // className="item_left"
        >
          <div className={'item_img ' + (rand === 0 ? 'imgframe' : 'imgframe1')}>
            {/* <img src={(p_url ? p_url+'?imageMogr2/thumbnail/x300' : state.default_pic_1)}   alt=""/> */}
            <img src={(p_url ? p_url+'?imageMogr2/thumbnail/365x' : state.default_pic_1)}   alt=""/>

          </div>
        </div>
      );
    }
    return (
      <Content style={{ padding: '0 50px' }} className={styles.pubuliu}>
        <ImageLauout srcArray={imageList.slice()} dispatch={ this.props.dispatch}  ownStarOrNot={true} onClick={this.clickPic}/>
      </Content>
    )
  }

  scrollHandler = (e) => {
    const target = e.target;
    const bottomNum = target.scrollHeight - target.scrollTop - target.offsetHeight;
    if (bottomNum < 1000) {
      if (isEnd === false && isSend === false) {
        isSend = true;
        this.searchHomePic(++page)
      }
    }
  }

  render(){
    const {form} = this.props
    //  const { getFieldDecorator } = form;\
    // console.log(cookie.load('userId'))
    return(
      <div className={styles["home-wrap"]} onScroll={this.scrollHandler}>
      {this.renderHeader()}
      {this.renderContent()}
  </div>
    )
  }
}
function mapStateToProps(state) {
  const { Login } = state.login
  const home = state.home
  const picList = state.picList
  return {
    Login,
    home,
    picList
  }
}
export default connect(mapStateToProps)(Form.create({ name: 'home' })(Home));
