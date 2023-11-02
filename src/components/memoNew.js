import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

//Local Import
import { addMemo } from '../actions';

//メモ新規作成
class memoNew extends Component{
  renderField = (field) => {
    const {input, label, type, meta:{touched, error} } = field;
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  onSubmit = (values) => {
    this.props.addMemo(values);
    this.props.history.push('/')
  }

  render(){
    //redux-formではformのonSubmitにhandleSubmitを渡すことでformの送信の制御を行なっている
    //handleSubmitに関数を渡すと送信時に呼ばれるため、ここではonSubmitを指定している。
    const { handleSubmit, pristine, submitting, invalid} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label='タイトル' name='title' type='text' component={this.renderField}/>
        </div>
        <div>
          <Field label='メモ' name='memo' type='text' component={this.renderField}/>
        </div>
        <div>
          <input type="submit" value="追加" disabled={pristine || submitting || invalid} />
          <Link to="/" >キャンセル</Link>   
        </div>
      </form>
    )
  }
}

const validate = values => {
    const errors= {};
    if(!values.title) errors.title = "タイトルを入力してください";
    if(!values.memo)  errors.memo = "メモを入力してください";
    return errors;
}

const mapDispatchToProps = ({ addMemo });

export default connect(null, mapDispatchToProps)(
reduxForm({validate, form: 'memoNewForm'})(memoNew)
);
