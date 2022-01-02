//Step 5 - after setting up Actions.js this login Reducer handles logic for action type cases.

const Reducer = (state, action) => {  
    switch(action.type){
        case "LOGIN_START":  //if action.type is Login_start this is the initial visit to any page
            return {  
                user: null,  //there is no user initially so it's null
                isFetching: true,  //after click login, fetching starts so it's true 
                error: false  //since it's just starting there is no error
            }
        case "LOGIN_SUCCESS":  //if action.type is Login_success it means credenitals were correct
            return {
                user: action.payload,  //returns user and pass info as payload 
                isFetching: false,  //false since we already have data so no more fetching
                error: false  //false since there is no error
            }            
        case "LOGIN_FAILURE":  //if action.type is Login_Failure it means credenitals were incorrect
            return {
                user: null,  //null since we have an error and did not return a user
                isFetching: false,  //false since no more fetching to be done
                error: true //false because informtion was incorrect
            }
            
        //this ends login status
        
        case "UPDATE_START":
            return {
                ...state,           //state stays the same as login state 
                isFetching: true,
            }
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }            
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true
            }            
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            }    
            default: 
            return state;                        
    }
}

export default Reducer