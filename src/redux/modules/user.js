import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  user_info: {email: "email", nickname: "nickname"},
  is_login: false,
  email_dupli: false,
  nick_dupli: false,
};

export const LoginSV = (user_info) => {
    console.log("click LoginDB")
    const {email, password} = user_info
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/login', {email, password})
        .then((res) => {
            console.log("res of loginDB", res);
            if(res.status===200){
                document.cookie = `TOKEN=${res.data.token};`;
                //로그인 체크해야할 듯. user info 부족
            } else{
                window.alert("값을 재입력해주세요!")
            }
        })
        .catch((err) => {
            console.log("err of loginDB", err);
        })
    };
};

export const SignupSV = (user_info) => {
    console.log("click SignupDB")
    const {email, nickname, password} = user_info
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/register', {email, nickname, password})
        .then((res) => {
            console.log("res of SignupDB", res);
        })
        .catch((err) => {
            console.log("err of SignupDB", err);
        })
    };
};

export const EmailDuplicate = (email) => { //undefined 도 됨
    console.log("click email dupli")
    console.log(email)
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/duplicate-email', {email})
        .then((res) => {
            console.log("res of email dupli", res);
            if(res.status===201){
                console.log("사용가능한 아이디! inputbox disabled 걸기")
                dispatch(EmailDupli(true));
            }
        })
        .catch((err) => {
            console.log("err of email dupli", err);
            console.log("중복된 아이디!")
            dispatch(EmailDupli(false));
        })
    };
};

export const NickDuplicate = (nickname) => {
    console.log("click nickname dupli")
    console.log({nickname})
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/duplicate-nickname', {nickname})
        .then((res) => {
            console.log("res of nickname dupli", res);
            if(res.status===201){
                console.log("사용가능한 아이디! inputbox disabled 걸기")
                dispatch(NickDupli(true));
            }
        })
        .catch((err) => {
            console.log("err of nickname dupli", err);
            console.log("중복된 아이디!")
            dispatch(NickDupli(false));
        })
    };
};

export const LoginCheck = () => {
    return function(dispatch, getState, {history}){
    console.log("click login check")
        instance
        .get('/api/user/me')
        .then((res) => {
            console.log("res of login check", res);
        })
        .catch((err) => {
            console.log("err of login check", err);
        })
    };
};

export const _logOut = () => {
    return function(dispatch, getState, {history}){
        document.cookie = `TOKEN=; expires=${new Date("2020-3-22").toUTCString()}`;
        dispatch(LogOut()); // action payload 가 undefined 괜찮은지
    }
}

export const BodySpectSV = (gender, weight, height, age, control) => {
    return function(dispatch, getState, {history}){
        console.log(gender, weight, height, age, control)
        instance
        .post('/api/user/bodySpec', {gender, weight, height, age, control})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
//리덕스
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user_info = action.payload;
      state.is_login = true;
    },
    LogOut: (state, action) => {
        state.user_info = null;
        state.is_login = false;
    },
    EmailDupli: (state, action) => {
        state.email_dupli = action.payload;
    },
    NickDupli: (state, action) => {
        state.nick_dupli = action.payload;
    },
    // BodySpect: (state, action) => {
    //     state.user_info = action.payload;
    // }
  },
});

export const {SetUser, LogOut, EmailDupli, NickDupli} = user.actions
export default user;