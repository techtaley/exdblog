//step 1 - import useContext and useReducer
import { useEffect, createContext, useReducer } from 'react'
import Reducer from './Reducer'    //useReducer - step 2 - state logic 

//useContext allows 'user' to be used cross all components rather than re-rendering the page,

//step 2 - useReducer sets initial state (object/value with complete login state)
const INITIAL_STATE = {
    //initial visit to any page is null because there is no user login state
    //but if there is a authenticated user get the user from logal storge between refreshes 
    user: JSON.parse(localStorage.getItem("user")) || null,  //if initial or failure, then null
    isFetching: false,  //if null, false   if user, true
    error: false,  //if null, true  if user, false
}

//step 3 - set up createContext() to pass initial state
export const Context = createContext(INITIAL_STATE) 

//step 4 - go to Actions.js
//step 5 - go to Reduce.js

//step 6 - create ContextProvider - set useReducer reducer and initial state
//step 7 - placing Context <ContextProvide /> in index.js surrounding <App /> components in application can access data.
export const ContextProvider = ({ children }) => {  //children refers to all components
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)  
    //userReducer() updates initial state of Reducer using dispatch
    
    useEffect(() => {  //if login user.state changes, updates user in localStorage
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return(
        <Context.Provider
            value={{  //passing properties of children - used
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context