import {
  REMOVE_POST_FAVORITE,
  ADD_POST_FAVORITE,
  SIGNOUT,SIGNIN
} from '../actionTypes.js';

export const signUserIn = (userInpo) => async dispatch => {
  try {
    // console.log('signIn function');
    const data = userInpo
    await dispatch({type: SIGNIN, payload: data});
  } catch (error) {
    console.error(error);
  }
};
export const signUserOut = () => async dispatch => {
  try {
    // console.log('signOut');
    dispatch({type: SIGNOUT, payload:''});
  } catch (error) {
    console.error(error);
  }
};
export const addPost = (post) => async dispatch => {
  try {
    await dispatch({type: ADD_POST_FAVORITE, payload: post});
  } catch (error) {
    console.error(error);
  }
};

 export const removePost = (post) =>async dispatch =>{
    try {
      dispatch({type: REMOVE_POST_FAVORITE, payload: post.url});
    } catch (error) {
      console.error(error);
    }
  };