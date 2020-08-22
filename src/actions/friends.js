import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { 
    FETCH_FRIENDS_SUCCESS, 
    ADD_FRIEND,
    REMOVE_FRIEND, 
} from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Friends Data:', data);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function fetchFriendsSuccess(friends) {
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends,
    };
}

export function addFriend(friend) {
    return {
        type: ADD_FRIEND,
        friend,
    };
}

export function removeFriend(userId) {
    return {
        type: REMOVE_FRIEND,
        userId,
    };
}