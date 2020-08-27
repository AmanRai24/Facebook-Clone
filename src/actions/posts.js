import { UPDATE_POSTS, ADD_POST, ADD_COMMENT} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    //const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';
    const url = APIUrls.fetchPosts(1,20);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data:', data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

//add post to the API DB
export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Create_post:Data', data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

// add comment to the post API
export function createComment(comment, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ comment, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Create_post:Data', data);

        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

//call reducer to add comment to the post
export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}