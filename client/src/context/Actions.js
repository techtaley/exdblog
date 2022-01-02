//Step 4 - All actions from Context.js will be processed here
//these are possible processes to handle action.types for login status

//LoginStart process collects info only - takes in user's credentials name, email, etc
export const LoginStart = (userCredentials) => ({ 
//if action type is LOGIN_START, the process doesn't return anything, so no payload     
    type: "LOGIN_START"  
})

export const LoginSuccess = (user) => ({  
//if action type is LOGIN_SUCCESS, the process returns user as payload in order to update state
type: "LOGIN_SUCCESS",  //action type
    payload: user,   //returns a payload
})

//if action type is LOGIN_FAILURE, no payload is returned - no state update
export const LoginFailure =() => ({  
    type:"LOGIN_FAILURE"  //doesn't return anything it's just a failure
})

//
export const Logout =() => ({
    type:"LOGOUT"
})

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
})

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user
})

export const UpdateFailure =() => ({
    type:"UPDATE_FAILURE"
})