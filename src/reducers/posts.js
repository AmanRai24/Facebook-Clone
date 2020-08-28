import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKE:
      const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return updatedPosts;
    case UPDATE_COMMENT_LIKE:
      const updatedPost = state.map((post) => {
        if (post._id === action.postId) {
          const updateComment = post.comments.map((comment) => {
            if (comment._id === action.commentId) {
              return {
                ...comment,
                likes: [...comment.likes, action.userId],
              };
            }
            return comment;
          });
          console.log('updateComment:', updateComment);
          return { ...post, comments: [...updateComment] };
        }
        return post;
      });
      console.log('updatedPost:', updatedPost);
      return updatedPost;
    default:
      return state;
  }
}
