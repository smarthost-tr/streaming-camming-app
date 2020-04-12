import { INIT_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '../types.js';
import SendBird from 'sendbird';


const sb = new SendBird({ appId: "E9FB1935-C94B-4852-AA8A-CB61AB6DDC93" });


export const initLogin = () => {
  return { type: INIT_LOGIN };
};

export const sendbirdLogin = ({ userId, nickname }) => {
  return dispatch => {
    return sbConnect({ userId, nickname })
      .then((user) => {
        console.log("user :", user);
        loginSuccess(dispatch, user);
      })
      .catch(error => {
        console.log(error);
        loginFail(dispatch, error)
      });
  };
};

const loginFail = (dispatch, error) => {
  console.log("login failure.")
  dispatch({
    type: LOGIN_FAIL,
    payload: error
  });
};

const loginSuccess = (dispatch, user) => {
  console.log("login success.");
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user
  });
};

export const sbConnect = ({ userId, nickname }) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      console.log("userID is required")
      reject('UserID is required.');
      return;
    }
    if (!nickname) {
      console.log("nickname is required.")
      reject('Nickname is required.');
      return;
    }
    
    sb.connect(userId, (user, error) => {
      if (error) {
        console.log(error);
        reject('SendBird Login Failed.');
      } else {
        resolve(sbUpdateProfile(nickname));
      }
    });
  });
};

export const sbUpdateProfile = nickname => {
  return new Promise((resolve, reject) => {
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    let sb = SendBird.getInstance();
    if (!sb) sb = new SendBird({ appId: "E9FB1935-C94B-4852-AA8A-CB61AB6DDC93" });
    sb.updateCurrentUserInfo(nickname, null, (user, error) => {
      if (error) {
        reject('Update profile failed.');
      } else {
        resolve(user);
        console.log(user);
        console.log("set item...");
      }
    });
  });
};