// middle ware in redux to help debugging...
// we will use redux-logger middleware 
const redux = require('redux');
const combineReducers = redux.combineReducers;
const reduxThunkMiddleware = require('redux-thunk').default; // apart from thunk there are many middleware in the react framework
const applyMiddleWare = redux.applyMiddleware;

const ActionTypes = {
    START_FETCHING_USERS: 'START_FETCHING_USERS',
    USERS_FETCH_SUCCESS: 'USERS_FETCH_SUCCESS',
    USERS_FETCH_FAILURE: 'USERS_FETCH_FAILURE',
};

const initialState = {
    loading: false,
    data: [],
    errors: ''
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.START_FETCHING_USERS: {
            return {
                ...state,
                loading: true
            }
        }
        case ActionTypes.USERS_FETCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                errors: ''
            }
        }
        case ActionTypes.USERS_FETCH_FAILURE: {
            return {
                ...state,
                loading: false,
                data: [],
                errors: action.payload
            }
        }
    }

}


const handleAsyncAction = ()=>{
    // hit the api to fetch the users list
    return function(dispatch){
        console.log('hey');
        dispatch({type:ActionTypes.START_FETCHING_USERS, payload: []});
        // axios.fetch() fetch the apis and 
    }
}

const createStore = redux.createStore;

const rootReducer = reducer;

const store = createStore(rootReducer, applyMiddleWare(reduxThunkMiddleware));
console.log('initialState =>', store.getState());

// add subscribers
store.subscribe(() => console.log('update state is =>', store.getState()));

// do some dispatch action here
store.dispatch(handleAsyncAction);