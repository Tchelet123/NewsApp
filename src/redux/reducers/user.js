import {
  REMOVE_POST_FAVORITE,
  ADD_POST_FAVORITE,
  SIGNIN,SIGNOUT
} from '../actionTypes.js';
const initialState = {
  userInfo: undefined,
  // userInfo: {userName:'tchelet'},

  userFavoritePosts: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {...state,userInfo:action.payload};
    case SIGNOUT:
      return {userInfo: undefined, userFavoritePosts: []}
    case ADD_POST_FAVORITE:
      let newList = [...state.userFavoritePosts,action.payload];
      return {...state,userFavoritePosts:newList};
    case REMOVE_POST_FAVORITE:
      let uppdateList = state.userFavoritePosts.filter((post)=>post['url']!==action.payload);
      return {...state,userFavoritePosts:uppdateList};
      default:
      return state;
  }
};
export default userReducer;
