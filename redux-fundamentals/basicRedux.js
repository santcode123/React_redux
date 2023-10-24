const redux = require('redux');

const ActionTypes = {
    BUY_CAKE: 'Buy cake',
    ADD_CAKE: 'Add cake'
};

function buyCake() {
    return {
        type: ActionTypes.BUY_CAKE,
        payload: {
            qty: 1,
        }
    }
};

function addTwoCake() {
    return {
        type: ActionTypes.ADD_CAKE,
        payload: {
            qty: 2
        }
    }
}

const initialState = {
    numOfCake: 10,
}

const reducer = (state = initialState, action) => {
    const { type, payload = {} } = action;
    const { qty } = payload;
    console.log('type=>', type, qty);
    switch (type) {
        case ActionTypes.BUY_CAKE: {
            return {
                ...state,
                numOfCake: state.numOfCake - qty
            }
        }
        case ActionTypes.ADD_CAKE: {
            return {
                ...state,
                numOfCake: state.numOfCake + qty
            }
        }
        default:
            return state

    }
};

const createStore = redux.createStore;

const store = createStore(reducer);
console.log('initialState =>', store.getState());

// add subscribers
store.subscribe(() => console.log('update state is =>', store.getState()));

// do some dispatch action here
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(addTwoCake());