//アクション定義
export const READ_MEMOS = "READ_MEMOS";
export const READ_MEMO = "READ_MEMO";
export const ADD_MEMO = "ADD_MEMO";
export const UPDATE_MEMO = "UPDATE_MEMO";
export const DELETE_MEMO = 'DELETE_MEMO';

//メモ一覧を取得する
export const getMemos = () => ({
    type : READ_MEMOS,
});

//idで指定したメモを取得する
export const getMemo = (id) => ({
    type : READ_MEMO,
    params : id,
});

//メモを追加する
export const addMemo = (values) => ({
    type : ADD_MEMO,
    params : values,
});

//idで指定したメモを更新する
export const updateMemo = (id, values) => ({
    type : UPDATE_MEMO,
    id : id,
    params : values,
});

//idで指定したメモを削除する
export const deleteMemo = (id) => ({
    type : DELETE_MEMO,
    id : id,
});

