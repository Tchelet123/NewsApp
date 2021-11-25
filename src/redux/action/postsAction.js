import * as api from '../api/index.js';
import {
  FETCH_POSTS,
  CHANGE_CATEGORY,
  REMOVE_POST_FAVORITE,
  ADD_POST_FAVORITE,
  SINGNIN,
} from '../actionTypes.js';

export const getPosts = (category, offset) => async dispatch => {
  try {
    console.log('start adding articles');
    const {data} = await api.fetchPostsByCategory(category, offset);
    await dispatch({type: FETCH_POSTS, payload: data});
  } catch (error) {
    console.error(error);
  }
};

export const changeCategory = category => async dispatch => {
  try {
    await dispatch({type: CHANGE_CATEGORY, payload: category});
  } catch (error) {
    console.error(error);
  }
};
