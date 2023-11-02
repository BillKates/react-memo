import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

//Local Import
import { getMemo, deleteMemo, updateMemo } from '../actions';

//メモ編集画面
class memoShow extends Component {    
  //ComponentがDOMツリーに追加された状態でコールされる
  componentDidMount() {
    const { id } = this.props.match.params;
    if( id ) this.props.getMemo(id);
  }

  renderField = (field) => {
    const { input, label, type, meta : { touched, error} } = field;
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deleteMemo(id);
    this.props.history.push('/');
  }

  onSubmit = (values) => {
    const { id } = this.props.match.params;
    this.props.updateMemo(id, values)
    this.props.history.push('/')
  }

  render(){
    const { handleSubmit, pristine, submitting, invalid} = this.props;  
    console.log(submitting)                                             
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="タイトル" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="メモ" name="memo" type="text" component={this.renderField} /></div>
        <div>
          <input type="submit" value="更新" disabled={pristine || submitting || invalid} />
          <Link to="/" >キャンセル</Link>
          <Link to="/" onClick={this.onDeleteClick}>削除</Link>
        </div>
      </form>
    );
  }
}

const validate = values => {
    const errors= {};
    console.log(values);
    if(!values.title) errors.title = "タイトルを入力してください";
    if(!values.memo)  errors.memo = "メモを入力してください";

    return errors;
}

//Stateの情報をPropsで使用できるようする
const mapStateToProps = (state, ownProps) => {
  const memo = state.memos[ownProps.match.params.id];
  //編集画面などで初期化した状態でフォーム画面表示したい場合には、reduxFormのパラメータとしてinitialValuesの名称で初期値を指定する。
  return { initialValues : memo } 
};

//Dispatch(アクションクリエイター)をPropsで使用できるようにする
const mapDispatchToProps = ({ deleteMemo, getMemo, updateMemo});

//コンポーネントをRedux Storeに接続する
export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({validate, form: 'memoShowForm', enableReinitialize: true})(memoShow)
);
