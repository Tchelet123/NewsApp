import {FETCH_POSTS, CHANGE_CATEGORY} from '../actionTypes.js';
const initialState = {
  postsList: [],
  reqData: {},
  category: '',
};
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      
      if(action.payload.pagination.offset===0){
        return {
          ...state,
          postsList: action.payload.data,
          reqData: action.payload.pagination,
        };
      }
      let newList = state.postsList.concat(action.payload.data);
      return {
        ...state,
        postsList: newList,
        reqData: action.payload.pagination,
      };
    case CHANGE_CATEGORY:
      return {postsList: [], reqData: {}, category: action.payload};
    default:
      return state;
  }
};
export default postsReducer;
