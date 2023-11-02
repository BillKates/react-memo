import {
  READ_MEMOS,
  READ_MEMO,
  ADD_MEMO,
  UPDATE_MEMO,
  DELETE_MEMO,
} from '../actions';

const getUniqueStr = () => {
  return new Date().getTime().toString(16);
}

const memoReducer = (memos = {}, action) => {
  switch(action.type){
    case READ_MEMOS:
      return memos;
    case READ_MEMO:
      return memos;
    case ADD_MEMO:
      const insertData = {
        id : getUniqueStr(),
        title : action.params.title,
        memo : action.params.memo,
      }
      return { ...memos,[getUniqueStr()] : insertData};
    case UPDATE_MEMO:
      const updateData = {
        id : action.id,
        title : action.params.title,
        memo : action.params.memo,   
      }
      return { ...memos,[updateData.id] : updateData};
    case DELETE_MEMO:
      delete memos[action.id];
      return {...memos};
    default:
      return memos;
  }
}

export default memoReducer;
