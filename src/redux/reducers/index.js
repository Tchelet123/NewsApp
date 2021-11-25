import {combineReducers} from 'redux';

import postsReducer from './posts.js';
import userReducer from './user.js';
export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  // postsReducer,

});
