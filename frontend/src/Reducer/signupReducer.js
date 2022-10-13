
export const initialSignUpState = {
    username:{value:"",touched:false,hasError:false,error:""},
    email:{value:"",touched:false,hasError:true,error:""},
    name:{value:"",touched:false,hasError:true,error:""},
    about:{value:"",touched:false,hasError:true,error:""},
    password:{value:"",touched:false,hasError:true,error:""},
    isFormValid:false
}


const signupReducer = (state,action) => {
    switch(action.type) {
        case "CLEAR":
            state = initialSignUpState;
            return state

        case "FORM_VALID":
            if(state.username.hasError || state.email.hasError || state.name.hasError || state.about.hasError || state.password.hasError) {
                return state;
            }
            return {...state,['isFormValid']:true}
            
            
        case "VALID_DATA":
            if(state[action.data.key].hasError) return state;
            return {...state,[action.data.key]:{...state[action.data.key],hasError:action.data.error,error:action.data.value}}
        case "ON_CHANGE":
            
            return {...state,[action.data.key]:{...state[action.data.key],value:action.data.value,hasError:false}}


        case "INPUT_TOUCHED":
            return {...state,[action.data]:{...state[action.data],touched:true}}


        case "INPUT_BLUR":
            
            if(action.data.value.trim().length === 0) {
                return {...state,[action.data.key]:{...state[action.data.key],hasError:true,error:`${action.data.key} cannot be empty !!!`}}
            }

            if(action.data.key ==='email' && action.data.value.indexOf('@gmail.com') === -1) {
                return {...state,[action.data.key]:{...state[action.data.key],hasError:true,error:`${action.data.key} must be like ${action.data.value}@gmail.com`}}
            }
            if(action.data.key === "password" && action.data.value.trim().length < 8) {
                return {...state,[action.data.key]:{...state[action.data.key],hasError:true,error:`${action.data.key} must be of 8 digits or characters !!!`}}
            }
        default :
            return state
    }
    return state;
}

export default signupReducer;