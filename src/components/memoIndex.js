import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Local Import
import { getMemos } from '../actions';
import _ from 'lodash';

//メモ一覧画面
class MemoIndex extends Component{
  componentDidMount(){
    this.props.getMemos();
  }

  //メモ一覧をレンダリングする
  renderMemos = () =>{
    const memos = this.props.memos;
    return _.map(memos, memo =>(
      <tr key={memo.id}>
        <td>
          <Link to={`/show/${memo.id}`}>
            {memo.title}
          </Link>
        </td>
        <td>{memo.memo}</td>
      </tr>
    ));
  }

  render(){
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMemos()}
          </tbody>
        </table>
        <Link to='/new'>追加</Link>
      </React.Fragment>
    )
  }
}

//Stateの情報をPropsで使用できるようする
const mapStateToProps = state => ({ memos : state.memos });

//Dispatch(アクションクリエイター)をPropsで使用できるようにする
const mamDispatchToProps = ({ getMemos })

//コンポーネントをRedux Storeに接続する
export default connect( mapStateToProps, mamDispatchToProps )(MemoIndex);
