import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import memos from './memo';

//アプリケーション内に存在するreducerを統括する
export default combineReducers({ memos, form });
