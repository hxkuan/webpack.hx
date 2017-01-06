import { Link } from 'react-router'
let icon=require('../img/icon.png');
var data = {
  'title': '小票打印常见的问题',
  'value': [
    {'title': '支持哪些蓝牙打印机型号？', 'value': [{'title': '推荐您购买以下型号的打印机，您可以从淘宝上购买'}, {'title': '芯烨XP-58IIH'}]},
    {'title': '什么情况下会打印小票？', 'value': [{'title': '连接蓝牙打印机之后，当使用APP收款或退款成功，都会打印小票。'}]},
    {'title': '为什么蓝牙打印机连不上？', 'value': [{'title': '如果您的蓝牙打印机连不上，可能是因为您的打印机不支持，请您把相关信息通过拨打服务客服电话反馈给我们。'}]},
    {'title': '打印机连上，小票没有打印？', 'value': [{'title': '请检查您是否开启了自动打印功能，如果已经开启的情况下还遇到这种情况，请您将您的蓝牙打印机型号通过拨打服务客服电话反馈给我们。'}]},
    {'title': '其他关于小票打印的问题？', 'value': [{'title': '如果您还遇到其他相关的问题，请通过拨打服务客服电话反馈给我们。'}]},

  ]
};

// render(<Frame data={data}/>, document.getElementById('app'))

export default class Frame extends React.Component {


  render() {
    let left = '0.08rem';
    let style = {
      'body': {
        paddingTop: '0.02rem',
        paddingBottom: '0.08rem',
        border: '0.01rem solid #CCC',
        borderRadius: '0.03rem',
        backgroundColor: '#FFF'
      },
      'title': {
        height: '0.3rem',
        position: 'relative',
        paddingLeft: '0.28rem',
      },
      'line': {
        height: '1px',
        paddingTop: '0.02rem',
        borderBottom: '1px solid #CCC'
      }
    };

    let id=this.props.params.id;
    if (id){
      document.title="hello";
    }else {
      document.title="main";
    }

    let mData=id&&(id<data.value.length)?data.value[id]:data;
    let {title, value} = mData;
    return (
      <div style={style.body}>
        <div style={style.title}>
          <img src={icon}
               style={{position: 'absolute', left: left, top: '0.07rem',width:'0.16rem'}}/>
          <span style={{position: 'absolute',lineHeight: '0.3rem', fontSize: '0.11rem', fontWeight: '900',left: left+0.3}}>{title}</span>
        </div>
        <div style={style.line}/>
        <div>
          <ul style={{marginLeft: left, paddingTop: '0.06rem', marginRight: left}}>
            {value.map((d, i)=>
              <Item data={d} key={i} id={i}/>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
class Item extends React.Component {
  render() {
    let {title, value} = this.props.data;
    let id =this.props.id;
    return (
      <li>
        {value ?
          <Link to={'/'+id} activeClassName="active">
            {title}
          </Link>
          :
          title
        }

      </li>
    );
  }
}