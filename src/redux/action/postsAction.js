import {fetchPostsByCategory} from '../api/index.js';
import {
  FETCH_POSTS,
  CHANGE_CATEGORY,
  REMOVE_POST_FAVORITE,
  ADD_POST_FAVORITE,
  SINGNIN,
} from '../actionTypes.js';

export const getPosts = (category, offset) => async dispatch => {
  console.log('start adding articles');
  try {
    fetchPostsByCategory(category, offset)
      .then(res => res.json())
      .then(resJson => {
        
        dispatch({type: FETCH_POSTS, payload: resJson});
      })
    // const {data} = await api.fetchPostsByCategory(category, offset);
    // console.log(data[0]);
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
