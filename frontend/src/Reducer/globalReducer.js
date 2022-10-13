export const globalReducer = (state, action) => {
    switch(action.type) {
        case "USER_LOGOUT":
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {...state,'isLogined':false,'token':'','user':{}}
        case "SET_USER_VALUES":
            localStorage.setItem("token",action.data.token);
            localStorage.setItem("user",1);
            return {...state,'isLogined':true,'token':action.data.token,'user':action.data.userdata}

        case "TOGGLE_LOADING":
            if(state.loading) {
                return {...state,'loading':false}
            }
            return {...state,'loading':true}
        
        case "TOGGLE_ALERT":
            if(state.alert.show) {
                
                return {...state,'alert':{...state['alert'],show:false,message:''}}
            }
            return {...state,'alert':{...state,show:true,message:action.message,msgtype:action.msgtype}}

        default :
            return state;
    }
  return state;
};
