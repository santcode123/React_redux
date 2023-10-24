// middle ware in redux to help debugging...
// we will use redux-logger middleware 
const redux = require('redux');
const combineReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleWare = redux.applyMiddleware;

const ActionTypes = {
    BUY_CAKE: 'Buy cake',
    BUY_ICECREAM: 'Add cake'
};

function buyCake() {
    return {
        type: ActionTypes.BUY_CAKE,
        payload: {
            qty: 1,
        }
    }
};
function buyIcream() {
    return {
        type: ActionTypes.BUY_ICECREAM,
        payload: {
            qty: 1
        }
    }
}



const initialCakeState = {
    numOfCake: 10,
}
const initialIcecreamState = {
    numOfIceCreams: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
    const { type, payload = {} } = action;
    const { qty } = payload;
    switch (type) {
        case ActionTypes.BUY_CAKE: {
            return {
                ...state,
                numOfCake: state.numOfCake - qty
            }
        }
        default:
            return state
    }
};

const iceCreamReducer = (state = initialIcecreamState, action) => {
    const { type, payload = {} } = action;
    const { qty } = payload;
    switch (type) {
        case ActionTypes.BUY_ICECREAM: {
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - qty
            }
        }
        default:
            return state
    }
}

const createStore = redux.createStore;

const rootReducer = combineReducers({ cake: cakeReducer, iceCream: iceCreamReducer })

const store = createStore(rootReducer, applyMiddleWare(logger));
console.log('initialState =>', store.getState());

// add subscribers
// store.subscribe(() => console.log('update state is =>', store.getState()));

// do some dispatch action here
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcream());
store.dispatch(buyIcream());